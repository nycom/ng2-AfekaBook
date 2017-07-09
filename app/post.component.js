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
var DataClasses2_1 = require('./DataClasses2');
var comment_component_1 = require("./comment.component");
var like_component_1 = require("./like.component");
var router_deprecated_1 = require('@angular/router-deprecated');
var posts_service_1 = require("./posts.service");
var common_1 = require("@angular/common");
var spinner_component_1 = require("./shared/spinner.component");
var postImages_component_1 = require("./postImages.component");
var PostComponent = (function () {
    //shared;
    function PostComponent(_postService) {
        this._postService = _postService;
        this.localUser = DataClasses2_1.LocalUser.localUser;
        this.postImages = [];
        this.body = "";
        this.form = new common_1.ControlGroup({
            commentArea: new common_1.Control('', common_1.Validators.required)
        });
    }
    PostComponent.prototype.ngOnInit = function () {
        this.arrangePostImages();
        this.post_id = this.post.post_id;
        this.loadComments();
        //this.comment = new Comment(122, this.post.post_id, LocalUser.localUser.user_id, '');//local user here
    };
    PostComponent.prototype.loadComments = function () {
        var _this = this;
        this.commentsLoading = true;
        this._postService.getCommentsForPost(this.post.post_id)
            .subscribe(function (res) {
            _this.comments = res.comments;
        }, null, function () {
            _this.commentsLoading = false;
        });
    };
    PostComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //this.comments.push(new BasicComment( this.post.post_id, LocalUser.localUser.user_id, this.body));
        this._postService.addCommentsToPost(new DataClasses2_1.BasicComment(this.post.post_id, DataClasses2_1.LocalUser.localUser.user_id, this.body)).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.loadComments();
            _this.body = '';
        });
    };
    PostComponent.prototype.arrangePostImages = function () {
        if (this.post.img1) {
            this.postImages.push({ thumb: this.post.img1.replace("Images", "Thumbs"), img: this.post.img1,
                description: this.post.img1.replace("http://localhost:8888/uploads/Images/", "") });
        }
        if (this.post.img2) {
            this.postImages.push({ thumb: this.post.img2.replace("Images", "Thumbs"), img: this.post.img2,
                description: this.post.img2.replace("http://localhost:8888/uploads/Images/", "") });
        }
        if (this.post.img3) {
            this.postImages.push({ thumb: this.post.img3.replace("Images", "Thumbs"), img: this.post.img3,
                description: this.post.img3.replace("http://localhost:8888/uploads/Images/", "") });
        }
        if (this.post.img4) {
            this.postImages.push({ thumb: this.post.img4.replace("Images", "Thumbs"), img: this.post.img4,
                description: this.post.img4.replace("http://localhost:8888/uploads/Images/", "") });
        }
        if (this.post.img5) {
            this.postImages.push({ thumb: this.post.img5.replace("Images", "Thumbs"), img: this.post.img5,
                description: this.post.img5.replace("http://localhost:8888/uploads/Images/", "") });
        }
    };
    PostComponent.prototype.updatePost = function () {
        console.log(this.post_id + " " + this.post.is_public);
        this._postService.updatePostSharing(this.post_id, this.post.is_public).subscribe(function (res) { return console.log(res); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PostComponent.prototype, "post", void 0);
    PostComponent = __decorate([
        core_1.Component({
            selector: 'post',
            templateUrl: './app/templates/post.template.html',
            directives: [like_component_1.LikeComponent, comment_component_1.CommentComponent, router_deprecated_1.RouterLink, spinner_component_1.SpinnerComponent, postImages_component_1.PostImagesComponent],
            providers: [posts_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [posts_service_1.PostService])
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
//# sourceMappingURL=post.component.js.map