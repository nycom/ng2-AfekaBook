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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var DataClasses2_1 = require("./DataClasses2");
require('/app/shared/obj.transform.js');
var LikeService = (function () {
    function LikeService(_http) {
        this._http = _http;
        this._url = "http://localhost:8888/api.php/likes";
    }
    LikeService.prototype.getLikesForPost = function (post_id) {
        return this._http.get(this._url + "?filter[]=post_id,eq," + post_id).map(function (res) { return php_crud_api_transform(res.json()); });
    };
    LikeService.prototype.likePost = function (post_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var like = { "post_id": post_id, "user_id": DataClasses2_1.LocalUser.localUser.user_id };
        console.log(JSON.stringify(like));
        return this._http.post(this._url, JSON.stringify(like), options)
            .map(function (res) { return res.json(); });
    };
    LikeService.prototype.unlikePost = function (like_id) {
        return this._http.delete(this._url + "/" + like_id).map(function (res) { return res.json(); });
    };
    LikeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LikeService);
    return LikeService;
}());
exports.LikeService = LikeService;
//# sourceMappingURL=likes.service.js.map