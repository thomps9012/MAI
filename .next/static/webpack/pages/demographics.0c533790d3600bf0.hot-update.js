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

/***/ "./utils/button-select.tsx":
/*!*********************************!*\
  !*** ./utils/button-select.tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nvar _this = undefined;\nvar ButtonSelect = function(param) {\n    var questionInfo = param.questionInfo, demographic_details = param.demographic_details, setDemographic = param.setDemographic;\n    var _this1 = _this;\n    var id = questionInfo.id, question = questionInfo.question, detail = questionInfo.detail, state = questionInfo.state, answerChoices = questionInfo.answerChoices;\n    var handleChange = function(e) {\n        var _target = e.target, name = _target.name, value = _target.value;\n        demographic_details[name] = value;\n        setDemographic(demographic_details);\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: question\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\utils\\\\button-select.tsx\",\n                lineNumber: 10,\n                columnNumber: 13\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                children: detail !== null && detail !== void 0 ? detail : ''\n            }, void 0, false, {\n                fileName: \"C:\\\\Freelance\\\\MAI\\\\utils\\\\button-select.tsx\",\n                lineNumber: 11,\n                columnNumber: 13\n            }, _this),\n            answerChoices.map(function(choice) {\n                return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    name: state,\n                    value: choice,\n                    onClick: handleChange,\n                    children: choice\n                }, choice, false, {\n                    fileName: \"C:\\\\Freelance\\\\MAI\\\\utils\\\\button-select.tsx\",\n                    lineNumber: 14,\n                    columnNumber: 21\n                }, _this1));\n            })\n        ]\n    }, id, true, {\n        fileName: \"C:\\\\Freelance\\\\MAI\\\\utils\\\\button-select.tsx\",\n        lineNumber: 9,\n        columnNumber: 9\n    }, _this));\n};\n_c = ButtonSelect;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ButtonSelect);\nvar _c;\n$RefreshReg$(_c, \"ButtonSelect\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9idXR0b24tc2VsZWN0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLEdBQUssQ0FBQ0EsWUFBWSxHQUFHLFFBQVEsUUFBc0QsQ0FBQztRQUE3REMsWUFBWSxTQUFaQSxZQUFZLEVBQUVDLG1CQUFtQixTQUFuQkEsbUJBQW1CLEVBQUVDLGNBQWMsU0FBZEEsY0FBYzs7SUFDcEUsR0FBSyxDQUFHQyxFQUFFLEdBQTZDSCxZQUFZLENBQTNERyxFQUFFLEVBQUVDLFFBQVEsR0FBbUNKLFlBQVksQ0FBdkRJLFFBQVEsRUFBRUMsTUFBTSxHQUEyQkwsWUFBWSxDQUE3Q0ssTUFBTSxFQUFFQyxLQUFLLEdBQW9CTixZQUFZLENBQXJDTSxLQUFLLEVBQUVDLGFBQWEsR0FBS1AsWUFBWSxDQUE5Qk8sYUFBYTtJQUNsRCxHQUFLLENBQUNDLFlBQVksR0FBRyxRQUFRLENBQVBDLENBQU0sRUFBSyxDQUFDO1FBQzlCLEdBQUssQ0FBaUJBLE9BQVEsR0FBUkEsQ0FBQyxDQUFDQyxNQUFNLEVBQXZCQyxJQUFJLEdBQVdGLE9BQVEsQ0FBdkJFLElBQUksRUFBRUMsS0FBSyxHQUFJSCxPQUFRLENBQWpCRyxLQUFLO1FBQ2xCWCxtQkFBbUIsQ0FBQ1UsSUFBSSxJQUFJQyxLQUFLO1FBQ2pDVixjQUFjLENBQUNELG1CQUFtQjtJQUN0QyxDQUFDO0lBQ0QsTUFBTSw2RUFDRFksQ0FBRzs7d0ZBQ0NDLENBQUM7MEJBQUVWLFFBQVE7Ozs7Ozt3RkFDWFcsQ0FBSTswQkFBRVYsTUFBTSxhQUFOQSxNQUFNLGNBQU5BLE1BQU0sR0FBSSxDQUFFOzs7Ozs7WUFDbEJFLGFBQWEsQ0FBQ1MsR0FBRyxDQUFDLFFBQVEsQ0FBUEMsTUFBYyxFQUFLLENBQUM7Z0JBQ3BDLE1BQU0sNkVBQ0RDLENBQU07b0JBQUNQLElBQUksRUFBRUwsS0FBSztvQkFBRU0sS0FBSyxFQUFFSyxNQUFNO29CQUFlRSxPQUFPLEVBQUVYLFlBQVk7OEJBQ2pFUyxNQUFNO21CQUQ4QkEsTUFBTTs7Ozs7WUFJdkQsQ0FBQzs7T0FUS2QsRUFBRTs7Ozs7QUFZcEIsQ0FBQztLQXBCS0osWUFBWTtBQXNCbEIsK0RBQWVBLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy9idXR0b24tc2VsZWN0LnRzeD80MzcxIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJ1dHRvblNlbGVjdCA9ICh7cXVlc3Rpb25JbmZvLCBkZW1vZ3JhcGhpY19kZXRhaWxzLCBzZXREZW1vZ3JhcGhpY306IGFueSkgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgcXVlc3Rpb24sIGRldGFpbCwgc3RhdGUsIGFuc3dlckNob2ljZXMgfSA9IHF1ZXN0aW9uSW5mbztcclxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCB7bmFtZSwgdmFsdWV9ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgZGVtb2dyYXBoaWNfZGV0YWlsc1tuYW1lXSA9IHZhbHVlXHJcbiAgICAgICAgc2V0RGVtb2dyYXBoaWMoZGVtb2dyYXBoaWNfZGV0YWlscylcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2lkfT5cclxuICAgICAgICAgICAgPHA+e3F1ZXN0aW9ufTwvcD5cclxuICAgICAgICAgICAgPHNwYW4+e2RldGFpbCA/PyAnJ308L3NwYW4+XHJcbiAgICAgICAgICAgIHthbnN3ZXJDaG9pY2VzLm1hcCgoY2hvaWNlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuYW1lPXtzdGF0ZX0gdmFsdWU9e2Nob2ljZX0ga2V5PXtjaG9pY2V9IG9uQ2xpY2s9e2hhbmRsZUNoYW5nZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaG9pY2V9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TZWxlY3Q7Il0sIm5hbWVzIjpbIkJ1dHRvblNlbGVjdCIsInF1ZXN0aW9uSW5mbyIsImRlbW9ncmFwaGljX2RldGFpbHMiLCJzZXREZW1vZ3JhcGhpYyIsImlkIiwicXVlc3Rpb24iLCJkZXRhaWwiLCJzdGF0ZSIsImFuc3dlckNob2ljZXMiLCJoYW5kbGVDaGFuZ2UiLCJlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwiZGl2IiwicCIsInNwYW4iLCJtYXAiLCJjaG9pY2UiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/button-select.tsx\n");

/***/ })

});