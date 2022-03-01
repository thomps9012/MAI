"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/demographics",{

/***/ "./pages/demographics.tsx":
/*!********************************!*\
  !*** ./pages/demographics.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Demographics; }\n/* harmony export */ });\n/* harmony import */ var C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _questionData_adult_demographics_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../questionData/adult/demographics.json */ \"./questionData/adult/demographics.json\");\n/* harmony import */ var _utils_multiple_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/multiple-select */ \"./utils/multiple-select.tsx\");\n/* harmony import */ var _utils_button_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/button-select */ \"./utils/button-select.tsx\");\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction Demographics() {\n    var _this = this;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(new Intl.DateTimeFormat('en', {\n        dateStyle: 'short'\n    }).format(Date.now())), date_of_birth = ref[0], setDOB = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n        latinx: '',\n        race: '',\n        gender: '',\n        sexual_orientation: '',\n        living_situtation: '',\n        college_enrolled: '',\n        military_service: '',\n        arrested_in_last_month: '',\n        parole_or_probation: '',\n        informed_of_HIV_status: '',\n        informed_of_VH_status: '',\n        knowledge_of_SUD_healthcare_treatment: '',\n        knowledge_of_HIV_STD_healthcare_treatment: '',\n        pretax_household_income: ''\n    }), demographic_details = ref1[0], setDemographic = ref1[1];\n    var demographic_info1 = {\n        date_of_birth: date_of_birth,\n        demographic_details: demographic_details\n    };\n    var Submit = function() {\n        var _ref = _asyncToGenerator(C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(demographic_info) {\n            return C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        sessionStorage.setItem('demographic_info', JSON.stringify(demographic_info));\n                        window.location.replace('/attitudes');\n                    case 2:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function Submit(demographic_info) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"label\", {\n                children: \"Enter Date of Birth\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 34,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                type: \"date\",\n                onChange: function(e) {\n                    return setDOB(e.target.value);\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 35,\n                columnNumber: 13\n            }, this),\n            _questionData_adult_demographics_json__WEBPACK_IMPORTED_MODULE_3__.map(function(questionInfo) {\n                var multiple = questionInfo.multiple, state = questionInfo.state;\n                if (multiple) {\n                    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_utils_multiple_select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        questionInfo: questionInfo\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 25\n                    }, _this));\n                } else {\n                    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_utils_button_select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        questionInfo: questionInfo,\n                        onChange: setDemographic,\n                        demographic_details: demographic_details\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 25\n                    }, _this));\n                }\n            }),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                onClick: function() {\n                    return Submit(demographic_info1);\n                },\n                children: \"Complete Interview Section\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 55,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n        lineNumber: 33,\n        columnNumber: 9\n    }, this));\n};\n_s(Demographics, \"UUoQRI9nz0ase+DWWZGJSsw/56g=\");\n_c = Demographics;\nvar _c;\n$RefreshReg$(_c, \"Demographics\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9kZW1vZ3JhcGhpY3MudHN4PzFmOGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGRlbW9ncmFwaGljUXMgZnJvbSAnLi4vcXVlc3Rpb25EYXRhL2FkdWx0L2RlbW9ncmFwaGljcy5qc29uJztcclxuaW1wb3J0IE11bHRpcGxlU2VsZWN0IGZyb20gXCIuLi91dGlscy9tdWx0aXBsZS1zZWxlY3RcIjtcclxuaW1wb3J0IEJ1dHRvblNlbGVjdCBmcm9tIFwiLi4vdXRpbHMvYnV0dG9uLXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVtb2dyYXBoaWNzKCkge1xyXG4gICAgY29uc3QgW2RhdGVfb2ZfYmlydGgsIHNldERPQl0gPSB1c2VTdGF0ZShuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4nLCB7XHJcbiAgICAgICAgZGF0ZVN0eWxlOiAnc2hvcnQnLFxyXG4gICAgfSkuZm9ybWF0KERhdGUubm93KCkpKTtcclxuICAgIGNvbnN0IFtkZW1vZ3JhcGhpY19kZXRhaWxzLCBzZXREZW1vZ3JhcGhpY10gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgbGF0aW54OiAnJyxcclxuICAgICAgICByYWNlOiAnJyxcclxuICAgICAgICBnZW5kZXI6ICcnLFxyXG4gICAgICAgIHNleHVhbF9vcmllbnRhdGlvbjogJycsXHJcbiAgICAgICAgbGl2aW5nX3NpdHV0YXRpb246ICcnLFxyXG4gICAgICAgIGNvbGxlZ2VfZW5yb2xsZWQ6ICcnLFxyXG4gICAgICAgIG1pbGl0YXJ5X3NlcnZpY2U6ICcnLFxyXG4gICAgICAgIGFycmVzdGVkX2luX2xhc3RfbW9udGg6ICcnLFxyXG4gICAgICAgIHBhcm9sZV9vcl9wcm9iYXRpb246ICcnLFxyXG4gICAgICAgIGluZm9ybWVkX29mX0hJVl9zdGF0dXM6ICcnLFxyXG4gICAgICAgIGluZm9ybWVkX29mX1ZIX3N0YXR1czogJycsXHJcbiAgICAgICAga25vd2xlZGdlX29mX1NVRF9oZWFsdGhjYXJlX3RyZWF0bWVudDogJycsXHJcbiAgICAgICAga25vd2xlZGdlX29mX0hJVl9TVERfaGVhbHRoY2FyZV90cmVhdG1lbnQ6ICcnLFxyXG4gICAgICAgIHByZXRheF9ob3VzZWhvbGRfaW5jb21lOiAnJ1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkZW1vZ3JhcGhpY19pbmZvID0geyBkYXRlX29mX2JpcnRoLCBkZW1vZ3JhcGhpY19kZXRhaWxzIH1cclxuICAgIGNvbnN0IFN1Ym1pdCA9IGFzeW5jIChkZW1vZ3JhcGhpY19pbmZvOiB7fSkgPT4ge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2RlbW9ncmFwaGljX2luZm8nLCBKU09OLnN0cmluZ2lmeShkZW1vZ3JhcGhpY19pbmZvKSk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9hdHRpdHVkZXMnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8bGFiZWw+RW50ZXIgRGF0ZSBvZiBCaXJ0aDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdkYXRlJyBvbkNoYW5nZT17KGU6IGFueSkgPT4gc2V0RE9CKGUudGFyZ2V0LnZhbHVlKX0gLz5cclxuICAgICAgICAgICAge2RlbW9ncmFwaGljUXMubWFwKChxdWVzdGlvbkluZm8pOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBtdWx0aXBsZSwgc3RhdGUgfSA9IHF1ZXN0aW9uSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNdWx0aXBsZVNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25JbmZvPXtxdWVzdGlvbkluZm99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXtoYW5kbGVEZW1vZ3JhcGhpY0NoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25TZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5mbz17cXVlc3Rpb25JbmZvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldERlbW9ncmFwaGljfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVtb2dyYXBoaWNfZGV0YWlscz17ZGVtb2dyYXBoaWNfZGV0YWlsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IFN1Ym1pdChkZW1vZ3JhcGhpY19pbmZvKX0+Q29tcGxldGUgSW50ZXJ2aWV3IFNlY3Rpb248L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsImRlbW9ncmFwaGljUXMiLCJNdWx0aXBsZVNlbGVjdCIsIkJ1dHRvblNlbGVjdCIsIkRlbW9ncmFwaGljcyIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImRhdGVTdHlsZSIsImZvcm1hdCIsIkRhdGUiLCJub3ciLCJkYXRlX29mX2JpcnRoIiwic2V0RE9CIiwibGF0aW54IiwicmFjZSIsImdlbmRlciIsInNleHVhbF9vcmllbnRhdGlvbiIsImxpdmluZ19zaXR1dGF0aW9uIiwiY29sbGVnZV9lbnJvbGxlZCIsIm1pbGl0YXJ5X3NlcnZpY2UiLCJhcnJlc3RlZF9pbl9sYXN0X21vbnRoIiwicGFyb2xlX29yX3Byb2JhdGlvbiIsImluZm9ybWVkX29mX0hJVl9zdGF0dXMiLCJpbmZvcm1lZF9vZl9WSF9zdGF0dXMiLCJrbm93bGVkZ2Vfb2ZfU1VEX2hlYWx0aGNhcmVfdHJlYXRtZW50Iiwia25vd2xlZGdlX29mX0hJVl9TVERfaGVhbHRoY2FyZV90cmVhdG1lbnQiLCJwcmV0YXhfaG91c2Vob2xkX2luY29tZSIsImRlbW9ncmFwaGljX2RldGFpbHMiLCJzZXREZW1vZ3JhcGhpYyIsImRlbW9ncmFwaGljX2luZm8iLCJTdWJtaXQiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZXBsYWNlIiwiZGl2IiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm1hcCIsInF1ZXN0aW9uSW5mbyIsIm11bHRpcGxlIiwic3RhdGUiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/demographics.tsx\n");

/***/ })

});