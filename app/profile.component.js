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
var router_deprecated_1 = require('@angular/router-deprecated');
var user_service_1 = require('./user.service');
var DataClasses2_1 = require('./DataClasses2');
var freinds_service_1 = require("./freinds.service");
var _ = require('lodash');
var auth_service_1 = require("./auth.service");
var common_1 = require('@angular/common');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var URL = '/upload.php';
var imgBaseUrl = 'http://localhost:8888/uploads/Images/';
var ProfileComponent = (function () {
    function ProfileComponent(_router, _routeParams, _userService, _friendsService, _authService) {
        //this.uploader.autoUpload = true;
        var _this = this;
        this._router = _router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._friendsService = _friendsService;
        this._authService = _authService;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.profileImages = [];
        this.user = DataClasses2_1.LocalUser.localUser;
        this.isCurrentUser = true;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, autoUpload: true });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.profileImages.push(imgBaseUrl.concat(item.file.name));
        };
        this.uploader.onCompleteAll = function () {
            _this.changeProfileImage();
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authService.checkCredentials();
        this.id = this._routeParams.get("id");
        if (this.id && this.id != this.user.user_id.toString()) {
            this.isCurrentUser = false;
            this._userService.getUser(this.id.toString())
                .subscribe(function (res) {
                _this.user = res.users[0];
            }, function (response) {
                if (response.status == 404) {
                    _this._router.navigate(['NotFound']);
                }
            });
            this.friendExists();
        }
    };
    ProfileComponent.prototype.routeToEditDetails = function () {
        this._router.navigate(['EditUser', { id: this.user.user_id.toString() }]);
    };
    ProfileComponent.prototype.addFriend = function () {
        var _this = this;
        this._friendsService.addFriend(this.id).subscribe(function (res) {
            _this.friendExists();
        });
    };
    ProfileComponent.prototype.unFriend = function () {
        var _this = this;
        this._friendsService.unFriend(this.friend_id)
            .subscribe(function (res) {
            if (res == 0)
                console.log("Could not delete the user.");
            _this.friendExistsFlag = false;
        });
    };
    ProfileComponent.prototype.friendExists = function () {
        var _this = this;
        this._friendsService.checkFriendExists(this.id)
            .subscribe(function (res) {
            var find = _.size(res.freinds);
            if (find > 0) {
                _this.friendExistsFlag = true;
                _this.friend_id = res.freinds[0].id;
            }
            else {
                _this.friendExistsFlag = false;
            }
        });
    };
    ProfileComponent.prototype.changeProfileImage = function () {
        var _this = this;
        //console.log(this.profileImages[0]);
        this._userService.updateUserImage(this.profileImages[0]).subscribe(function (x) {
            //this.formSubmitted = true;
            DataClasses2_1.LocalUser.localUser.image_url = _this.profileImages[0];
            _this._router.navigate(['Home']);
            console.log(x);
            _this._router.navigate(['Profile']);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/templates/profile.template.html',
            directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.NgClass, common_1.NgStyle, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [user_service_1.UserService, freinds_service_1.FriendsService, auth_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, user_service_1.UserService, freinds_service_1.FriendsService, auth_service_1.AuthenticationService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map