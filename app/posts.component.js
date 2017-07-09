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
var post_component_1 = require("./post.component");
var posts_service_1 = require("./posts.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var DataClasses2_1 = require("./DataClasses2");
var spinner_component_1 = require("./shared/spinner.component");
require('/app/shared/obj.transform.js');
var _ = require('lodash');
var common_2 = require('@angular/common');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var auth_service_1 = require("./auth.service");
var URL = '/upload.php';
var imgBaseUrl = 'http://localhost:8888/uploads/Images/';
var PostsComponent = (function () {
    function PostsComponent(_postService, _authService) {
        var _this = this;
        this._postService = _postService;
        this._authService = _authService;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.body = "";
        this.postImages = [];
        this.postCounter = 1000;
        this.shared = "1";
        this.form = new common_1.ControlGroup({
            postArea: new common_1.Control(['', forms_1.Validators.required]),
            is_public: new common_1.Control(['', forms_1.Validators.required])
        });
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: URL, queueLimit: 5, filters: [{
                    fn: function (item) {
                        return item.size < 1024 * 1024 && item.type === 'image/jpeg';
                    }
                }],
        });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.postImages.push(imgBaseUrl.concat(item.file.name));
        };
        this.uploader.onCompleteAll = function () {
            _this.addPost();
        };
    }
    PostsComponent.prototype.ngOnInit = function () {
        //this._postService.getPosts().subscribe(posts => this.posts = posts);
        this._authService.checkCredentials();
        this.loadPosts();
        //this.newPost = new Post(LocalUser.localUser.user_id, "", "", "", "", "", "", 1000, "", 0, false);
    };
    PostsComponent.prototype.onSubmit = function (form) {
        //console.log(this.form.value);
        if (this.uploader.queue.length == 0) {
            this.addPost();
        }
        else
            this.uploader.uploadAll();
    };
    PostsComponent.prototype.loadPosts = function () {
        var _this = this;
        this.postsLoading = true;
        this._postService.getPosts()
            .subscribe(function (res) {
            _this.posts = res.posts;
            //console.log(this.posts);
        }, null, function () {
            _this._postService.getPrivatePosts()
                .subscribe(function (res2) {
                if (res2) {
                    //console.log((res2 as any).posts);
                    _this.posts = _this.posts.concat(res2.posts);
                    //console.log(this.posts);
                    _this.posts = _.sortBy(_this.posts, "date_created").reverse();
                }
            }, null, function () {
                _this.postsLoading = false;
            });
            //this.postsLoading = false;
        });
    };
    PostsComponent.prototype.addPost = function () {
        //console.log(this.shared)
        //if(this.shared ==="1") {
        this.posts.unshift(new DataClasses2_1.Post(DataClasses2_1.LocalUser.localUser.user_id, this.body, this.shared, this.postImages[0], this.postImages[1], this.postImages[2], this.postImages[3], this.postImages[4], this.postCounter, new Date().toISOString().substr(0, 20).replace("T", " ")));
        //}
        this._postService.addPost(new DataClasses2_1.BasicPost(DataClasses2_1.LocalUser.localUser.user_id, this.body, this.shared, this.postImages[0], this.postImages[1], this.postImages[2], this.postImages[3], this.postImages[4]));
        this.body = "";
        this.postCounter++;
        this.uploader.clearQueue();
        this.postImages = [];
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'posts',
            templateUrl: 'app/templates/posts.template.html',
            directives: [post_component_1.PostComponent, spinner_component_1.SpinnerComponent, ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES,
                common_2.NgClass, common_2.NgStyle, common_2.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES],
            providers: [posts_service_1.PostService, http_1.HTTP_PROVIDERS, auth_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [posts_service_1.PostService, auth_service_1.AuthenticationService])
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map