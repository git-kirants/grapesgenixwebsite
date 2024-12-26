"use strict";
(() => {
var exports = {};
exports.id = 155;
exports.ids = [155];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 8530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 4426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 2196:
/***/ ((module) => {

module.exports = require("next/dist/compiled/ua-parser-js");

/***/ }),

/***/ 4021:
/***/ ((module) => {

module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 1448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "originalPathname": () => (/* binding */ originalPathname),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!./app/favicon.ico?__next_metadata
var favicon_next_metadata_namespaceObject = {};
__webpack_require__.r(favicon_next_metadata_namespaceObject);
__webpack_require__.d(favicon_next_metadata_namespaceObject, {
  "GET": () => (GET),
  "dynamic": () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6145);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9532);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(8529);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!./app/favicon.ico?__next_metadata


const contentType = "image/x-icon"
const buffer = Buffer.from("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", 'base64'
  )

function GET() {
  return new server.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ffavicon.ico%2Froute&name=app%2Ffavicon.ico%2Froute&pagePath=private-next-app-dir%2Ffavicon.ico&appDir=C%3A%5CUsers%5CKiran%20T%20S%5CDocuments%5CProjects%5CElearningTemplate%5Capp&appPaths=%2Ffavicon.ico&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: favicon_next_metadata_namespaceObject,
    pathname: "/favicon.ico",
    resolvedPagePath: "next-metadata-route-loader?page=%2Ffavicon.ico%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!C:\\Users\\Kiran T S\\Documents\\Projects\\ElearningTemplate\\app\\favicon.ico?__next_metadata",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/favicon.ico/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [859,109], () => (__webpack_exec__(1448)));
module.exports = __webpack_exports__;

})();