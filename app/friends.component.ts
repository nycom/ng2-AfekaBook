import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {FriendsService} from "./freinds.service";
import {LocalUser} from "./DataClasses2";
import {AuthenticationService} from "./auth.service";


@Component({
    templateUrl: 'app/templates/friends.template.html',
    providers: [FriendsService,AuthenticationService],
    directives: [RouterLink]
})
export class FriendsComponent implements OnInit {
    friends: any[];

    constructor(private _friendService: FriendsService,
                private _authService:AuthenticationService){
    }

    ngOnInit(){
        this._authService.checkCredentials();
        this._friendService.getFriends(LocalUser.localUser.user_id)
            .subscribe(res => {
                this.friends = (res as any).freinds;
                //console.log(this.friends);
            });
    }

    unFriend(friend){

        console.log(friend.id);


         if (confirm("Are you sure you want to delete " + friend.first_name + "?")) {

          this._friendService.unFriend(friend.id)
                 .subscribe(res => {
                         this.reloadFriends();

                     });
        }
    }
    reloadFriends(){
        this.friends = null;
        this._friendService.getFriends(LocalUser.localUser.user_id)
            .subscribe(res => {
                this.friends = (res as any).freinds;
                //console.log(this.friends);
            });

    }
}