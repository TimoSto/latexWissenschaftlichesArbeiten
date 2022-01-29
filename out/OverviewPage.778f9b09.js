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
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","./foundation":"../../../node_modules/@material/base/foundation.js"}],"../../../node_modules/@material/menu-surface/constants.js":[function(require,module,exports) {
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
},{}],"../../../node_modules/@material/menu-surface/foundation.js":[function(require,module,exports) {
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
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","./constants":"../../../node_modules/@material/menu-surface/constants.js","./foundation":"../../../node_modules/@material/menu-surface/foundation.js","@material/animation/util":"../../../node_modules/@material/animation/util.js"}],"../../../node_modules/@material/menu-surface/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});
},{"./component":"../../../node_modules/@material/menu-surface/component.js","./constants":"../../../node_modules/@material/menu-surface/constants.js","./foundation":"../../../node_modules/@material/menu-surface/foundation.js"}],"../../../node_modules/@material/dom/focus-trap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusTrap = void 0;

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
var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
/**
 * Utility to trap focus in a given root element, e.g. for modal components such
 * as dialogs. The root should have at least one focusable child element,
 * for setting initial focus when trapping focus.
 * Also tracks the previously focused element, and restores focus to that
 * element when releasing focus.
 */

var FocusTrap =
/** @class */
function () {
  function FocusTrap(root, options) {
    if (options === void 0) {
      options = {};
    }

    this.root = root;
    this.options = options; // Previously focused element before trapping focus.

    this.elFocusedBeforeTrapFocus = null;
  }
  /**
   * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
   * otherwises sets initial focus to the first focusable child element.
   */


  FocusTrap.prototype.trapFocus = function () {
    var focusableEls = this.getFocusableElements(this.root);

    if (focusableEls.length === 0) {
      throw new Error('FocusTrap: Element must have at least one focusable child.');
    }

    this.elFocusedBeforeTrapFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.wrapTabFocus(this.root, focusableEls);

    if (!this.options.skipInitialFocus) {
      this.focusInitialElement(focusableEls, this.options.initialFocusEl);
    }
  };
  /**
   * Releases focus from `root`. Also restores focus to the previously focused
   * element.
   */


  FocusTrap.prototype.releaseFocus = function () {
    [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS)).forEach(function (sentinelEl) {
      sentinelEl.parentElement.removeChild(sentinelEl);
    });

    if (this.elFocusedBeforeTrapFocus) {
      this.elFocusedBeforeTrapFocus.focus();
    }
  };
  /**
   * Wraps tab focus within `el` by adding two hidden sentinel divs which are
   * used to mark the beginning and the end of the tabbable region. When
   * focused, these sentinel elements redirect focus to the first/last
   * children elements of the tabbable region, ensuring that focus is trapped
   * within that region.
   */


  FocusTrap.prototype.wrapTabFocus = function (el, focusableEls) {
    var sentinelStart = this.createSentinel();
    var sentinelEnd = this.createSentinel();
    sentinelStart.addEventListener('focus', function () {
      if (focusableEls.length > 0) {
        focusableEls[focusableEls.length - 1].focus();
      }
    });
    sentinelEnd.addEventListener('focus', function () {
      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    });
    el.insertBefore(sentinelStart, el.children[0]);
    el.appendChild(sentinelEnd);
  };
  /**
   * Focuses on `initialFocusEl` if defined and a child of the root element.
   * Otherwise, focuses on the first focusable child element of the root.
   */


  FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
    var focusIndex = 0;

    if (initialFocusEl) {
      focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
    }

    focusableEls[focusIndex].focus();
  };

  FocusTrap.prototype.getFocusableElements = function (root) {
    var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
    return focusableEls.filter(function (el) {
      var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' || el.getAttribute('disabled') != null || el.getAttribute('hidden') != null || el.getAttribute('aria-hidden') === 'true';
      var isTabbableAndVisible = el.tabIndex >= 0 && el.getBoundingClientRect().width > 0 && !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
      var isProgrammaticallyHidden = false;

      if (isTabbableAndVisible) {
        var style = getComputedStyle(el);
        isProgrammaticallyHidden = style.display === 'none' || style.visibility === 'hidden';
      }

      return isTabbableAndVisible && !isProgrammaticallyHidden;
    });
  };

  FocusTrap.prototype.createSentinel = function () {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('tabindex', '0'); // Don't announce in screen readers.

    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.classList.add(FOCUS_SENTINEL_CLASS);
    return sentinel;
  };

  return FocusTrap;
}();

exports.FocusTrap = FocusTrap;
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
},{}],"../../../node_modules/@material/dom/events.js":[function(require,module,exports) {
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
},{}],"../../../node_modules/@material/ripple/constants.js":[function(require,module,exports) {
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
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/events":"../../../node_modules/@material/dom/events.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","./foundation":"../../../node_modules/@material/ripple/foundation.js","./util":"../../../node_modules/@material/ripple/util.js"}],"../../../node_modules/@material/animation/animationframe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationFrame = void 0;

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
 * AnimationFrame provides a user-friendly abstraction around requesting
 * and canceling animation frames.
 */
var AnimationFrame =
/** @class */
function () {
  function AnimationFrame() {
    this.rafIDs = new Map();
  }
  /**
   * Requests an animation frame. Cancels any existing frame with the same key.
   * @param {string} key The key for this callback.
   * @param {FrameRequestCallback} callback The callback to be executed.
   */


  AnimationFrame.prototype.request = function (key, callback) {
    var _this = this;

    this.cancel(key);
    var frameID = requestAnimationFrame(function (frame) {
      _this.rafIDs.delete(key); // Callback must come *after* the key is deleted so that nested calls to
      // request with the same key are not deleted.


      callback(frame);
    });
    this.rafIDs.set(key, frameID);
  };
  /**
   * Cancels a queued callback with the given key.
   * @param {string} key The key for this callback.
   */


  AnimationFrame.prototype.cancel = function (key) {
    var rafID = this.rafIDs.get(key);

    if (rafID) {
      cancelAnimationFrame(rafID);
      this.rafIDs.delete(key);
    }
  };
  /**
   * Cancels all queued callback.
   */


  AnimationFrame.prototype.cancelAll = function () {
    var _this = this; // Need to use forEach because it's the only iteration method supported
    // by IE11. Suppress the underscore because we don't need it.
    // tslint:disable-next-line:enforce-name-casing


    this.rafIDs.forEach(function (_, key) {
      _this.cancel(key);
    });
  };
  /**
   * Returns the queue of unexecuted callback keys.
   */


  AnimationFrame.prototype.getQueue = function () {
    var queue = []; // Need to use forEach because it's the only iteration method supported
    // by IE11. Suppress the underscore because we don't need it.
    // tslint:disable-next-line:enforce-name-casing

    this.rafIDs.forEach(function (_, key) {
      queue.push(key);
    });
    return queue;
  };

  return AnimationFrame;
}();

exports.AnimationFrame = AnimationFrame;
},{}],"../../../node_modules/@material/dialog/constants.js":[function(require,module,exports) {
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
  CLOSING: 'mdc-dialog--closing',
  OPEN: 'mdc-dialog--open',
  OPENING: 'mdc-dialog--opening',
  SCROLLABLE: 'mdc-dialog--scrollable',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  STACKED: 'mdc-dialog--stacked',
  FULLSCREEN: 'mdc-dialog--fullscreen',
  // Class for showing a scroll divider on full-screen dialog header element.
  // Should only be displayed on scrollable content, when the dialog content is
  // scrolled "underneath" the header.
  SCROLL_DIVIDER_HEADER: 'mdc-dialog-scroll-divider-header',
  // Class for showing a scroll divider on a full-screen dialog footer element.
  // Should only be displayed on scrolalble content, when the dialog content is
  // obscured "underneath" the footer.
  SCROLL_DIVIDER_FOOTER: 'mdc-dialog-scroll-divider-footer'
};
exports.cssClasses = cssClasses;
var strings = {
  ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
  BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
  BUTTON_SELECTOR: '.mdc-dialog__button',
  CLOSED_EVENT: 'MDCDialog:closed',
  CLOSE_ACTION: 'close',
  CLOSING_EVENT: 'MDCDialog:closing',
  CONTAINER_SELECTOR: '.mdc-dialog__container',
  CONTENT_SELECTOR: '.mdc-dialog__content',
  DESTROY_ACTION: 'destroy',
  INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
  OPENED_EVENT: 'MDCDialog:opened',
  OPENING_EVENT: 'MDCDialog:opening',
  SCRIM_SELECTOR: '.mdc-dialog__scrim',
  SUPPRESS_DEFAULT_PRESS_SELECTOR: ['textarea', '.mdc-menu .mdc-list-item'].join(', '),
  SURFACE_SELECTOR: '.mdc-dialog__surface'
};
exports.strings = strings;
var numbers = {
  DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
  DIALOG_ANIMATION_OPEN_TIME_MS: 150
};
exports.numbers = numbers;
},{}],"../../../node_modules/@material/dialog/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCDialogFoundation = void 0;

var _tslib = require("tslib");

var _animationframe = require("@material/animation/animationframe");

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
var AnimationKeys;

(function (AnimationKeys) {
  AnimationKeys["POLL_SCROLL_POS"] = "poll_scroll_position";
})(AnimationKeys || (AnimationKeys = {}));

var MDCDialogFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDialogFoundation, _super);

  function MDCDialogFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCDialogFoundation.defaultAdapter), adapter)) || this;

    _this.dialogOpen = false;
    _this.isFullscreen = false;
    _this.animationFrame = 0;
    _this.animationTimer = 0;
    _this.layoutFrame = 0;
    _this.escapeKeyAction = _constants.strings.CLOSE_ACTION;
    _this.scrimClickAction = _constants.strings.CLOSE_ACTION;
    _this.autoStackButtons = true;
    _this.areButtonsStacked = false;
    _this.suppressDefaultPressSelector = _constants.strings.SUPPRESS_DEFAULT_PRESS_SELECTOR;
    _this.animFrame = new _animationframe.AnimationFrame();

    _this.contentScrollHandler = function () {
      _this.handleScrollEvent();
    };

    return _this;
  }

  Object.defineProperty(MDCDialogFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
    get: function () {
      return {
        addBodyClass: function () {
          return undefined;
        },
        addClass: function () {
          return undefined;
        },
        areButtonsStacked: function () {
          return false;
        },
        clickDefaultButton: function () {
          return undefined;
        },
        eventTargetMatches: function () {
          return false;
        },
        getActionFromEvent: function () {
          return '';
        },
        getInitialFocusEl: function () {
          return null;
        },
        hasClass: function () {
          return false;
        },
        isContentScrollable: function () {
          return false;
        },
        notifyClosed: function () {
          return undefined;
        },
        notifyClosing: function () {
          return undefined;
        },
        notifyOpened: function () {
          return undefined;
        },
        notifyOpening: function () {
          return undefined;
        },
        releaseFocus: function () {
          return undefined;
        },
        removeBodyClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        reverseButtons: function () {
          return undefined;
        },
        trapFocus: function () {
          return undefined;
        },
        registerContentEventHandler: function () {
          return undefined;
        },
        deregisterContentEventHandler: function () {
          return undefined;
        },
        isScrollableContentAtTop: function () {
          return false;
        },
        isScrollableContentAtBottom: function () {
          return false;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCDialogFoundation.prototype.init = function () {
    if (this.adapter.hasClass(_constants.cssClasses.STACKED)) {
      this.setAutoStackButtons(false);
    }

    this.isFullscreen = this.adapter.hasClass(_constants.cssClasses.FULLSCREEN);
  };

  MDCDialogFoundation.prototype.destroy = function () {
    if (this.dialogOpen) {
      this.close(_constants.strings.DESTROY_ACTION);
    }

    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.handleAnimationTimerEnd();
    }

    if (this.layoutFrame) {
      cancelAnimationFrame(this.layoutFrame);
      this.layoutFrame = 0;
    }

    if (this.isFullscreen && this.adapter.isContentScrollable()) {
      this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
    }
  };

  MDCDialogFoundation.prototype.open = function () {
    var _this = this;

    this.dialogOpen = true;
    this.adapter.notifyOpening();
    this.adapter.addClass(_constants.cssClasses.OPENING);

    if (this.isFullscreen && this.adapter.isContentScrollable()) {
      this.adapter.registerContentEventHandler('scroll', this.contentScrollHandler);
    } // Wait a frame once display is no longer "none", to establish basis for
    // animation


    this.runNextAnimationFrame(function () {
      _this.adapter.addClass(_constants.cssClasses.OPEN);

      _this.adapter.addBodyClass(_constants.cssClasses.SCROLL_LOCK);

      _this.layout();

      _this.animationTimer = setTimeout(function () {
        _this.handleAnimationTimerEnd();

        _this.adapter.trapFocus(_this.adapter.getInitialFocusEl());

        _this.adapter.notifyOpened();
      }, _constants.numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
    });
  };

  MDCDialogFoundation.prototype.close = function (action) {
    var _this = this;

    if (action === void 0) {
      action = '';
    }

    if (!this.dialogOpen) {
      // Avoid redundant close calls (and events), e.g. from keydown on elements
      // that inherently emit click
      return;
    }

    this.dialogOpen = false;
    this.adapter.notifyClosing(action);
    this.adapter.addClass(_constants.cssClasses.CLOSING);
    this.adapter.removeClass(_constants.cssClasses.OPEN);
    this.adapter.removeBodyClass(_constants.cssClasses.SCROLL_LOCK);

    if (this.isFullscreen && this.adapter.isContentScrollable()) {
      this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
    }

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(function () {
      _this.adapter.releaseFocus();

      _this.handleAnimationTimerEnd();

      _this.adapter.notifyClosed(action);
    }, _constants.numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
  };

  MDCDialogFoundation.prototype.isOpen = function () {
    return this.dialogOpen;
  };

  MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
    return this.escapeKeyAction;
  };

  MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
    this.escapeKeyAction = action;
  };

  MDCDialogFoundation.prototype.getScrimClickAction = function () {
    return this.scrimClickAction;
  };

  MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
    this.scrimClickAction = action;
  };

  MDCDialogFoundation.prototype.getAutoStackButtons = function () {
    return this.autoStackButtons;
  };

  MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
    this.autoStackButtons = autoStack;
  };

  MDCDialogFoundation.prototype.getSuppressDefaultPressSelector = function () {
    return this.suppressDefaultPressSelector;
  };

  MDCDialogFoundation.prototype.setSuppressDefaultPressSelector = function (selector) {
    this.suppressDefaultPressSelector = selector;
  };

  MDCDialogFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame) {
      cancelAnimationFrame(this.layoutFrame);
    }

    this.layoutFrame = requestAnimationFrame(function () {
      _this.layoutInternal();

      _this.layoutFrame = 0;
    });
  };
  /** Handles click on the dialog root element. */


  MDCDialogFoundation.prototype.handleClick = function (evt) {
    var isScrim = this.adapter.eventTargetMatches(evt.target, _constants.strings.SCRIM_SELECTOR); // Check for scrim click first since it doesn't require querying ancestors.

    if (isScrim && this.scrimClickAction !== '') {
      this.close(this.scrimClickAction);
    } else {
      var action = this.adapter.getActionFromEvent(evt);

      if (action) {
        this.close(action);
      }
    }
  };
  /** Handles keydown on the dialog root element. */


  MDCDialogFoundation.prototype.handleKeydown = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;

    if (!isEnter) {
      return;
    }

    var action = this.adapter.getActionFromEvent(evt);

    if (action) {
      // Action button callback is handled in `handleClick`,
      // since space/enter keydowns on buttons trigger click events.
      return;
    } // `composedPath` is used here, when available, to account for use cases
    // where a target meant to suppress the default press behaviour
    // may exist in a shadow root.
    // For example, a textarea inside a web component:
    // <mwc-dialog>
    //   <horizontal-layout>
    //     #shadow-root (open)
    //       <mwc-textarea>
    //         #shadow-root (open)
    //           <textarea></textarea>
    //       </mwc-textarea>
    //   </horizontal-layout>
    // </mwc-dialog>


    var target = evt.composedPath ? evt.composedPath()[0] : evt.target;
    var isDefault = this.suppressDefaultPressSelector ? !this.adapter.eventTargetMatches(target, this.suppressDefaultPressSelector) : true;

    if (isEnter && isDefault) {
      this.adapter.clickDefaultButton();
    }
  };
  /** Handles keydown on the document. */


  MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
    var isEscape = evt.key === 'Escape' || evt.keyCode === 27;

    if (isEscape && this.escapeKeyAction !== '') {
      this.close(this.escapeKeyAction);
    }
  };
  /**
   * Handles scroll event on the dialog's content element -- showing a scroll
   * divider on the header or footer based on the scroll position. This handler
   * should only be registered on full-screen dialogs with scrollable content.
   */


  MDCDialogFoundation.prototype.handleScrollEvent = function () {
    var _this = this; // Since scroll events can fire at a high rate, we throttle these events by
    // using requestAnimationFrame.


    this.animFrame.request(AnimationKeys.POLL_SCROLL_POS, function () {
      _this.toggleScrollDividerHeader();

      _this.toggleScrollDividerFooter();
    });
  };

  MDCDialogFoundation.prototype.layoutInternal = function () {
    if (this.autoStackButtons) {
      this.detectStackedButtons();
    }

    this.toggleScrollableClasses();
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd = function () {
    this.animationTimer = 0;
    this.adapter.removeClass(_constants.cssClasses.OPENING);
    this.adapter.removeClass(_constants.cssClasses.CLOSING);
  };
  /**
   * Runs the given logic on the next animation frame, using setTimeout to
   * factor in Firefox reflow behavior.
   */


  MDCDialogFoundation.prototype.runNextAnimationFrame = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(function () {
      _this.animationFrame = 0;
      clearTimeout(_this.animationTimer);
      _this.animationTimer = setTimeout(callback, 0);
    });
  };

  MDCDialogFoundation.prototype.detectStackedButtons = function () {
    // Remove the class first to let us measure the buttons' natural positions.
    this.adapter.removeClass(_constants.cssClasses.STACKED);
    var areButtonsStacked = this.adapter.areButtonsStacked();

    if (areButtonsStacked) {
      this.adapter.addClass(_constants.cssClasses.STACKED);
    }

    if (areButtonsStacked !== this.areButtonsStacked) {
      this.adapter.reverseButtons();
      this.areButtonsStacked = areButtonsStacked;
    }
  };

  MDCDialogFoundation.prototype.toggleScrollableClasses = function () {
    // Remove the class first to let us measure the natural height of the
    // content.
    this.adapter.removeClass(_constants.cssClasses.SCROLLABLE);

    if (this.adapter.isContentScrollable()) {
      this.adapter.addClass(_constants.cssClasses.SCROLLABLE);

      if (this.isFullscreen) {
        // If dialog is full-screen and scrollable, check if a scroll divider
        // should be shown.
        this.toggleScrollDividerHeader();
        this.toggleScrollDividerFooter();
      }
    }
  };

  MDCDialogFoundation.prototype.toggleScrollDividerHeader = function () {
    if (!this.adapter.isScrollableContentAtTop()) {
      this.adapter.addClass(_constants.cssClasses.SCROLL_DIVIDER_HEADER);
    } else if (this.adapter.hasClass(_constants.cssClasses.SCROLL_DIVIDER_HEADER)) {
      this.adapter.removeClass(_constants.cssClasses.SCROLL_DIVIDER_HEADER);
    }
  };

  MDCDialogFoundation.prototype.toggleScrollDividerFooter = function () {
    if (!this.adapter.isScrollableContentAtBottom()) {
      this.adapter.addClass(_constants.cssClasses.SCROLL_DIVIDER_FOOTER);
    } else if (this.adapter.hasClass(_constants.cssClasses.SCROLL_DIVIDER_FOOTER)) {
      this.adapter.removeClass(_constants.cssClasses.SCROLL_DIVIDER_FOOTER);
    }
  };

  return MDCDialogFoundation;
}(_foundation.MDCFoundation);

exports.MDCDialogFoundation = MDCDialogFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCDialogFoundation;
exports.default = _default;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/animation/animationframe":"../../../node_modules/@material/animation/animationframe.js","@material/base/foundation":"../../../node_modules/@material/base/foundation.js","./constants":"../../../node_modules/@material/dialog/constants.js"}],"../../../node_modules/@material/dialog/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areTopsMisaligned = areTopsMisaligned;
exports.createFocusTrapInstance = createFocusTrapInstance;
exports.isScrollAtBottom = isScrollAtBottom;
exports.isScrollAtTop = isScrollAtTop;
exports.isScrollable = isScrollable;

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
function createFocusTrapInstance(surfaceEl, focusTrapFactory, initialFocusEl) {
  return focusTrapFactory(surfaceEl, {
    initialFocusEl: initialFocusEl
  });
}

function isScrollable(el) {
  return el ? el.scrollHeight > el.offsetHeight : false;
}
/**
 * For scrollable content, returns true if the content has not been scrolled
 * (that is, the scroll content is as the "top"). This is used in full-screen
 * dialogs, where the scroll divider is expected only to appear once the
 * content has been scrolled "underneath" the header bar.
 */


function isScrollAtTop(el) {
  return el ? el.scrollTop === 0 : false;
}
/**
 * For scrollable content, returns true if the content has been scrolled all the
 * way to the bottom. This is used in full-screen dialogs, where the footer
 * scroll divider is expected only to appear when the content is "cut-off" by
 * the footer bar.
 */


function isScrollAtBottom(el) {
  return el ? Math.ceil(el.scrollHeight - el.scrollTop) === el.clientHeight : false;
}

function areTopsMisaligned(els) {
  var tops = new Set();
  [].forEach.call(els, function (el) {
    return tops.add(el.offsetTop);
  });
  return tops.size > 1;
}
},{}],"../../../node_modules/@material/dialog/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCDialog = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _focusTrap = require("@material/dom/focus-trap");

var _ponyfill = require("@material/dom/ponyfill");

var _component2 = require("@material/ripple/component");

var _foundation = require("./foundation");

var util = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var strings = _foundation.MDCDialogFoundation.strings;

var MDCDialog =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDialog, _super);

  function MDCDialog() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCDialog.prototype, "isOpen", {
    get: function () {
      return this.foundation.isOpen();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
    get: function () {
      return this.foundation.getEscapeKeyAction();
    },
    set: function (action) {
      this.foundation.setEscapeKeyAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
    get: function () {
      return this.foundation.getScrimClickAction();
    },
    set: function (action) {
      this.foundation.setScrimClickAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
    get: function () {
      return this.foundation.getAutoStackButtons();
    },
    set: function (autoStack) {
      this.foundation.setAutoStackButtons(autoStack);
    },
    enumerable: true,
    configurable: true
  });

  MDCDialog.attachTo = function (root) {
    return new MDCDialog(root);
  };

  MDCDialog.prototype.initialize = function (focusTrapFactory) {
    var e_1, _a;

    if (focusTrapFactory === void 0) {
      focusTrapFactory = function (el, focusOptions) {
        return new _focusTrap.FocusTrap(el, focusOptions);
      };
    }

    var container = this.root.querySelector(strings.CONTAINER_SELECTOR);

    if (!container) {
      throw new Error("Dialog component requires a " + strings.CONTAINER_SELECTOR + " container element");
    }

    this.container = container;
    this.content = this.root.querySelector(strings.CONTENT_SELECTOR);
    this.buttons = [].slice.call(this.root.querySelectorAll(strings.BUTTON_SELECTOR));
    this.defaultButton = this.root.querySelector("[" + strings.BUTTON_DEFAULT_ATTRIBUTE + "]");
    this.focusTrapFactory = focusTrapFactory;
    this.buttonRipples = [];

    try {
      for (var _b = (0, _tslib.__values)(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
        var buttonEl = _c.value;
        this.buttonRipples.push(new _component2.MDCRipple(buttonEl));
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  MDCDialog.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.focusTrap = util.createFocusTrapInstance(this.container, this.focusTrapFactory, this.getInitialFocusEl() || undefined);
    this.handleClick = this.foundation.handleClick.bind(this.foundation);
    this.handleKeydown = this.foundation.handleKeydown.bind(this.foundation);
    this.handleDocumentKeydown = this.foundation.handleDocumentKeydown.bind(this.foundation);
    this.handleLayout = this.layout.bind(this);
    var LAYOUT_EVENTS = ['resize', 'orientationchange'];

    this.handleOpening = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        window.addEventListener(evtType, _this.handleLayout);
      });
      document.addEventListener('keydown', _this.handleDocumentKeydown);
    };

    this.handleClosing = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        window.removeEventListener(evtType, _this.handleLayout);
      });
      document.removeEventListener('keydown', _this.handleDocumentKeydown);
    };

    this.listen('click', this.handleClick);
    this.listen('keydown', this.handleKeydown);
    this.listen(strings.OPENING_EVENT, this.handleOpening);
    this.listen(strings.CLOSING_EVENT, this.handleClosing);
  };

  MDCDialog.prototype.destroy = function () {
    this.unlisten('click', this.handleClick);
    this.unlisten('keydown', this.handleKeydown);
    this.unlisten(strings.OPENING_EVENT, this.handleOpening);
    this.unlisten(strings.CLOSING_EVENT, this.handleClosing);
    this.handleClosing();
    this.buttonRipples.forEach(function (ripple) {
      ripple.destroy();
    });

    _super.prototype.destroy.call(this);
  };

  MDCDialog.prototype.layout = function () {
    this.foundation.layout();
  };

  MDCDialog.prototype.open = function () {
    this.foundation.open();
  };

  MDCDialog.prototype.close = function (action) {
    if (action === void 0) {
      action = '';
    }

    this.foundation.close(action);
  };

  MDCDialog.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addBodyClass: function (className) {
        return document.body.classList.add(className);
      },
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      areButtonsStacked: function () {
        return util.areTopsMisaligned(_this.buttons);
      },
      clickDefaultButton: function () {
        if (_this.defaultButton) {
          _this.defaultButton.click();
        }
      },
      eventTargetMatches: function (target, selector) {
        return target ? (0, _ponyfill.matches)(target, selector) : false;
      },
      getActionFromEvent: function (evt) {
        if (!evt.target) {
          return '';
        }

        var element = (0, _ponyfill.closest)(evt.target, "[" + strings.ACTION_ATTRIBUTE + "]");
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      getInitialFocusEl: function () {
        return _this.getInitialFocusEl();
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      isContentScrollable: function () {
        return util.isScrollable(_this.content);
      },
      notifyClosed: function (action) {
        return _this.emit(strings.CLOSED_EVENT, action ? {
          action: action
        } : {});
      },
      notifyClosing: function (action) {
        return _this.emit(strings.CLOSING_EVENT, action ? {
          action: action
        } : {});
      },
      notifyOpened: function () {
        return _this.emit(strings.OPENED_EVENT, {});
      },
      notifyOpening: function () {
        return _this.emit(strings.OPENING_EVENT, {});
      },
      releaseFocus: function () {
        _this.focusTrap.releaseFocus();
      },
      removeBodyClass: function (className) {
        return document.body.classList.remove(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      reverseButtons: function () {
        _this.buttons.reverse();

        _this.buttons.forEach(function (button) {
          button.parentElement.appendChild(button);
        });
      },
      trapFocus: function () {
        _this.focusTrap.trapFocus();
      },
      registerContentEventHandler: function (evt, handler) {
        if (_this.content instanceof HTMLElement) {
          _this.content.addEventListener(evt, handler);
        }
      },
      deregisterContentEventHandler: function (evt, handler) {
        if (_this.content instanceof HTMLElement) {
          _this.content.removeEventListener(evt, handler);
        }
      },
      isScrollableContentAtTop: function () {
        return util.isScrollAtTop(_this.content);
      },
      isScrollableContentAtBottom: function () {
        return util.isScrollAtBottom(_this.content);
      }
    };
    return new _foundation.MDCDialogFoundation(adapter);
  };

  MDCDialog.prototype.getInitialFocusEl = function () {
    return this.root.querySelector("[" + strings.INITIAL_FOCUS_ATTRIBUTE + "]");
  };

  return MDCDialog;
}(_component.MDCComponent);

exports.MDCDialog = MDCDialog;
},{"tslib":"../../../node_modules/tslib/tslib.es6.js","@material/base/component":"../../../node_modules/@material/base/component.js","@material/dom/focus-trap":"../../../node_modules/@material/dom/focus-trap.js","@material/dom/ponyfill":"../../../node_modules/@material/dom/ponyfill.js","@material/ripple/component":"../../../node_modules/@material/ripple/component.js","./foundation":"../../../node_modules/@material/dialog/foundation.js","./util":"../../../node_modules/@material/dialog/util.js"}],"scripts/OverviewPage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var menu_surface_1 = require("@material/menu-surface");

var component_1 = require("@material/dialog/component");

var OverviewPage =
/** @class */
function () {
  function OverviewPage() {
    var _this = this;

    document.addEventListener('DOMContentLoaded', function () {
      _this.init();

      var params = new URLSearchParams(document.location.search);
      var name = params.get("project");

      if (name) {
        _this.setMain("/projects/" + name);
      }

      window.setMain = function (uri) {
        _this.setMain(uri);
      };

      window.setEdit = function (uri) {
        _this.setEdit(uri);
      };

      window.reloadMain = function () {
        _this._mainFrame.contentWindow.location.reload();
      };

      document.querySelector('#close_edit').addEventListener('click', function () {
        _this._editArea.classList.remove('editArea--open');
      });
      document.querySelectorAll('[data-edit-value]').forEach(function (el) {
        var project = el.getAttribute('data-edit-value');
        el.addEventListener('click', function (e) {
          if (e.target.getAttribute('data-delete-value')) return;
          window.location.replace('/overview?project=' + project); //this.setMain('/projects/'+project);
        });
      });
      document.querySelectorAll('[data-delete-value]').forEach(function (el) {
        var project = el.getAttribute('data-delete-value');
        el.addEventListener('click', function (e) {
          fetch('/deleteProject?project=' + project).then(function (resp) {
            if (resp.status === 200) {
              window.location.reload();
            }
          }); //this.setMain('/projects/'+project);
        });
      });
      var menu = new menu_surface_1.MDCMenuSurface(document.querySelector('.mdc-menu')); //menu.setAnchorElement(document.querySelector('.mdc-top-app-bar__section--align-end button'));

      menu.setAnchorCorner(1);
      var open = false;
      menu.listen('MDCMenuSurface:opened', function () {
        open = true;
      });
      menu.listen('MDCMenuSurface:closed', function () {
        open = false;
      });
      document.querySelector('.mdc-top-app-bar__section--align-end button').addEventListener('click', function () {
        if (!open) {
          menu.open();
        }
      });
      var dialog = new component_1.MDCDialog(document.querySelector('.mdc-dialog'));
      var dialogContents = document.querySelectorAll('.mdc-dialog__content div');
      var dialog_title = document.querySelector('.mdc-dialog__title');
      document.querySelectorAll('.mdc-menu li').forEach(function (el, i) {
        var index = i;
        var text = el.querySelector('.mdc-list-item__text').innerHTML;
        el.addEventListener('click', function () {
          dialog_title.innerHTML = text;
          dialogContents.forEach(function (dc, n) {
            dc.style.display = n === index ? 'block' : 'none';
          });
          dialog.open();
          menu.close();
        });
      });
    });
  }

  OverviewPage.prototype.init = function () {
    var _this = this;

    this._sidebarBtn = document.querySelector('#open_sidebar');
    this._sidebar = document.querySelector('#sidebar');

    this._sidebarBtn.addEventListener('click', function () {
      _this._sidebar.classList.toggle('sidebar--open');
    });

    this._mainFrame = document.querySelector('#main-frame');
    this._mainFrame.src = '/welcome.html';
    document.querySelector('#new_project').addEventListener('click', function () {
      _this.setMain('/newProject.html');
    });
    this._editArea = document.querySelector('#editArea');
    this._editFrame = document.querySelector('#edit-frame');
  };

  OverviewPage.prototype.setMain = function (uri) {
    this._mainFrame.src = uri;
  };

  OverviewPage.prototype.setEdit = function (uri) {
    this._editArea.classList.add('editArea--open');

    this._editFrame.src = uri;
  };

  return OverviewPage;
}();

new OverviewPage();
},{"@material/menu-surface":"../../../node_modules/@material/menu-surface/index.js","@material/dialog/component":"../../../node_modules/@material/dialog/component.js"}]},{},["scripts/OverviewPage.ts"], null)
//# sourceMappingURL=/OverviewPage.778f9b09.js.map