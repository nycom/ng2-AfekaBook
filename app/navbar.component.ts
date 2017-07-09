import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {AutoCompleteComponent} from "./autoComplete.component";
import {AuthenticationService} from "./auth.service";
import {LocalUser, User} from "./DataClasses2";
import {Validators} from "@angular/forms";
import {Control, ControlGroup} from "@angular/common";

@Component({
    selector: 'nav-bar',
    templateUrl: './app/templates/navbar.template.html',
    directives: [ROUTER_DIRECTIVES, AutoCompleteComponent],
    providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
    showNavBar:boolean = false;
    public user = new User();
    name="";
    tempId = 1;
    public errorMsg = '';

    form = new ControlGroup({
        email: new Control(['', Validators.required]),
        password: new Control(['', Validators.required])
    });

    constructor(private _router:Router,
                private _authService:AuthenticationService) {

    }

    isCurrentRoute(route) {
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    }

    ngOnInit() {
        this._authService.checkCredentials();
        //this._authService.sessionCheck();
        if (!LocalUser.localUser) {
            this.showNavBar = false;
        }
        else {
            //console.log(LocalUser.localUser);
            this.reLogin();
            this.name = LocalUser.localUser.first_name + " " + LocalUser.localUser.last_name;
            this.showNavBar = true;

        }
    }

    public login() {
        this._authService.logIn(this.user.email, this.user.password)
            .subscribe(
                res => {
                    if(res.error){
                        this.errorMsg = res.error;
                    }else{
                        LocalUser.localUser = res;
                        //console.log(LocalUser.localUser);
                    }
                    },
                null,
                () => {
                    if (LocalUser.localUser) {
//                        console.log(LocalUser.localUser);
                        this.name = LocalUser.localUser.first_name + " " + LocalUser.localUser.last_name;
                        this.showNavBar = true;
                        localStorage.setItem("user", JSON.stringify(LocalUser.localUser));
                        //console.log(JSON.stringify(LocalUser.localUser));
                        this._router.navigate(['Home']);
                        this.errorMsg = '';
                    }
                });


    }
    reLogin(){
        this._authService.logIn(localStorage.getItem("email"), localStorage.getItem("pass"))
            .subscribe(
                res => {
                    if(res.error){
                        this.errorMsg = res.error;
                    }else{
                        LocalUser.localUser = res;
                        //console.log(LocalUser.localUser);
                    }
                },
                null,
                () => {
                    if (LocalUser.localUser) {
//                        console.log(LocalUser.localUser);
                        this.name = LocalUser.localUser.first_name + " " + LocalUser.localUser.last_name;
                        this.showNavBar = true;
                        localStorage.setItem("user", JSON.stringify(LocalUser.localUser));
                        localStorage.setItem("pass", this.user.password);
                        localStorage.setItem("email", this.user.email);
                        //console.log(JSON.stringify(LocalUser.localUser));
                        this._router.navigate(['Home']);
                        this.errorMsg = '';
                    }
                });

    }

    logOut() {
        this.showNavBar = false;
        LocalUser.localUser = null;
        this._authService.logout();

    }
    clearMsg(){
        this.errorMsg = '';
    }
}
