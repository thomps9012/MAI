"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 2444:
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

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/footer.tsx




function Footer() {
    const user_info = (0,external_react_redux_.useSelector)((state)=>state.user
    );
    const dispatch = (0,external_react_redux_.useDispatch)();
    const router = (0,router_.useRouter)();
    console.log('user info', user_info);
    const Logout = async ()=>{
        await caches.delete('user');
        dispatch((0,userReducer/* logoutUser */.TX)(''));
    };
    if (!user_info.loggedIn) {
        return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: "nav-link",
                    onClick: ()=>router.push('/sign_in')
                    ,
                    children: "Sign In"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: "nav-link",
                    onClick: ()=>router.push('/sign_up')
                    ,
                    children: "Sign Up"
                })
            ]
        }));
    } else {
        return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    className: "nav-link",
                    onClick: ()=>router.push('/')
                    ,
                    children: [
                        "Welcome, ",
                        user_info.name
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: "nav-link",
                    onClick: Logout,
                    children: "Logout"
                })
            ]
        }));
    }
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/navbar.tsx





function NavBar() {
    const router = (0,router_.useRouter)();
    const { 0: activeLink , 1: setActiveLink  } = (0,external_react_.useState)("");
    const { 0: show , 1: setShow  } = (0,external_react_.useState)(false);
    const user_info = (0,external_react_redux_.useSelector)((state)=>state.user
    );
    const setEditNav = (e)=>{
        const link = e.target.value;
        link === '' && router.push('/');
        router.push(`/admin/${link}`);
        setActiveLink("");
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: "web-nav",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Home"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/interview",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Begin Interview"
                            })
                        })
                    }),
                    user_info.admin && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
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
                                    href: "/admin/interviews",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Interview Data"
                                    })
                                })
                            })
                        ]
                    }),
                    user_info.editor && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
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
                                        children: "Edit..."
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "gift_cards",
                                        children: "Gift Cards"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "questions",
                                        children: "Questions"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        className: "nav-link",
                                        value: "answer_choices",
                                        children: "Answers"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "mobile-menu",
                onClick: ()=>setShow(!show)
                ,
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "Menu"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: `mobile-nav-${show ? 'show' : 'hide'}`,
                onMouseLeave: ()=>setShow(!show)
                ,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        onClick: ()=>setShow(!show)
                        ,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Home"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/interview",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Begin Interview"
                            })
                        })
                    }),
                    user_info.admin && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/clients",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Review Clients"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/gift_card/records",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Gift Card Records"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/interviews",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Interview Data"
                                    })
                                })
                            })
                        ]
                    }),
                    user_info.editor && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/users/manage",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Manage Users"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/gift_cards",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Edit Gift Card Options"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/admin/questions",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: "Question Options"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "nav-link",
                                onClick: ()=>setShow(!show)
                                ,
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
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(Footer, {})
        ]
    }));
};

;// CONCATENATED MODULE: ./utils/cached-user.tsx




function CachedUser() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    (0,external_react_.useEffect)(()=>{
        const cached_user = async ()=>{
            return await (await caches.open('user')).match('/info').then((res)=>{
                return res === null || res === void 0 ? void 0 : res.json();
            });
        };
        cached_user().then((res)=>{
            if (res === null || res === void 0 ? void 0 : res._id) {
                dispatch((0,userReducer/* setUserLoggedIn */.Wx)(true));
                dispatch((0,userReducer/* setUserID */.uC)(res._id));
                dispatch((0,userReducer/* setUserName */.b4)(res.full_name));
                dispatch((0,userReducer/* setUserAdmin */.zn)(res.admin));
                dispatch((0,userReducer/* setUserEditor */.OU)(res.editor));
            }
        });
    }, []);
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}));
};

;// CONCATENATED MODULE: ./pages/_app.tsx






function MAI({ Component , pageProps  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_redux_.Provider, {
        store: store,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(CachedUser, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        ]
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
var __webpack_exports__ = __webpack_require__.X(0, [7730,1664,3034,9196], () => (__webpack_exec__(2444)));
module.exports = __webpack_exports__;

})();