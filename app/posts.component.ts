import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {PostComponent} from "./post.component";
import {PostService} from "./posts.service";
import {Validators} from "@angular/forms";
import {Control, ControlGroup} from "@angular/common";
import {Post, LocalUser, BasicPost} from "./DataClasses2";
import {SpinnerComponent} from "./shared/spinner.component";
import '/app/shared/obj.transform.js'
import * as _ from 'lodash';
import DateTimeFormat = Intl.DateTimeFormat;
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {AuthenticationService} from "./auth.service";

const URL = '/upload.php';
const imgBaseUrl = 'http://localhost:8888/uploads/Images/';

@Component({
    selector: 'posts',
    templateUrl: 'app/templates/posts.template.html',
    directives: [PostComponent, SpinnerComponent, FILE_UPLOAD_DIRECTIVES,
        NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [PostService, HTTP_PROVIDERS, AuthenticationService]

})
export class PostsComponent implements OnInit {
    public uploader:FileUploader = new FileUploader({url: URL});
    form: ControlGroup;
    body="";
    posts:any[];
    //newPost:Post;
    postsLoading;
    postImages = [];
    postCounter = 1000;
    shared="1";


    constructor(private _postService:PostService, private _authService:AuthenticationService) {

        this.form = new ControlGroup({
            postArea: new Control(['', Validators.required]),
            is_public:new Control(['', Validators.required])
        });

        this.uploader = new FileUploader({
            url: URL, queueLimit: 5, filters: [{
                fn: item => {
                    return item.size < 1024 * 1024 && item.type === 'image/jpeg';
                }
            }],
        });

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.postImages.push(imgBaseUrl.concat(item.file.name));
        };

        this.uploader.onCompleteAll = () => {
            this.addPost();
        };
    }


    ngOnInit() {
        //this._postService.getPosts().subscribe(posts => this.posts = posts);
        this._authService.checkCredentials();
        this.loadPosts();
        //this.newPost = new Post(LocalUser.localUser.user_id, "", "", "", "", "", "", 1000, "", 0, false);
    }

    onSubmit(form) {
        //console.log(this.form.value);
        if (this.uploader.queue.length==0){
            this.addPost();
        }
        else
            this.uploader.uploadAll();
    }

    private loadPosts() {
        this.postsLoading = true;
        this._postService.getPosts()
            .subscribe(
                res => {
                    this.posts = (res as any).posts;
                    //console.log(this.posts);
                },
                null,
                () => {
                    this._postService.getPrivatePosts()
                        .subscribe(
                            res2 => {
                                if (res2) {
                                    //console.log((res2 as any).posts);
                                    this.posts = this.posts.concat((res2 as any).posts);
                                    //console.log(this.posts);
                                    this.posts = _.sortBy(this.posts,"date_created").reverse();
                                }

                            },
                            null,
                            () => {
                                this.postsLoading = false;
                            });
                    //this.postsLoading = false;

                });


    }
    addPost(){
        //console.log(this.shared)
        //if(this.shared ==="1") {
            this.posts.unshift(new Post(LocalUser.localUser.user_id, this.body, this.shared, this.postImages[0],
                this.postImages[1], this.postImages[2], this.postImages[3], this.postImages[4], this.postCounter,
                new Date().toISOString().substr(0, 20).replace("T", " ")));
        //}
        this._postService.addPost(new BasicPost(LocalUser.localUser.user_id, this.body, this.shared, this.postImages[0],
            this.postImages[1], this.postImages[2], this.postImages[3], this.postImages[4]));
        this.body = "";
        this.postCounter++;
        this.uploader.clearQueue();
        this.postImages = [];
    }


}
