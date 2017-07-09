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
var navbar_component_1 = require("./navbar.component");
var posts_component_1 = require("./posts.component");
var user_form_component_1 = require("./signUp/user-form.component");
var router_deprecated_1 = require("@angular/router-deprecated");
var welcome_component_1 = require("./welcome.component");
var profile_component_1 = require("./profile.component");
var friends_component_1 = require("./friends.component");
var DataClasses2_1 = require("./DataClasses2");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem("user")) {
            //console.log(localStorage.getItem("user"));
            DataClasses2_1.LocalUser.localUser = JSON.parse(localStorage.getItem("user"));
        }
        // console.log(LocalUser.localUser);
    };
    AppComponent = __decorate([
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Home', component: posts_component_1.PostsComponent },
            { path: '/welcome', name: 'Welcome', component: welcome_component_1.WelcomeComponent },
            { path: '/users', name: 'Users', component: friends_component_1.FriendsComponent },
            { path: '/updateDetails/:id', name: 'EditUser', component: user_form_component_1.UserFormComponent },
            { path: '/register', name: 'NewUser', component: user_form_component_1.UserFormComponent },
            { path: '/profile/:id', name: 'Profile', component: profile_component_1.ProfileComponent },
            { path: '/profile/', name: 'Profile', component: profile_component_1.ProfileComponent },
            { path: '/home', name: 'Home', component: posts_component_1.PostsComponent },
            { path: '/*other', name: 'Other', redirectTo: ['Home'] }
        ]),
        core_1.Component({
            selector: 'my-app',
            template: "\n                <nav-bar></nav-bar>\n                <div class=\"container\">\n                    <router-outlet></router-outlet>\n                </div>\n                \n    ",
            directives: [navbar_component_1.NavbarComponent, posts_component_1.PostsComponent, user_form_component_1.UserFormComponent, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map