import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "./navbar.component";
import {PostsComponent} from "./posts.component";
import {UserFormComponent} from "./signUp/user-form.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {WelcomeComponent} from "./welcome.component";
import {ProfileComponent} from "./profile.component";
import {FriendsComponent} from "./friends.component";
import {LocalUser} from "./DataClasses2";

@RouteConfig([
    { path: '/', name: 'Home', component: PostsComponent },
    { path: '/welcome', name: 'Welcome', component: WelcomeComponent },
    { path: '/users', name: 'Users', component: FriendsComponent },
    { path: '/updateDetails/:id', name: 'EditUser', component: UserFormComponent },
    { path: '/register', name: 'NewUser', component: UserFormComponent },
    { path: '/profile/:id', name: 'Profile', component: ProfileComponent },
    { path: '/profile/', name: 'Profile', component: ProfileComponent },
    { path: '/home', name: 'Home', component: PostsComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])

@Component({
    selector: 'my-app',
    template: `
                <nav-bar></nav-bar>
                <div class="container">
                    <router-outlet></router-outlet>
                </div>
                
    `,
    directives: [NavbarComponent, PostsComponent, UserFormComponent, ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit{
    constructor(){
    }
    ngOnInit() {
        if(localStorage.getItem("user")) {
            //console.log(localStorage.getItem("user"));
            LocalUser.localUser = JSON.parse(localStorage.getItem("user"));
        }
       // console.log(LocalUser.localUser);
    }


}
