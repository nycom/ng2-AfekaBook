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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('/app/shared/obj.transform.js');
var DataClasses2_1 = require("./DataClasses2");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this._url = "http://localhost:8888/api.php/users";
    }
    UserService.prototype.getUsers = function () {
        return this._http.get(this._url)
            .map(function (res) { return php_crud_api_transform(res.json()); });
    };
    UserService.prototype.getUser = function (userId) {
        return this._http.get(this._url + "?filter[]=user_id,eq," + userId)
            .map(function (res) { return php_crud_api_transform(res.json()); });
    };
    UserService.prototype.addUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post("http://localhost:8888/sign_up.php", JSON.stringify(user), options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._url + "/" + DataClasses2_1.LocalUser.localUser.user_id, JSON.stringify(user), options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateUserImage = function (image_url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._url + "/" + DataClasses2_1.LocalUser.localUser.user_id, JSON.stringify({ image_url: image_url }), options)
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map