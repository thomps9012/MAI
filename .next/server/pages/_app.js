"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 1380:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
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
// EXTERNAL MODULE: external "cookies-next"
var external_cookies_next_ = __webpack_require__(8982);
;// CONCATENATED MODULE: ./components/navbar.tsx





function NavBar() {
    const router = (0,router_.useRouter)();
    const { 0: activeLink , 1: setActiveLink  } = (0,external_react_.useState)("");
    const { 0: show , 1: setShow  } = (0,external_react_.useState)(false);
    const logged_in = (0,external_cookies_next_.getCookie)("logged_in");
    const user_id = (0,external_cookies_next_.getCookie)("user_id");
    const user_full_name = (0,external_cookies_next_.getCookie)("full_name");
    const editor = (0,external_cookies_next_.getCookie)("user_editor");
    const admin = (0,external_cookies_next_.getCookie)("user_admin");
    const setEditNav = (e)=>{
        const link = e.target.value;
        link === "" && router.push("/");
        router.push(`/admin/${link}`);
        setActiveLink("");
    };
    const active_route = router.route;
    const logout = async ()=>{
        (0,external_cookies_next_.deleteCookie)("user_id");
        (0,external_cookies_next_.deleteCookie)("logged_in");
        (0,external_cookies_next_.deleteCookie)("username");
        (0,external_cookies_next_.deleteCookie)("full_name");
        (0,external_cookies_next_.deleteCookie)("login_attempts");
        router.reload();
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
                    !logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/sign_in",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_in",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Login"
                            })
                        })
                    }),
                    !logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/sign_up",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/sign_up",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Admin Sign Up"
                            })
                        })
                    }),
                    admin && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
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
                    editor && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
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
                    logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "nav-link",
                        id: "/admin/users/[id]",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/admin/users/${user_id}`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Profile"
                            })
                        })
                    }),
                    logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
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
                    logged_in && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                onClick: ()=>router.push(`/admin/users/${user_id}`)
                                ,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: user_full_name
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                onClick: logout,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: "Logout"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: `mobile-nav-${show ? "show" : "hide"}`,
                onMouseLeave: ()=>setShow(false)
                ,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "",
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
                        className: "",
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
                    !logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "",
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
                    !logged_in && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "",
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
                    admin && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
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
                    editor && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
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
    return(/*#__PURE__*/ jsx_runtime_.jsx(Layout, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    }));
}
/* harmony default export */ const _app = (MAI);


/***/ }),

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

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
var __webpack_exports__ = __webpack_require__.X(0, [7730,1664], () => (__webpack_exec__(1380)));
module.exports = __webpack_exports__;

})();