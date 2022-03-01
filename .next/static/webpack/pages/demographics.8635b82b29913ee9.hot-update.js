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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Demographics; }\n/* harmony export */ });\n/* harmony import */ var C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _questionData_adult_demographics_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../questionData/adult/demographics.json */ \"./questionData/adult/demographics.json\");\n/* harmony import */ var _utils_multiple_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/multiple-select */ \"./utils/multiple-select.tsx\");\n/* harmony import */ var _utils_button_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/button-select */ \"./utils/button-select.tsx\");\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction Demographics() {\n    var _this = this;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(new Intl.DateTimeFormat('en', {\n        dateStyle: 'short'\n    }).format(Date.now())), date_of_birth = ref[0], setDOB = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n        latinx: '',\n        race: '',\n        gender: '',\n        sexual_orientation: '',\n        living_situtation: '',\n        college_enrolled: '',\n        military_service: '',\n        arrested_in_last_month: '',\n        parole_or_probation: '',\n        informed_of_HIV_status: '',\n        informed_of_VH_status: '',\n        knowledge_of_SUD_healthcare_treatment: '',\n        knowledge_of_HIV_STD_healthcare_treatment: '',\n        pretax_household_income: ''\n    }), demographic_details = ref1[0], setDemographic = ref1[1];\n    var demographic_info1 = {\n        date_of_birth: date_of_birth,\n        demographic_details: demographic_details\n    };\n    var Submit = function() {\n        var _ref = _asyncToGenerator(C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(demographic_info) {\n            return C_Freelance_MAI_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        sessionStorage.setItem('demographic_info', JSON.stringify(demographic_info));\n                        window.location.replace('/attitudes');\n                    case 2:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function Submit(demographic_info) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"label\", {\n                children: \"Enter Date of Birth\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 34,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                type: \"date\",\n                onChange: function(e) {\n                    return setDOB(e.target.value);\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 35,\n                columnNumber: 13\n            }, this),\n            _questionData_adult_demographics_json__WEBPACK_IMPORTED_MODULE_3__.map(function(questionInfo) {\n                var multiple = questionInfo.multiple, state = questionInfo.state;\n                if (multiple) {\n                    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_utils_multiple_select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        questionInfo: questionInfo\n                    }, state, false, {\n                        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 25\n                    }, _this));\n                } else {\n                    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_utils_button_select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        questionInfo: questionInfo,\n                        setDemographic: setDemographic,\n                        demographic_details: demographic_details\n                    }, state, false, {\n                        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 25\n                    }, _this));\n                }\n            }),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                onClick: function() {\n                    return Submit(demographic_info1);\n                },\n                children: \"Complete Interview Section\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n                lineNumber: 57,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Freelance\\\\MAI\\\\pages\\\\demographics.tsx\",\n        lineNumber: 33,\n        columnNumber: 9\n    }, this));\n};\n_s(Demographics, \"UUoQRI9nz0ase+DWWZGJSsw/56g=\");\n_c = Demographics;\nvar _c;\n$RefreshReg$(_c, \"Demographics\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixZQUFZO0tBQVpBLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvZGVtb2dyYXBoaWNzLnRzeD8xZjhlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBkZW1vZ3JhcGhpY1FzIGZyb20gJy4uL3F1ZXN0aW9uRGF0YS9hZHVsdC9kZW1vZ3JhcGhpY3MuanNvbic7XHJcbmltcG9ydCBNdWx0aXBsZVNlbGVjdCBmcm9tIFwiLi4vdXRpbHMvbXVsdGlwbGUtc2VsZWN0XCI7XHJcbmltcG9ydCBCdXR0b25TZWxlY3QgZnJvbSBcIi4uL3V0aWxzL2J1dHRvbi1zZWxlY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlbW9ncmFwaGljcygpIHtcclxuICAgIGNvbnN0IFtkYXRlX29mX2JpcnRoLCBzZXRET0JdID0gdXNlU3RhdGUobmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuJywge1xyXG4gICAgICAgIGRhdGVTdHlsZTogJ3Nob3J0JyxcclxuICAgIH0pLmZvcm1hdChEYXRlLm5vdygpKSk7XHJcbiAgICBjb25zdCBbZGVtb2dyYXBoaWNfZGV0YWlscywgc2V0RGVtb2dyYXBoaWNdID0gdXNlU3RhdGUoe1xyXG4gICAgICAgIGxhdGlueDogJycsXHJcbiAgICAgICAgcmFjZTogJycsXHJcbiAgICAgICAgZ2VuZGVyOiAnJyxcclxuICAgICAgICBzZXh1YWxfb3JpZW50YXRpb246ICcnLFxyXG4gICAgICAgIGxpdmluZ19zaXR1dGF0aW9uOiAnJyxcclxuICAgICAgICBjb2xsZWdlX2Vucm9sbGVkOiAnJyxcclxuICAgICAgICBtaWxpdGFyeV9zZXJ2aWNlOiAnJyxcclxuICAgICAgICBhcnJlc3RlZF9pbl9sYXN0X21vbnRoOiAnJyxcclxuICAgICAgICBwYXJvbGVfb3JfcHJvYmF0aW9uOiAnJyxcclxuICAgICAgICBpbmZvcm1lZF9vZl9ISVZfc3RhdHVzOiAnJyxcclxuICAgICAgICBpbmZvcm1lZF9vZl9WSF9zdGF0dXM6ICcnLFxyXG4gICAgICAgIGtub3dsZWRnZV9vZl9TVURfaGVhbHRoY2FyZV90cmVhdG1lbnQ6ICcnLFxyXG4gICAgICAgIGtub3dsZWRnZV9vZl9ISVZfU1REX2hlYWx0aGNhcmVfdHJlYXRtZW50OiAnJyxcclxuICAgICAgICBwcmV0YXhfaG91c2Vob2xkX2luY29tZTogJydcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZGVtb2dyYXBoaWNfaW5mbyA9IHsgZGF0ZV9vZl9iaXJ0aCwgZGVtb2dyYXBoaWNfZGV0YWlscyB9XHJcbiAgICBjb25zdCBTdWJtaXQgPSBhc3luYyAoZGVtb2dyYXBoaWNfaW5mbzoge30pID0+IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdkZW1vZ3JhcGhpY19pbmZvJywgSlNPTi5zdHJpbmdpZnkoZGVtb2dyYXBoaWNfaW5mbykpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvYXR0aXR1ZGVzJylcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsPkVudGVyIERhdGUgb2YgQmlydGg8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0nZGF0ZScgb25DaGFuZ2U9eyhlOiBhbnkpID0+IHNldERPQihlLnRhcmdldC52YWx1ZSl9IC8+XHJcbiAgICAgICAgICAgIHtkZW1vZ3JhcGhpY1FzLm1hcCgocXVlc3Rpb25JbmZvKTogYW55ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgbXVsdGlwbGUsIHN0YXRlIH0gPSBxdWVzdGlvbkluZm87XHJcbiAgICAgICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TXVsdGlwbGVTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5mbz17cXVlc3Rpb25JbmZvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzdGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2U9e2hhbmRsZURlbW9ncmFwaGljQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzdGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5mbz17cXVlc3Rpb25JbmZvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGVtb2dyYXBoaWM9e3NldERlbW9ncmFwaGljfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVtb2dyYXBoaWNfZGV0YWlscz17ZGVtb2dyYXBoaWNfZGV0YWlsc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IFN1Ym1pdChkZW1vZ3JhcGhpY19pbmZvKX0+Q29tcGxldGUgSW50ZXJ2aWV3IFNlY3Rpb248L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsImRlbW9ncmFwaGljUXMiLCJNdWx0aXBsZVNlbGVjdCIsIkJ1dHRvblNlbGVjdCIsIkRlbW9ncmFwaGljcyIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImRhdGVTdHlsZSIsImZvcm1hdCIsIkRhdGUiLCJub3ciLCJkYXRlX29mX2JpcnRoIiwic2V0RE9CIiwibGF0aW54IiwicmFjZSIsImdlbmRlciIsInNleHVhbF9vcmllbnRhdGlvbiIsImxpdmluZ19zaXR1dGF0aW9uIiwiY29sbGVnZV9lbnJvbGxlZCIsIm1pbGl0YXJ5X3NlcnZpY2UiLCJhcnJlc3RlZF9pbl9sYXN0X21vbnRoIiwicGFyb2xlX29yX3Byb2JhdGlvbiIsImluZm9ybWVkX29mX0hJVl9zdGF0dXMiLCJpbmZvcm1lZF9vZl9WSF9zdGF0dXMiLCJrbm93bGVkZ2Vfb2ZfU1VEX2hlYWx0aGNhcmVfdHJlYXRtZW50Iiwia25vd2xlZGdlX29mX0hJVl9TVERfaGVhbHRoY2FyZV90cmVhdG1lbnQiLCJwcmV0YXhfaG91c2Vob2xkX2luY29tZSIsImRlbW9ncmFwaGljX2RldGFpbHMiLCJzZXREZW1vZ3JhcGhpYyIsImRlbW9ncmFwaGljX2luZm8iLCJTdWJtaXQiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZXBsYWNlIiwiZGl2IiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm1hcCIsInF1ZXN0aW9uSW5mbyIsIm11bHRpcGxlIiwic3RhdGUiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/demographics.tsx\n");

/***/ })

});