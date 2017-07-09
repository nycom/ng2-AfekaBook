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
var freinds_service_1 = require("./freinds.service");
var DataClasses2_1 = require("./DataClasses2");
var auth_service_1 = require("./auth.service");
var FriendsComponent = (function () {
    function FriendsComponent(_friendService, _authService) {
        this._friendService = _friendService;
        this._authService = _authService;
    }
    FriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authService.checkCredentials();
        this._friendService.getFriends(DataClasses2_1.LocalUser.localUser.user_id)
            .subscribe(function (res) {
            _this.friends = res.freinds;
            //console.log(this.friends);
        });
    };
    FriendsComponent.prototype.unFriend = function (friend) {
        var _this = this;
        console.log(friend.id);
        if (confirm("Are you sure you want to delete " + friend.first_name + "?")) {
            this._friendService.unFriend(friend.id)
                .subscribe(function (res) {
                _this.reloadFriends();
            });
        }
    };
    FriendsComponent.prototype.reloadFriends = function () {
        var _this = this;
        this.friends = null;
        this._friendService.getFriends(DataClasses2_1.LocalUser.localUser.user_id)
            .subscribe(function (res) {
            _this.friends = res.freinds;
            //console.log(this.friends);
        });
    };
    FriendsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/templates/friends.template.html',
            providers: [freinds_service_1.FriendsService, auth_service_1.AuthenticationService],
            directives: [router_deprecated_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [freinds_service_1.FriendsService, auth_service_1.AuthenticationService])
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=friends.component.js.map