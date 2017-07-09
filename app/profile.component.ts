import {Component, OnInit} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';

import {UserService} from './user.service';
import {LocalUser} from './DataClasses2';
import {FriendsService} from "./freinds.service";
import * as _ from 'lodash';
import {AuthenticationService} from "./auth.service";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL = '/upload.php';
const imgBaseUrl = 'http://localhost:8888/uploads/Images/';


@Component({
    templateUrl: 'app/templates/profile.template.html',
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [UserService,FriendsService,AuthenticationService]
})
export class ProfileComponent implements OnInit {
    public uploader:FileUploader = new FileUploader({url: URL});
    profileImages = [];
    user = LocalUser.localUser;
    id;
    friend_id;
    isCurrentUser = true;
    friendExistsFlag:boolean;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _userService:UserService,
                private _friendsService:FriendsService,
                private _authService:AuthenticationService) {
        //this.uploader.autoUpload = true;

        this.uploader = new FileUploader({url: URL, autoUpload: true});

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.profileImages.push(imgBaseUrl.concat(item.file.name));

        };

        this.uploader.onCompleteAll = () => {
            this.changeProfileImage();
        };


    }

    ngOnInit() {
        this._authService.checkCredentials();
        this.id = this._routeParams.get("id");
        if (this.id && this.id != this.user.user_id.toString()) {

            this.isCurrentUser = false;

        this._userService.getUser(this.id.toString())
            .subscribe(
                res => {
                    this.user = (res as any).users[0];
                },
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });
    this.friendExists();
    }}
    routeToEditDetails() {
        this._router.navigate(['EditUser' , {id: this.user.user_id.toString()}]);
    }
    addFriend(){
        this._friendsService.addFriend(this.id).subscribe(res => {
            this.friendExists();
        });

    }
    unFriend(){
            this._friendsService.unFriend(this.friend_id)
                .subscribe(res => {
                        if(res==0)
                        console.log("Could not delete the user.");
                        this.friendExistsFlag = false;

                    });

    }
    friendExists(){
        this._friendsService.checkFriendExists(this.id)
            .subscribe(
                res => {

                    var find = _.size((res as any).freinds);
                    if (find>0) {
                        this.friendExistsFlag = true;
                        this.friend_id = (res as any).freinds[0].id;

                    }else {
                        this.friendExistsFlag = false;
                    }
                });

    }
    changeProfileImage(){
        //console.log(this.profileImages[0]);
        this._userService.updateUserImage(this.profileImages[0]).subscribe(x => {
            //this.formSubmitted = true;
            LocalUser.localUser.image_url = this.profileImages[0];
            this._router.navigate(['Home']);
            console.log(x);
            this._router.navigate(['Profile']);
        });
    }


}