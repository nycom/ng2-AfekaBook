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
var autoComplete_component_1 = require("./autoComplete.component");
var auth_service_1 = require("./auth.service");
var DataClasses2_1 = require("./DataClasses2");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var NavbarComponent = (function () {
    function NavbarComponent(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
        this.showNavBar = false;
        this.user = new DataClasses2_1.User();
        this.name = "";
        this.tempId = 1;
        this.errorMsg = '';
        this.form = new common_1.ControlGroup({
            email: new common_1.Control(['', forms_1.Validators.required]),
            password: new common_1.Control(['', forms_1.Validators.required])
        });
    }
    NavbarComponent.prototype.isCurrentRoute = function (route) {
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    };
    NavbarComponent.prototype.ngOnInit = function () {
        this._authService.checkCredentials();
        //this._authService.sessionCheck();
        if (!DataClasses2_1.LocalUser.localUser) {
            this.showNavBar = false;
        }
        else {
            //console.log(LocalUser.localUser);
            this.reLogin();
            this.name = DataClasses2_1.LocalUser.localUser.first_name + " " + DataClasses2_1.LocalUser.localUser.last_name;
            this.showNavBar = true;
        }
    };
    NavbarComponent.prototype.login = function () {
        var _this = this;
        this._authService.logIn(this.user.email, this.user.password)
            .subscribe(function (res) {
            if (res.error) {
                _this.errorMsg = res.error;
            }
            else {
                DataClasses2_1.LocalUser.localUser = res;
            }
        }, null, function () {
            if (DataClasses2_1.LocalUser.localUser) {
                //                        console.log(LocalUser.localUser);
                _this.name = DataClasses2_1.LocalUser.localUser.first_name + " " + DataClasses2_1.LocalUser.localUser.last_name;
                _this.showNavBar = true;
                localStorage.setItem("user", JSON.stringify(DataClasses2_1.LocalUser.localUser));
                //console.log(JSON.stringify(LocalUser.localUser));
                _this._router.navigate(['Home']);
                _this.errorMsg = '';
            }
        });
    };
    NavbarComponent.prototype.reLogin = function () {
        var _this = this;
        this._authService.logIn(localStorage.getItem("email"), localStorage.getItem("pass"))
            .subscribe(function (res) {
            if (res.error) {
                _this.errorMsg = res.error;
            }
            else {
                DataClasses2_1.LocalUser.localUser = res;
            }
        }, null, function () {
            if (DataClasses2_1.LocalUser.localUser) {
                //                        console.log(LocalUser.localUser);
                _this.name = DataClasses2_1.LocalUser.localUser.first_name + " " + DataClasses2_1.LocalUser.localUser.last_name;
                _this.showNavBar = true;
                localStorage.setItem("user", JSON.stringify(DataClasses2_1.LocalUser.localUser));
                localStorage.setItem("pass", _this.user.password);
                localStorage.setItem("email", _this.user.email);
                //console.log(JSON.stringify(LocalUser.localUser));
                _this._router.navigate(['Home']);
                _this.errorMsg = '';
            }
        });
    };
    NavbarComponent.prototype.logOut = function () {
        this.showNavBar = false;
        DataClasses2_1.LocalUser.localUser = null;
        this._authService.logout();
    };
    NavbarComponent.prototype.clearMsg = function () {
        this.errorMsg = '';
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            templateUrl: './app/templates/navbar.template.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, autoComplete_component_1.AutoCompleteComponent],
            providers: [auth_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, auth_service_1.AuthenticationService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map