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
var PostService = (function () {
    function PostService(_http) {
        this._http = _http;
        //private _url = "https://jsonplaceholder.typicode.com/posts";
        this._url = "http://localhost:8888/api.php/";
    }
    PostService.prototype.addPost = function (post) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._url + "posts", JSON.stringify(post), options)
            .map(function (res) { return res.json(); }).subscribe(function (res) { return res; });
    };
    PostService.prototype.getPosts = function () {
        var url = this._url + "posts?include=users,likes&order=date_created,desc&filter[]=is_public,eq,1";
        //http://localhost:8888/api.php/posts?include=users,likes&order=date_created&transform=true&filter%5B%5D=is_public%2Ceq%2C1
        return this._http.get(url).map(function (res) { return php_crud_api_transform(res.json()); });
        //http.get(url).map(res => php_crud_api_transform(res.json()));
    };
    PostService.prototype.getPrivatePosts = function () {
        var url = this._url + "posts?include=users,likes&order=date_created,desc&filter[]=is_public,eq,0&filter[]=user_id,eq," + DataClasses2_1.LocalUser.localUser.user_id;
        //http://localhost:8888/api.php/posts?include=users,likes&order=date_created&transform=true&filter%5B%5D=is_public%2Ceq%2C1
        return this._http.get(url).map(function (res) { return php_crud_api_transform(res.json()); });
        //http.get(url).map(res => php_crud_api_transform(res.json()));
    };
    PostService.prototype.getCommentsForPost = function (post_id) {
        //console.log(this._url + "comments/post_id/" + post_id );
        return this._http.get(this._url + "comments?include=users&filter[]=post_id,eq," + post_id).map(function (res) { return php_crud_api_transform(res.json()); });
    };
    PostService.prototype.addCommentsToPost = function (comment) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._url + "comments", JSON.stringify(comment), options);
    };
    PostService.prototype.updatePostSharing = function (post_id, isPublic) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(isPublic);
        console.log(this._url + "posts/" + post_id);
        console.log(JSON.stringify({ is_public: isPublic }));
        return this._http.put(this._url + "posts/" + post_id, JSON.stringify({ is_public: isPublic }), options)
            .map(function (res) { return res.json(); });
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=posts.service.js.map