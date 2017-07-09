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
var ng2_typeahead_1 = require('./typeahead/ng2-typeahead');
var core_1 = require("@angular/core");
var user_service_1 = require("./user.service");
var router_deprecated_1 = require("@angular/router-deprecated");
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getUsers()
            .subscribe(function (res) {
            _this.users = _this.prepareFields(res.users);
        });
    };
    AutoCompleteComponent.prototype.UserSelected = function (user) {
        if (user) {
            this.selectedUser = user;
            this._router.navigate(['Profile', { id: this.selectedUser.user_id.toString() }]);
        }
    };
    AutoCompleteComponent.prototype.prepareFields = function (users) {
        users.forEach(function (arrayItem) {
            arrayItem["name"] = (arrayItem.first_name + " " + arrayItem.last_name);
        });
        return users;
    };
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            template: "<form class=\"navbar-form\">\n                <typeahead class=\"form-group\"\n                  [list]=\"users\"\n                  [searchProperty]=\"'first_name'\" [displayProperty]=\"'name'\"\n                  [maxSuggestions]=\"10\"\n                  (suggestionSelected)=\"UserSelected($event)\"\n                   placeholder=\"Search For Friends\">\n               </typeahead>\n               </form>\n                    ",
            directives: [ng2_typeahead_1.Typeahead],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_deprecated_1.Router])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=autoComplete.component.js.map