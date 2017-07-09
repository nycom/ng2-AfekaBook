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
var DataClasses2_1 = require("./DataClasses2");
var likes_service_1 = require("./likes.service");
var _ = require('lodash');
var LikeComponent = (function () {
    function LikeComponent(_likeService) {
        this._likeService = _likeService;
        this.likeUpdating = false;
    }
    LikeComponent.prototype.ngOnInit = function () {
        this.calculateLikes();
    };
    LikeComponent.prototype.onClick = function () {
        //this.iLike = !this.iLike;
        var _this = this;
        if (!this.iLike) {
            this._likeService.likePost(this.post_id).subscribe(function (res) {
                console.log(res);
                _this.reloadLikes();
            });
        }
        else if (this.like_id != -1) {
            //console.log(this.like_id.id);
            this._likeService.unlikePost(this.like_id)
                .subscribe(function (res) {
                console.log(res);
                _this.reloadLikes();
            });
        }
    };
    LikeComponent.prototype.calculateLikes = function () {
        this.totalLikes = _.size(this.likes);
        //Calculate iLike
        var finder = _.find(this.likes, function (o) {
            return (o.user_id == DataClasses2_1.LocalUser.localUser.user_id);
        });
        finder ? this.iLike = true : this.iLike = false;
        //console.log(this.iLike);
        if (this.iLike) {
            //Calculate like_id
            var find_id = _.find(this.likes, function (o) {
                if (o.user_id == DataClasses2_1.LocalUser.localUser.user_id) {
                    //console.log(o.id);
                    return o.id;
                }
                else {
                }
            });
            find_id ? this.like_id = find_id.id : this.like_id = -1;
        }
        else {
            this.like_id = -1;
        }
        //console.log(this.like_id);
        // console.log(this.iLike);
        // console.log(this.totalLikes);
        //console.log(this.like_id);
        // //console.log(_.find(this.post.likes, 'user_id', LocalUser.localUser.user_id));
        // console.log(_.filter(this.post.likes, ['active', false]));
        // //console.log(this.post.likes);
    };
    LikeComponent.prototype.reloadLikes = function () {
        var _this = this;
        this.likes = null;
        this._likeService.getLikesForPost(this.post_id)
            .subscribe(function (res) {
            _this.likes = res.likes;
            //console.log("Likes Reloaded");
            _this.calculateLikes();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LikeComponent.prototype, "totalLikes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LikeComponent.prototype, "iLike", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LikeComponent.prototype, "post_id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LikeComponent.prototype, "likes", void 0);
    LikeComponent = __decorate([
        core_1.Component({
            selector: 'like',
            template: "\n    <i\n       class=\"glyphicon glyphicon-thumbs-up\" \n       [class.highlighted]=\"iLike\"\n       (click)=\"onClick()\">\n    </i>\n    <span>{{ totalLikes }}</span>\n    ",
            styles: ["\n        .glyphicon-thumbs-up{\n            color: #ccc;\n            cursor: pointer;\n            font-size: 20px;\n        }\n        .highlighted {\n            color: blue;\n        }   \n    "],
            providers: [likes_service_1.LikeService]
        }), 
        __metadata('design:paramtypes', [likes_service_1.LikeService])
    ], LikeComponent);
    return LikeComponent;
}());
exports.LikeComponent = LikeComponent;
//# sourceMappingURL=like.component.js.map