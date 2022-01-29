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
})({"scripts/OverviewPage.ts":[function(require,module,exports) {
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

      document.querySelector('#close_edit').addEventListener('click', function () {
        _this._editArea.classList.remove('editArea--open');
      });
      document.querySelectorAll('[data-edit-value]').forEach(function (el) {
        var project = el.getAttribute('data-edit-value');
        el.addEventListener('click', function () {
          window.location.replace('/overview?project=' + project); //this.setMain('/projects/'+project);
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
},{}]},{},["scripts/OverviewPage.ts"], null)
//# sourceMappingURL=/OverviewPage.778f9b09.js.map