"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.js":
/*!*************************!*\
  !*** ./src/app/page.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(app-pages-browser)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_auth_nextauth_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/auth/[...nextauth]/options */ \"(app-pages-browser)/./src/app/api/auth/[...nextauth]/options.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Home() {\n    _s();\n    const session = (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_api_auth_nextauth_options__WEBPACK_IMPORTED_MODULE_2__.options);\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        console.log(session);\n    }, [\n        session\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"columns v-centered\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"column\",\n                    children: \"Welcome to the home page!\"\n                }, void 0, false, {\n                    fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                    lineNumber: 18,\n                    columnNumber: 9\n                }, this),\n                session ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"columns\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"column\",\n                            children: [\n                                \"You are logged in as \",\n                                session === null || session === void 0 ? void 0 : session.user\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                            lineNumber: 21,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"column\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                href: \"/api/auth/signout\",\n                                children: \"Sign out\"\n                            }, void 0, false, {\n                                fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                                lineNumber: 25,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                            lineNumber: 24,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                    lineNumber: 20,\n                    columnNumber: 11\n                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: [\n                        \"You are not logged in! \",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            href: \"/api/auth/signin\",\n                            children: \"Sign in\"\n                        }, void 0, false, {\n                            fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                            lineNumber: 30,\n                            columnNumber: 36\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n                    lineNumber: 29,\n                    columnNumber: 11\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/yucan/Desktop/sport_manage_system/src/app/page.js\",\n            lineNumber: 17,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n_s(Home, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRTZDO0FBQ2M7QUFDOUI7QUFDSztBQUVuQixTQUFTSTs7SUFDdEIsTUFBTUMsVUFBVUwsMkRBQWdCQSxDQUFDQywrREFBT0E7SUFFeENFLGdEQUFTQSxDQUFFO1FBQ1RHLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZCxHQUFHO1FBQUNBO0tBQVE7SUFFWixxQkFDRTtrQkFDRSw0RUFBQ0c7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNEO29CQUFJQyxXQUFVOzhCQUFTOzs7Ozs7Z0JBQ3ZCSix3QkFDQyw4REFBQ0c7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDRDs0QkFBSUMsV0FBVTs7Z0NBQVM7Z0NBQ0FKLG9CQUFBQSw4QkFBQUEsUUFBU0ssSUFBSTs7Ozs7OztzQ0FFckMsOERBQUNGOzRCQUFJQyxXQUFVO3NDQUNiLDRFQUFDUCxpREFBSUE7Z0NBQUNTLE1BQUs7MENBQW9COzs7Ozs7Ozs7Ozs7Ozs7O3lDQUluQyw4REFBQ0M7O3dCQUFFO3NDQUNzQiw4REFBQ1YsaURBQUlBOzRCQUFDUyxNQUFLO3NDQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFqRTtHQTlCd0JQO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcGFnZS5qcz8yYjNkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IG9wdGlvbnMgfSBmcm9tIFwiLi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL29wdGlvbnNcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBzZXNzaW9uID0gZ2V0U2VydmVyU2Vzc2lvbihvcHRpb25zKTtcblxuICB1c2VFZmZlY3QgKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzZXNzaW9uKTtcbiAgfSwgW3Nlc3Npb25dKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbnMgdi1jZW50ZXJlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtblwiPldlbGNvbWUgdG8gdGhlIGhvbWUgcGFnZSE8L2Rpdj5cbiAgICAgICAge3Nlc3Npb24gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtblwiPlxuICAgICAgICAgICAgICBZb3UgYXJlIGxvZ2dlZCBpbiBhcyB7c2Vzc2lvbj8udXNlcn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9hcGkvYXV0aC9zaWdub3V0XCI+U2lnbiBvdXQ8L0xpbms+XG4gICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBZb3UgYXJlIG5vdCBsb2dnZWQgaW4hIDxMaW5rIGhyZWY9XCIvYXBpL2F1dGgvc2lnbmluXCI+U2lnbiBpbjwvTGluaz5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG5cbiAgICA8Lz5cbiAgKTtcbn0iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsIm9wdGlvbnMiLCJMaW5rIiwidXNlRWZmZWN0IiwiSG9tZSIsInNlc3Npb24iLCJjb25zb2xlIiwibG9nIiwiZGl2IiwiY2xhc3NOYW1lIiwidXNlciIsImhyZWYiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.js\n"));

/***/ })

});