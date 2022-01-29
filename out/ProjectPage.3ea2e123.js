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
},{}],"scripts/AnalyseAndSaveDroppedFile.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function AnalyseAndSaveDroppdFile(file) {
  console.log(file);
  var texType = file.match('(@.*?\{)')[0];
  texType = texType.substr(1, texType.length - 2);
  console.log(texType);
}

exports.default = AnalyseAndSaveDroppdFile;
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

var AnalyseAndSaveDroppedFile_1 = __importDefault(require("./AnalyseAndSaveDroppedFile"));

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
    document.querySelectorAll('[data-edit-type]').forEach(function (el) {
      var typeKey = el.getAttribute('data-edit-type');
      el.addEventListener('click', function (e) {
        if (e.target.getAttribute('data-delete-type')) return;
        window.parent.setEdit('/editType?project=' + pname + '&type=' + typeKey);
      });
    });
    document.querySelectorAll('[data-delete-type]').forEach(function (el) {
      var typeKey = el.getAttribute('data-delete-type');
      el.addEventListener('click', function () {
        fetch('/deleteType?project=' + pname + '&type=' + typeKey).then(function (resp) {
          if (resp.status === 200) {
            window.location.reload();
          }
        });
      });
    });
    document.querySelector('#new-entry').addEventListener('click', function () {
      window.parent.setEdit('/editEntry?project=' + pname);
    });
    document.querySelectorAll('[data-edit-entry]').forEach(function (el) {
      var entryKey = el.getAttribute('data-edit-entry');
      el.addEventListener('click', function (e) {
        if (e.target.getAttribute('data-delete-entry')) return;
        window.parent.setEdit('/editEntry?project=' + pname + '&entry=' + entryKey);
      });
    });
    document.querySelectorAll('[data-delete-entry]').forEach(function (el) {
      var entryKey = el.getAttribute('data-delete-entry');
      el.addEventListener('click', function () {
        fetch('/deleteEntry?project=' + pname + '&entry=' + entryKey).then(function (resp) {
          if (resp.status === 200) {
            window.location.reload();
          }
        });
      });
    });
    this.setupDragAndDrop();
  };

  ProjectPage.prototype.setupDragAndDrop = function () {
    var area = document.querySelector('#drop_zone');
    area.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    area.addEventListener('drop', function (e) {
      e.preventDefault();
      var dT = new DataTransfer();
      dT.items.add(e.dataTransfer.files[0]);
      var reader = new FileReader();
      reader.readAsText(dT.files[0], "UTF-8");

      reader.onload = function (evt) {
        (0, AnalyseAndSaveDroppedFile_1.default)(reader.result); //Dialog mit Textfeld öffnen => gewünscht Zitierweise eingeben
      };
    });
  };

  return ProjectPage;
}();

new ProjectPage();
},{"./InitExpandableAreas":"scripts/InitExpandableAreas.ts","./AnalyseAndSaveDroppedFile":"scripts/AnalyseAndSaveDroppedFile.ts"}]},{},["scripts/ProjectPage.ts"], null)
//# sourceMappingURL=/ProjectPage.3ea2e123.js.map