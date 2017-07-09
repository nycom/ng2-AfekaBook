"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var router_deprecated_1 = require("@angular/router-deprecated");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
]);
//# sourceMappingURL=main.js.map