import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams} from '@angular/router-deprecated';

import {ValidatorService} from '../shared/ValidatorService';
import {User, LocalUser, BasicUser} from '../DataClasses2';
import {UserService} from "../user.service";
//import {UserService} from "./user.service";

@Component({
    selector: 'user-form',
    templateUrl: 'app/signUp/user-form.component.html',
    providers: [UserService]
})
export class UserFormComponent implements OnInit, CanDeactivate {
    form: ControlGroup;
    title = '"AfekaBook Registration Form:"';
    user;
    update:boolean;
    formSubmitted = false;
    id;

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService
    ) {
        this.form = fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            // Fix shouldBeUnique for Update User...
            email: ['',Validators.compose([Validators.required,ValidatorService.email]), ValidatorService.shouldBeUnique],
            password: ['', Validators.required],
            address: [],
            gender:[]//,
            //image_url:[]
        });
    }




    ngOnInit(){
        var id = this._routeParams.get("id");

        this.title = id ? "Edit Your Information:" : "AfekaBook Registration Form:";

        if (!id) {
            this.update = false;
            this.user  = new BasicUser();
            this.user.sex = "M";
            return;
        }
        this.update = true;
        this.user = LocalUser.localUser;
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
    }

    routerCanDeactivate(){
       if (this.form.dirty && !this.formSubmitted)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');

        return true;
    }


    save(){

        //var result;
        console.log(this.user);

        if (this.update) {
            this._userService.updateUser(this.user).subscribe(x => {
                console.log("sended"+x);
                this.formSubmitted = true;
                LocalUser.localUser = this.user;
                this._router.navigate(['Home']);
            });
        }
        else {
            this._userService.addUser(this.user).subscribe(x => {
                this.formSubmitted = true;
                this._router.navigate(['Welcome']);
            });
        }
    }
}