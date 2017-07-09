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
var user_service_1 = require("../user.service");
//import {UserService} from './user.service';
var UsersComponent = (function () {
    function UsersComponent(_service) {
        this._service = _service;
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getUsers()
            .subscribe(function (res) { return _this.friends = res.friends.users; });
    };
    UsersComponent.prototype.deleteUser = function (user) {
        if (confirm("Are you sure you want to delete " + user.name + "?")) {
        }
    };
    UsersComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/users/users.component.html',
            providers: [user_service_1.UserService],
            directives: [router_deprecated_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map