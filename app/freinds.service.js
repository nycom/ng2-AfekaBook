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
var FriendsService = (function () {
    function FriendsService(_http) {
        this._http = _http;
        this._url = "http://localhost:8888/api.php/freinds";
    }
    FriendsService.prototype.getFriends = function (userId) {
        return this._http.get(this._url + "?include=users&filter=user_id,eq," + userId)
            .map(function (res) { return php_crud_api_transform(res.json()); });
    };
    FriendsService.prototype.checkFriendExists = function (friend_id) {
        return this._http.get(this._url + "?filter[]=user_id,eq," + DataClasses2_1.LocalUser.localUser.user_id
            + "&filter[]=freinds,eq," + friend_id)
            .map(function (res) { return php_crud_api_transform(res.json()); });
    };
    FriendsService.prototype.addFriend = function (friend_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var friend = { "freinds": friend_id, "user_id": DataClasses2_1.LocalUser.localUser.user_id };
        return this._http.post(this._url, JSON.stringify(friend), options)
            .map(function (res) { return res.json(); });
    };
    FriendsService.prototype.unFriend = function (frindship_id) {
        return this._http.delete(this._url + "/" + frindship_id).map(function (res) { return res.json(); });
    };
    FriendsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FriendsService);
    return FriendsService;
}());
exports.FriendsService = FriendsService;
//# sourceMappingURL=freinds.service.js.map