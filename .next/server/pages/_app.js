"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 7921:
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
// EXTERNAL MODULE: ./utils/userReducer.tsx
var userReducer = __webpack_require__(9196);
;// CONCATENATED MODULE: ./utils/store.tsx



/* harmony default export */ const store = ((0,toolkit_.configureStore)({
    reducer: {
        interview: interviewReducer/* default */.ZP,
        user: userReducer/* default */.ZP
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

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "cookie-cutter"
var external_cookie_cutter_ = __webpack_require__(4957);
var external_cookie_cutter_default = /*#__PURE__*/__webpack_require__.n(external_cookie_cutter_);
;// CONCATENATED MODULE: ./components/navbar.tsx







function NavBar() {
    var ref, ref1, ref2, ref3, ref4;
    const router = (0,router_.useRouter)();
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: activeLink , 1: setActiveLink  } = (0,external_react_.useState)("");
    const { 0: show , 1: setShow  } = (0,external_react_.useState)(false);
    const { 0: userID , 1: setUserID  } = (0,external_react_.useState)("");
    const user_info = (0,external_react_redux_.useSelector)((state)=>state.user
    );
    (0,external_react_.useEffect)(()=>{
        setUserID(user_info.user._id);
    }, [
        user_info
    ]);
    const setEditNav = (e)=>{
        const link = e.target.value;
        link === "" && router.push("/");
        router.push(`/admin/${link}`);
        setActiveLink("");
    };
    const active_route = router.route;
    const logout = async ()=>{
        external_cookie_cutter_default().set("user_id");
        external_cookie_cutter_default().set("user_editor");
        external_cookie_cutter_default().set("user_admin");
        await caches.delete("user");
        await caches.delete("interviews");
        await caches.delete("clients");
        await caches.delete("gift_cards");
        await caches.delete("answers");
        await caches.delete("questions");
        dispatch((0,userReducer/* logoutUser */.TX)());
    };
    (0,external_react_.useEffect)(()=>{
        const links = document.getElementsByClassName("nav-link");
        const links2 = document.getElementsByClassName("hidden-link");
        const all_links = [
            ...links,
            ...links2
        ];
        for(let i = 0; i < all_links.length; i++){
            const link = all_links[i];
            link.id === active_route ? link.setAttribute("class", "hidden-link") : link.setAttribute("class", "nav-link");
        }
    }, [
        active_route
    ]);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: "web-nav",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Home"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/interview",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/interview",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Begin Interview"
                            })
                        })
                    }),
                    !user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/sign_in",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_in",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Login"
                            })
                        })
                    }),
                    !user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/sign_up",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_up",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Sign Up"
                            })
                        })
                    }),
                    ((ref = user_info.user) === null || ref === void 0 ? void 0 : ref.admin) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                id: "/admin/clients",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/clients",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Review Clients"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                id: "/gift_card/records",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/gift_card/records",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Gift Card Records"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                id: "/admin/interviews",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/interviews",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Interview Data"
                                    })
                                })
                            })
                        ]
                    }),
                    ((ref1 = user_info.user) === null || ref1 === void 0 ? void 0 : ref1.editor) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                id: "users",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/users/manage",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Manage Users"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                value: activeLink,
                                className: "nav-select",
                                onChange: setEditNav,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "",
                                        disabled: true,
                                        hidden: true,
                                        children: "Edit"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "gift_cards",
                                        id: "/admin/gift_cardss",
                                        children: "Gift Cards"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "questions",
                                        id: "/admin/questions",
                                        children: "Questions"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "answer_choices",
                                        id: "/admin/answers",
                                        children: "Answers"
                                    })
                                ]
                            })
                        ]
                    }),
                    user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/admin/users/[id]",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/admin/users/${userID}`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Profile"
                            })
                        })
                    }),
                    user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            onClick: logout,
                            children: "Logout"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mobile-menu",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        onClick: ()=>setShow(!show)
                        ,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Menu"
                        })
                    }),
                    user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        onClick: ()=>router.push(`/admin/users/${userID}`)
                        ,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: (ref2 = user_info.user) === null || ref2 === void 0 ? void 0 : ref2.full_name
                        })
                    }),
                    user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        onClick: logout,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Logout"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: `mobile-nav-${show ? "show" : "hide"}`,
                onMouseLeave: ()=>setShow(false)
                ,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        onClick: ()=>setShow(false)
                        ,
                        id: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Home"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        onClick: ()=>setShow(false)
                        ,
                        id: "/interview",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/interview",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Begin Interview"
                            })
                        })
                    }),
                    !user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        onClick: ()=>setShow(false)
                        ,
                        id: "/sign_in",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_in",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Login"
                            })
                        })
                    }),
                    !user_info.logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        onClick: ()=>setShow(false)
                        ,
                        id: "/sign_up",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_up",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Sign Up"
                            })
                        })
                    }),
                    ((ref3 = user_info.user) === null || ref3 === void 0 ? void 0 : ref3.admin) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/clients",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/clients",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Review Clients"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/gift_card/records",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/gift_card/records",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Gift Card Records"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/interviews",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/interviews",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Interview Data"
                                    })
                                })
                            })
                        ]
                    }),
                    ((ref4 = user_info.user) === null || ref4 === void 0 ? void 0 : ref4.editor) && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/users/manage",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/users/manage",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Manage Users"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/gift_cards",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/gift_cards",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Edit Gift Card Options"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/questions",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/questions",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Question Options"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(false)
                                ,
                                id: "/admin/answer_choices",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/answer_choices",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Answer Options"
                                    })
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./components/layout.tsx



function Layout({ children  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(DefaultHeader, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
            children
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

/***/ 9196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pH": () => (/* binding */ loginUser),
/* harmony export */   "TX": () => (/* binding */ logoutUser),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export userSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "user",
    initialState: {
        user: null,
        logged_in: false
    },
    reducers: {
        loginUser: (state, action)=>{
            state.user = action.payload, state.logged_in = true;
        },
        logoutUser: (state)=>{
            state.user = null, state.logged_in = false;
        }
    }
});
const { loginUser , logoutUser  } = userSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userSlice.reducer);


/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("cookie-cutter");

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

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

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
var __webpack_exports__ = __webpack_require__.X(0, [7730,1664,3034], () => (__webpack_exec__(7921)));
module.exports = __webpack_exports__;

})();