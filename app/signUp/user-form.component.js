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
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var ValidatorService_1 = require('../shared/ValidatorService');
var DataClasses2_1 = require('../DataClasses2');
var user_service_1 = require("../user.service");
//import {UserService} from "./user.service";
var UserFormComponent = (function () {
    function UserFormComponent(fb, _router, _routeParams, _userService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this.title = '"AfekaBook Registration Form:"';
        this.formSubmitted = false;
        this.form = fb.group({
            first_name: ['', common_1.Validators.required],
            last_name: ['', common_1.Validators.required],
            // Fix shouldBeUnique for Update User...
            email: ['', common_1.Validators.compose([common_1.Validators.required, ValidatorService_1.ValidatorService.email]), ValidatorService_1.ValidatorService.shouldBeUnique],
            password: ['', common_1.Validators.required],
            address: [],
            gender: [] //,
        });
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var id = this._routeParams.get("id");
        this.title = id ? "Edit Your Information:" : "AfekaBook Registration Form:";
        if (!id) {
            this.update = false;
            this.user = new DataClasses2_1.BasicUser();
            this.user.sex = "M";
            return;
        }
        this.update = true;
        this.user = DataClasses2_1.LocalUser.localUser;
        /*
        this._userService.getUser(id)
            .subscribe(
                user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);

                    }
                });
        //this.user.password = '12345';
        */
    };
    UserFormComponent.prototype.routerCanDeactivate = function () {
        if (this.form.dirty && !this.formSubmitted)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        return true;
    };
    UserFormComponent.prototype.save = function () {
        var _this = this;
        //var result;
        console.log(this.user);
        if (this.update) {
            this._userService.updateUser(this.user).subscribe(function (x) {
                console.log("sended" + x);
                _this.formSubmitted = true;
                DataClasses2_1.LocalUser.localUser = _this.user;
                _this._router.navigate(['Home']);
            });
        }
        else {
            this._userService.addUser(this.user).subscribe(function (x) {
                _this.formSubmitted = true;
                _this._router.navigate(['Welcome']);
            });
        }
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: 'app/signUp/user-form.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_deprecated_1.Router, router_deprecated_1.RouteParams, user_service_1.UserService])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map