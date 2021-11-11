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
})({"scripts/DeleteType.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function DeleteType(type) {
  window.fetch('/delete', {
    method: 'POST',
    body: JSON.stringify({
      Type: type
    })
  }).then(function (response) {
    return console.log(response);
  });
}

exports.default = DeleteType;
},{}],"scripts/SaveType.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function SaveType(name, bibFields, citeFields) {
  var obj = {
    Name: name,
    Fields: bibFields,
    CiteFields: citeFields
  };
  window.fetch('/save', {
    method: 'POST',
    body: JSON.stringify(obj)
  }).then(function (response) {
    console.log(response);
  });
  window.parent.shell.NavigateToType(name);
}

exports.default = SaveType;
},{}],"scripts/Overview.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DeleteType_1 = __importDefault(require("./DeleteType"));

var SaveType_1 = __importDefault(require("./SaveType"));

var Overview =
/** @class */
function () {
  function Overview() {
    var _this = this;

    this.types = [];
    document.addEventListener('DOMContentLoaded', function () {
      window.parent.shell.setTitle("Literatur-Organisation");
      var editElements = document.querySelectorAll('[data-edit-type]');
      editElements.forEach(function (el) {
        var type = el.getAttribute('data-edit-type');

        _this.types.push(type);

        el.addEventListener('click', function (evt) {
          window.parent.shell.NavigateToType(type);
        });
      });
      var deleteElements = document.querySelectorAll('[data-delete-type]');
      deleteElements.forEach(function (el) {
        var type = el.getAttribute('data-delete-type');

        _this.types.push(type);

        el.addEventListener('click', function (evt) {
          (0, DeleteType_1.default)(type);
        });
      });
      var input = window.mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
      var saveButton = document.querySelector('.mdc-button--raised');
      saveButton.addEventListener('click', function () {
        (0, SaveType_1.default)(input.value, [], []);
      });
      input.root.querySelector('input').addEventListener('change', function () {
        saveButton.disabled = !(input.value.length > 0 && _this.types.indexOf(input.value) == -1);
      });
    });
  }

  return Overview;
}();

new Overview();
},{"./DeleteType":"scripts/DeleteType.ts","./SaveType":"scripts/SaveType.ts"}]},{},["scripts/Overview.ts"], null)
//# sourceMappingURL=/assets/Overview.b661a4b8.js.map