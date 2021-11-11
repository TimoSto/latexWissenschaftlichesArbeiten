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
})({"scripts/Field.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Field =
/** @class */
function () {
  function Field(f, s, p, suf) {
    this.Field = f;
    this.Style = s;
    this.Prefix = p;
    this.Suffix = suf;
  }

  return Field;
}();

exports.default = Field;
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
}

exports.default = SaveType;
},{}],"scripts/TypePage.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Field_1 = __importDefault(require("./Field"));

var SaveType_1 = __importDefault(require("./SaveType"));

var TypePage =
/** @class */
function () {
  function TypePage() {
    var _this = this;

    this.bib_attrSelects = [];
    this.bib_styleSelects = [];
    this.bib_prefixTfs = [];
    this.bib_suffixTfs = [];
    this.cite_attrSelects = [];
    this.cite_styleSelects = [];
    this.cite_prefixTfs = [];
    this.cite_suffixTfs = [];
    this.bibFields = [];
    this.citeFields = [];
    document.addEventListener('DOMContentLoaded', function () {
      var elements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(2) .mdc-select');
      elements.forEach(function (el, n) {
        var index = n;
        var newSelect = window.mdc.select.MDCSelect.attachTo(el);
        newSelect.listen('MDCSelect:change', function () {
          if (index > _this.bibFields.length - 1) {
            _this.bibFields.push(new Field_1.default("", "normal", "", ""));
          }

          if (_this.bibFields[index].Field != newSelect.value) {
            _this.bibFields[index].Field = newSelect.value;

            _this.syncExample();
          }
        });

        _this.bib_attrSelects.push(newSelect);
      });
      var styleElements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(3) .mdc-select');
      styleElements.forEach(function (el, n) {
        var index = n;
        var newSelect = window.mdc.select.MDCSelect.attachTo(el);
        newSelect.listen('MDCSelect:change', function () {
          if (index > _this.bibFields.length - 1) {
            _this.bibFields.push(new Field_1.default("", "normal", "", ""));
          }

          if (_this.bibFields[index].Style != newSelect.value) {
            _this.bibFields[index].Style = newSelect.value;

            _this.syncExample();
          }
        });

        _this.bib_styleSelects.push(newSelect);
      });
      var tf_elements = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(4) .mdc-text-field');
      tf_elements.forEach(function (el, n) {
        var index = n;

        _this.bib_prefixTfs.push(window.mdc.textField.MDCTextField.attachTo(el));

        el.querySelector('input').addEventListener('change', function () {
          if (index > _this.bibFields.length - 1) {
            _this.bibFields.push(new Field_1.default("", "normal", "", ""));
          }

          _this.bibFields[index].Prefix = _this.bib_prefixTfs[index].value;

          _this.syncExample();
        });
      });
      var tf_elements2 = document.querySelectorAll('#bibtable .my-table--row .my-table-cell:nth-child(5) .mdc-text-field');
      tf_elements2.forEach(function (el, n) {
        var index = n;

        _this.bib_suffixTfs.push(window.mdc.textField.MDCTextField.attachTo(el));

        el.querySelector('input').addEventListener('change', function () {
          if (index > _this.bibFields.length - 1) {
            _this.bibFields.push(new Field_1.default("", "normal", "", ""));
          }

          _this.bibFields[index].Suffix = _this.bib_suffixTfs[index].value;

          _this.syncExample();
        });
      });
      var elementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(2) .mdc-select');
      elementsc.forEach(function (el, n) {
        var index = n;
        var newSelect = window.mdc.select.MDCSelect.attachTo(el);
        newSelect.listen('MDCSelect:change', function () {
          if (index > _this.citeFields.length - 1) {
            _this.citeFields.push(new Field_1.default("", "normal", "", ""));
          }

          if (_this.citeFields[index].Field != newSelect.value) {
            _this.citeFields[index].Field = newSelect.value;

            _this.syncExample();
          }
        });

        _this.cite_attrSelects.push(newSelect);
      });
      var styleElementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(3) .mdc-select');
      styleElementsc.forEach(function (el, n) {
        var index = n;
        var newSelect = window.mdc.select.MDCSelect.attachTo(el);
        newSelect.listen('MDCSelect:change', function () {
          if (index > _this.citeFields.length - 1) {
            _this.citeFields.push(new Field_1.default("", "normal", "", ""));
          }

          if (_this.citeFields[index].Style != newSelect.value) {
            _this.citeFields[index].Style = newSelect.value;

            _this.syncExample();
          }
        });

        _this.cite_styleSelects.push(newSelect);
      });
      var tf_elementsc = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(4) .mdc-text-field');
      tf_elementsc.forEach(function (el, n) {
        var index = n;

        _this.cite_prefixTfs.push(window.mdc.textField.MDCTextField.attachTo(el));

        el.querySelector('input').addEventListener('change', function () {
          if (index > _this.citeFields.length - 1) {
            _this.citeFields.push(new Field_1.default("", "normal", "", ""));
          }

          _this.citeFields[index].Prefix = _this.cite_prefixTfs[index].value;

          _this.syncExample();
        });
      });
      var tf_elements2c = document.querySelectorAll('#citetable .my-table--row .my-table-cell:nth-child(5) .mdc-text-field');
      tf_elements2c.forEach(function (el, n) {
        var index = n;

        _this.cite_suffixTfs.push(window.mdc.textField.MDCTextField.attachTo(el));

        el.querySelector('input').addEventListener('change', function () {
          if (index > _this.citeFields.length - 1) {
            _this.citeFields.push(new Field_1.default("", "normal", "", ""));
          }

          _this.citeFields[index].Suffix = _this.cite_suffixTfs[index].value;

          _this.syncExample();
        });
      });
      var valuesElement = document.querySelector('#values');
      var bibvaluesElement = document.querySelectorAll('#bibFields div');
      var citevaluesElement = document.querySelectorAll('#citeFields div');
      var name = valuesElement.getAttribute('data-name');
      var bibFields = [];
      Array.prototype.slice.call(bibvaluesElement).forEach(function (el) {
        _this.bibFields.push(new Field_1.default(el.getAttribute('data-field'), el.getAttribute('data-style'), el.getAttribute('data-prefix'), el.getAttribute('data-suffix')));
      });
      var citeFields = [];
      Array.prototype.slice.call(citevaluesElement).forEach(function (el) {
        _this.citeFields.push(new Field_1.default(el.getAttribute('data-field'), el.getAttribute('data-style'), el.getAttribute('data-prefix'), el.getAttribute('data-suffix')));
      });

      _this.syncExample();

      document.querySelector('.mdc-button--raised').addEventListener('click', function () {
        (0, SaveType_1.default)(window.location.href.split('/type/')[1], _this.bibFields, _this.citeFields);
      });
    });
  }

  TypePage.prototype.syncExample = function () {
    var _this = this;

    var bibExample = '';
    this.bibFields.forEach(function (field, n) {
      _this.bib_attrSelects[n].value = field.Field;
      _this.bib_styleSelects[n].value = field.Style;
      _this.bib_prefixTfs[n].value = field.Prefix;
      _this.bib_suffixTfs[n].value = field.Suffix;
      bibExample += field.Prefix;

      switch (field.Style) {
        case 'italic':
          bibExample += '<i>';
          break;

        case 'fett':
          bibExample += '<b>';
          break;
      }

      switch (field.Field) {
        case 'autor':
          bibExample += 'Mustermann, M.';
          break;

        case 'titel':
          bibExample += 'Beispieltitel';
          break;

        case 'auflage':
          bibExample += '1';
          break;

        case 'ort':
          bibExample += "Hamburg";
          break;

        case 'datum':
          bibExample += "23.01.2021";
          break;

        case 'url':
          bibExample += 'https://example.com/page';
          break;

        case 'stand':
          bibExample += '23.01.2020';
          break;

        case 'zeitschrift':
          bibExample += 'Playboy';
          break;

        case 'seiten':
          bibExample += 'S. 76-90';
          break;
      }

      switch (field.Style) {
        case 'italic':
          bibExample += '</i>';
          break;

        case 'fett':
          bibExample += '</b>';
          break;
      }

      bibExample += field.Suffix;
    });
    document.getElementById('bibExample').innerHTML = bibExample;
    var citeExample = '';
    this.citeFields.forEach(function (field, n) {
      _this.cite_attrSelects[n].value = field.Field;
      _this.cite_styleSelects[n].value = field.Style;
      _this.cite_prefixTfs[n].value = field.Prefix;
      _this.cite_suffixTfs[n].value = field.Suffix;
      citeExample += field.Prefix;

      switch (field.Style) {
        case 'italic':
          citeExample += '<i>';
          break;

        case 'bold':
          citeExample += '<b>';
          break;
      }

      switch (field.Field) {
        case 'autor':
          citeExample += 'Mustermann, M.';
          break;

        case 'titel':
          citeExample += 'Beispieltitel';
          break;

        case 'auflage':
          citeExample += '1';
          break;

        case 'ort':
          citeExample += "Hamburg";
          break;

        case 'datum':
          citeExample += "23.01.2021";
          break;

        case 'url':
          citeExample += 'https://example.com/page';
          break;

        case 'stand':
          citeExample += '23.01.2020';
          break;

        case 'zeitschrift':
          citeExample += 'Playboy';
          break;

        case 'seiten':
          citeExample += 'S. 76-90';
          break;
      }

      switch (field.Style) {
        case 'italic':
          citeExample += '</i>';
          break;

        case 'bold':
          citeExample += '</b>';
          break;
      }

      citeExample += field.Suffix;
    });
    document.getElementById('citeExample').innerHTML = citeExample + '.';
  };

  return TypePage;
}();

new TypePage();
},{"./Field":"scripts/Field.ts","./SaveType":"scripts/SaveType.ts"}]},{},["scripts/TypePage.ts"], null)
//# sourceMappingURL=/assets/TypePage.1b661814.js.map