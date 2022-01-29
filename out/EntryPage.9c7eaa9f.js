// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__assign = void 0;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncValues = __asyncValues;
exports.__await = __await;
exports.__awaiter = __awaiter;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = __createBinding;
exports.__decorate = __decorate;
exports.__exportStar = __exportStar;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__importDefault = __importDefault;
exports.__importStar = __importStar;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__metadata = __metadata;
exports.__param = __param;
exports.__read = __read;
exports.__rest = __rest;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__values = __values;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}

function __exportStar(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

;

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}
},{}],"../../../node_modules/@material/base/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFoundation = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

exports.MDCFoundation = MDCFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFoundation;
exports.default = _default;
},{}],"../../../node_modules/@material/base/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCComponent = void 0;

var _tslib = require("tslib");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root = root;
    this.initialize.apply(this, (0, _tslib.__spread)(args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation.MDCFoundation({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler, options) {
    this.root.addEventListener(evtType, handler, options);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler, options) {
    this.root.removeEventListener(evtType, handler, options);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root.dispatchEvent(evt);
  };

  return MDCComponent;
}();

exports.MDCComponent = MDCComponent;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCComponent;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","./foundation":"../../../node_modules/@material/base/foundation.js"}],"../../../node_modules/@material/dom/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPassive = applyPassive;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  return supportsPassiveOption(globalObj) ? {
    passive: true
  } : false;
}

function supportsPassiveOption(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  } // See
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener


  var passiveSupported = false;

  try {
    var options = {
      // This function will be called when the browser
      // attempts to access the passive property.
      get passive() {
        passiveSupported = true;
        return false;
      }

    };

    var handler = function () {};

    globalObj.document.addEventListener('test', handler, options);
    globalObj.document.removeEventListener('test', handler, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
}
},{}],"../../../node_modules/@material/dom/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = closest;
exports.estimateScrollWidth = estimateScrollWidth;
exports.matches = matches;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}

function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}
/**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 */


function estimateScrollWidth(element) {
  // Check the offsetParent. If the element inherits display: none from any
  // parent, the offsetParent property will be null (see
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
  // This check ensures we only clone the node when necessary.
  var htmlEl = element;

  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }

  var clone = htmlEl.cloneNode(true);
  clone.style.setProperty('position', 'absolute');
  clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
  document.documentElement.appendChild(clone);
  var scrollWidth = clone.scrollWidth;
  document.documentElement.removeChild(clone);
  return scrollWidth;
}
},{}],"../../../node_modules/@material/floating-label/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_REQUIRED: 'mdc-floating-label--required',
  LABEL_SHAKE: 'mdc-floating-label--shake',
  ROOT: 'mdc-floating-label'
};
exports.cssClasses = cssClasses;
},{}],"../../../node_modules/@material/floating-label/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFloatingLabelFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter.addClass(LABEL_SHAKE);
    } else {
      this.adapter.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label as required.
   * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
   */


  MDCFloatingLabelFoundation.prototype.setRequired = function (isRequired) {
    var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;

    if (isRequired) {
      this.adapter.addClass(LABEL_REQUIRED);
    } else {
      this.adapter.removeClass(LABEL_REQUIRED);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(_foundation.MDCFoundation);

exports.MDCFloatingLabelFoundation = MDCFloatingLabelFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFloatingLabelFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/floating-label/constants.js"}],"../../../node_modules/@material/floating-label/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCFloatingLabel = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _ponyfill = require("@material/dom/ponyfill");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFloatingLabel =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCFloatingLabel, _super);

  function MDCFloatingLabel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCFloatingLabel.attachTo = function (root) {
    return new MDCFloatingLabel(root);
  };
  /**
   * Styles the label to produce the label shake for errors.
   * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
   */


  MDCFloatingLabel.prototype.shake = function (shouldShake) {
    this.foundation.shake(shouldShake);
  };
  /**
   * Styles the label to float/dock.
   * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
   */


  MDCFloatingLabel.prototype.float = function (shouldFloat) {
    this.foundation.float(shouldFloat);
  };
  /**
   * Styles the label as required.
   * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
   */


  MDCFloatingLabel.prototype.setRequired = function (isRequired) {
    this.foundation.setRequired(isRequired);
  };

  MDCFloatingLabel.prototype.getWidth = function () {
    return this.foundation.getWidth();
  };

  MDCFloatingLabel.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      getWidth: function () {
        return (0, _ponyfill.estimateScrollWidth)(_this.root);
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCFloatingLabelFoundation(adapter);
  };

  return MDCFloatingLabel;
}(_component.MDCComponent);

exports.MDCFloatingLabel = MDCFloatingLabel;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","./foundation":"../../../node_modules/@material/floating-label/foundation.js"}],"../../../node_modules/@material/line-ripple/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};
exports.cssClasses = cssClasses;
},{}],"../../../node_modules/@material/line-ripple/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCLineRippleFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLineRippleFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCLineRippleFoundation, _super);

  function MDCLineRippleFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
    /**
     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        registerEventHandler: function () {
          return undefined;
        },
        deregisterEventHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCLineRippleFoundation.prototype.init = function () {
    this.adapter.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function () {
    this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.activate = function () {
    this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
    this.adapter.addClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
  };

  MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
    this.adapter.setStyle('transform-origin', xCoordinate + "px center");
  };

  MDCLineRippleFoundation.prototype.deactivate = function () {
    this.adapter.addClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
  };

  MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter.hasClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
        this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(_foundation.MDCFoundation);

exports.MDCLineRippleFoundation = MDCLineRippleFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCLineRippleFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/line-ripple/constants.js"}],"../../../node_modules/@material/line-ripple/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCLineRipple = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLineRipple =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCLineRipple, _super);

  function MDCLineRipple() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCLineRipple.attachTo = function (root) {
    return new MDCLineRipple(root);
  };
  /**
   * Activates the line ripple
   */


  MDCLineRipple.prototype.activate = function () {
    this.foundation.activate();
  };
  /**
   * Deactivates the line ripple
   */


  MDCLineRipple.prototype.deactivate = function () {
    this.foundation.deactivate();
  };
  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
   */


  MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
    this.foundation.setRippleCenter(xCoordinate);
  };

  MDCLineRipple.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      setStyle: function (propertyName, value) {
        return _this.root.style.setProperty(propertyName, value);
      },
      registerEventHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterEventHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCLineRippleFoundation(adapter);
  };

  return MDCLineRipple;
}(_component.MDCComponent);

exports.MDCLineRipple = MDCLineRipple;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/line-ripple/foundation.js"}],"../../../node_modules/@material/notched-outline/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
};
exports.strings = strings;
var numbers = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
exports.numbers = numbers;
var cssClasses = {
  NO_LABEL: 'mdc-notched-outline--no-label',
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
  OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
};
exports.cssClasses = cssClasses;
},{}],"../../../node_modules/@material/notched-outline/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCNotchedOutlineFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCNotchedOutlineFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCNotchedOutlineFoundation, _super);

  function MDCNotchedOutlineFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
    /**
     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNotchWidthProperty: function () {
          return undefined;
        },
        removeNotchWidthProperty: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
   */

  MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    if (notchWidth > 0) {
      notchWidth += _constants.numbers.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
    }

    this.adapter.setNotchWidthProperty(notchWidth);
    this.adapter.addClass(OUTLINE_NOTCHED);
  };
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
    this.adapter.removeClass(OUTLINE_NOTCHED);
    this.adapter.removeNotchWidthProperty();
  };

  return MDCNotchedOutlineFoundation;
}(_foundation.MDCFoundation);

exports.MDCNotchedOutlineFoundation = MDCNotchedOutlineFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCNotchedOutlineFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/notched-outline/constants.js"}],"../../../node_modules/@material/notched-outline/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCNotchedOutline = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("@material/floating-label/foundation");

var _constants = require("./constants");

var _foundation2 = require("./foundation");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCNotchedOutline =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCNotchedOutline, _super);

  function MDCNotchedOutline() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCNotchedOutline.attachTo = function (root) {
    return new MDCNotchedOutline(root);
  };

  MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
    this.notchElement_ = this.root.querySelector(_constants.strings.NOTCH_ELEMENT_SELECTOR);
    var label = this.root.querySelector('.' + _foundation.MDCFloatingLabelFoundation.cssClasses.ROOT);

    if (label) {
      label.style.transitionDuration = '0s';
      this.root.classList.add(_constants.cssClasses.OUTLINE_UPGRADED);
      requestAnimationFrame(function () {
        label.style.transitionDuration = '';
      });
    } else {
      this.root.classList.add(_constants.cssClasses.NO_LABEL);
    }
  };
  /**
   * Updates classes and styles to open the notch to the specified width.
   * @param notchWidth The notch width in the outline.
   */


  MDCNotchedOutline.prototype.notch = function (notchWidth) {
    this.foundation.notch(notchWidth);
  };
  /**
   * Updates classes and styles to close the notch.
   */


  MDCNotchedOutline.prototype.closeNotch = function () {
    this.foundation.closeNotch();
  };

  MDCNotchedOutline.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      setNotchWidthProperty: function (width) {
        return _this.notchElement_.style.setProperty('width', width + 'px');
      },
      removeNotchWidthProperty: function () {
        return _this.notchElement_.style.removeProperty('width');
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation2.MDCNotchedOutlineFoundation(adapter);
  };

  return MDCNotchedOutline;
}(_component.MDCComponent);

exports.MDCNotchedOutline = MDCNotchedOutline;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/floating-label/foundation":"../../../node_modules/@material/floating-label/foundation.js","./constants":"../../../node_modules/@material/notched-outline/constants.js","./foundation":"../../../node_modules/@material/notched-outline/foundation.js"}],"../../../node_modules/@material/ripple/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
exports.cssClasses = cssClasses;
var strings = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
exports.strings = strings;
var numbers = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};
exports.numbers = numbers;
},{}],"../../../node_modules/@material/ripple/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedEventCoords = getNormalizedEventCoords;
exports.supportsCssVariables = supportsCssVariables;

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');
  supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}

function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}
},{}],"../../../node_modules/@material/ripple/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCRippleFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

var _util = require("./util");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;

    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = '0';
    _this.frame_ = {
      width: 0,
      height: 0
    };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    _this.activationState_ = _this.defaultActivationState_();

    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;

      _this.runDeactivationUXLogicIfReady_();
    };

    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    _this.deactivateHandler_ = function () {
      return _this.deactivate_();
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        browserSupportsCssVars: function () {
          return true;
        },
        computeBoundingRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function () {
          return true;
        },
        deregisterDocumentInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        deregisterResizeHandler: function () {
          return undefined;
        },
        getWindowPageOffset: function () {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function () {
          return true;
        },
        isSurfaceDisabled: function () {
          return true;
        },
        isUnbounded: function () {
          return true;
        },
        registerDocumentInteractionHandler: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        registerResizeHandler: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        updateCssVariable: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter.addClass(ROOT_1);

        if (_this.adapter.isUnbounded()) {
          _this.adapter.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal_();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter.removeClass(ROOT_2);

        _this.adapter.removeClass(UNBOUNDED_2);

        _this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activate_(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivate_();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter.addClass(UNBOUNDED);
    } else {
      this.adapter.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
    return this.adapter.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState_ = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
    var _this = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
      });

      if (this.adapter.isUnbounded()) {
        this.adapter.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter.registerInteractionHandler('blur', this.blurHandler_);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
    var _this = this;

    if (evt.type === 'keydown') {
      this.adapter.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
    var _this = this;

    ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter.isUnbounded()) {
      this.adapter.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
    var _this = this;

    this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };

  MDCRippleFoundation.prototype.removeCssVars_ = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activate_ = function (evt) {
    var _this = this;

    if (this.adapter.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation_ = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter.computeBoundingRect();
    this.adapter.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
    var _a = this.activationState_,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = (0, _util.getNormalizedEventCoords)(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState_,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this.adapter.removeClass(FG_DEACTIVATION);
      }, _constants.numbers.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function () {
    var _this = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent_ = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivate_ = function () {
    var _this = this;

    var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = (0, _tslib.__assign)({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this.activationState_.hasDeactivationUXRun = true;

        _this.animateDeactivation_(state);

        _this.resetActivationState_();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal_ = function () {
    var _this = this;

    this.frame_ = this.adapter.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function () {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE); // Unbounded ripple size should always be even number to equally center align.

    if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize_ = initialSize - 1;
    } else {
      this.initialSize_ = initialSize;
    }

    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };

  return MDCRippleFoundation;
}(_foundation.MDCFoundation);

exports.MDCRippleFoundation = MDCRippleFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCRippleFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/ripple/constants.js","./util":"../../../node_modules/@material/ripple/util.js"}],"../../../node_modules/@material/ripple/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCRipple = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _events = require("@material/dom/events");

var _ponyfill = require("@material/dom/ponyfill");

var _foundation = require("./foundation");

var util = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCRipple =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCRipple, _super);

  function MDCRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.disabled = false;
    return _this;
  }

  MDCRipple.attachTo = function (root, opts) {
    if (opts === void 0) {
      opts = {
        isUnbounded: undefined
      };
    }

    var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (opts.isUnbounded !== undefined) {
      ripple.unbounded = opts.isUnbounded;
    }

    return ripple;
  };

  MDCRipple.createAdapter = function (instance) {
    return {
      addClass: function (className) {
        return instance.root.classList.add(className);
      },
      browserSupportsCssVars: function () {
        return util.supportsCssVariables(window);
      },
      computeBoundingRect: function () {
        return instance.root.getBoundingClientRect();
      },
      containsEventTarget: function (target) {
        return instance.root.contains(target);
      },
      deregisterDocumentInteractionHandler: function (evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return instance.root.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterResizeHandler: function (handler) {
        return window.removeEventListener('resize', handler);
      },
      getWindowPageOffset: function () {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      isSurfaceActive: function () {
        return (0, _ponyfill.matches)(instance.root, ':active');
      },
      isSurfaceDisabled: function () {
        return Boolean(instance.disabled);
      },
      isUnbounded: function () {
        return Boolean(instance.unbounded);
      },
      registerDocumentInteractionHandler: function (evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      registerInteractionHandler: function (evtType, handler) {
        return instance.root.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      registerResizeHandler: function (handler) {
        return window.addEventListener('resize', handler);
      },
      removeClass: function (className) {
        return instance.root.classList.remove(className);
      },
      updateCssVariable: function (varName, value) {
        return instance.root.style.setProperty(varName, value);
      }
    };
  };

  Object.defineProperty(MDCRipple.prototype, "unbounded", {
    get: function () {
      return Boolean(this.unbounded_);
    },
    set: function (unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    },
    enumerable: true,
    configurable: true
  });

  MDCRipple.prototype.activate = function () {
    this.foundation.activate();
  };

  MDCRipple.prototype.deactivate = function () {
    this.foundation.deactivate();
  };

  MDCRipple.prototype.layout = function () {
    this.foundation.layout();
  };

  MDCRipple.prototype.getDefaultFoundation = function () {
    return new _foundation.MDCRippleFoundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function () {
    var root = this.root;
    this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
  };
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   */


  MDCRipple.prototype.setUnbounded_ = function () {
    this.foundation.setUnbounded(Boolean(this.unbounded_));
  };

  return MDCRipple;
}(_component.MDCComponent);

exports.MDCRipple = MDCRipple;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/events":"../../../node_modules/@material/dom/events.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","./foundation":"../../../node_modules/@material/ripple/foundation.js","./util":"../../../node_modules/@material/ripple/util.js"}],"../../../node_modules/@material/textfield/character-counter/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ROOT: 'mdc-text-field-character-counter'
};
exports.cssClasses = cssClasses;
var strings = {
  ROOT_SELECTOR: "." + cssClasses.ROOT
};
exports.strings = strings;
},{}],"../../../node_modules/@material/textfield/character-counter/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldCharacterCounterFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldCharacterCounterFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldCharacterCounterFoundation, _super);

  function MDCTextFieldCharacterCounterFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
     */
    get: function () {
      return {
        setContent: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
    currentLength = Math.min(currentLength, maxLength);
    this.adapter.setContent(currentLength + " / " + maxLength);
  };

  return MDCTextFieldCharacterCounterFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldCharacterCounterFoundation = MDCTextFieldCharacterCounterFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldCharacterCounterFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/textfield/character-counter/constants.js"}],"../../../node_modules/@material/textfield/character-counter/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldCharacterCounter = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldCharacterCounter =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldCharacterCounter, _super);

  function MDCTextFieldCharacterCounter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldCharacterCounter.attachTo = function (root) {
    return new MDCTextFieldCharacterCounter(root);
  };

  Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundationForTextField", {
    // Provided for access by MDCTextField component
    get: function () {
      return this.foundation;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      setContent: function (content) {
        _this.root.textContent = content;
      }
    };
    return new _foundation.MDCTextFieldCharacterCounterFoundation(adapter);
  };

  return MDCTextFieldCharacterCounter;
}(_component.MDCComponent);

exports.MDCTextFieldCharacterCounter = MDCTextFieldCharacterCounter;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/textfield/character-counter/foundation.js"}],"../../../node_modules/@material/textfield/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = exports.VALIDATION_ATTR_WHITELIST = exports.ALWAYS_FLOAT_TYPES = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ARIA_CONTROLS: 'aria-controls',
  ARIA_DESCRIBEDBY: 'aria-describedby',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
  SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
  TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
};
exports.strings = strings;
var cssClasses = {
  DISABLED: 'mdc-text-field--disabled',
  FOCUSED: 'mdc-text-field--focused',
  HELPER_LINE: 'mdc-text-field-helper-line',
  INVALID: 'mdc-text-field--invalid',
  LABEL_FLOATING: 'mdc-text-field--label-floating',
  NO_LABEL: 'mdc-text-field--no-label',
  OUTLINED: 'mdc-text-field--outlined',
  ROOT: 'mdc-text-field',
  TEXTAREA: 'mdc-text-field--textarea',
  WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
  WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon'
};
exports.cssClasses = cssClasses;
var numbers = {
  LABEL_SCALE: 0.75
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */

exports.numbers = numbers;
var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */

exports.VALIDATION_ATTR_WHITELIST = VALIDATION_ATTR_WHITELIST;
var ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week'];
exports.ALWAYS_FLOAT_TYPES = ALWAYS_FLOAT_TYPES;
},{}],"../../../node_modules/@material/textfield/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCTextFieldFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldFoundation, _super);
  /**
   * @param adapter
   * @param foundationMap Map from subcomponent names to their subfoundations.
   */

  function MDCTextFieldFoundation(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }

    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;

    _this.isFocused_ = false;
    _this.receivedUserInput_ = false;
    _this.isValid_ = true;
    _this.useNativeValidation_ = true;
    _this.validateOnValueChange_ = true;
    _this.helperText_ = foundationMap.helperText;
    _this.characterCounter_ = foundationMap.characterCounter;
    _this.leadingIcon_ = foundationMap.leadingIcon;
    _this.trailingIcon_ = foundationMap.trailingIcon;

    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };

    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };

    _this.inputInputHandler_ = function () {
      return _this.handleInput();
    };

    _this.setPointerXOffset_ = function (evt) {
      return _this.setTransformOrigin(evt);
    };

    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };

    _this.validationAttributeChangeHandler_ = function (attributesList) {
      return _this.handleValidationAttributeChange(attributesList);
    };

    return _this;
  }

  Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
    get: function () {
      var type = this.getNativeInput_().type;
      return _constants.ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
    get: function () {
      return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() || this.isBadInput_();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
    get: function () {
      return !this.isFocused_ && !this.isValid() && !!this.getValue();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldAdapter} for typing information on parameters and
     * return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return true;
        },
        setInputAttr: function () {
          return undefined;
        },
        removeInputAttr: function () {
          return undefined;
        },
        registerTextFieldInteractionHandler: function () {
          return undefined;
        },
        deregisterTextFieldInteractionHandler: function () {
          return undefined;
        },
        registerInputInteractionHandler: function () {
          return undefined;
        },
        deregisterInputInteractionHandler: function () {
          return undefined;
        },
        registerValidationAttributeChangeHandler: function () {
          return new MutationObserver(function () {
            return undefined;
          });
        },
        deregisterValidationAttributeChangeHandler: function () {
          return undefined;
        },
        getNativeInput: function () {
          return null;
        },
        isFocused: function () {
          return false;
        },
        activateLineRipple: function () {
          return undefined;
        },
        deactivateLineRipple: function () {
          return undefined;
        },
        setLineRippleTransformOrigin: function () {
          return undefined;
        },
        shakeLabel: function () {
          return undefined;
        },
        floatLabel: function () {
          return undefined;
        },
        setLabelRequired: function () {
          return undefined;
        },
        hasLabel: function () {
          return false;
        },
        getLabelWidth: function () {
          return 0;
        },
        hasOutline: function () {
          return false;
        },
        notchOutline: function () {
          return undefined;
        },
        closeOutline: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldFoundation.prototype.init = function () {
    var _this = this;

    if (this.adapter.hasLabel() && this.getNativeInput_().required) {
      this.adapter.setLabelRequired(true);
    }

    if (this.adapter.isFocused()) {
      this.inputFocusHandler_();
    } else if (this.adapter.hasLabel() && this.shouldFloat) {
      this.notchOutline(true);
      this.adapter.floatLabel(true);
      this.styleFloating_(true);
    }

    this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter.registerInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
    this.setCharacterCounter_(this.getValue().length);
  };

  MDCTextFieldFoundation.prototype.destroy = function () {
    var _this = this;

    this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  };
  /**
   * Handles user interactions with the Text Field.
   */


  MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
    var nativeInput = this.adapter.getNativeInput();

    if (nativeInput && nativeInput.disabled) {
      return;
    }

    this.receivedUserInput_ = true;
  };
  /**
   * Handles validation attribute changes
   */


  MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
    var _this = this;

    attributesList.some(function (attributeName) {
      if (_constants.VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
        _this.styleValidity_(true);

        _this.adapter.setLabelRequired(_this.getNativeInput_().required);

        return true;
      }

      return false;
    });

    if (attributesList.indexOf('maxlength') > -1) {
      this.setCharacterCounter_(this.getValue().length);
    }
  };
  /**
   * Opens/closes the notched outline.
   */


  MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
    if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
      return;
    }

    if (openNotch) {
      var labelWidth = this.adapter.getLabelWidth() * _constants.numbers.LABEL_SCALE;

      this.adapter.notchOutline(labelWidth);
    } else {
      this.adapter.closeOutline();
    }
  };
  /**
   * Activates the text field focus state.
   */


  MDCTextFieldFoundation.prototype.activateFocus = function () {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter.activateLineRipple();

    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);
      this.adapter.shakeLabel(this.shouldShake);
    }

    if (this.helperText_ && (this.helperText_.isPersistent() || !this.helperText_.isValidation() || !this.isValid_)) {
      this.helperText_.showToScreenReader();
    }
  };
  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   */


  MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
    if (this.isDisabled() || this.adapter.hasOutline()) {
      return;
    }

    var touches = evt.touches;
    var targetEvent = touches ? touches[0] : evt;
    var targetClientRect = targetEvent.target.getBoundingClientRect();
    var normalizedX = targetEvent.clientX - targetClientRect.left;
    this.adapter.setLineRippleTransformOrigin(normalizedX);
  };
  /**
   * Handles input change of text input and text area.
   */


  MDCTextFieldFoundation.prototype.handleInput = function () {
    this.autoCompleteFocus();
    this.setCharacterCounter_(this.getValue().length);
  };
  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programmatically).
   */


  MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };
  /**
   * Deactivates the Text Field's focus state.
   */


  MDCTextFieldFoundation.prototype.deactivateFocus = function () {
    this.isFocused_ = false;
    this.adapter.deactivateLineRipple();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);

    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);
      this.adapter.shakeLabel(this.shouldShake);
    }

    if (!this.shouldFloat) {
      this.receivedUserInput_ = false;
    }
  };

  MDCTextFieldFoundation.prototype.getValue = function () {
    return this.getNativeInput_().value;
  };
  /**
   * @param value The value to set on the input Element.
   */


  MDCTextFieldFoundation.prototype.setValue = function (value) {
    // Prevent Safari from moving the caret to the end of the input when the
    // value has not changed.
    if (this.getValue() !== value) {
      this.getNativeInput_().value = value;
    }

    this.setCharacterCounter_(value.length);

    if (this.validateOnValueChange_) {
      var isValid = this.isValid();
      this.styleValidity_(isValid);
    }

    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);

      if (this.validateOnValueChange_) {
        this.adapter.shakeLabel(this.shouldShake);
      }
    }
  };
  /**
   * @return The custom validity state, if set; otherwise, the result of a
   *     native validity check.
   */


  MDCTextFieldFoundation.prototype.isValid = function () {
    return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
  };
  /**
   * @param isValid Sets the custom validity state of the Text Field.
   */


  MDCTextFieldFoundation.prototype.setValid = function (isValid) {
    this.isValid_ = isValid;
    this.styleValidity_(isValid);
    var shouldShake = !isValid && !this.isFocused_ && !!this.getValue();

    if (this.adapter.hasLabel()) {
      this.adapter.shakeLabel(shouldShake);
    }
  };
  /**
   * @param shouldValidate Whether or not validity should be updated on
   *     value change.
   */


  MDCTextFieldFoundation.prototype.setValidateOnValueChange = function (shouldValidate) {
    this.validateOnValueChange_ = shouldValidate;
  };
  /**
   * @return Whether or not validity should be updated on value change. `true`
   *     by default.
   */


  MDCTextFieldFoundation.prototype.getValidateOnValueChange = function () {
    return this.validateOnValueChange_;
  };
  /**
   * Enables or disables the use of native validation. Use this for custom
   * validation.
   * @param useNativeValidation Set this to false to ignore native input
   *     validation.
   */


  MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
    this.useNativeValidation_ = useNativeValidation;
  };

  MDCTextFieldFoundation.prototype.isDisabled = function () {
    return this.getNativeInput_().disabled;
  };
  /**
   * @param disabled Sets the text-field disabled or enabled.
   */


  MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };
  /**
   * @param content Sets the content of the helper text.
   */


  MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setContent(content);
    }
  };
  /**
   * Sets character counter values that shows characters used and the total
   * character limit.
   */


  MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
    if (!this.characterCounter_) {
      return;
    }

    var maxLength = this.getNativeInput_().maxLength;

    if (maxLength === -1) {
      throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
    }

    this.characterCounter_.setCounterValue(currentLength, maxLength);
  };
  /**
   * @return True if the Text Field input fails in converting the user-supplied
   *     value.
   */


  MDCTextFieldFoundation.prototype.isBadInput_ = function () {
    // The badInput property is not supported in IE 11 💩.
    return this.getNativeInput_().validity.badInput || false;
  };
  /**
   * @return The result of native validity checking (ValidityState.valid).
   */


  MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
    return this.getNativeInput_().validity.valid;
  };
  /**
   * Styles the component based on the validity state.
   */


  MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
    var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

    if (isValid) {
      this.adapter.removeClass(INVALID);
    } else {
      this.adapter.addClass(INVALID);
    }

    if (this.helperText_) {
      this.helperText_.setValidity(isValid); // We dynamically set or unset aria-describedby for validation helper text
      // only, based on whether the field is valid

      var helperTextValidation = this.helperText_.isValidation();

      if (!helperTextValidation) {
        return;
      }

      var helperTextVisible = this.helperText_.isVisible();
      var helperTextId = this.helperText_.getId();

      if (helperTextVisible && helperTextId) {
        this.adapter.setInputAttr(_constants.strings.ARIA_DESCRIBEDBY, helperTextId);
      } else {
        this.adapter.removeInputAttr(_constants.strings.ARIA_DESCRIBEDBY);
      }
    }
  };
  /**
   * Styles the component based on the focused state.
   */


  MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
    var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

    if (isFocused) {
      this.adapter.addClass(FOCUSED);
    } else {
      this.adapter.removeClass(FOCUSED);
    }
  };
  /**
   * Styles the component based on the disabled state.
   */


  MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
    var _a = MDCTextFieldFoundation.cssClasses,
        DISABLED = _a.DISABLED,
        INVALID = _a.INVALID;

    if (isDisabled) {
      this.adapter.addClass(DISABLED);
      this.adapter.removeClass(INVALID);
    } else {
      this.adapter.removeClass(DISABLED);
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.setDisabled(isDisabled);
    }

    if (this.trailingIcon_) {
      this.trailingIcon_.setDisabled(isDisabled);
    }
  };
  /**
   * Styles the component based on the label floating state.
   */


  MDCTextFieldFoundation.prototype.styleFloating_ = function (isFloating) {
    var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;

    if (isFloating) {
      this.adapter.addClass(LABEL_FLOATING);
    } else {
      this.adapter.removeClass(LABEL_FLOATING);
    }
  };
  /**
   * @return The native text input element from the host environment, or an
   *     object with the same shape for unit tests.
   */


  MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
    // this.adapter may be undefined in foundation unit tests. This happens when
    // testdouble is creating a mock object and invokes the
    // shouldShake/shouldFloat getters (which in turn call getValue(), which
    // calls this method) before init() has been called from the MDCTextField
    // constructor. To work around that issue, we return a dummy object.
    var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
    return nativeInput || {
      disabled: false,
      maxLength: -1,
      required: false,
      type: 'input',
      validity: {
        badInput: false,
        valid: true
      },
      value: ''
    };
  };

  return MDCTextFieldFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldFoundation = MDCTextFieldFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/textfield/constants.js"}],"../../../node_modules/@material/textfield/helper-text/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
  ROOT: 'mdc-text-field-helper-text'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role',
  ROOT_SELECTOR: "." + cssClasses.ROOT
};
exports.strings = strings;
},{}],"../../../node_modules/@material/textfield/helper-text/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldHelperTextFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldHelperTextFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldHelperTextFoundation, _super);

  function MDCTextFieldHelperTextFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCTextFieldHelperTextFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        getAttr: function () {
          return null;
        },
        setAttr: function () {
          return undefined;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldHelperTextFoundation.prototype.getId = function () {
    return this.adapter.getAttr('id');
  };

  MDCTextFieldHelperTextFoundation.prototype.isVisible = function () {
    return this.adapter.getAttr(_constants.strings.ARIA_HIDDEN) !== 'true';
  };
  /**
   * Sets the content of the helper text field.
   */


  MDCTextFieldHelperTextFoundation.prototype.setContent = function (content) {
    this.adapter.setContent(content);
  };

  MDCTextFieldHelperTextFoundation.prototype.isPersistent = function () {
    return this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
  };
  /**
   * @param isPersistent Sets the persistency of the helper text.
   */


  MDCTextFieldHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
    if (isPersistent) {
      this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    }
  };
  /**
   * @return whether the helper text acts as an error validation message.
   */


  MDCTextFieldHelperTextFoundation.prototype.isValidation = function () {
    return this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
  };
  /**
   * @param isValidation True to make the helper text act as an error validation message.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidation = function (isValidation) {
    if (isValidation) {
      this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };
  /**
   * Makes the helper text visible to the screen reader.
   */


  MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function () {
    this.adapter.removeAttr(_constants.strings.ARIA_HIDDEN);
  };
  /**
   * Sets the validity of the helper text based on the input validity.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidity = function (inputIsValid) {
    var helperTextIsPersistent = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    var helperTextIsValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.showToScreenReader();
      this.adapter.setAttr(_constants.strings.ROLE, 'alert');
    } else {
      this.adapter.removeAttr(_constants.strings.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  };
  /**
   * Hides the help text from screen readers.
   */


  MDCTextFieldHelperTextFoundation.prototype.hide_ = function () {
    this.adapter.setAttr(_constants.strings.ARIA_HIDDEN, 'true');
  };

  return MDCTextFieldHelperTextFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldHelperTextFoundation = MDCTextFieldHelperTextFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldHelperTextFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/textfield/helper-text/constants.js"}],"../../../node_modules/@material/textfield/helper-text/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldHelperText = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldHelperText =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldHelperText, _super);

  function MDCTextFieldHelperText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldHelperText.attachTo = function (root) {
    return new MDCTextFieldHelperText(root);
  };

  Object.defineProperty(MDCTextFieldHelperText.prototype, "foundationForTextField", {
    // Provided for access by MDCTextField component
    get: function () {
      return this.foundation;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldHelperText.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      getAttr: function (attr) {
        return _this.root.getAttribute(attr);
      },
      setAttr: function (attr, value) {
        return _this.root.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root.textContent = content;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCTextFieldHelperTextFoundation(adapter);
  };

  return MDCTextFieldHelperText;
}(_component.MDCComponent);

exports.MDCTextFieldHelperText = MDCTextFieldHelperText;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/textfield/helper-text/foundation.js"}],"../../../node_modules/@material/textfield/icon/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ICON_EVENT: 'MDCTextField:icon',
  ICON_ROLE: 'button'
};
exports.strings = strings;
var cssClasses = {
  ROOT: 'mdc-text-field__icon'
};
exports.cssClasses = cssClasses;
},{}],"../../../node_modules/@material/textfield/icon/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldIconFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCTextFieldIconFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldIconFoundation, _super);

  function MDCTextFieldIconFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCTextFieldIconFoundation.defaultAdapter), adapter)) || this;

    _this.savedTabIndex_ = null;

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldIconFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        getAttr: function () {
          return null;
        },
        setAttr: function () {
          return undefined;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        notifyIconAction: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldIconFoundation.prototype.init = function () {
    var _this = this;

    this.savedTabIndex_ = this.adapter.getAttr('tabindex');
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.registerInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.destroy = function () {
    var _this = this;

    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.deregisterInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.setDisabled = function (disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter.setAttr('tabindex', '-1');
      this.adapter.removeAttr('role');
    } else {
      this.adapter.setAttr('tabindex', this.savedTabIndex_);
      this.adapter.setAttr('role', _constants.strings.ICON_ROLE);
    }
  };

  MDCTextFieldIconFoundation.prototype.setAriaLabel = function (label) {
    this.adapter.setAttr('aria-label', label);
  };

  MDCTextFieldIconFoundation.prototype.setContent = function (content) {
    this.adapter.setContent(content);
  };

  MDCTextFieldIconFoundation.prototype.handleInteraction = function (evt) {
    var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;

    if (evt.type === 'click' || isEnterKey) {
      evt.preventDefault(); // stop click from causing host label to focus
      // input

      this.adapter.notifyIconAction();
    }
  };

  return MDCTextFieldIconFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldIconFoundation = MDCTextFieldIconFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldIconFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/textfield/icon/constants.js"}],"../../../node_modules/@material/textfield/icon/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldIcon = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldIcon =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextFieldIcon, _super);

  function MDCTextFieldIcon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldIcon.attachTo = function (root) {
    return new MDCTextFieldIcon(root);
  };

  Object.defineProperty(MDCTextFieldIcon.prototype, "foundationForTextField", {
    // Provided for access by MDCTextField component
    get: function () {
      return this.foundation;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldIcon.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      getAttr: function (attr) {
        return _this.root.getAttribute(attr);
      },
      setAttr: function (attr, value) {
        return _this.root.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root.textContent = content;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      },
      notifyIconAction: function () {
        return _this.emit(_foundation.MDCTextFieldIconFoundation.strings.ICON_EVENT, {}
        /* evtData */
        , true
        /* shouldBubble */
        );
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCTextFieldIconFoundation(adapter);
  };

  return MDCTextFieldIcon;
}(_component.MDCComponent);

exports.MDCTextFieldIcon = MDCTextFieldIcon;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/textfield/icon/foundation.js"}],"../../../node_modules/@material/textfield/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextField = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _events = require("@material/dom/events");

var ponyfill = _interopRequireWildcard(require("@material/dom/ponyfill"));

var _component2 = require("@material/floating-label/component");

var _component3 = require("@material/line-ripple/component");

var _component4 = require("@material/notched-outline/component");

var _component5 = require("@material/ripple/component");

var _foundation = require("@material/ripple/foundation");

var _component6 = require("./character-counter/component");

var _foundation2 = require("./character-counter/foundation");

var _constants = require("./constants");

var _foundation3 = require("./foundation");

var _component7 = require("./helper-text/component");

var _foundation4 = require("./helper-text/foundation");

var _component8 = require("./icon/component");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextField =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTextField, _super);

  function MDCTextField() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextField.attachTo = function (root) {
    return new MDCTextField(root);
  };

  MDCTextField.prototype.initialize = function (rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
    if (rippleFactory === void 0) {
      rippleFactory = function (el, foundation) {
        return new _component5.MDCRipple(el, foundation);
      };
    }

    if (lineRippleFactory === void 0) {
      lineRippleFactory = function (el) {
        return new _component3.MDCLineRipple(el);
      };
    }

    if (helperTextFactory === void 0) {
      helperTextFactory = function (el) {
        return new _component7.MDCTextFieldHelperText(el);
      };
    }

    if (characterCounterFactory === void 0) {
      characterCounterFactory = function (el) {
        return new _component6.MDCTextFieldCharacterCounter(el);
      };
    }

    if (iconFactory === void 0) {
      iconFactory = function (el) {
        return new _component8.MDCTextFieldIcon(el);
      };
    }

    if (labelFactory === void 0) {
      labelFactory = function (el) {
        return new _component2.MDCFloatingLabel(el);
      };
    }

    if (outlineFactory === void 0) {
      outlineFactory = function (el) {
        return new _component4.MDCNotchedOutline(el);
      };
    }

    this.input_ = this.root.querySelector(_constants.strings.INPUT_SELECTOR);
    var labelElement = this.root.querySelector(_constants.strings.LABEL_SELECTOR);
    this.label_ = labelElement ? labelFactory(labelElement) : null;
    var lineRippleElement = this.root.querySelector(_constants.strings.LINE_RIPPLE_SELECTOR);
    this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
    var outlineElement = this.root.querySelector(_constants.strings.OUTLINE_SELECTOR);
    this.outline_ = outlineElement ? outlineFactory(outlineElement) : null; // Helper text

    var helperTextStrings = _foundation4.MDCTextFieldHelperTextFoundation.strings;
    var nextElementSibling = this.root.nextElementSibling;
    var hasHelperLine = nextElementSibling && nextElementSibling.classList.contains(_constants.cssClasses.HELPER_LINE);
    var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
    this.helperText_ = helperTextEl ? helperTextFactory(helperTextEl) : null; // Character counter

    var characterCounterStrings = _foundation2.MDCTextFieldCharacterCounterFoundation.strings;
    var characterCounterEl = this.root.querySelector(characterCounterStrings.ROOT_SELECTOR); // If character counter is not found in root element search in sibling element.

    if (!characterCounterEl && hasHelperLine && nextElementSibling) {
      characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
    }

    this.characterCounter_ = characterCounterEl ? characterCounterFactory(characterCounterEl) : null; // Leading icon

    var leadingIconEl = this.root.querySelector(_constants.strings.LEADING_ICON_SELECTOR);
    this.leadingIcon_ = leadingIconEl ? iconFactory(leadingIconEl) : null; // Trailing icon

    var trailingIconEl = this.root.querySelector(_constants.strings.TRAILING_ICON_SELECTOR);
    this.trailingIcon_ = trailingIconEl ? iconFactory(trailingIconEl) : null; // Prefix and Suffix

    this.prefix_ = this.root.querySelector(_constants.strings.PREFIX_SELECTOR);
    this.suffix_ = this.root.querySelector(_constants.strings.SUFFIX_SELECTOR);
    this.ripple = this.createRipple_(rippleFactory);
  };

  MDCTextField.prototype.destroy = function () {
    if (this.ripple) {
      this.ripple.destroy();
    }

    if (this.lineRipple_) {
      this.lineRipple_.destroy();
    }

    if (this.helperText_) {
      this.helperText_.destroy();
    }

    if (this.characterCounter_) {
      this.characterCounter_.destroy();
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.destroy();
    }

    if (this.trailingIcon_) {
      this.trailingIcon_.destroy();
    }

    if (this.label_) {
      this.label_.destroy();
    }

    if (this.outline_) {
      this.outline_.destroy();
    }

    _super.prototype.destroy.call(this);
  };
  /**
   * Initializes the Text Field's internal state based on the environment's
   * state.
   */


  MDCTextField.prototype.initialSyncWithDOM = function () {
    this.disabled = this.input_.disabled;
  };

  Object.defineProperty(MDCTextField.prototype, "value", {
    get: function () {
      return this.foundation.getValue();
    },

    /**
     * @param value The value to set on the input.
     */
    set: function (value) {
      this.foundation.setValue(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "disabled", {
    get: function () {
      return this.foundation.isDisabled();
    },

    /**
     * @param disabled Sets the Text Field disabled or enabled.
     */
    set: function (disabled) {
      this.foundation.setDisabled(disabled);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "valid", {
    get: function () {
      return this.foundation.isValid();
    },

    /**
     * @param valid Sets the Text Field valid or invalid.
     */
    set: function (valid) {
      this.foundation.setValid(valid);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "required", {
    get: function () {
      return this.input_.required;
    },

    /**
     * @param required Sets the Text Field to required.
     */
    set: function (required) {
      this.input_.required = required;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "pattern", {
    get: function () {
      return this.input_.pattern;
    },

    /**
     * @param pattern Sets the input element's validation pattern.
     */
    set: function (pattern) {
      this.input_.pattern = pattern;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "minLength", {
    get: function () {
      return this.input_.minLength;
    },

    /**
     * @param minLength Sets the input element's minLength.
     */
    set: function (minLength) {
      this.input_.minLength = minLength;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "maxLength", {
    get: function () {
      return this.input_.maxLength;
    },

    /**
     * @param maxLength Sets the input element's maxLength.
     */
    set: function (maxLength) {
      // Chrome throws exception if maxLength is set to a value less than zero
      if (maxLength < 0) {
        this.input_.removeAttribute('maxLength');
      } else {
        this.input_.maxLength = maxLength;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "min", {
    get: function () {
      return this.input_.min;
    },

    /**
     * @param min Sets the input element's min.
     */
    set: function (min) {
      this.input_.min = min;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "max", {
    get: function () {
      return this.input_.max;
    },

    /**
     * @param max Sets the input element's max.
     */
    set: function (max) {
      this.input_.max = max;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "step", {
    get: function () {
      return this.input_.step;
    },

    /**
     * @param step Sets the input element's step.
     */
    set: function (step) {
      this.input_.step = step;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
    /**
     * Sets the helper text element content.
     */
    set: function (content) {
      this.foundation.setHelperTextContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
    /**
     * Sets the aria label of the leading icon.
     */
    set: function (label) {
      this.foundation.setLeadingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
    /**
     * Sets the text content of the leading icon.
     */
    set: function (content) {
      this.foundation.setLeadingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
    /**
     * Sets the aria label of the trailing icon.
     */
    set: function (label) {
      this.foundation.setTrailingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
    /**
     * Sets the text content of the trailing icon.
     */
    set: function (content) {
      this.foundation.setTrailingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
    /**
     * Enables or disables the use of native validation. Use this for custom validation.
     * @param useNativeValidation Set this to false to ignore native input validation.
     */
    set: function (useNativeValidation) {
      this.foundation.setUseNativeValidation(useNativeValidation);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "prefixText", {
    /**
     * Gets the text content of the prefix, or null if it does not exist.
     */
    get: function () {
      return this.prefix_ ? this.prefix_.textContent : null;
    },

    /**
     * Sets the text content of the prefix, if it exists.
     */
    set: function (prefixText) {
      if (this.prefix_) {
        this.prefix_.textContent = prefixText;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "suffixText", {
    /**
     * Gets the text content of the suffix, or null if it does not exist.
     */
    get: function () {
      return this.suffix_ ? this.suffix_.textContent : null;
    },

    /**
     * Sets the text content of the suffix, if it exists.
     */
    set: function (suffixText) {
      if (this.suffix_) {
        this.suffix_.textContent = suffixText;
      }
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Focuses the input element.
   */

  MDCTextField.prototype.focus = function () {
    this.input_.focus();
  };
  /**
   * Recomputes the outline SVG path for the outline element.
   */


  MDCTextField.prototype.layout = function () {
    var openNotch = this.foundation.shouldFloat;
    this.foundation.notchOutline(openNotch);
  };

  MDCTextField.prototype.getDefaultFoundation = function () {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
    var adapter = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, this.getRootAdapterMethods_()), this.getInputAdapterMethods_()), this.getLabelAdapterMethods_()), this.getLineRippleAdapterMethods_()), this.getOutlineAdapterMethods_()); // tslint:enable:object-literal-sort-keys

    return new _foundation3.MDCTextFieldFoundation(adapter, this.getFoundationMap_());
  };

  MDCTextField.prototype.getRootAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      registerTextFieldInteractionHandler: function (evtType, handler) {
        _this.listen(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function (evtType, handler) {
        _this.unlisten(evtType, handler);
      },
      registerValidationAttributeChangeHandler: function (handler) {
        var getAttributesList = function (mutationsList) {
          return mutationsList.map(function (mutation) {
            return mutation.attributeName;
          }).filter(function (attributeName) {
            return attributeName;
          });
        };

        var observer = new MutationObserver(function (mutationsList) {
          return handler(getAttributesList(mutationsList));
        });
        var config = {
          attributes: true
        };
        observer.observe(_this.input_, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: function (observer) {
        observer.disconnect();
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCTextField.prototype.getInputAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      getNativeInput: function () {
        return _this.input_;
      },
      setInputAttr: function (attr, value) {
        _this.input_.setAttribute(attr, value);
      },
      removeInputAttr: function (attr) {
        _this.input_.removeAttribute(attr);
      },
      isFocused: function () {
        return document.activeElement === _this.input_;
      },
      registerInputInteractionHandler: function (evtType, handler) {
        _this.input_.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterInputInteractionHandler: function (evtType, handler) {
        _this.input_.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCTextField.prototype.getLabelAdapterMethods_ = function () {
    var _this = this;

    return {
      floatLabel: function (shouldFloat) {
        return _this.label_ && _this.label_.float(shouldFloat);
      },
      getLabelWidth: function () {
        return _this.label_ ? _this.label_.getWidth() : 0;
      },
      hasLabel: function () {
        return Boolean(_this.label_);
      },
      shakeLabel: function (shouldShake) {
        return _this.label_ && _this.label_.shake(shouldShake);
      },
      setLabelRequired: function (isRequired) {
        return _this.label_ && _this.label_.setRequired(isRequired);
      }
    };
  };

  MDCTextField.prototype.getLineRippleAdapterMethods_ = function () {
    var _this = this;

    return {
      activateLineRipple: function () {
        if (_this.lineRipple_) {
          _this.lineRipple_.activate();
        }
      },
      deactivateLineRipple: function () {
        if (_this.lineRipple_) {
          _this.lineRipple_.deactivate();
        }
      },
      setLineRippleTransformOrigin: function (normalizedX) {
        if (_this.lineRipple_) {
          _this.lineRipple_.setRippleCenter(normalizedX);
        }
      }
    };
  };

  MDCTextField.prototype.getOutlineAdapterMethods_ = function () {
    var _this = this;

    return {
      closeOutline: function () {
        return _this.outline_ && _this.outline_.closeNotch();
      },
      hasOutline: function () {
        return Boolean(_this.outline_);
      },
      notchOutline: function (labelWidth) {
        return _this.outline_ && _this.outline_.notch(labelWidth);
      }
    };
  };
  /**
   * @return A map of all subcomponents to subfoundations.
   */


  MDCTextField.prototype.getFoundationMap_ = function () {
    return {
      characterCounter: this.characterCounter_ ? this.characterCounter_.foundationForTextField : undefined,
      helperText: this.helperText_ ? this.helperText_.foundationForTextField : undefined,
      leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundationForTextField : undefined,
      trailingIcon: this.trailingIcon_ ? this.trailingIcon_.foundationForTextField : undefined
    };
  };

  MDCTextField.prototype.createRipple_ = function (rippleFactory) {
    var _this = this;

    var isTextArea = this.root.classList.contains(_constants.cssClasses.TEXTAREA);
    var isOutlined = this.root.classList.contains(_constants.cssClasses.OUTLINED);

    if (isTextArea || isOutlined) {
      return null;
    } // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = (0, _tslib.__assign)((0, _tslib.__assign)({}, _component5.MDCRipple.createAdapter(this)), {
      isSurfaceActive: function () {
        return ponyfill.matches(_this.input_, ':active');
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.input_.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.input_.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      }
    }); // tslint:enable:object-literal-sort-keys

    return rippleFactory(this.root, new _foundation.MDCRippleFoundation(adapter));
  };

  return MDCTextField;
}(_component.MDCComponent);

exports.MDCTextField = MDCTextField;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/events":"../../../node_modules/@material/dom/events.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","@material/floating-label/component":"../../../node_modules/@material/floating-label/component.js","@material/line-ripple/component":"../../../node_modules/@material/line-ripple/component.js","@material/notched-outline/component":"../../../node_modules/@material/notched-outline/component.js","@material/ripple/component":"../../../node_modules/@material/ripple/component.js","@material/ripple/foundation":"../../../node_modules/@material/ripple/foundation.js","./character-counter/component":"../../../node_modules/@material/textfield/character-counter/component.js","./character-counter/foundation":"../../../node_modules/@material/textfield/character-counter/foundation.js","./constants":"../../../node_modules/@material/textfield/constants.js","./foundation":"../../../node_modules/@material/textfield/foundation.js","./helper-text/component":"../../../node_modules/@material/textfield/helper-text/component.js","./helper-text/foundation":"../../../node_modules/@material/textfield/helper-text/foundation.js","./icon/component":"../../../node_modules/@material/textfield/icon/component.js"}],"../../../node_modules/@material/menu-surface/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = exports.CornerBit = exports.Corner = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ANCHOR: 'mdc-menu-surface--anchor',
  ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
  ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
  FIXED: 'mdc-menu-surface--fixed',
  IS_OPEN_BELOW: 'mdc-menu-surface--is-open-below',
  OPEN: 'mdc-menu-surface--open',
  ROOT: 'mdc-menu-surface'
}; // tslint:disable:object-literal-sort-keys

exports.cssClasses = cssClasses;
var strings = {
  CLOSED_EVENT: 'MDCMenuSurface:closed',
  CLOSING_EVENT: 'MDCMenuSurface:closing',
  OPENED_EVENT: 'MDCMenuSurface:opened',
  FOCUSABLE_ELEMENTS: ['button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)', 'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(', ')
}; // tslint:enable:object-literal-sort-keys

exports.strings = strings;
var numbers = {
  /** Total duration of menu-surface open animation. */
  TRANSITION_OPEN_DURATION: 120,

  /** Total duration of menu-surface close animation. */
  TRANSITION_CLOSE_DURATION: 75,

  /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. Also used as a viewport margin. */
  MARGIN_TO_EDGE: 32,

  /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */

exports.numbers = numbers;
var CornerBit;
exports.CornerBit = CornerBit;

(function (CornerBit) {
  CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
  CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
  CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
  CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (exports.CornerBit = CornerBit = {}));
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */


var Corner;
exports.Corner = Corner;

(function (Corner) {
  Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner[Corner["TOP_START"] = 8] = "TOP_START";
  Corner[Corner["TOP_END"] = 12] = "TOP_END";
  Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (exports.Corner = Corner = {}));
},{}],"../../../node_modules/@material/list/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.evolutionClassNameMap = exports.evolutionAttribute = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a;

var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
  LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
  ROOT: 'mdc-list'
};
exports.cssClasses = cssClasses;
var strings = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
  ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: 'button:not(:disabled), a',
  FOCUSABLE_CHILD_ELEMENTS: 'button:not(:disabled), a, input[type="radio"]:not(:disabled), input[type="checkbox"]:not(:disabled)',
  RADIO_SELECTOR: 'input[type="radio"]',
  SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
exports.strings = strings;
var numbers = {
  UNSET_INDEX: -1,
  TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
exports.numbers = numbers;
var evolutionClassNameMap = (_a = {}, _a["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-evolution-list-item--activated', _a["" + cssClasses.LIST_ITEM_CLASS] = 'mdc-evolution-list-item', _a["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = 'mdc-evolution-list-item--disabled', _a["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = 'mdc-evolution-list-item--selected', _a["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-evolution-list-item__primary-text', _a["" + cssClasses.ROOT] = 'mdc-evolution-list', _a);
exports.evolutionClassNameMap = evolutionClassNameMap;
var evolutionAttribute = 'evolution';
exports.evolutionAttribute = evolutionAttribute;
},{}],"../../../node_modules/@material/dom/keyboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEY = void 0;
exports.isNavigationEvent = isNavigationEvent;
exports.normalizeKey = normalizeKey;

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * KEY provides normalized string values for keys.
 */
var KEY = {
  UNKNOWN: 'Unknown',
  BACKSPACE: 'Backspace',
  ENTER: 'Enter',
  SPACEBAR: 'Spacebar',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  HOME: 'Home',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  DELETE: 'Delete',
  ESCAPE: 'Escape'
};
exports.KEY = KEY;
var normalizedKeys = new Set(); // IE11 has no support for new Map with iterable so we need to initialize this
// by hand.

normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
var KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  DELETE: 46,
  ESCAPE: 27
};
var mappedKeyCodes = new Map(); // IE11 has no support for new Map with iterable so we need to initialize this
// by hand.

mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
var navigationKeys = new Set(); // IE11 has no support for new Set with iterable so we need to initialize this
// by hand.

navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
/**
 * normalizeKey returns the normalized string for a navigational action.
 */

function normalizeKey(evt) {
  var key = evt.key; // If the event already has a normalized key, return it

  if (normalizedKeys.has(key)) {
    return key;
  } // tslint:disable-next-line:deprecation


  var mappedKey = mappedKeyCodes.get(evt.keyCode);

  if (mappedKey) {
    return mappedKey;
  }

  return KEY.UNKNOWN;
}
/**
 * isNavigationEvent returns whether the event is a navigation event
 */


function isNavigationEvent(evt) {
  return navigationKeys.has(normalizeKey(evt));
}
},{}],"../../../node_modules/@material/list/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventDefaultEvent = void 0;

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
/**
 * Ensures that preventDefault is only called if the containing element
 * doesn't consume the event, and it will cause an unintended scroll.
 *
 * @param evt keyboard event to be prevented.
 */

var preventDefaultEvent = function (evt) {
  var target = evt.target;

  if (!target) {
    return;
  }

  var tagName = ("" + target.tagName).toLowerCase();

  if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
    evt.preventDefault();
  }
};

exports.preventDefaultEvent = preventDefaultEvent;
},{}],"../../../node_modules/@material/list/typeahead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearBuffer = clearBuffer;
exports.handleKeydown = handleKeydown;
exports.initSortedIndex = initSortedIndex;
exports.initState = initState;
exports.isTypingInProgress = isTypingInProgress;
exports.matchItem = matchItem;

var _keyboard = require("@material/dom/keyboard");

var _constants = require("./constants");

var _events = require("./events");

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Initializes a state object for typeahead. Use the same reference for calls to
 * typeahead functions.
 *
 * @return The current state of the typeahead process. Each state reference
 *     represents a typeahead instance as the reference is typically mutated
 *     in-place.
 */
function initState() {
  var state = {
    bufferClearTimeout: 0,
    currentFirstChar: '',
    sortedIndexCursor: 0,
    typeaheadBuffer: ''
  };
  return state;
}
/**
 * Initializes typeahead state by indexing the current list items by primary
 * text into the sortedIndexByFirstChar data structure.
 *
 * @param listItemCount numer of items in the list
 * @param getPrimaryTextByItemIndex function that returns the primary text at a
 *     given index
 *
 * @return Map that maps the first character of the primary text to the full
 *     list text and it's index
 */


function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
  var sortedIndexByFirstChar = new Map(); // Aggregate item text to index mapping

  for (var i = 0; i < listItemCount; i++) {
    var primaryText = getPrimaryTextByItemIndex(i).trim();

    if (!primaryText) {
      continue;
    }

    var firstChar = primaryText[0].toLowerCase();

    if (!sortedIndexByFirstChar.has(firstChar)) {
      sortedIndexByFirstChar.set(firstChar, []);
    }

    sortedIndexByFirstChar.get(firstChar).push({
      text: primaryText.toLowerCase(),
      index: i
    });
  } // Sort the mapping
  // TODO(b/157162694): Investigate replacing forEach with Map.values()


  sortedIndexByFirstChar.forEach(function (values) {
    values.sort(function (first, second) {
      return first.index - second.index;
    });
  });
  return sortedIndexByFirstChar;
}
/**
 * Given the next desired character from the user, it attempts to find the next
 * list option matching the buffer. Wraps around if at the end of options.
 *
 * @param opts Options and accessors
 *   - nextChar - the next character to match against items
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - skipFocus - whether or not to focus the matched item
 *   - isItemAtIndexDisabled - function that determines whether an item at a
 *        given index is disabled
 * @param state The typeahead state instance. See `initState`.
 *
 * @return The index of the matched item, or -1 if no match.
 */


function matchItem(opts, state) {
  var nextChar = opts.nextChar,
      focusItemAtIndex = opts.focusItemAtIndex,
      sortedIndexByFirstChar = opts.sortedIndexByFirstChar,
      focusedItemIndex = opts.focusedItemIndex,
      skipFocus = opts.skipFocus,
      isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  clearTimeout(state.bufferClearTimeout);
  state.bufferClearTimeout = setTimeout(function () {
    clearBuffer(state);
  }, _constants.numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
  state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
  var index;

  if (state.typeaheadBuffer.length === 1) {
    index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
  } else {
    index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
  }

  if (index !== -1 && !skipFocus) {
    focusItemAtIndex(index);
  }

  return index;
}
/**
 * Matches the user's single input character in the buffer to the
 * next option that begins with such character. Wraps around if at
 * end of options. Returns -1 if no match is found.
 */


function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);

  if (!itemsMatchingFirstChar) {
    return -1;
  } // Has the same firstChar been recently matched?
  // Also, did starting index remain the same between key presses?
  // If both hold true, simply increment index.


  if (firstChar === state.currentFirstChar && itemsMatchingFirstChar[state.sortedIndexCursor].index === focusedItemIndex) {
    state.sortedIndexCursor = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;

    if (!isItemAtIndexDisabled(newIndex)) {
      return newIndex;
    }
  } // If we're here, it means one of the following happened:
  // - either firstChar or startingIndex has changed, invalidating the
  // cursor.
  // - The next item of typeahead is disabled, so we have to look further.


  state.currentFirstChar = firstChar;
  var newCursorPosition = -1;
  var cursorPosition; // Find the first non-disabled item as a fallback.

  for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  } // Advance cursor to first item matching the firstChar that is positioned
  // after starting item. Cursor is unchanged from fallback if there's no
  // such item.


  for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex && !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }

  if (newCursorPosition !== -1) {
    state.sortedIndexCursor = newCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }

  return -1;
}
/**
 * Attempts to find the next item that matches all of the typeahead buffer.
 * Wraps around if at end of options. Returns -1 if no match is found.
 */


function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);

  if (!itemsMatchingFirstChar) {
    return -1;
  } // Do nothing if text already matches


  var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];

  if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 && !isItemAtIndexDisabled(startingItem.index)) {
    return startingItem.index;
  } // Find next item that matches completely; if no match, we'll eventually
  // loop around to same position


  var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
  var nextCursorPosition = -1;

  while (cursorPosition !== state.sortedIndexCursor) {
    var currentItem = itemsMatchingFirstChar[cursorPosition];
    var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
    var isEnabled = !isItemAtIndexDisabled(currentItem.index);

    if (matches && isEnabled) {
      nextCursorPosition = cursorPosition;
      break;
    }

    cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
  }

  if (nextCursorPosition !== -1) {
    state.sortedIndexCursor = nextCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }

  return -1;
}
/**
 * Whether or not the given typeahead instaance state is currently typing.
 *
 * @param state The typeahead state instance. See `initState`.
 */


function isTypingInProgress(state) {
  return state.typeaheadBuffer.length > 0;
}
/**
 * Clears the typeahaed buffer so that it resets item matching to the first
 * character.
 *
 * @param state The typeahead state instance. See `initState`.
 */


function clearBuffer(state) {
  state.typeaheadBuffer = '';
}
/**
 * Given a keydown event, it calculates whether or not to automatically focus a
 * list item depending on what was typed mimicing the typeahead functionality of
 * a standard <select> element that is open.
 *
 * @param opts Options and accessors
 *   - event - the KeyboardEvent to handle and parse
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
 *      is disabled
 *   - isTargetListItem - whether or not the event target is a list item
 * @param state The typeahead state instance. See `initState`.
 *
 * @returns index of the item matched by the keydown. -1 if not matched.
 */


function handleKeydown(opts, state) {
  var event = opts.event,
      isTargetListItem = opts.isTargetListItem,
      focusedItemIndex = opts.focusedItemIndex,
      focusItemAtIndex = opts.focusItemAtIndex,
      sortedIndexByFirstChar = opts.sortedIndexByFirstChar,
      isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  var isArrowLeft = (0, _keyboard.normalizeKey)(event) === 'ArrowLeft';
  var isArrowUp = (0, _keyboard.normalizeKey)(event) === 'ArrowUp';
  var isArrowRight = (0, _keyboard.normalizeKey)(event) === 'ArrowRight';
  var isArrowDown = (0, _keyboard.normalizeKey)(event) === 'ArrowDown';
  var isHome = (0, _keyboard.normalizeKey)(event) === 'Home';
  var isEnd = (0, _keyboard.normalizeKey)(event) === 'End';
  var isEnter = (0, _keyboard.normalizeKey)(event) === 'Enter';
  var isSpace = (0, _keyboard.normalizeKey)(event) === 'Spacebar';

  if (isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
    return -1;
  }

  var isCharacterKey = !isSpace && event.key.length === 1;

  if (isCharacterKey) {
    (0, _events.preventDefaultEvent)(event);
    var matchItemOpts = {
      focusItemAtIndex: focusItemAtIndex,
      focusedItemIndex: focusedItemIndex,
      nextChar: event.key.toLowerCase(),
      sortedIndexByFirstChar: sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled: isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }

  if (!isSpace) {
    return -1;
  }

  if (isTargetListItem) {
    (0, _events.preventDefaultEvent)(event);
  }

  var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);

  if (typeaheadOnListItem) {
    var matchItemOpts = {
      focusItemAtIndex: focusItemAtIndex,
      focusedItemIndex: focusedItemIndex,
      nextChar: ' ',
      sortedIndexByFirstChar: sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled: isItemAtIndexDisabled
    }; // space participates in typeahead matching if in rapid typing mode

    return matchItem(matchItemOpts, state);
  }

  return -1;
}
},{"@material/dom/keyboard":"../../../node_modules/@material/dom/keyboard.js","./constants":"../../../node_modules/@material/list/constants.js","./events":"../../../node_modules/@material/list/events.js"}],"../../../node_modules/@material/list/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCListFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _keyboard = require("@material/dom/keyboard");

var _constants = require("./constants");

var _events = require("./events");

var typeahead = _interopRequireWildcard(require("./typeahead"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// TODO(b/152410470): Remove trailing underscores from private properties
// tslint:disable:strip-private-property-underscore
function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCListFoundation.defaultAdapter), adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = _constants.numbers.UNSET_INDEX;
    _this.focusedItemIndex = _constants.numbers.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.useSelectedAttr_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    _this.hasTypeahead = false; // Transiently holds current typeahead prefix from user.

    _this.typeaheadState = typeahead.initState();
    _this.sortedIndexByFirstChar = new Map();
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClassForElementIndex: function () {
          return undefined;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        getAttributeForElementIndex: function () {
          return null;
        },
        getFocusedElementIndex: function () {
          return 0;
        },
        getListItemCount: function () {
          return 0;
        },
        hasCheckboxAtIndex: function () {
          return false;
        },
        hasRadioAtIndex: function () {
          return false;
        },
        isCheckboxCheckedAtIndex: function () {
          return false;
        },
        isFocusInsideList: function () {
          return false;
        },
        isRootFocused: function () {
          return false;
        },
        listItemAtIndexHasClass: function () {
          return false;
        },
        notifyAction: function () {
          return undefined;
        },
        removeClassForElementIndex: function () {
          return undefined;
        },
        setAttributeForElementIndex: function () {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function () {
          return undefined;
        },
        setTabIndexForListItemChildren: function () {
          return undefined;
        },
        getPrimaryTextAtIndex: function () {
          return '';
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter.getListItemCount() === 0) {
      return;
    } // TODO(b/172274142): consider all items when determining the list's type.


    if (this.adapter.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    } else {
      this.maybeInitializeSingleSelection();
    }

    if (this.hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;

    if (value) {
      this.maybeInitializeSingleSelection();
    }
  };
  /**
   * Automatically determines whether the list is single selection list. If so,
   * initializes the internal state to match the selected item.
   */


  MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
    var listItemsCount = this.adapter.getListItemCount();

    for (var i = 0; i < listItemsCount; i++) {
      var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_SELECTED_CLASS);
      var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS);

      if (!(hasSelectedClass || hasActivatedClass)) {
        continue;
      }

      if (hasActivatedClass) {
        this.setUseActivatedClass(true);
      }

      this.isSingleSelectionList_ = true;
      this.selectedIndex_ = i;
      return;
    }
  };
  /**
   * Sets whether typeahead is enabled on the list.
   * @param hasTypeahead Whether typeahead is enabled.
   */


  MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
    this.hasTypeahead = hasTypeahead;

    if (hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  /**
   * @return Whether typeahead is currently matching a user-specified prefix.
   */


  MDCListFoundation.prototype.isTypeaheadInProgress = function () {
    return this.hasTypeahead && typeahead.isTypingInProgress(this.typeaheadState);
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };
  /**
   * Sets the useSelectedAttr_ private variable.
   */


  MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
    this.useSelectedAttr_ = useSelected;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.focusedItemIndex = listItemIndex;
      this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
      this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
      this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any
     * element. Setting a delay to wait till the focus is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedOrFocusedItem();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
    var _this = this;

    var isArrowLeft = (0, _keyboard.normalizeKey)(event) === 'ArrowLeft';
    var isArrowUp = (0, _keyboard.normalizeKey)(event) === 'ArrowUp';
    var isArrowRight = (0, _keyboard.normalizeKey)(event) === 'ArrowRight';
    var isArrowDown = (0, _keyboard.normalizeKey)(event) === 'ArrowDown';
    var isHome = (0, _keyboard.normalizeKey)(event) === 'Home';
    var isEnd = (0, _keyboard.normalizeKey)(event) === 'End';
    var isEnter = (0, _keyboard.normalizeKey)(event) === 'Enter';
    var isSpace = (0, _keyboard.normalizeKey)(event) === 'Spacebar'; // Have to check both upper and lower case, because having caps lock on affects the value.

    var isLetterA = event.key === 'A' || event.key === 'a';

    if (this.adapter.isRootFocused()) {
      if (isArrowUp || isEnd) {
        event.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        event.preventDefault();
        this.focusFirstElement();
      }

      if (this.hasTypeahead) {
        var handleKeydownOpts = {
          event: event,
          focusItemAtIndex: function (index) {
            _this.focusItemAtIndex(index);
          },
          focusedItemIndex: -1,
          isTargetListItem: isRootListItem,
          sortedIndexByFirstChar: this.sortedIndexByFirstChar,
          isItemAtIndexDisabled: function (index) {
            return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
          }
        };
        typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
      }

      return;
    }

    var currentIndex = this.adapter.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      (0, _events.preventDefaultEvent)(event);
      this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      (0, _events.preventDefaultEvent)(event);
      this.focusPrevElement(currentIndex);
    } else if (isHome) {
      (0, _events.preventDefaultEvent)(event);
      this.focusFirstElement();
    } else if (isEnd) {
      (0, _events.preventDefaultEvent)(event);
      this.focusLastElement();
    } else if (isLetterA && event.ctrlKey && this.isCheckboxList_) {
      event.preventDefault();
      this.toggleAll(this.selectedIndex_ === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex_);
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers
        // synthetic MouseEvent event.
        var target = event.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        (0, _events.preventDefaultEvent)(event);

        if (this.adapter.listItemAtIndexHasClass(currentIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS)) {
          return;
        }

        if (!this.isTypeaheadInProgress()) {
          if (this.isSelectableList_()) {
            this.setSelectedIndexOnAction_(currentIndex);
          }

          this.adapter.notifyAction(currentIndex);
        }
      }
    }

    if (this.hasTypeahead) {
      var handleKeydownOpts = {
        event: event,
        focusItemAtIndex: function (index) {
          _this.focusItemAtIndex(index);
        },
        focusedItemIndex: this.focusedItemIndex,
        isTargetListItem: isRootListItem,
        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
        isItemAtIndexDisabled: function (index) {
          return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
        }
      };
      typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === _constants.numbers.UNSET_INDEX) {
      return;
    }

    if (this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS)) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter.notifyAction(index);
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter.getListItemCount() - 1;
    this.focusItemAtIndex(lastIndex);
    return lastIndex;
  };

  MDCListFoundation.prototype.focusInitialElement = function () {
    var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.focusItemAtIndex(initialIndex);
    return initialIndex;
  };
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }

    if (isEnabled) {
      this.adapter.removeClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'false');
    } else {
      this.adapter.addClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'true');
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = _constants.cssClasses.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.setAriaForSingleSelectionAtIndex_(index);
    this.setTabindexAtIndex(index);

    if (index !== _constants.numbers.UNSET_INDEX) {
      this.adapter.addClassForElementIndex(index, selectedClassName);
    }

    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list
    // initialization when it is in unset state.
    if (this.selectedIndex_ === _constants.numbers.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter.getAttributeForElementIndex(index, _constants.strings.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? _constants.strings.ARIA_CURRENT : _constants.strings.ARIA_SELECTED;

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    if (index !== _constants.numbers.UNSET_INDEX) {
      var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
      this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    }
  };
  /**
   * Returns the attribute to use for indicating selection status.
   */


  MDCListFoundation.prototype.getSelectionAttribute = function () {
    return this.useSelectedAttr_ ? _constants.strings.ARIA_SELECTED : _constants.strings.ARIA_CHECKED;
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it
   * is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    var selectionAttribute = this.getSelectionAttribute();
    this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, selectionAttribute, 'false');
    }

    this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    var selectionAttribute = this.getSelectionAttribute();

    for (var i = 0; i < this.adapter.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
    if (this.focusedItemIndex === _constants.numbers.UNSET_INDEX && index !== 0) {
      // If some list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no
      // preselected items.
      this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
      this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
    } // Set the previous selection's tabindex to -1. We need this because
    // in selection menus that are not visible, programmatically setting an
    // option will not change focus but will change where tabindex should be 0.


    if (!(this.selectedIndex_ instanceof Array) && this.selectedIndex_ !== index) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', '-1');
    }

    if (index !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
    }
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio
   *     list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
    var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.setTabindexAtIndex(targetIndex);
  };

  MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
    var targetIndex = this.focusedItemIndex >= 0 ? this.focusedItemIndex : 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    return targetIndex;
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
      }

      return this.isIndexInRange_(index) || this.isSingleSelectionList_ && index === _constants.numbers.UNSET_INDEX;
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter.getListItemCount();
    return index >= 0 && index < listSize;
  };
  /**
   * Sets selected index on user action, toggles checkbox / radio based on
   * toggleCheckbox value. User interaction should not toggle list item(s) when
   * disabled.
   */


  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var selectionAttribute = this.getSelectionAttribute();
    var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not
    // initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  MDCListFoundation.prototype.focusItemAtIndex = function (index) {
    this.adapter.focusItemAtIndex(index);
    this.focusedItemIndex = index;
  };

  MDCListFoundation.prototype.toggleAll = function (currentlySelectedIndexes) {
    var count = this.adapter.getListItemCount(); // If all items are selected, deselect everything.

    if (currentlySelectedIndexes.length === count) {
      this.setCheckboxAtIndex_([]);
    } else {
      // Otherwise select all enabled options.
      var allIndexes = [];

      for (var i = 0; i < count; i++) {
        if (!this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS) || currentlySelectedIndexes.indexOf(i) > -1) {
          allIndexes.push(i);
        }
      }

      this.setCheckboxAtIndex_(allIndexes);
    }
  };
  /**
   * Given the next desired character from the user, adds it to the typeahead
   * buffer. Then, attempts to find the next option matching the buffer. Wraps
   * around if at the end of options.
   *
   * @param nextChar The next character to add to the prefix buffer.
   * @param startingIndex The index from which to start matching. Only relevant
   *     when starting a new match sequence. To start a new match sequence,
   *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
   *     to clear after a set interval defined in list foundation. Defaults to
   *     the currently focused index.
   * @return The index of the matched item, or -1 if no match.
   */


  MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
    var _this = this;

    if (skipFocus === void 0) {
      skipFocus = false;
    }

    var opts = {
      focusItemAtIndex: function (index) {
        _this.focusItemAtIndex(index);
      },
      focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
      nextChar: nextChar,
      sortedIndexByFirstChar: this.sortedIndexByFirstChar,
      skipFocus: skipFocus,
      isItemAtIndexDisabled: function (index) {
        return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      }
    };
    return typeahead.matchItem(opts, this.typeaheadState);
  };
  /**
   * Initializes the MDCListTextAndIndex data structure by indexing the current
   * list items by primary text.
   *
   * @return The primary texts of all the list items sorted by first character.
   */


  MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
    return typeahead.initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
  };
  /**
   * Clears the typeahead buffer.
   */


  MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
    typeahead.clearBuffer(this.typeaheadState);
  };

  return MDCListFoundation;
}(_foundation.MDCFoundation);

exports.MDCListFoundation = MDCListFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCListFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","@material/dom/keyboard":"../../../node_modules/@material/dom/keyboard.js","./constants":"../../../node_modules/@material/list/constants.js","./events":"../../../node_modules/@material/list/events.js","./typeahead":"../../../node_modules/@material/list/typeahead.js"}],"../../../node_modules/@material/list/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCList = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _ponyfill = require("@material/dom/ponyfill");

var _constants = require("./constants");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCList =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function (value) {
      this.foundation.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function () {
      return Array.from(this.root.querySelectorAll("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function (value) {
      this.foundation.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "typeaheadInProgress", {
    /**
     * @return Whether typeahead is currently matching a user-specified prefix.
     */
    get: function () {
      return this.foundation.isTypeaheadInProgress();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "hasTypeahead", {
    /**
     * Sets whether typeahead functionality is enabled on the list.
     * @param hasTypeahead Whether typeahead is enabled.
     */
    set: function (hasTypeahead) {
      this.foundation.setHasTypeahead(hasTypeahead);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function (isSingleSelectionList) {
      this.foundation.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function () {
      return this.foundation.getSelectedIndex();
    },
    set: function (index) {
      this.foundation.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.isEvolutionEnabled = _constants.evolutionAttribute in this.root.dataset;
    this.classNameMap = this.isEvolutionEnabled ? _constants.evolutionClassNameMap : Object.values(_constants.cssClasses).reduce(function (obj, className) {
      obj[className] = className;
      return obj;
    }, {});
    this.handleClick = this.handleClickEvent.bind(this);
    this.handleKeydown = this.handleKeydownEvent.bind(this);
    this.focusInEventListener = this.handleFocusInEvent.bind(this);
    this.focusOutEventListener = this.handleFocusOutEvent.bind(this);
    this.listen('keydown', this.handleKeydown);
    this.listen('click', this.handleClick);
    this.listen('focusin', this.focusInEventListener);
    this.listen('focusout', this.focusOutEventListener);
    this.layout();
    this.initializeListType();
    this.ensureFocusable();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown);
    this.unlisten('click', this.handleClick);
    this.unlisten('focusin', this.focusInEventListener);
    this.unlisten('focusout', this.focusOutEventListener);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root.getAttribute(_constants.strings.ARIA_ORIENTATION);
    this.vertical = direction !== _constants.strings.ARIA_ORIENTATION_HORIZONTAL;
    var itemSelector = "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not([tabindex])";
    var childSelector = "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + " " + _constants.strings.FOCUSABLE_CHILD_ELEMENTS; // List items need to have at least tabindex=-1 to be focusable.

    Array.prototype.forEach.call(this.root.querySelectorAll(itemSelector), function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    Array.prototype.forEach.call(this.root.querySelectorAll(childSelector), function (el) {
      el.setAttribute('tabindex', '-1');
    });

    if (this.isEvolutionEnabled) {
      this.foundation.setUseSelectedAttribute(true);
    }

    this.foundation.layout();
  };
  /**
   * Extracts the primary text from a list item.
   * @param item The list item element.
   * @return The primary text in the element.
   */


  MDCList.prototype.getPrimaryText = function (item) {
    var _a;

    var primaryText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS]);

    if (this.isEvolutionEnabled || primaryText) {
      return (_a = primaryText === null || primaryText === void 0 ? void 0 : primaryText.textContent) !== null && _a !== void 0 ? _a : '';
    }

    var singleLineText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_TEXT_CLASS]);
    return singleLineText && singleLineText.textContent || '';
  };
  /**
   * Initialize selectedIndex value based on pre-selected list items.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    this.isInteractive = (0, _ponyfill.matches)(this.root, _constants.strings.ARIA_INTERACTIVE_ROLES_SELECTOR);

    if (this.isEvolutionEnabled && this.isInteractive) {
      var selection = Array.from(this.root.querySelectorAll(_constants.strings.SELECTED_ITEM_SELECTOR), function (listItem) {
        return _this.listElements.indexOf(listItem);
      });

      if ((0, _ponyfill.matches)(this.root, _constants.strings.ARIA_MULTI_SELECTABLE_SELECTOR)) {
        this.selectedIndex = selection;
      } else if (selection.length > 0) {
        this.selectedIndex = selection[0];
      }

      return;
    }

    var checkboxListItems = this.root.querySelectorAll(_constants.strings.ARIA_ROLE_CHECKBOX_SELECTOR);
    var radioSelectedListItem = this.root.querySelector(_constants.strings.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root.querySelectorAll(_constants.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = Array.from(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  /**
   * Updates the list item at itemIndex to the desired isEnabled state.
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
    this.foundation.setEnabled(itemIndex, isEnabled);
  };
  /**
   * Given the next desired character from the user, adds it to the typeahead
   * buffer. Then, attempts to find the next option matching the buffer. Wraps
   * around if at the end of options.
   *
   * @param nextChar The next character to add to the prefix buffer.
   * @param startingIndex The index from which to start matching. Defaults to
   *     the currently focused index.
   * @return The index of the matched item.
   */


  MDCList.prototype.typeaheadMatchItem = function (nextChar, startingIndex) {
    return this.foundation.typeaheadMatchItem(nextChar, startingIndex,
    /** skipFocus */
    true);
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take
    // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
    // methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(_this.classNameMap[className]);
        }
      },
      focusItemAtIndex: function (index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function (index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function () {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function () {
        return _this.listElements.length;
      },
      getPrimaryTextAtIndex: function (index) {
        return _this.getPrimaryText(_this.listElements[index]);
      },
      hasCheckboxAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function (index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function () {
        return _this.root !== document.activeElement && _this.root.contains(document.activeElement);
      },
      isRootFocused: function () {
        return document.activeElement === _this.root;
      },
      listItemAtIndexHasClass: function (index, className) {
        return _this.listElements[index].classList.contains(_this.classNameMap[className]);
      },
      notifyAction: function (index) {
        _this.emit(_constants.strings.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(_this.classNameMap[className]);
        }
      },
      setAttributeForElementIndex: function (index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var selector = "." + _this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + " " + _constants.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
        Array.prototype.forEach.call(element.querySelectorAll(selector), function (el) {
          el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new _foundation.MDCListFoundation(adapter);
  };
  /**
   * Ensures that at least one item is focusable if the list is interactive and
   * doesn't specify a suitable tabindex.
   */


  MDCList.prototype.ensureFocusable = function () {
    if (this.isEvolutionEnabled && this.isInteractive) {
      if (!this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + "[tabindex=\"0\"]")) {
        var index = this.initialFocusIndex();

        if (index !== -1) {
          this.listElements[index].tabIndex = 0;
        }
      }
    }
  };

  MDCList.prototype.initialFocusIndex = function () {
    if (this.selectedIndex instanceof Array && this.selectedIndex.length > 0) {
      return this.selectedIndex[0];
    }

    if (typeof this.selectedIndex === 'number' && this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      return this.selectedIndex;
    }

    var el = this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not(." + this.classNameMap[_constants.cssClasses.LIST_ITEM_DISABLED_CLASS] + ")");

    if (el === null) {
      return -1;
    }

    return this.getListItemIndex(el);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1
   * if there is no list item
   */


  MDCList.prototype.getListItemIndex = function (el) {
    var nearestParent = (0, _ponyfill.closest)(el, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ", ." + this.classNameMap[_constants.cssClasses.ROOT]); // Get the index of the element if it is a list item.

    if (nearestParent && (0, _ponyfill.matches)(nearestParent, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS])) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleFocusInEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleFocusOutEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred
   * before sending the event to the foundation.
   */


  MDCList.prototype.handleKeydownEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target;
    this.foundation.handleKeydown(evt, target.classList.contains(this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleClickEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the
    // checkbox will have 2 change events.

    var toggleCheckbox = !(0, _ponyfill.matches)(target, _constants.strings.CHECKBOX_RADIO_SELECTOR);
    this.foundation.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(_component.MDCComponent);

exports.MDCList = MDCList;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","./constants":"../../../node_modules/@material/list/constants.js","./foundation":"../../../node_modules/@material/list/foundation.js"}],"../../../node_modules/@material/menu-surface/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCMenuSurfaceFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCMenuSurfaceFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCMenuSurfaceFoundation, _super);

  function MDCMenuSurfaceFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCMenuSurfaceFoundation.defaultAdapter), adapter)) || this;

    _this.isSurfaceOpen = false;
    _this.isQuickOpen = false;
    _this.isHoistedElement = false;
    _this.isFixedPosition = false;
    _this.openAnimationEndTimerId = 0;
    _this.closeAnimationEndTimerId = 0;
    _this.animationRequestId = 0;
    _this.anchorCorner = _constants.Corner.TOP_START;
    /**
     * Corner of the menu surface to which menu surface is attached to anchor.
     *
     *  Anchor corner --->+----------+
     *                    |  ANCHOR  |
     *                    +----------+
     *  Origin corner --->+--------------+
     *                    |              |
     *                    |              |
     *                    | MENU SURFACE |
     *                    |              |
     *                    |              |
     *                    +--------------+
     */

    _this.originCorner = _constants.Corner.TOP_START;
    _this.anchorMargin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    _this.position = {
      x: 0,
      y: 0
    };
    return _this;
  }

  Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
    get: function () {
      return _constants.Corner;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        hasAnchor: function () {
          return false;
        },
        isElementInContainer: function () {
          return false;
        },
        isFocused: function () {
          return false;
        },
        isRtl: function () {
          return false;
        },
        getInnerDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getAnchorDimensions: function () {
          return null;
        },
        getWindowDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getBodyDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getWindowScroll: function () {
          return {
            x: 0,
            y: 0
          };
        },
        setPosition: function () {
          return undefined;
        },
        setMaxHeight: function () {
          return undefined;
        },
        setTransformOrigin: function () {
          return undefined;
        },
        saveFocus: function () {
          return undefined;
        },
        restoreFocus: function () {
          return undefined;
        },
        notifyClose: function () {
          return undefined;
        },
        notifyOpen: function () {
          return undefined;
        },
        notifyClosing: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuSurfaceFoundation.prototype.init = function () {
    var _a = MDCMenuSurfaceFoundation.cssClasses,
        ROOT = _a.ROOT,
        OPEN = _a.OPEN;

    if (!this.adapter.hasClass(ROOT)) {
      throw new Error(ROOT + " class required in root element.");
    }

    if (this.adapter.hasClass(OPEN)) {
      this.isSurfaceOpen = true;
    }
  };

  MDCMenuSurfaceFoundation.prototype.destroy = function () {
    clearTimeout(this.openAnimationEndTimerId);
    clearTimeout(this.closeAnimationEndTimerId); // Cancel any currently running animations.

    cancelAnimationFrame(this.animationRequestId);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu surface corner.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
    this.anchorCorner = corner;
  };
  /**
   * Flip menu corner horizontally.
   */


  MDCMenuSurfaceFoundation.prototype.flipCornerHorizontally = function () {
    this.originCorner = this.originCorner ^ _constants.CornerBit.RIGHT;
  };
  /**
   * @param margin Set of margin values from anchor.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
    this.anchorMargin.top = margin.top || 0;
    this.anchorMargin.right = margin.right || 0;
    this.anchorMargin.bottom = margin.bottom || 0;
    this.anchorMargin.left = margin.left || 0;
  };
  /** Used to indicate if the menu-surface is hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
    this.isHoistedElement = isHoisted;
  };
  /** Used to set the menu-surface calculations based on a fixed position menu. */


  MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
    this.isFixedPosition = isFixedPosition;
  };
  /** Sets the menu-surface position on the page. */


  MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
    this.position.x = this.isFinite(x) ? x : 0;
    this.position.y = this.isFinite(y) ? y : 0;
  };

  MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
    this.isQuickOpen = quickOpen;
  };

  MDCMenuSurfaceFoundation.prototype.isOpen = function () {
    return this.isSurfaceOpen;
  };
  /**
   * Open the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.open = function () {
    var _this = this;

    if (this.isSurfaceOpen) {
      return;
    }

    this.adapter.saveFocus();

    if (this.isQuickOpen) {
      this.isSurfaceOpen = true;
      this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
      this.dimensions = this.adapter.getInnerDimensions();
      this.autoposition();
      this.adapter.notifyOpen();
    } else {
      this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
      this.animationRequestId = requestAnimationFrame(function () {
        _this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

        _this.dimensions = _this.adapter.getInnerDimensions();

        _this.autoposition();

        _this.openAnimationEndTimerId = setTimeout(function () {
          _this.openAnimationEndTimerId = 0;

          _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);

          _this.adapter.notifyOpen();
        }, _constants.numbers.TRANSITION_OPEN_DURATION);
      });
      this.isSurfaceOpen = true;
    }
  };
  /**
   * Closes the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.close = function (skipRestoreFocus) {
    var _this = this;

    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    if (!this.isSurfaceOpen) {
      return;
    }

    this.adapter.notifyClosing();

    if (this.isQuickOpen) {
      this.isSurfaceOpen = false;

      if (!skipRestoreFocus) {
        this.maybeRestoreFocus();
      }

      this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
      this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
      this.adapter.notifyClose();
      return;
    }

    this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
    requestAnimationFrame(function () {
      _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);

      _this.closeAnimationEndTimerId = setTimeout(function () {
        _this.closeAnimationEndTimerId = 0;

        _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);

        _this.adapter.notifyClose();
      }, _constants.numbers.TRANSITION_CLOSE_DURATION);
    });
    this.isSurfaceOpen = false;

    if (!skipRestoreFocus) {
      this.maybeRestoreFocus();
    }
  };
  /** Handle clicks and close if not within menu-surface element. */


  MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
    var el = evt.target;

    if (this.adapter.isElementInContainer(el)) {
      return;
    }

    this.close();
  };
  /** Handle keys that close the surface. */


  MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };

  MDCMenuSurfaceFoundation.prototype.autoposition = function () {
    var _a; // Compute measurements for autoposition methods reuse.


    this.measurements = this.getAutoLayoutmeasurements();
    var corner = this.getoriginCorner();
    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
    var verticalAlignment = this.hasBit(corner, _constants.CornerBit.BOTTOM) ? 'bottom' : 'top';
    var horizontalAlignment = this.hasBit(corner, _constants.CornerBit.RIGHT) ? 'right' : 'left';
    var horizontalOffset = this.getHorizontalOriginOffset(corner);
    var verticalOffset = this.getVerticalOriginOffset(corner);
    var _b = this.measurements,
        anchorSize = _b.anchorSize,
        surfaceSize = _b.surfaceSize;
    var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a); // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.

    if (anchorSize.width / surfaceSize.width > _constants.numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    } // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element


    if (this.isHoistedElement || this.isFixedPosition) {
      this.adjustPositionForHoistedElement(position);
    }

    this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
    this.adapter.setPosition(position);
    this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : ''); // If it is opened from the top then add is-open-below class

    if (!this.hasBit(corner, _constants.CornerBit.BOTTOM)) {
      this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
    }
  };
  /**
   * @return Measurements used to position menu surface popup.
   */


  MDCMenuSurfaceFoundation.prototype.getAutoLayoutmeasurements = function () {
    var anchorRect = this.adapter.getAnchorDimensions();
    var bodySize = this.adapter.getBodyDimensions();
    var viewportSize = this.adapter.getWindowDimensions();
    var windowScroll = this.adapter.getWindowScroll();

    if (!anchorRect) {
      // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
      anchorRect = {
        top: this.position.y,
        right: this.position.x,
        bottom: this.position.y,
        left: this.position.x,
        width: 0,
        height: 0
      }; // tslint:enable:object-literal-sort-keys
    }

    return {
      anchorSize: anchorRect,
      bodySize: bodySize,
      surfaceSize: this.dimensions,
      viewportDistance: {
        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        top: anchorRect.top,
        right: viewportSize.width - anchorRect.right,
        bottom: viewportSize.height - anchorRect.bottom,
        left: anchorRect.left
      },
      viewportSize: viewportSize,
      windowScroll: windowScroll
    };
  };
  /**
   * Computes the corner of the anchor from which to animate and position the
   * menu surface.
   *
   * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
   * context. E.g., menu surface will be positioned from right side on TOP_END.
   */


  MDCMenuSurfaceFoundation.prototype.getoriginCorner = function () {
    var corner = this.originCorner;
    var _a = this.measurements,
        viewportDistance = _a.viewportDistance,
        anchorSize = _a.anchorSize,
        surfaceSize = _a.surfaceSize;
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
    var isAnchoredToBottom = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
    var availableTop;
    var availableBottom;

    if (isAnchoredToBottom) {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
    } else {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE + anchorSize.height - this.anchorMargin.top;
    }

    var isAvailableBottom = availableBottom - surfaceSize.height > 0;

    if (!isAvailableBottom && availableTop > availableBottom) {
      // Attach bottom side of surface to the anchor.
      corner = this.setBit(corner, _constants.CornerBit.BOTTOM);
    }

    var isRtl = this.adapter.isRtl();
    var isFlipRtl = this.hasBit(this.anchorCorner, _constants.CornerBit.FLIP_RTL);
    var hasRightBit = this.hasBit(this.anchorCorner, _constants.CornerBit.RIGHT) || this.hasBit(corner, _constants.CornerBit.RIGHT); // Whether surface attached to right side of anchor element.

    var isAnchoredToRight = false; // Anchored to start

    if (isRtl && isFlipRtl) {
      isAnchoredToRight = !hasRightBit;
    } else {
      // Anchored to right
      isAnchoredToRight = hasRightBit;
    }

    var availableLeft;
    var availableRight;

    if (isAnchoredToRight) {
      availableLeft = viewportDistance.left + anchorSize.width + this.anchorMargin.right;
      availableRight = viewportDistance.right - this.anchorMargin.right;
    } else {
      availableLeft = viewportDistance.left + this.anchorMargin.left;
      availableRight = viewportDistance.right + anchorSize.width - this.anchorMargin.left;
    }

    var isAvailableLeft = availableLeft - surfaceSize.width > 0;
    var isAvailableRight = availableRight - surfaceSize.width > 0;
    var isOriginCornerAlignedToEnd = this.hasBit(corner, _constants.CornerBit.FLIP_RTL) && this.hasBit(corner, _constants.CornerBit.RIGHT);

    if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl || !isAvailableLeft && isOriginCornerAlignedToEnd) {
      // Attach left side of surface to the anchor.
      corner = this.unsetBit(corner, _constants.CornerBit.RIGHT);
    } else if (isAvailableLeft && isAnchoredToRight && isRtl || isAvailableLeft && !isAnchoredToRight && hasRightBit || !isAvailableRight && availableLeft >= availableRight) {
      // Attach right side of surface to the anchor.
      corner = this.setBit(corner, _constants.CornerBit.RIGHT);
    }

    return corner;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
   */


  MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight = function (corner) {
    var viewportDistance = this.measurements.viewportDistance;
    var maxHeight = 0;
    var isBottomAligned = this.hasBit(corner, _constants.CornerBit.BOTTOM);
    var isBottomAnchored = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE; // When maximum height is not specified, it is handled from CSS.

    if (isBottomAligned) {
      maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;

      if (!isBottomAnchored) {
        maxHeight += this.measurements.anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - this.anchorMargin.bottom + this.measurements.anchorSize.height - MARGIN_TO_EDGE;

      if (isBottomAnchored) {
        maxHeight -= this.measurements.anchorSize.height;
      }
    }

    return maxHeight;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset = function (corner) {
    var anchorSize = this.measurements.anchorSize; // isRightAligned corresponds to using the 'right' property on the surface.

    var isRightAligned = this.hasBit(corner, _constants.CornerBit.RIGHT);
    var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, _constants.CornerBit.RIGHT);

    if (isRightAligned) {
      var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.left : this.anchorMargin.right; // For hoisted or fixed elements, adjust the offset by the difference
      // between viewport width and body width so when we calculate the right
      // value (`adjustPositionForHoistedElement`) based on the element
      // position, the right property is correct.

      if (this.isHoistedElement || this.isFixedPosition) {
        return rightOffset - (this.measurements.viewportSize.width - this.measurements.bodySize.width);
      }

      return rightOffset;
    }

    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right : this.anchorMargin.left;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset = function (corner) {
    var anchorSize = this.measurements.anchorSize;
    var isBottomAligned = this.hasBit(corner, _constants.CornerBit.BOTTOM);
    var avoidVerticalOverlap = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
    var y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top : -this.anchorMargin.bottom;
    } else {
      y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin.bottom : this.anchorMargin.top;
    }

    return y;
  };
  /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement = function (position) {
    var e_1, _a;

    var _b = this.measurements,
        windowScroll = _b.windowScroll,
        viewportDistance = _b.viewportDistance;
    var props = Object.keys(position);

    try {
      for (var props_1 = (0, _tslib.__values)(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        var value = position[prop] || 0; // Hoisted surfaces need to have the anchor elements location on the page added to the
        // position properties for proper alignment on the body.

        value += viewportDistance[prop]; // Surfaces that are absolutely positioned need to have additional calculations for scroll
        // and bottom positioning.

        if (!this.isFixedPosition) {
          if (prop === 'top') {
            value += windowScroll.y;
          } else if (prop === 'bottom') {
            value -= windowScroll.y;
          } else if (prop === 'left') {
            value += windowScroll.x;
          } else {
            // prop === 'right'
            value -= windowScroll.x;
          }
        }

        position[prop] = value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /**
   * The last focused element when the menu surface was opened should regain focus, if the user is
   * focused on or within the menu surface when it is closed.
   */


  MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus = function () {
    var isRootFocused = this.adapter.isFocused();
    var childHasFocus = document.activeElement && this.adapter.isElementInContainer(document.activeElement);

    if (isRootFocused || childHasFocus) {
      this.adapter.restoreFocus();
    }
  };

  MDCMenuSurfaceFoundation.prototype.hasBit = function (corner, bit) {
    return Boolean(corner & bit); // tslint:disable-line:no-bitwise
  };

  MDCMenuSurfaceFoundation.prototype.setBit = function (corner, bit) {
    return corner | bit; // tslint:disable-line:no-bitwise
  };

  MDCMenuSurfaceFoundation.prototype.unsetBit = function (corner, bit) {
    return corner ^ bit;
  };
  /**
   * isFinite that doesn't force conversion to number type.
   * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
   */


  MDCMenuSurfaceFoundation.prototype.isFinite = function (num) {
    return typeof num === 'number' && isFinite(num);
  };

  return MDCMenuSurfaceFoundation;
}(_foundation.MDCFoundation);

exports.MDCMenuSurfaceFoundation = MDCMenuSurfaceFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCMenuSurfaceFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/menu-surface/constants.js"}],"../../../node_modules/@material/animation/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrectEventName = getCorrectEventName;
exports.getCorrectPropertyName = getCorrectPropertyName;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssPropertyNameMap = {
  animation: {
    prefixed: '-webkit-animation',
    standard: 'animation'
  },
  transform: {
    prefixed: '-webkit-transform',
    standard: 'transform'
  },
  transition: {
    prefixed: '-webkit-transition',
    standard: 'transition'
  }
};
var jsEventTypeMap = {
  animationend: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationEnd',
    standard: 'animationend'
  },
  animationiteration: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationIteration',
    standard: 'animationiteration'
  },
  animationstart: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationStart',
    standard: 'animationstart'
  },
  transitionend: {
    cssProperty: 'transition',
    prefixed: 'webkitTransitionEnd',
    standard: 'transitionend'
  }
};

function isWindow(windowObj) {
  return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}

function getCorrectPropertyName(windowObj, cssProperty) {
  if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
    var el = windowObj.document.createElement('div');
    var _a = cssPropertyNameMap[cssProperty],
        standard = _a.standard,
        prefixed = _a.prefixed;
    var isStandard = (standard in el.style);
    return isStandard ? standard : prefixed;
  }

  return cssProperty;
}

function getCorrectEventName(windowObj, eventType) {
  if (isWindow(windowObj) && eventType in jsEventTypeMap) {
    var el = windowObj.document.createElement('div');
    var _a = jsEventTypeMap[eventType],
        standard = _a.standard,
        prefixed = _a.prefixed,
        cssProperty = _a.cssProperty;
    var isStandard = (cssProperty in el.style);
    return isStandard ? standard : prefixed;
  }

  return eventType;
}
},{}],"../../../node_modules/@material/menu-surface/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenuSurface = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _constants = require("./constants");

var _foundation = require("./foundation");

var _util = require("@material/animation/util");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCMenuSurface =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCMenuSurface, _super);

  function MDCMenuSurface() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenuSurface.attachTo = function (root) {
    return new MDCMenuSurface(root);
  };

  MDCMenuSurface.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var parentEl = this.root.parentElement;
    this.anchorElement = parentEl && parentEl.classList.contains(_constants.cssClasses.ANCHOR) ? parentEl : null;

    if (this.root.classList.contains(_constants.cssClasses.FIXED)) {
      this.setFixedPosition(true);
    }

    this.handleKeydown = function (event) {
      _this.foundation.handleKeydown(event);
    };

    this.handleBodyClick = function (event) {
      _this.foundation.handleBodyClick(event);
    }; // capture so that no race between handleBodyClick and quickOpen when
    // menusurface opened on button click which registers this listener


    this.registerBodyClickListener = function () {
      document.body.addEventListener('click', _this.handleBodyClick, {
        capture: true
      });
    };

    this.deregisterBodyClickListener = function () {
      document.body.removeEventListener('click', _this.handleBodyClick, {
        capture: true
      });
    };

    this.listen('keydown', this.handleKeydown);
    this.listen(_constants.strings.OPENED_EVENT, this.registerBodyClickListener);
    this.listen(_constants.strings.CLOSED_EVENT, this.deregisterBodyClickListener);
  };

  MDCMenuSurface.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown);
    this.unlisten(_constants.strings.OPENED_EVENT, this.registerBodyClickListener);
    this.unlisten(_constants.strings.CLOSED_EVENT, this.deregisterBodyClickListener);

    _super.prototype.destroy.call(this);
  };

  MDCMenuSurface.prototype.isOpen = function () {
    return this.foundation.isOpen();
  };

  MDCMenuSurface.prototype.open = function () {
    this.foundation.open();
  };

  MDCMenuSurface.prototype.close = function (skipRestoreFocus) {
    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    this.foundation.close(skipRestoreFocus);
  };

  Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
    set: function (quickOpen) {
      this.foundation.setQuickOpen(quickOpen);
    },
    enumerable: true,
    configurable: true
  });
  /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */

  MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
    this.foundation.setIsHoisted(isHoisted);
  };
  /** Sets the element that the menu-surface is anchored to. */


  MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
    this.anchorElement = element;
  };
  /** Sets the menu-surface to position: fixed. */


  MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
    if (isFixed) {
      this.root.classList.add(_constants.cssClasses.FIXED);
    } else {
      this.root.classList.remove(_constants.cssClasses.FIXED);
    }

    this.foundation.setFixedPosition(isFixed);
  };
  /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */


  MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
    this.foundation.setAbsolutePosition(x, y);
    this.setIsHoisted(true);
  };
  /**
   * @param corner Default anchor corner alignment of top-left surface corner.
   */


  MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
    this.foundation.setAnchorCorner(corner);
  };

  MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
    this.foundation.setAnchorMargin(margin);
  };

  MDCMenuSurface.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      hasAnchor: function () {
        return !!_this.anchorElement;
      },
      notifyClose: function () {
        return _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {});
      },
      notifyClosing: function () {
        _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.CLOSING_EVENT, {});
      },
      notifyOpen: function () {
        return _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {});
      },
      isElementInContainer: function (el) {
        return _this.root.contains(el);
      },
      isRtl: function () {
        return getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function (origin) {
        var propertyName = (0, _util.getCorrectPropertyName)(window, 'transform') + "-origin";

        _this.root.style.setProperty(propertyName, origin);
      },
      isFocused: function () {
        return document.activeElement === _this.root;
      },
      saveFocus: function () {
        _this.previousFocus = document.activeElement;
      },
      restoreFocus: function () {
        if (_this.root.contains(document.activeElement)) {
          if (_this.previousFocus && _this.previousFocus.focus) {
            _this.previousFocus.focus();
          }
        }
      },
      getInnerDimensions: function () {
        return {
          width: _this.root.offsetWidth,
          height: _this.root.offsetHeight
        };
      },
      getAnchorDimensions: function () {
        return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
      },
      getWindowDimensions: function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getBodyDimensions: function () {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: function () {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      setPosition: function (position) {
        var rootHTML = _this.root;
        rootHTML.style.left = 'left' in position ? position.left + "px" : '';
        rootHTML.style.right = 'right' in position ? position.right + "px" : '';
        rootHTML.style.top = 'top' in position ? position.top + "px" : '';
        rootHTML.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
      },
      setMaxHeight: function (height) {
        _this.root.style.maxHeight = height;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCMenuSurfaceFoundation(adapter);
  };

  return MDCMenuSurface;
}(_component.MDCComponent);

exports.MDCMenuSurface = MDCMenuSurface;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./constants":"../../../node_modules/@material/menu-surface/constants.js","./foundation":"../../../node_modules/@material/menu-surface/foundation.js","@material/animation/util":"../../../node_modules/@material/animation/util.js"}],"../../../node_modules/@material/menu/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = exports.DefaultFocusState = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
  MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
  ROOT: 'mdc-menu'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_DISABLED_ATTR: 'aria-disabled',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  LIST_SELECTOR: '.mdc-list',
  SELECTED_EVENT: 'MDCMenu:selected'
};
exports.strings = strings;
var numbers = {
  FOCUS_ROOT_INDEX: -1
};
exports.numbers = numbers;
var DefaultFocusState;
exports.DefaultFocusState = DefaultFocusState;

(function (DefaultFocusState) {
  DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
  DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
  DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
  DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState || (exports.DefaultFocusState = DefaultFocusState = {}));
},{}],"../../../node_modules/@material/menu/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCMenuFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("@material/list/constants");

var _foundation2 = require("@material/menu-surface/foundation");

var _constants2 = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCMenuFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCMenuFoundation, _super);

  function MDCMenuFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCMenuFoundation.defaultAdapter), adapter)) || this;

    _this.closeAnimationEndTimerId_ = 0;
    _this.defaultFocusState_ = _constants2.DefaultFocusState.LIST_ROOT;
    return _this;
  }

  Object.defineProperty(MDCMenuFoundation, "cssClasses", {
    get: function () {
      return _constants2.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "strings", {
    get: function () {
      return _constants2.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "numbers", {
    get: function () {
      return _constants2.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClassToElementAtIndex: function () {
          return undefined;
        },
        removeClassFromElementAtIndex: function () {
          return undefined;
        },
        addAttributeToElementAtIndex: function () {
          return undefined;
        },
        removeAttributeFromElementAtIndex: function () {
          return undefined;
        },
        elementContainsClass: function () {
          return false;
        },
        closeSurface: function () {
          return undefined;
        },
        getElementIndex: function () {
          return -1;
        },
        notifySelected: function () {
          return undefined;
        },
        getMenuItemCount: function () {
          return 0;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        focusListRoot: function () {
          return undefined;
        },
        getSelectedSiblingOfItemAtIndex: function () {
          return -1;
        },
        isSelectableItemAtIndex: function () {
          return false;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuFoundation.prototype.destroy = function () {
    if (this.closeAnimationEndTimerId_) {
      clearTimeout(this.closeAnimationEndTimerId_);
    }

    this.adapter.closeSurface();
  };

  MDCMenuFoundation.prototype.handleKeydown = function (evt) {
    var key = evt.key,
        keyCode = evt.keyCode;
    var isTab = key === 'Tab' || keyCode === 9;

    if (isTab) {
      this.adapter.closeSurface(
      /** skipRestoreFocus */
      true);
    }
  };

  MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
    var _this = this;

    var index = this.adapter.getElementIndex(listItem);

    if (index < 0) {
      return;
    }

    this.adapter.notifySelected({
      index: index
    });
    this.adapter.closeSurface(); // Wait for the menu to close before adding/removing classes that affect styles.

    this.closeAnimationEndTimerId_ = setTimeout(function () {
      // Recompute the index in case the menu contents have changed.
      var recomputedIndex = _this.adapter.getElementIndex(listItem);

      if (recomputedIndex >= 0 && _this.adapter.isSelectableItemAtIndex(recomputedIndex)) {
        _this.setSelectedIndex(recomputedIndex);
      }
    }, _foundation2.MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
  };

  MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
    switch (this.defaultFocusState_) {
      case _constants2.DefaultFocusState.FIRST_ITEM:
        this.adapter.focusItemAtIndex(0);
        break;

      case _constants2.DefaultFocusState.LAST_ITEM:
        this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
        break;

      case _constants2.DefaultFocusState.NONE:
        // Do nothing.
        break;

      default:
        this.adapter.focusListRoot();
        break;
    }
  };
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   */


  MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
    this.defaultFocusState_ = focusState;
  };
  /**
   * Selects the list item at `index` within the menu.
   * @param index Index of list item within the menu.
   */


  MDCMenuFoundation.prototype.setSelectedIndex = function (index) {
    this.validatedIndex_(index);

    if (!this.adapter.isSelectableItemAtIndex(index)) {
      throw new Error('MDCMenuFoundation: No selection group at specified index.');
    }

    var prevSelectedIndex = this.adapter.getSelectedSiblingOfItemAtIndex(index);

    if (prevSelectedIndex >= 0) {
      this.adapter.removeAttributeFromElementAtIndex(prevSelectedIndex, _constants2.strings.ARIA_CHECKED_ATTR);
      this.adapter.removeClassFromElementAtIndex(prevSelectedIndex, _constants2.cssClasses.MENU_SELECTED_LIST_ITEM);
    }

    this.adapter.addClassToElementAtIndex(index, _constants2.cssClasses.MENU_SELECTED_LIST_ITEM);
    this.adapter.addAttributeToElementAtIndex(index, _constants2.strings.ARIA_CHECKED_ATTR, 'true');
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenuFoundation.prototype.setEnabled = function (index, isEnabled) {
    this.validatedIndex_(index);

    if (isEnabled) {
      this.adapter.removeClassFromElementAtIndex(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.addAttributeToElementAtIndex(index, _constants2.strings.ARIA_DISABLED_ATTR, 'false');
    } else {
      this.adapter.addClassToElementAtIndex(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.addAttributeToElementAtIndex(index, _constants2.strings.ARIA_DISABLED_ATTR, 'true');
    }
  };

  MDCMenuFoundation.prototype.validatedIndex_ = function (index) {
    var menuSize = this.adapter.getMenuItemCount();
    var isIndexInRange = index >= 0 && index < menuSize;

    if (!isIndexInRange) {
      throw new Error('MDCMenuFoundation: No list item at specified index.');
    }
  };

  return MDCMenuFoundation;
}(_foundation.MDCFoundation);

exports.MDCMenuFoundation = MDCMenuFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCMenuFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","@material/list/constants":"../../../node_modules/@material/list/constants.js","@material/menu-surface/foundation":"../../../node_modules/@material/menu-surface/foundation.js","./constants":"../../../node_modules/@material/menu/constants.js"}],"../../../node_modules/@material/menu/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenu = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _ponyfill = require("@material/dom/ponyfill");

var _component2 = require("@material/list/component");

var _constants = require("@material/list/constants");

var _foundation = require("@material/list/foundation");

var _component3 = require("@material/menu-surface/component");

var _foundation2 = require("@material/menu-surface/foundation");

var _constants2 = require("./constants");

var _foundation3 = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// TODO(b/152410470): Remove trailing underscores from private properties
// tslint:disable:strip-private-property-underscore
var MDCMenu =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCMenu, _super);

  function MDCMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenu.attachTo = function (root) {
    return new MDCMenu(root);
  };

  MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
    if (menuSurfaceFactory === void 0) {
      menuSurfaceFactory = function (el) {
        return new _component3.MDCMenuSurface(el);
      };
    }

    if (listFactory === void 0) {
      listFactory = function (el) {
        return new _component2.MDCList(el);
      };
    }

    this.menuSurfaceFactory_ = menuSurfaceFactory;
    this.listFactory_ = listFactory;
  };

  MDCMenu.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.menuSurface_ = this.menuSurfaceFactory_(this.root);
    var list = this.root.querySelector(_constants2.strings.LIST_SELECTOR);

    if (list) {
      this.list_ = this.listFactory_(list);
      this.list_.wrapFocus = true;
    } else {
      this.list_ = null;
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation.handleKeydown(evt);
    };

    this.handleItemAction_ = function (evt) {
      return _this.foundation.handleItemAction(_this.items[evt.detail.index]);
    };

    this.handleMenuSurfaceOpened_ = function () {
      return _this.foundation.handleMenuSurfaceOpened();
    };

    this.menuSurface_.listen(_foundation2.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(_foundation.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
  };

  MDCMenu.prototype.destroy = function () {
    if (this.list_) {
      this.list_.destroy();
    }

    this.menuSurface_.destroy();
    this.menuSurface_.unlisten(_foundation2.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(_foundation.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCMenu.prototype, "open", {
    get: function () {
      return this.menuSurface_.isOpen();
    },
    set: function (value) {
      if (value) {
        this.menuSurface_.open();
      } else {
        this.menuSurface_.close();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
    get: function () {
      return this.list_ ? this.list_.wrapFocus : false;
    },
    set: function (value) {
      if (this.list_) {
        this.list_.wrapFocus = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "hasTypeahead", {
    /**
     * Sets whether the menu has typeahead functionality.
     * @param value Whether typeahead is enabled.
     */
    set: function (value) {
      if (this.list_) {
        this.list_.hasTypeahead = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "typeaheadInProgress", {
    /**
     * @return Whether typeahead logic is currently matching some user prefix.
     */
    get: function () {
      return this.list_ ? this.list_.typeaheadInProgress : false;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Given the next desired character from the user, adds it to the typeahead
   * buffer. Then, attempts to find the next option matching the buffer. Wraps
   * around if at the end of options.
   *
   * @param nextChar The next character to add to the prefix buffer.
   * @param startingIndex The index from which to start matching. Only relevant
   *     when starting a new match sequence. To start a new match sequence,
   *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
   *     to clear after a set interval defined in list foundation. Defaults to
   *     the currently focused index.
   * @return The index of the matched item, or -1 if no match.
   */

  MDCMenu.prototype.typeaheadMatchItem = function (nextChar, startingIndex) {
    if (this.list_) {
      return this.list_.typeaheadMatchItem(nextChar, startingIndex);
    }

    return -1;
  };
  /**
   * Layout the underlying list element in the case of any dynamic updates
   * to its structure.
   */


  MDCMenu.prototype.layout = function () {
    if (this.list_) {
      this.list_.layout();
    }
  };

  Object.defineProperty(MDCMenu.prototype, "items", {
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    get: function () {
      return this.list_ ? this.list_.listElements : [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "singleSelection", {
    /**
     * Turns on/off the underlying list's single selection mode. Used mainly
     * by select menu.
     *
     * @param singleSelection Whether to enable single selection mode.
     */
    set: function (singleSelection) {
      if (this.list_) {
        this.list_.singleSelection = singleSelection;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "selectedIndex", {
    /**
     * Retrieves the selected index. Only applicable to select menus.
     * @return The selected index, which is a number for single selection and
     *     radio lists, and an array of numbers for checkbox lists.
     */
    get: function () {
      return this.list_ ? this.list_.selectedIndex : _constants.numbers.UNSET_INDEX;
    },

    /**
     * Sets the selected index of the list. Only applicable to select menus.
     * @param index The selected index, which is a number for single selection and
     *     radio lists, and an array of numbers for checkbox lists.
     */
    set: function (index) {
      if (this.list_) {
        this.list_.selectedIndex = index;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "quickOpen", {
    set: function (quickOpen) {
      this.menuSurface_.quickOpen = quickOpen;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   * @param focusState Default focus state.
   */

  MDCMenu.prototype.setDefaultFocusState = function (focusState) {
    this.foundation.setDefaultFocusState(focusState);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu corner.
   */


  MDCMenu.prototype.setAnchorCorner = function (corner) {
    this.menuSurface_.setAnchorCorner(corner);
  };

  MDCMenu.prototype.setAnchorMargin = function (margin) {
    this.menuSurface_.setAnchorMargin(margin);
  };
  /**
   * Sets the list item as the selected row at the specified index.
   * @param index Index of list item within menu.
   */


  MDCMenu.prototype.setSelectedIndex = function (index) {
    this.foundation.setSelectedIndex(index);
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenu.prototype.setEnabled = function (index, isEnabled) {
    this.foundation.setEnabled(index, isEnabled);
  };
  /**
   * @return The item within the menu at the index specified.
   */


  MDCMenu.prototype.getOptionByIndex = function (index) {
    var items = this.items;

    if (index < items.length) {
      return this.items[index];
    } else {
      return null;
    }
  };
  /**
   * @param index A menu item's index.
   * @return The primary text within the menu at the index specified.
   */


  MDCMenu.prototype.getPrimaryTextAtIndex = function (index) {
    var item = this.getOptionByIndex(index);

    if (item && this.list_) {
      return this.list_.getPrimaryText(item) || '';
    }

    return '';
  };

  MDCMenu.prototype.setFixedPosition = function (isFixed) {
    this.menuSurface_.setFixedPosition(isFixed);
  };

  MDCMenu.prototype.setIsHoisted = function (isHoisted) {
    this.menuSurface_.setIsHoisted(isHoisted);
  };

  MDCMenu.prototype.setAbsolutePosition = function (x, y) {
    this.menuSurface_.setAbsolutePosition(x, y);
  };
  /**
   * Sets the element that the menu-surface is anchored to.
   */


  MDCMenu.prototype.setAnchorElement = function (element) {
    this.menuSurface_.anchorElement = element;
  };

  MDCMenu.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClassToElementAtIndex: function (index, className) {
        var list = _this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: function (index, className) {
        var list = _this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: function (index, attr, value) {
        var list = _this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: function (index, attr) {
        var list = _this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: function (element, className) {
        return element.classList.contains(className);
      },
      closeSurface: function (skipRestoreFocus) {
        return _this.menuSurface_.close(skipRestoreFocus);
      },
      getElementIndex: function (element) {
        return _this.items.indexOf(element);
      },
      notifySelected: function (evtData) {
        return _this.emit(_constants2.strings.SELECTED_EVENT, {
          index: evtData.index,
          item: _this.items[evtData.index]
        });
      },
      getMenuItemCount: function () {
        return _this.items.length;
      },
      focusItemAtIndex: function (index) {
        return _this.items[index].focus();
      },
      focusListRoot: function () {
        return _this.root.querySelector(_constants2.strings.LIST_SELECTOR).focus();
      },
      isSelectableItemAtIndex: function (index) {
        return !!(0, _ponyfill.closest)(_this.items[index], "." + _constants2.cssClasses.MENU_SELECTION_GROUP);
      },
      getSelectedSiblingOfItemAtIndex: function (index) {
        var selectionGroupEl = (0, _ponyfill.closest)(_this.items[index], "." + _constants2.cssClasses.MENU_SELECTION_GROUP);
        var selectedItemEl = selectionGroupEl.querySelector("." + _constants2.cssClasses.MENU_SELECTED_LIST_ITEM);
        return selectedItemEl ? _this.items.indexOf(selectedItemEl) : -1;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation3.MDCMenuFoundation(adapter);
  };

  return MDCMenu;
}(_component.MDCComponent);

exports.MDCMenu = MDCMenu;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","@material/list/component":"../../../node_modules/@material/list/component.js","@material/list/constants":"../../../node_modules/@material/list/constants.js","@material/list/foundation":"../../../node_modules/@material/list/foundation.js","@material/menu-surface/component":"../../../node_modules/@material/menu-surface/component.js","@material/menu-surface/foundation":"../../../node_modules/@material/menu-surface/foundation.js","./constants":"../../../node_modules/@material/menu/constants.js","./foundation":"../../../node_modules/@material/menu/foundation.js"}],"../../../node_modules/@material/select/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ACTIVATED: 'mdc-select--activated',
  DISABLED: 'mdc-select--disabled',
  FOCUSED: 'mdc-select--focused',
  INVALID: 'mdc-select--invalid',
  MENU_INVALID: 'mdc-select__menu--invalid',
  OUTLINED: 'mdc-select--outlined',
  REQUIRED: 'mdc-select--required',
  ROOT: 'mdc-select',
  WITH_LEADING_ICON: 'mdc-select--with-leading-icon'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_CONTROLS: 'aria-controls',
  ARIA_DESCRIBEDBY: 'aria-describedby',
  ARIA_SELECTED_ATTR: 'aria-selected',
  CHANGE_EVENT: 'MDCSelect:change',
  HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
  LABEL_SELECTOR: '.mdc-floating-label',
  LEADING_ICON_SELECTOR: '.mdc-select__icon',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  MENU_SELECTOR: '.mdc-select__menu',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
  SELECT_ANCHOR_SELECTOR: '.mdc-select__anchor',
  VALUE_ATTR: 'data-value'
};
exports.strings = strings;
var numbers = {
  LABEL_SCALE: 0.75,
  UNSET_INDEX: -1,
  CLICK_DEBOUNCE_TIMEOUT_MS: 330
};
exports.numbers = numbers;
},{}],"../../../node_modules/@material/select/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCSelectFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _keyboard = require("@material/dom/keyboard");

var _constants = require("@material/menu-surface/constants");

var _constants2 = require("./constants");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCSelectFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelectFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */

  /**
   * @param adapter
   * @param foundationMap Map from subcomponent names to their subfoundations.
   */

  function MDCSelectFoundation(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }

    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCSelectFoundation.defaultAdapter), adapter)) || this; // Disabled state


    _this.disabled = false; // isMenuOpen is used to track the state of the menu by listening to the
    // MDCMenuSurface:closed event For reference, menu.open will return false if
    // the menu is still closing, but isMenuOpen returns false only after the menu
    // has closed

    _this.isMenuOpen = false; // By default, select is invalid if it is required but no value is selected.

    _this.useDefaultValidation = true;
    _this.customValidity = true;
    _this.lastSelectedIndex = _constants2.numbers.UNSET_INDEX;
    _this.clickDebounceTimeout = 0;
    _this.recentlyClicked = false;
    _this.leadingIcon = foundationMap.leadingIcon;
    _this.helperText = foundationMap.helperText;
    return _this;
  }

  Object.defineProperty(MDCSelectFoundation, "cssClasses", {
    get: function () {
      return _constants2.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "numbers", {
    get: function () {
      return _constants2.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "strings", {
    get: function () {
      return _constants2.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        activateBottomLine: function () {
          return undefined;
        },
        deactivateBottomLine: function () {
          return undefined;
        },
        getSelectedIndex: function () {
          return -1;
        },
        setSelectedIndex: function () {
          return undefined;
        },
        hasLabel: function () {
          return false;
        },
        floatLabel: function () {
          return undefined;
        },
        getLabelWidth: function () {
          return 0;
        },
        setLabelRequired: function () {
          return undefined;
        },
        hasOutline: function () {
          return false;
        },
        notchOutline: function () {
          return undefined;
        },
        closeOutline: function () {
          return undefined;
        },
        setRippleCenter: function () {
          return undefined;
        },
        notifyChange: function () {
          return undefined;
        },
        setSelectedText: function () {
          return undefined;
        },
        isSelectAnchorFocused: function () {
          return false;
        },
        getSelectAnchorAttr: function () {
          return '';
        },
        setSelectAnchorAttr: function () {
          return undefined;
        },
        removeSelectAnchorAttr: function () {
          return undefined;
        },
        addMenuClass: function () {
          return undefined;
        },
        removeMenuClass: function () {
          return undefined;
        },
        openMenu: function () {
          return undefined;
        },
        closeMenu: function () {
          return undefined;
        },
        getAnchorElement: function () {
          return null;
        },
        setMenuAnchorElement: function () {
          return undefined;
        },
        setMenuAnchorCorner: function () {
          return undefined;
        },
        setMenuWrapFocus: function () {
          return undefined;
        },
        focusMenuItemAtIndex: function () {
          return undefined;
        },
        getMenuItemCount: function () {
          return 0;
        },
        getMenuItemValues: function () {
          return [];
        },
        getMenuItemTextAtIndex: function () {
          return '';
        },
        isTypeaheadInProgress: function () {
          return false;
        },
        typeaheadMatchItem: function () {
          return -1;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /** Returns the index of the currently selected menu item, or -1 if none. */

  MDCSelectFoundation.prototype.getSelectedIndex = function () {
    return this.adapter.getSelectedIndex();
  };

  MDCSelectFoundation.prototype.setSelectedIndex = function (index, closeMenu, skipNotify) {
    if (closeMenu === void 0) {
      closeMenu = false;
    }

    if (skipNotify === void 0) {
      skipNotify = false;
    }

    if (index >= this.adapter.getMenuItemCount()) {
      return;
    }

    if (index === _constants2.numbers.UNSET_INDEX) {
      this.adapter.setSelectedText('');
    } else {
      this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(index).trim());
    }

    this.adapter.setSelectedIndex(index);

    if (closeMenu) {
      this.adapter.closeMenu();
    }

    if (!skipNotify && this.lastSelectedIndex !== index) {
      this.handleChange();
    }

    this.lastSelectedIndex = index;
  };

  MDCSelectFoundation.prototype.setValue = function (value, skipNotify) {
    if (skipNotify === void 0) {
      skipNotify = false;
    }

    var index = this.adapter.getMenuItemValues().indexOf(value);
    this.setSelectedIndex(index,
    /** closeMenu */
    false, skipNotify);
  };

  MDCSelectFoundation.prototype.getValue = function () {
    var index = this.adapter.getSelectedIndex();
    var menuItemValues = this.adapter.getMenuItemValues();
    return index !== _constants2.numbers.UNSET_INDEX ? menuItemValues[index] : '';
  };

  MDCSelectFoundation.prototype.getDisabled = function () {
    return this.disabled;
  };

  MDCSelectFoundation.prototype.setDisabled = function (isDisabled) {
    this.disabled = isDisabled;

    if (this.disabled) {
      this.adapter.addClass(_constants2.cssClasses.DISABLED);
      this.adapter.closeMenu();
    } else {
      this.adapter.removeClass(_constants2.cssClasses.DISABLED);
    }

    if (this.leadingIcon) {
      this.leadingIcon.setDisabled(this.disabled);
    }

    if (this.disabled) {
      // Prevent click events from focusing select. Simply pointer-events: none
      // is not enough since screenreader clicks may bypass this.
      this.adapter.removeSelectAnchorAttr('tabindex');
    } else {
      this.adapter.setSelectAnchorAttr('tabindex', '0');
    }

    this.adapter.setSelectAnchorAttr('aria-disabled', this.disabled.toString());
  };
  /** Opens the menu. */


  MDCSelectFoundation.prototype.openMenu = function () {
    this.adapter.addClass(_constants2.cssClasses.ACTIVATED);
    this.adapter.openMenu();
    this.isMenuOpen = true;
    this.adapter.setSelectAnchorAttr('aria-expanded', 'true');
  };
  /**
   * @param content Sets the content of the helper text.
   */


  MDCSelectFoundation.prototype.setHelperTextContent = function (content) {
    if (this.helperText) {
      this.helperText.setContent(content);
    }
  };
  /**
   * Re-calculates if the notched outline should be notched and if the label
   * should float.
   */


  MDCSelectFoundation.prototype.layout = function () {
    if (this.adapter.hasLabel()) {
      var optionHasValue = this.getValue().length > 0;
      var isFocused = this.adapter.hasClass(_constants2.cssClasses.FOCUSED);
      var shouldFloatAndNotch = optionHasValue || isFocused;
      var isRequired = this.adapter.hasClass(_constants2.cssClasses.REQUIRED);
      this.notchOutline(shouldFloatAndNotch);
      this.adapter.floatLabel(shouldFloatAndNotch);
      this.adapter.setLabelRequired(isRequired);
    }
  };
  /**
   * Synchronizes the list of options with the state of the foundation. Call
   * this whenever menu options are dynamically updated.
   */


  MDCSelectFoundation.prototype.layoutOptions = function () {
    var menuItemValues = this.adapter.getMenuItemValues();
    var selectedIndex = menuItemValues.indexOf(this.getValue());
    this.setSelectedIndex(selectedIndex,
    /** closeMenu */
    false,
    /** skipNotify */
    true);
  };

  MDCSelectFoundation.prototype.handleMenuOpened = function () {
    if (this.adapter.getMenuItemValues().length === 0) {
      return;
    } // Menu should open to the last selected element, should open to first menu item otherwise.


    var selectedIndex = this.getSelectedIndex();
    var focusItemIndex = selectedIndex >= 0 ? selectedIndex : 0;
    this.adapter.focusMenuItemAtIndex(focusItemIndex);
  };

  MDCSelectFoundation.prototype.handleMenuClosing = function () {
    this.adapter.setSelectAnchorAttr('aria-expanded', 'false');
  };

  MDCSelectFoundation.prototype.handleMenuClosed = function () {
    this.adapter.removeClass(_constants2.cssClasses.ACTIVATED);
    this.isMenuOpen = false; // Unfocus the select if menu is closed without a selection

    if (!this.adapter.isSelectAnchorFocused()) {
      this.blur();
    }
  };
  /**
   * Handles value changes, via change event or programmatic updates.
   */


  MDCSelectFoundation.prototype.handleChange = function () {
    this.layout();
    this.adapter.notifyChange(this.getValue());
    var isRequired = this.adapter.hasClass(_constants2.cssClasses.REQUIRED);

    if (isRequired && this.useDefaultValidation) {
      this.setValid(this.isValid());
    }
  };

  MDCSelectFoundation.prototype.handleMenuItemAction = function (index) {
    this.setSelectedIndex(index,
    /** closeMenu */
    true);
  };
  /**
   * Handles focus events from select element.
   */


  MDCSelectFoundation.prototype.handleFocus = function () {
    this.adapter.addClass(_constants2.cssClasses.FOCUSED);
    this.layout();
    this.adapter.activateBottomLine();
  };
  /**
   * Handles blur events from select element.
   */


  MDCSelectFoundation.prototype.handleBlur = function () {
    if (this.isMenuOpen) {
      return;
    }

    this.blur();
  };

  MDCSelectFoundation.prototype.handleClick = function (normalizedX) {
    if (this.disabled || this.recentlyClicked) {
      return;
    }

    this.setClickDebounceTimeout();

    if (this.isMenuOpen) {
      this.adapter.closeMenu();
      return;
    }

    this.adapter.setRippleCenter(normalizedX);
    this.openMenu();
  };
  /**
   * Handles keydown events on select element. Depending on the type of
   * character typed, does typeahead matching or opens menu.
   */


  MDCSelectFoundation.prototype.handleKeydown = function (event) {
    if (this.isMenuOpen || !this.adapter.hasClass(_constants2.cssClasses.FOCUSED)) {
      return;
    }

    var isEnter = (0, _keyboard.normalizeKey)(event) === _keyboard.KEY.ENTER;

    var isSpace = (0, _keyboard.normalizeKey)(event) === _keyboard.KEY.SPACEBAR;

    var arrowUp = (0, _keyboard.normalizeKey)(event) === _keyboard.KEY.ARROW_UP;

    var arrowDown = (0, _keyboard.normalizeKey)(event) === _keyboard.KEY.ARROW_DOWN; // Typeahead


    if (!isSpace && event.key && event.key.length === 1 || isSpace && this.adapter.isTypeaheadInProgress()) {
      var key = isSpace ? ' ' : event.key;
      var typeaheadNextIndex = this.adapter.typeaheadMatchItem(key, this.getSelectedIndex());

      if (typeaheadNextIndex >= 0) {
        this.setSelectedIndex(typeaheadNextIndex);
      }

      event.preventDefault();
      return;
    }

    if (!isEnter && !isSpace && !arrowUp && !arrowDown) {
      return;
    } // Increment/decrement index as necessary and open menu.


    if (arrowUp && this.getSelectedIndex() > 0) {
      this.setSelectedIndex(this.getSelectedIndex() - 1);
    } else if (arrowDown && this.getSelectedIndex() < this.adapter.getMenuItemCount() - 1) {
      this.setSelectedIndex(this.getSelectedIndex() + 1);
    }

    this.openMenu();
    event.preventDefault();
  };
  /**
   * Opens/closes the notched outline.
   */


  MDCSelectFoundation.prototype.notchOutline = function (openNotch) {
    if (!this.adapter.hasOutline()) {
      return;
    }

    var isFocused = this.adapter.hasClass(_constants2.cssClasses.FOCUSED);

    if (openNotch) {
      var labelScale = _constants2.numbers.LABEL_SCALE;
      var labelWidth = this.adapter.getLabelWidth() * labelScale;
      this.adapter.notchOutline(labelWidth);
    } else if (!isFocused) {
      this.adapter.closeOutline();
    }
  };
  /**
   * Sets the aria label of the leading icon.
   */


  MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function (label) {
    if (this.leadingIcon) {
      this.leadingIcon.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the leading icon.
   */


  MDCSelectFoundation.prototype.setLeadingIconContent = function (content) {
    if (this.leadingIcon) {
      this.leadingIcon.setContent(content);
    }
  };

  MDCSelectFoundation.prototype.setUseDefaultValidation = function (useDefaultValidation) {
    this.useDefaultValidation = useDefaultValidation;
  };

  MDCSelectFoundation.prototype.setValid = function (isValid) {
    if (!this.useDefaultValidation) {
      this.customValidity = isValid;
    }

    this.adapter.setSelectAnchorAttr('aria-invalid', (!isValid).toString());

    if (isValid) {
      this.adapter.removeClass(_constants2.cssClasses.INVALID);
      this.adapter.removeMenuClass(_constants2.cssClasses.MENU_INVALID);
    } else {
      this.adapter.addClass(_constants2.cssClasses.INVALID);
      this.adapter.addMenuClass(_constants2.cssClasses.MENU_INVALID);
    }

    this.syncHelperTextValidity(isValid);
  };

  MDCSelectFoundation.prototype.isValid = function () {
    if (this.useDefaultValidation && this.adapter.hasClass(_constants2.cssClasses.REQUIRED) && !this.adapter.hasClass(_constants2.cssClasses.DISABLED)) {
      // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
      // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
      return this.getSelectedIndex() !== _constants2.numbers.UNSET_INDEX && (this.getSelectedIndex() !== 0 || Boolean(this.getValue()));
    }

    return this.customValidity;
  };

  MDCSelectFoundation.prototype.setRequired = function (isRequired) {
    if (isRequired) {
      this.adapter.addClass(_constants2.cssClasses.REQUIRED);
    } else {
      this.adapter.removeClass(_constants2.cssClasses.REQUIRED);
    }

    this.adapter.setSelectAnchorAttr('aria-required', isRequired.toString());
    this.adapter.setLabelRequired(isRequired);
  };

  MDCSelectFoundation.prototype.getRequired = function () {
    return this.adapter.getSelectAnchorAttr('aria-required') === 'true';
  };

  MDCSelectFoundation.prototype.init = function () {
    var anchorEl = this.adapter.getAnchorElement();

    if (anchorEl) {
      this.adapter.setMenuAnchorElement(anchorEl);
      this.adapter.setMenuAnchorCorner(_constants.Corner.BOTTOM_START);
    }

    this.adapter.setMenuWrapFocus(false);
    this.setDisabled(this.adapter.hasClass(_constants2.cssClasses.DISABLED));
    this.syncHelperTextValidity(!this.adapter.hasClass(_constants2.cssClasses.INVALID));
    this.layout();
    this.layoutOptions();
  };
  /**
   * Unfocuses the select component.
   */


  MDCSelectFoundation.prototype.blur = function () {
    this.adapter.removeClass(_constants2.cssClasses.FOCUSED);
    this.layout();
    this.adapter.deactivateBottomLine();
    var isRequired = this.adapter.hasClass(_constants2.cssClasses.REQUIRED);

    if (isRequired && this.useDefaultValidation) {
      this.setValid(this.isValid());
    }
  };

  MDCSelectFoundation.prototype.syncHelperTextValidity = function (isValid) {
    if (!this.helperText) {
      return;
    }

    this.helperText.setValidity(isValid);
    var helperTextVisible = this.helperText.isVisible();
    var helperTextId = this.helperText.getId();

    if (helperTextVisible && helperTextId) {
      this.adapter.setSelectAnchorAttr(_constants2.strings.ARIA_DESCRIBEDBY, helperTextId);
    } else {
      // Needed because screenreaders will read labels pointed to by
      // `aria-describedby` even if they are `aria-hidden`.
      this.adapter.removeSelectAnchorAttr(_constants2.strings.ARIA_DESCRIBEDBY);
    }
  };

  MDCSelectFoundation.prototype.setClickDebounceTimeout = function () {
    var _this = this;

    clearTimeout(this.clickDebounceTimeout);
    this.clickDebounceTimeout = setTimeout(function () {
      _this.recentlyClicked = false;
    }, _constants2.numbers.CLICK_DEBOUNCE_TIMEOUT_MS);
    this.recentlyClicked = true;
  };

  return MDCSelectFoundation;
}(_foundation.MDCFoundation);

exports.MDCSelectFoundation = MDCSelectFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCSelectFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","@material/dom/keyboard":"../../../node_modules/@material/dom/keyboard.js","@material/menu-surface/constants":"../../../node_modules/@material/menu-surface/constants.js","./constants":"../../../node_modules/@material/select/constants.js"}],"../../../node_modules/@material/select/helper-text/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};
exports.strings = strings;
var cssClasses = {
  HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg',
  HELPER_TEXT_VALIDATION_MSG_PERSISTENT: 'mdc-select-helper-text--validation-msg-persistent'
};
exports.cssClasses = cssClasses;
},{}],"../../../node_modules/@material/select/helper-text/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCSelectHelperTextFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCSelectHelperTextFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelectHelperTextFoundation, _super);

  function MDCSelectHelperTextFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCSelectHelperTextFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setAttr: function () {
          return undefined;
        },
        getAttr: function () {
          return null;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * @return The ID of the helper text, or null if none is set.
   */

  MDCSelectHelperTextFoundation.prototype.getId = function () {
    return this.adapter.getAttr('id');
  };
  /**
   * @return Whether the helper text is currently visible.
   */


  MDCSelectHelperTextFoundation.prototype.isVisible = function () {
    return this.adapter.getAttr(_constants.strings.ARIA_HIDDEN) !== 'true';
  };
  /**
   * Sets the content of the helper text field.
   */


  MDCSelectHelperTextFoundation.prototype.setContent = function (content) {
    this.adapter.setContent(content);
  };
  /**
   * Sets the helper text to act as a validation message.
   * By default, validation messages are hidden when the select is valid and
   * visible when the select is invalid.
   *
   * @param isValidation True to make the helper text act as an error validation
   *     message.
   */


  MDCSelectHelperTextFoundation.prototype.setValidation = function (isValidation) {
    if (isValidation) {
      this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };
  /**
   * Sets the persistency of the validation helper text.
   * This keeps the validation message visible even if the select is valid,
   * though it will be displayed in the normal (grey) color.
   */


  MDCSelectHelperTextFoundation.prototype.setValidationMsgPersistent = function (isPersistent) {
    if (isPersistent) {
      this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
    } else {
      this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
    }
  };
  /**
   * When acting as a validation message, shows/hides the helper text and
   * triggers alerts as necessary based on the select's validity.
   */


  MDCSelectHelperTextFoundation.prototype.setValidity = function (selectIsValid) {
    var isValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);

    if (!isValidationMsg) {
      // Non-validating helper-text is always displayed and does not participate
      // in validation logic.
      return;
    }

    var isPersistentValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT); // Validating helper text is displayed if select is invalid, unless it is
    // set as persistent, in which case it always displays.

    var msgShouldDisplay = !selectIsValid || isPersistentValidationMsg;

    if (msgShouldDisplay) {
      this.showToScreenReader(); // In addition to displaying, also trigger an alert if the select
      // has become invalid.

      if (!selectIsValid) {
        this.adapter.setAttr(_constants.strings.ROLE, 'alert');
      } else {
        this.adapter.removeAttr(_constants.strings.ROLE);
      }

      return;
    } // Hide everything.


    this.adapter.removeAttr(_constants.strings.ROLE);
    this.hide();
  };
  /**
   * Makes the helper text visible to screen readers.
   */


  MDCSelectHelperTextFoundation.prototype.showToScreenReader = function () {
    this.adapter.removeAttr(_constants.strings.ARIA_HIDDEN);
  };
  /**
   * Hides the help text from screen readers.
   */


  MDCSelectHelperTextFoundation.prototype.hide = function () {
    this.adapter.setAttr(_constants.strings.ARIA_HIDDEN, 'true');
  };

  return MDCSelectHelperTextFoundation;
}(_foundation.MDCFoundation);

exports.MDCSelectHelperTextFoundation = MDCSelectHelperTextFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCSelectHelperTextFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/select/helper-text/constants.js"}],"../../../node_modules/@material/select/helper-text/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCSelectHelperText = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCSelectHelperText =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelectHelperText, _super);

  function MDCSelectHelperText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelectHelperText.attachTo = function (root) {
    return new MDCSelectHelperText(root);
  };

  Object.defineProperty(MDCSelectHelperText.prototype, "foundationForSelect", {
    // Provided for access by MDCSelect component
    get: function () {
      return this.foundation;
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectHelperText.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      getAttr: function (attr) {
        return _this.root.getAttribute(attr);
      },
      setAttr: function (attr, value) {
        return _this.root.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root.textContent = content;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCSelectHelperTextFoundation(adapter);
  };

  return MDCSelectHelperText;
}(_component.MDCComponent);

exports.MDCSelectHelperText = MDCSelectHelperText;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/select/helper-text/foundation.js"}],"../../../node_modules/@material/select/icon/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ICON_EVENT: 'MDCSelect:icon',
  ICON_ROLE: 'button'
};
exports.strings = strings;
},{}],"../../../node_modules/@material/select/icon/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCSelectIconFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCSelectIconFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelectIconFoundation, _super);

  function MDCSelectIconFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCSelectIconFoundation.defaultAdapter), adapter)) || this;

    _this.savedTabIndex_ = null;

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCSelectIconFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectIconAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        getAttr: function () {
          return null;
        },
        setAttr: function () {
          return undefined;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        notifyIconAction: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectIconFoundation.prototype.init = function () {
    var _this = this;

    this.savedTabIndex_ = this.adapter.getAttr('tabindex');
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.registerInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCSelectIconFoundation.prototype.destroy = function () {
    var _this = this;

    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter.deregisterInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCSelectIconFoundation.prototype.setDisabled = function (disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter.setAttr('tabindex', '-1');
      this.adapter.removeAttr('role');
    } else {
      this.adapter.setAttr('tabindex', this.savedTabIndex_);
      this.adapter.setAttr('role', _constants.strings.ICON_ROLE);
    }
  };

  MDCSelectIconFoundation.prototype.setAriaLabel = function (label) {
    this.adapter.setAttr('aria-label', label);
  };

  MDCSelectIconFoundation.prototype.setContent = function (content) {
    this.adapter.setContent(content);
  };

  MDCSelectIconFoundation.prototype.handleInteraction = function (evt) {
    var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;

    if (evt.type === 'click' || isEnterKey) {
      this.adapter.notifyIconAction();
    }
  };

  return MDCSelectIconFoundation;
}(_foundation.MDCFoundation);

exports.MDCSelectIconFoundation = MDCSelectIconFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCSelectIconFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/select/icon/constants.js"}],"../../../node_modules/@material/select/icon/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCSelectIcon = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCSelectIcon =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelectIcon, _super);

  function MDCSelectIcon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelectIcon.attachTo = function (root) {
    return new MDCSelectIcon(root);
  };

  Object.defineProperty(MDCSelectIcon.prototype, "foundationForSelect", {
    // Provided for access by MDCSelect component
    get: function () {
      return this.foundation;
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectIcon.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      getAttr: function (attr) {
        return _this.root.getAttribute(attr);
      },
      setAttr: function (attr, value) {
        return _this.root.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root.textContent = content;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      },
      notifyIconAction: function () {
        return _this.emit(_foundation.MDCSelectIconFoundation.strings.ICON_EVENT, {}
        /* evtData */
        , true
        /* shouldBubble */
        );
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCSelectIconFoundation(adapter);
  };

  return MDCSelectIcon;
}(_component.MDCComponent);

exports.MDCSelectIcon = MDCSelectIcon;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./foundation":"../../../node_modules/@material/select/icon/foundation.js"}],"../../../node_modules/@material/select/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCSelect = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _component2 = require("@material/floating-label/component");

var _component3 = require("@material/line-ripple/component");

var menuSurfaceConstants = _interopRequireWildcard(require("@material/menu-surface/constants"));

var _component4 = require("@material/menu/component");

var menuConstants = _interopRequireWildcard(require("@material/menu/constants"));

var _component5 = require("@material/notched-outline/component");

var _component6 = require("@material/ripple/component");

var _foundation = require("@material/ripple/foundation");

var _constants3 = require("./constants");

var _foundation2 = require("./foundation");

var _component7 = require("./helper-text/component");

var _component8 = require("./icon/component");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCSelect =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCSelect, _super);

  function MDCSelect() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelect.attachTo = function (root) {
    return new MDCSelect(root);
  };

  MDCSelect.prototype.initialize = function (labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
    if (labelFactory === void 0) {
      labelFactory = function (el) {
        return new _component2.MDCFloatingLabel(el);
      };
    }

    if (lineRippleFactory === void 0) {
      lineRippleFactory = function (el) {
        return new _component3.MDCLineRipple(el);
      };
    }

    if (outlineFactory === void 0) {
      outlineFactory = function (el) {
        return new _component5.MDCNotchedOutline(el);
      };
    }

    if (menuFactory === void 0) {
      menuFactory = function (el) {
        return new _component4.MDCMenu(el);
      };
    }

    if (iconFactory === void 0) {
      iconFactory = function (el) {
        return new _component8.MDCSelectIcon(el);
      };
    }

    if (helperTextFactory === void 0) {
      helperTextFactory = function (el) {
        return new _component7.MDCSelectHelperText(el);
      };
    }

    this.selectAnchor = this.root.querySelector(_constants3.strings.SELECT_ANCHOR_SELECTOR);
    this.selectedText = this.root.querySelector(_constants3.strings.SELECTED_TEXT_SELECTOR);
    this.hiddenInput = this.root.querySelector(_constants3.strings.HIDDEN_INPUT_SELECTOR);

    if (!this.selectedText) {
      throw new Error('MDCSelect: Missing required element: The following selector must be present: ' + ("'" + _constants3.strings.SELECTED_TEXT_SELECTOR + "'"));
    }

    if (this.selectAnchor.hasAttribute(_constants3.strings.ARIA_CONTROLS)) {
      var helperTextElement = document.getElementById(this.selectAnchor.getAttribute(_constants3.strings.ARIA_CONTROLS));

      if (helperTextElement) {
        this.helperText = helperTextFactory(helperTextElement);
      }
    }

    this.menuSetup(menuFactory);
    var labelElement = this.root.querySelector(_constants3.strings.LABEL_SELECTOR);
    this.label = labelElement ? labelFactory(labelElement) : null;
    var lineRippleElement = this.root.querySelector(_constants3.strings.LINE_RIPPLE_SELECTOR);
    this.lineRipple = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
    var outlineElement = this.root.querySelector(_constants3.strings.OUTLINE_SELECTOR);
    this.outline = outlineElement ? outlineFactory(outlineElement) : null;
    var leadingIcon = this.root.querySelector(_constants3.strings.LEADING_ICON_SELECTOR);

    if (leadingIcon) {
      this.leadingIcon = iconFactory(leadingIcon);
    }

    if (!this.root.classList.contains(_constants3.cssClasses.OUTLINED)) {
      this.ripple = this.createRipple();
    }
  };
  /**
   * Initializes the select's event listeners and internal state based
   * on the environment's state.
   */


  MDCSelect.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleFocus = function () {
      _this.foundation.handleFocus();
    };

    this.handleBlur = function () {
      _this.foundation.handleBlur();
    };

    this.handleClick = function (evt) {
      _this.selectAnchor.focus();

      _this.foundation.handleClick(_this.getNormalizedXCoordinate(evt));
    };

    this.handleKeydown = function (evt) {
      _this.foundation.handleKeydown(evt);
    };

    this.handleMenuItemAction = function (evt) {
      _this.foundation.handleMenuItemAction(evt.detail.index);
    };

    this.handleMenuOpened = function () {
      _this.foundation.handleMenuOpened();
    };

    this.handleMenuClosed = function () {
      _this.foundation.handleMenuClosed();
    };

    this.handleMenuClosing = function () {
      _this.foundation.handleMenuClosing();
    };

    this.selectAnchor.addEventListener('focus', this.handleFocus);
    this.selectAnchor.addEventListener('blur', this.handleBlur);
    this.selectAnchor.addEventListener('click', this.handleClick);
    this.selectAnchor.addEventListener('keydown', this.handleKeydown);
    this.menu.listen(menuSurfaceConstants.strings.CLOSED_EVENT, this.handleMenuClosed);
    this.menu.listen(menuSurfaceConstants.strings.CLOSING_EVENT, this.handleMenuClosing);
    this.menu.listen(menuSurfaceConstants.strings.OPENED_EVENT, this.handleMenuOpened);
    this.menu.listen(menuConstants.strings.SELECTED_EVENT, this.handleMenuItemAction);

    if (this.hiddenInput) {
      if (this.hiddenInput.value) {
        // If the hidden input already has a value, use it to restore the
        // select's value. This can happen e.g. if the user goes back or (in
        // some browsers) refreshes the page.
        this.foundation.setValue(this.hiddenInput.value,
        /** skipNotify */
        true);
        this.foundation.layout();
        return;
      }

      this.hiddenInput.value = this.value;
    }
  };

  MDCSelect.prototype.destroy = function () {
    this.selectAnchor.removeEventListener('focus', this.handleFocus);
    this.selectAnchor.removeEventListener('blur', this.handleBlur);
    this.selectAnchor.removeEventListener('keydown', this.handleKeydown);
    this.selectAnchor.removeEventListener('click', this.handleClick);
    this.menu.unlisten(menuSurfaceConstants.strings.CLOSED_EVENT, this.handleMenuClosed);
    this.menu.unlisten(menuSurfaceConstants.strings.OPENED_EVENT, this.handleMenuOpened);
    this.menu.unlisten(menuConstants.strings.SELECTED_EVENT, this.handleMenuItemAction);
    this.menu.destroy();

    if (this.ripple) {
      this.ripple.destroy();
    }

    if (this.outline) {
      this.outline.destroy();
    }

    if (this.leadingIcon) {
      this.leadingIcon.destroy();
    }

    if (this.helperText) {
      this.helperText.destroy();
    }

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCSelect.prototype, "value", {
    get: function () {
      return this.foundation.getValue();
    },
    set: function (value) {
      this.foundation.setValue(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
    get: function () {
      return this.foundation.getSelectedIndex();
    },
    set: function (selectedIndex) {
      this.foundation.setSelectedIndex(selectedIndex,
      /** closeMenu */
      true);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "disabled", {
    get: function () {
      return this.foundation.getDisabled();
    },
    set: function (disabled) {
      this.foundation.setDisabled(disabled);

      if (this.hiddenInput) {
        this.hiddenInput.disabled = disabled;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
    set: function (label) {
      this.foundation.setLeadingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
    /**
     * Sets the text content of the leading icon.
     */
    set: function (content) {
      this.foundation.setLeadingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
    /**
     * Sets the text content of the helper text.
     */
    set: function (content) {
      this.foundation.setHelperTextContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "useDefaultValidation", {
    /**
     * Enables or disables the default validation scheme where a required select
     * must be non-empty. Set to false for custom validation.
     * @param useDefaultValidation Set this to false to ignore default
     *     validation scheme.
     */
    set: function (useDefaultValidation) {
      this.foundation.setUseDefaultValidation(useDefaultValidation);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "valid", {
    /**
     * Checks if the select is in a valid state.
     */
    get: function () {
      return this.foundation.isValid();
    },

    /**
     * Sets the current invalid state of the select.
     */
    set: function (isValid) {
      this.foundation.setValid(isValid);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "required", {
    /**
     * Returns whether the select is required.
     */
    get: function () {
      return this.foundation.getRequired();
    },

    /**
     * Sets the control to the required state.
     */
    set: function (isRequired) {
      this.foundation.setRequired(isRequired);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Re-calculates if the notched outline should be notched and if the label
   * should float.
   */

  MDCSelect.prototype.layout = function () {
    this.foundation.layout();
  };
  /**
   * Synchronizes the list of options with the state of the foundation. Call
   * this whenever menu options are dynamically updated.
   */


  MDCSelect.prototype.layoutOptions = function () {
    this.foundation.layoutOptions();
    this.menu.layout(); // Update cached menuItemValues for adapter.

    this.menuItemValues = this.menu.items.map(function (el) {
      return el.getAttribute(_constants3.strings.VALUE_ATTR) || '';
    });

    if (this.hiddenInput) {
      this.hiddenInput.value = this.value;
    }
  };

  MDCSelect.prototype.getDefaultFoundation = function () {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    var adapter = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, this.getSelectAdapterMethods()), this.getCommonAdapterMethods()), this.getOutlineAdapterMethods()), this.getLabelAdapterMethods());
    return new _foundation2.MDCSelectFoundation(adapter, this.getFoundationMap());
  };
  /**
   * Handles setup for the menu.
   */


  MDCSelect.prototype.menuSetup = function (menuFactory) {
    this.menuElement = this.root.querySelector(_constants3.strings.MENU_SELECTOR);
    this.menu = menuFactory(this.menuElement);
    this.menu.hasTypeahead = true;
    this.menu.singleSelection = true;
    this.menuItemValues = this.menu.items.map(function (el) {
      return el.getAttribute(_constants3.strings.VALUE_ATTR) || '';
    });
  };

  MDCSelect.prototype.createRipple = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = (0, _tslib.__assign)((0, _tslib.__assign)({}, _component6.MDCRipple.createAdapter({
      root: this.selectAnchor
    })), {
      registerInteractionHandler: function (evtType, handler) {
        _this.selectAnchor.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        _this.selectAnchor.removeEventListener(evtType, handler);
      }
    }); // tslint:enable:object-literal-sort-keys

    return new _component6.MDCRipple(this.selectAnchor, new _foundation.MDCRippleFoundation(adapter));
  };

  MDCSelect.prototype.getSelectAdapterMethods = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      getMenuItemAttr: function (menuItem, attr) {
        return menuItem.getAttribute(attr);
      },
      setSelectedText: function (text) {
        _this.selectedText.textContent = text;
      },
      isSelectAnchorFocused: function () {
        return document.activeElement === _this.selectAnchor;
      },
      getSelectAnchorAttr: function (attr) {
        return _this.selectAnchor.getAttribute(attr);
      },
      setSelectAnchorAttr: function (attr, value) {
        _this.selectAnchor.setAttribute(attr, value);
      },
      removeSelectAnchorAttr: function (attr) {
        _this.selectAnchor.removeAttribute(attr);
      },
      addMenuClass: function (className) {
        _this.menuElement.classList.add(className);
      },
      removeMenuClass: function (className) {
        _this.menuElement.classList.remove(className);
      },
      openMenu: function () {
        _this.menu.open = true;
      },
      closeMenu: function () {
        _this.menu.open = false;
      },
      getAnchorElement: function () {
        return _this.root.querySelector(_constants3.strings.SELECT_ANCHOR_SELECTOR);
      },
      setMenuAnchorElement: function (anchorEl) {
        _this.menu.setAnchorElement(anchorEl);
      },
      setMenuAnchorCorner: function (anchorCorner) {
        _this.menu.setAnchorCorner(anchorCorner);
      },
      setMenuWrapFocus: function (wrapFocus) {
        _this.menu.wrapFocus = wrapFocus;
      },
      getSelectedIndex: function () {
        var index = _this.menu.selectedIndex;
        return index instanceof Array ? index[0] : index;
      },
      setSelectedIndex: function (index) {
        _this.menu.selectedIndex = index;
      },
      focusMenuItemAtIndex: function (index) {
        _this.menu.items[index].focus();
      },
      getMenuItemCount: function () {
        return _this.menu.items.length;
      },
      // Cache menu item values. layoutOptions() updates this cache.
      getMenuItemValues: function () {
        return _this.menuItemValues;
      },
      getMenuItemTextAtIndex: function (index) {
        return _this.menu.getPrimaryTextAtIndex(index);
      },
      isTypeaheadInProgress: function () {
        return _this.menu.typeaheadInProgress;
      },
      typeaheadMatchItem: function (nextChar, startingIndex) {
        return _this.menu.typeaheadMatchItem(nextChar, startingIndex);
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getCommonAdapterMethods = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      addClass: function (className) {
        _this.root.classList.add(className);
      },
      removeClass: function (className) {
        _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      setRippleCenter: function (normalizedX) {
        _this.lineRipple && _this.lineRipple.setRippleCenter(normalizedX);
      },
      activateBottomLine: function () {
        _this.lineRipple && _this.lineRipple.activate();
      },
      deactivateBottomLine: function () {
        _this.lineRipple && _this.lineRipple.deactivate();
      },
      notifyChange: function (value) {
        var index = _this.selectedIndex;

        _this.emit(_constants3.strings.CHANGE_EVENT, {
          value: value,
          index: index
        }, true
        /* shouldBubble  */
        );

        if (_this.hiddenInput) {
          _this.hiddenInput.value = value;
        }
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getOutlineAdapterMethods = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      hasOutline: function () {
        return Boolean(_this.outline);
      },
      notchOutline: function (labelWidth) {
        _this.outline && _this.outline.notch(labelWidth);
      },
      closeOutline: function () {
        _this.outline && _this.outline.closeNotch();
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getLabelAdapterMethods = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      hasLabel: function () {
        return !!_this.label;
      },
      floatLabel: function (shouldFloat) {
        _this.label && _this.label.float(shouldFloat);
      },
      getLabelWidth: function () {
        return _this.label ? _this.label.getWidth() : 0;
      },
      setLabelRequired: function (isRequired) {
        _this.label && _this.label.setRequired(isRequired);
      }
    }; // tslint:enable:object-literal-sort-keys
  };
  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   */


  MDCSelect.prototype.getNormalizedXCoordinate = function (evt) {
    var targetClientRect = evt.target.getBoundingClientRect();
    var xCoordinate = this.isTouchEvent(evt) ? evt.touches[0].clientX : evt.clientX;
    return xCoordinate - targetClientRect.left;
  };

  MDCSelect.prototype.isTouchEvent = function (evt) {
    return Boolean(evt.touches);
  };
  /**
   * Returns a map of all subcomponents to subfoundations.
   */


  MDCSelect.prototype.getFoundationMap = function () {
    return {
      helperText: this.helperText ? this.helperText.foundationForSelect : undefined,
      leadingIcon: this.leadingIcon ? this.leadingIcon.foundationForSelect : undefined
    };
  };

  return MDCSelect;
}(_component.MDCComponent);

exports.MDCSelect = MDCSelect;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/floating-label/component":"../../../node_modules/@material/floating-label/component.js","@material/line-ripple/component":"../../../node_modules/@material/line-ripple/component.js","@material/menu-surface/constants":"../../../node_modules/@material/menu-surface/constants.js","@material/menu/component":"../../../node_modules/@material/menu/component.js","@material/menu/constants":"../../../node_modules/@material/menu/constants.js","@material/notched-outline/component":"../../../node_modules/@material/notched-outline/component.js","@material/ripple/component":"../../../node_modules/@material/ripple/component.js","@material/ripple/foundation":"../../../node_modules/@material/ripple/foundation.js","./constants":"../../../node_modules/@material/select/constants.js","./foundation":"../../../node_modules/@material/select/foundation.js","./helper-text/component":"../../../node_modules/@material/select/helper-text/component.js","./icon/component":"../../../node_modules/@material/select/icon/component.js"}],"scripts/SaveEntry.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function SaveEntry(initialKey, project, valuePairs, typ, key) {
  var obj = {
    InitialKey: initialKey,
    ValuePairs: valuePairs,
    Typ: typ,
    Key: key,
    Project: project
  };
  document.body.setAttribute('data-key', valuePairs[0].Value);
  return window.fetch('/saveEntry', {
    method: 'POST',
    body: JSON.stringify(obj)
  }).then(function (response) {
    console.log(response);

    if (response.status === 200) {
      return true;
    }
  });
}

exports.default = SaveEntry;
},{}],"scripts/EntryPage.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var component_1 = require("@material/textfield/component");

var component_2 = require("@material/select/component");

var SaveEntry_1 = __importDefault(require("./SaveEntry"));

document.addEventListener('DOMContentLoaded', function () {
  new EntryPage();
});

var EntryPage =
/** @class */
function () {
  function EntryPage() {
    var _this = this;

    this._valueFields = [];
    this._initialKey = "";
    this.project = new URLSearchParams(window.location.search).get('project');
    this._keyField = new component_1.MDCTextField(document.querySelector('#keyField'));
    this._typeSelect = new component_2.MDCSelect(document.querySelector('#typeSelect'));

    this._typeSelect.listen('MDCSelect:change', function () {
      fetch('/typeFields/' + _this._typeSelect.value + '?project=' + _this.project).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.SetupFieldsForType(data);
      });
    });

    this._templateTF = document.querySelector('#template');

    this._templateTF.remove();

    this._fieldsArea = document.querySelector('#fieldsArea');
    document.querySelector('#saveEntry').addEventListener('click', function () {
      _this.Save();
    });
    this._prevValuesElement = document.querySelector('#values');

    var key = this._prevValuesElement.getAttribute('data-key');

    if (key) {
      this._keyField.value = key;
      this._initialKey = key;
      this._typeSelect.value = this._prevValuesElement.getAttribute('data-typ');
    }
  }

  EntryPage.prototype.SetupFieldsForType = function (obj) {
    var _this = this;

    this._fieldsArea.querySelectorAll('*').forEach(function (el) {
      return el.remove();
    });

    this._valueFields = []; //TODO: Migrate values on typechange

    this._fieldNames = [];
    obj.Fields.forEach(function (field) {
      var element = _this._templateTF.cloneNode(true);

      element.querySelector('.mdc-floating-label').innerHTML = field.Field;
      var newTF = new component_1.MDCTextField(element);

      _this._fieldsArea.append(element);

      _this._valueFields.push(newTF);

      _this._fieldNames.push(field.Field);
    });
    obj.CiteFields.forEach(function (field) {
      var found = false;
      obj.Fields.forEach(function (mf) {
        if (mf.Field === field.Field) {
          found = true;
        }
      });

      if (!found) {
        var element = _this._templateTF.cloneNode(true);

        element.querySelector('.mdc-floating-label').innerHTML = field.Field;
        var newTF = new component_1.MDCTextField(element);

        _this._fieldsArea.append(element);

        _this._valueFields.push(newTF);

        _this._fieldNames.push(field.Field);
      }
    });

    for (var i = 0; i < this._valueFields.length; i++) {
      if (this._prevValuesElement.children[i]) {
        this._valueFields[i].value = this._prevValuesElement.children[i].innerHTML;
      }
    }
  };

  EntryPage.prototype.Save = function () {
    var _this = this;

    var valuePairs = [];

    for (var i = 0; i < this._valueFields.length; i++) {
      valuePairs.push({
        Attr: this._fieldNames[i],
        Value: this._valueFields[i].value
      });
    }

    (0, SaveEntry_1.default)(this._initialKey, this.project, valuePairs, this._typeSelect.value, this._keyField.value).then(function (valid) {
      if (valid) {
        console.log('valid');
        window.parent.reloadMain();
        window.location.href = '/editEntry?entry=' + _this._keyField.value + '&project=' + _this.project;
      }
    });
  };

  return EntryPage;
}();
},{"@material/textfield/component":"../../../node_modules/@material/textfield/component.js","@material/select/component":"../../../node_modules/@material/select/component.js","./SaveEntry":"scripts/SaveEntry.ts"}]},{},["scripts/EntryPage.ts"], null)
//# sourceMappingURL=/EntryPage.9c7eaa9f.js.map