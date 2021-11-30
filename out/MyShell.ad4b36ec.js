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
})({"scripts/MyShell.ts":[function(require,module,exports) {
var MyShell =
/** @class */
function () {
  function MyShell() {
    var _this = this;

    document.addEventListener('DOMContentLoaded', function () {
      var urlFrag = window.location.hash.substr(1);
      _this._res1 = document.querySelector('#res_1');
      _this._res2 = document.querySelector('#res_2');
      _this._titleElement = document.querySelector('.mdc-top-app-bar__title');
      _this._backBtn = document.querySelector('.mdc-top-app-bar button');

      _this._backBtn.addEventListener('click', function () {
        _this.NavBack();
      });

      _this._res1.src = urlFrag;
      window.history.replaceState(null, urlFrag, location.protocol + '//' + window.location.host + urlFrag);
    });
  }

  MyShell.prototype.NavBack = function () {
    this._res2.parentElement.classList.remove('res_container--open');

    this._res2.parentElement.classList.add('res_container--close');

    this._res1.parentElement.classList.remove('res_container--close');

    this._res1.parentElement.classList.add('res_container--open');

    this._backBtn.style.display = 'none';
    window.history.replaceState(null, 'overview', location.protocol + '//' + window.location.host + 'overview');
  };

  MyShell.prototype.setTitle = function (title) {
    this._titleElement.innerText = title;
  };

  MyShell.prototype.NavigateToType = function (type) {
    this._res1.parentElement.classList.remove('res_container--open');

    this._res1.parentElement.classList.add('res_container--close');

    this._res2.src = '/type/' + type;

    this._res2.parentElement.classList.add('res_container--open');

    this._backBtn.style.display = '';
    window.history.replaceState(null, type, location.protocol + '//' + window.location.host + 'type/' + type);
  };

  MyShell.prototype.NavigateToEntry = function (index) {
    this._res1.parentElement.classList.remove('res_container--open');

    this._res1.parentElement.classList.add('res_container--close');

    this._res2.src = '/entry/' + index;

    this._res2.parentElement.classList.add('res_container--open');

    this._backBtn.style.display = '';
    window.history.replaceState(null, "Eintrag", location.protocol + '//' + window.location.host + 'entry/' + index);
  };

  return MyShell;
}();

window.shell = new MyShell();
},{}]},{},["scripts/MyShell.ts"], null)
//# sourceMappingURL=/shell/MyShell.ad4b36ec.js.map