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
})({"scripts/SaveEntry.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function SaveEntry(initialKey, valuePairs, typ) {
  var obj = {
    InitialKey: initialKey,
    ValuePairs: valuePairs,
    Typ: typ
  };
  document.body.setAttribute('data-key', valuePairs[0].Value);
  window.fetch('/saveEntry', {
    method: 'POST',
    body: JSON.stringify(obj)
  }).then(function (response) {
    console.log(response);
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

var SaveEntry_1 = __importDefault(require("./SaveEntry"));

var EntryPage =
/** @class */
function () {
  function EntryPage() {
    var _this = this;

    this.valuePairs = [];
    document.addEventListener('DOMContentLoaded', function () {
      _this._typeSelect = window.mdc.select.MDCSelect.attachTo(document.querySelector('.mdc-select'));
      _this._typeSelect.value = document.body.getAttribute('data-typ');
      var saveBtn = document.querySelector('button');
      saveBtn.addEventListener('click', function () {
        console.log(_this.valuePairs);
        (0, SaveEntry_1.default)(document.body.getAttribute('data-key'), _this.valuePairs, _this._typeSelect.value);
      });
      var preElementes = document.querySelectorAll('#prevalues span');
      var tf_elements = document.querySelectorAll('.mdc-text-field');
      tf_elements.forEach(function (el, i) {
        var tf = window.mdc.textField.MDCTextField.attachTo(el);
        var attr = el.querySelector('.mdc-floating-label').innerHTML;

        _this.valuePairs.push(new ValuePair(attr, preElementes[i].innerHTML));

        var input = el.querySelector('input');
        var index = i;
        input.addEventListener('change', function () {
          _this.valuePairs[index].Value = input.value;
        });
        tf.value = preElementes[i].innerHTML;
      });
    });
  }

  return EntryPage;
}();

var ValuePair =
/** @class */
function () {
  function ValuePair(a, v) {
    this.Attr = a;
    this.Value = v;
  }

  return ValuePair;
}();

new EntryPage();
},{"./SaveEntry":"scripts/SaveEntry.ts"}]},{},["scripts/EntryPage.ts"], null)
//# sourceMappingURL=/assets/EntryPage.9c7eaa9f.js.map