"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var http_1 = require("@angular/http");
var AuthenticationService = (function () {
    //authenticatedUser;
    function AuthenticationService(_router, _http) {
        this._router = _router;
        this._http = _http;
    }
    AuthenticationService.prototype.logIn = function (email, password) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post("http://localhost:8888/login.php", JSON.stringify({ "email": email, "password": password }), options)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("pass");
        localStorage.removeItem("email");
        //localStorage.removeItem("password");
        this._router.navigate(['Welcome']);
    };
    // setLocalUser(){
    //
    // }
    // sessionCheck(){
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this._http.post("http://localhost:8888/session_check.php",JSON.stringify({"email":"111", "password":"111"}),options)
    //         .map(res => res.json()).subscribe(
    //             res => {
    //               console.log(res);
    //             });
    // }
    AuthenticationService.prototype.checkCredentials = function () {
        if (localStorage.getItem("user") === null) {
            this._router.navigate(['Welcome']);
            return false;
        }
        // else{
        //     var retrieveUser = localStorage.getItem('user');
        //     LocalUser.localUser = JSON.parse(retrieveUser);
        //     console.log("LocalUser:" + (LocalUser.localUser.email));
        //     this._router.navigate(['Home']);
        //     return true;
        // }
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map