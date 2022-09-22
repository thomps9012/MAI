"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 7643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: ./utils/interviewReducer.tsx
var interviewReducer = __webpack_require__(3034);
;// CONCATENATED MODULE: ./utils/userReducer.tsx

const userSlice = (0,toolkit_.createSlice)({
    name: 'user',
    // initialState: {
    //     admin: false,
    //     id: '',
    //     name: ''
    // },
    initialState: {
        admin: true,
        id: '1234567',
        name: 'Test Admin'
    },
    reducers: {
        setUser: (state, action)=>{
            state.id = action.payload.id, state.admin = action.payload.admin, state.name = action.payload.name;
        },
        logoutUser: (state, action)=>{
            state.id = '', state.name = '', state.admin = false;
        }
    }
});
const { setUser , logoutUser  } = userSlice.actions;
/* harmony default export */ const userReducer = (userSlice.reducer);

;// CONCATENATED MODULE: ./utils/store.tsx



/* harmony default export */ const store = ((0,toolkit_.configureStore)({
    reducer: {
        interview: interviewReducer/* default */.ZP,
        user: userReducer
    }
}));

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./components/defaultHeader.tsx


function DefaultHeader() {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: "/nora_favicon.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "manifest",
                href: "/manifest.json"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                charSet: "utf-8"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: "National Minority AIDS Initiative Questionnaire"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "keywords",
                content: "Health, Survey, NORA, Interview, AIDS, MAI, Substance Abuse, HIV Prevention"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                httpEquiv: "Content-Language",
                content: "en"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "MAI Survey"
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./components/footer.tsx

function Footer() {
    return(/*#__PURE__*/ jsx_runtime_.jsx("footer", {
        children: "Footer"
    }));
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/navbar.tsx


function NavBar() {
    return(/*#__PURE__*/ jsx_runtime_.jsx("nav", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
            className: "web-nav",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/interview",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Begin Interview"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/admin/clients",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Review Clients"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/gift_card/records",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Gift Card Records"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/admin/gift_cards",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Edit Gift Card Options"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/admin/interviews",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Interview Data"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/admin/questions",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Question Options"
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "nav-link",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/admin/answer_choices",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Answer Options"
                        })
                    })
                })
            ]
        })
    }));
};

;// CONCATENATED MODULE: ./components/layout.tsx




function Layout({ children  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(DefaultHeader, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(Footer, {})
        ]
    }));
};

;// CONCATENATED MODULE: ./pages/_app.tsx





function MAI({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    }));
}
/* harmony default export */ const _app = (MAI);


/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [7730,1664,3034], () => (__webpack_exec__(7643)));
module.exports = __webpack_exports__;

})();