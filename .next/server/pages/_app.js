"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 7701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "@reduxjs/toolkit"
const toolkit_namespaceObject = require("@reduxjs/toolkit");
;// CONCATENATED MODULE: ./utils/interviewReducer.tsx

const interviewSlice = (0,toolkit_namespaceObject.createSlice)({
    name: 'interview',
    initialState: {
        id: '',
        type: '',
        agency: '',
        date: '',
        PID: '',
        client_name: ''
    },
    reducers: {
        setInterview: (state, action)=>{
            state.id = action.payload.id, state.type = action.payload.type, state.agency = action.payload.agency, state.date = action.payload.date, state.PID = action.payload.PID, state.client_name = action.payload.client_name;
        },
        eraseInterview: (state, action)=>{
            state.id = '', state.type = '', state.agency = '', state.date = '', state.PID = '', state.client_name = '';
        }
    }
});
const { setInterview , eraseInterview  } = interviewSlice.actions;
/* harmony default export */ const interviewReducer = (interviewSlice.reducer);

;// CONCATENATED MODULE: ./utils/userReducer.tsx

const userSlice = (0,toolkit_namespaceObject.createSlice)({
    name: 'user',
    initialState: {
        admin: false,
        id: '',
        name: ''
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



/* harmony default export */ const store = ((0,toolkit_namespaceObject.configureStore)({
    reducer: {
        interview: interviewReducer,
        user: userReducer
    }
}));

;// CONCATENATED MODULE: external "react-redux"
const external_react_redux_namespaceObject = require("react-redux");
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

;// CONCATENATED MODULE: ./components/navbar.tsx

function NavBar() {
    return(/*#__PURE__*/ jsx_runtime_.jsx("nav", {
        children: "Navigation"
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
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_namespaceObject.Provider, {
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
var __webpack_exports__ = (__webpack_exec__(7701));
module.exports = __webpack_exports__;

})();