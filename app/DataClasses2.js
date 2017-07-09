"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BasicUser = (function () {
    function BasicUser(_first_name, _last_name, _email, _sex, _password, _address, _image_url) {
        this.first_name = _first_name;
        this.last_name = _last_name;
        this.sex = _sex;
        this.email = _email;
        this.address = _address;
        this.password = _password;
    }
    return BasicUser;
}());
exports.BasicUser = BasicUser;
var User = (function (_super) {
    __extends(User, _super);
    function User(_user_id, _first_name, _last_name, _email, _sex, _password, _address, _image_url) {
        _super.call(this, _first_name, _last_name, _email, _sex, _password, _address);
        this.user_id = _user_id;
        this.image_url = _image_url;
    }
    return User;
}(BasicUser));
exports.User = User;
var LocalUser = (function () {
    function LocalUser() {
    }
    return LocalUser;
}());
exports.LocalUser = LocalUser;
var BasicComment = (function () {
    function BasicComment(_post_id, _user_id, _body) {
        this.post_id = _post_id;
        this.user_id = _user_id;
        this.body = _body;
    }
    return BasicComment;
}());
exports.BasicComment = BasicComment;
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment(_comment_id, _post_id, _user_id, _body) {
        _super.call(this, _post_id, _user_id, _body);
        this.users = [LocalUser.localUser];
        this.comment_id = _comment_id;
    }
    return Comment;
}(BasicComment));
exports.Comment = Comment;
var BasicPost = (function () {
    function BasicPost(_user_id, _body, _is_public, _img1, _img2, _img3, _img4, _img5) {
        this.user_id = _user_id;
        this.body = _body;
        this.is_public = _is_public;
        this.img1 = _img1;
        this.img2 = _img2;
        this.img3 = _img3;
        this.img4 = _img4;
        this.img5 = _img5;
    }
    return BasicPost;
}());
exports.BasicPost = BasicPost;
var Post = (function (_super) {
    __extends(Post, _super);
    function Post(_user_id, _body, _is_public, _img1, _img2, _img3, _img4, _img5, _post_id, _date_created, _likes, _isLiked) {
        _super.call(this, _user_id, _body, _is_public, _img1, _img2, _img3, _img4, _img5);
        this.users = [LocalUser.localUser];
        this.likes = 0;
        this.isLiked = false;
        this.post_id = _post_id;
        this.likes = _likes;
        this.isLiked = _isLiked;
        this.date_created = _date_created;
    }
    return Post;
}(BasicPost));
exports.Post = Post;
//# sourceMappingURL=DataClasses2.js.map