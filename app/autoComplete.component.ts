import {Typeahead} from './typeahead/ng2-typeahead'
import {Component, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import forEach = require("core-js/fn/array/for-each");
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'autocomplete',
    template: `<form class="navbar-form">
                <typeahead class="form-group"
                  [list]="users"
                  [searchProperty]="'first_name'" [displayProperty]="'name'"
                  [maxSuggestions]="10"
                  (suggestionSelected)="UserSelected($event)"
                   placeholder="Search For Friends">
               </typeahead>
               </form>
                    `,
    directives: [Typeahead],
    providers: [UserService]
})
export class AutoCompleteComponent implements OnInit {
    users:any;
    selectedUser:any;

    constructor(private _userService:UserService, private _router:Router) {
    }

    ngOnInit() {
        this._userService.getUsers()
            .subscribe(res => {
                this.users = this.prepareFields((res as any).users);
            });
    }

    public UserSelected(user) {
        if (user) {
            this.selectedUser = user;
            this._router.navigate(['Profile', {id: this.selectedUser.user_id.toString()}]);
        }
    }

    prepareFields(users) {

        users.forEach(function (arrayItem) {
            arrayItem["name"] = (arrayItem.first_name + " " + arrayItem.last_name);
        });
        return users;
    }

}