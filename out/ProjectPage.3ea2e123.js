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
})({"scripts/InitExpandableAreas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function InitExpandableAreas() {
  var expandableAreas = document.querySelectorAll('.expandable-area');
  var triggerIcons = document.querySelectorAll('.trigger-icon');
  triggerIcons.forEach(function (el, i) {
    var ind = i;
    el.addEventListener('click', function () {
      var container = expandableAreas[ind];
      var height = container.getBoundingClientRect().height;

      if (container.classList.contains('expandable-area--open')) {
        container.style.height = height + "px";
        setTimeout(function () {
          container.classList.remove('expandable-area--open');
          container.classList.add('expandable-area--closing');
          setTimeout(function () {
            container.style.removeProperty('height');
            container.classList.remove('expandable-area--closing');
            container.classList.add('expandable-area--closed');
          }, 350);
        }, 0);
      } else if (container.classList.contains('expandable-area--closed')) {
        container.style.height = '0px';
        setTimeout(function () {
          container.classList.remove('expandable-area--closed');
          container.classList.add('expandable-area--opening');
          container.style.height = height + "px";
          setTimeout(function () {
            container.style.removeProperty('height');
            container.classList.remove('expandable-area--opening');
            container.classList.add('expandable-area--open');
          }, 350);
        }, 0);
      }

      el.classList.toggle('trigger-icon--rotated');
    });
  });
}

exports.default = InitExpandableAreas;
},{}],"scripts/ProjectPage.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InitExpandableAreas_1 = __importDefault(require("./InitExpandableAreas"));

var ProjectPage =
/** @class */
function () {
  function ProjectPage() {
    var _this = this;

    document.addEventListener('DOMContentLoaded', function () {
      _this.init();
    });
  }

  ProjectPage.prototype.init = function () {
    (0, InitExpandableAreas_1.default)();
    var pname = window.location.href.split('/projects/')[1];
    document.querySelector('#new-type').addEventListener('click', function () {
      window.parent.setEdit('/editType?project=' + pname);
    });
    document.querySelector('#new-entry').addEventListener('click', function () {
      window.parent.setEdit('/editEntry?project=' + pname);
    });
    document.querySelectorAll('[data-edit-entry]').forEach(function (el) {
      var entryKey = el.getAttribute('data-edit-entry');
      el.addEventListener('click', function () {
        window.parent.setEdit('/editEntry?project=' + pname + '&entry=' + entryKey);
      });
    });
  };

  return ProjectPage;
}();

new ProjectPage();
},{"./InitExpandableAreas":"scripts/InitExpandableAreas.ts"}]},{},["scripts/ProjectPage.ts"], null)
//# sourceMappingURL=/ProjectPage.3ea2e123.js.map