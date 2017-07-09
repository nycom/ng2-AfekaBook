import {Component, Input, OnInit} from '@angular/core';
import {Comment, LocalUser, BasicComment} from './DataClasses2'
import {CommentComponent} from "./comment.component";
import {LikeComponent} from "./like.component";
import {RouterLink} from '@angular/router-deprecated';
import {PostService} from "./posts.service";
import {Control, ControlGroup, Validators} from "@angular/common";
import {SpinnerComponent} from "./shared/spinner.component";
import {PostImagesComponent} from "./postImages.component";



@Component({

    selector: 'post',
    templateUrl: './app/templates/post.template.html',
    directives: [LikeComponent, CommentComponent, RouterLink, SpinnerComponent,PostImagesComponent],
    providers: [PostService]
})
export class PostComponent implements OnInit {
    @Input() post:any;
    localUser = LocalUser.localUser;
    comments:any[];
    //comment:Comment;
    commentsLoading;
    isLiked:boolean;
    totalLikes:number;
    post_id:number;
    postImages = [];
    body="";
    //shared;

    constructor(private _postService:PostService) {
    }

    form = new ControlGroup({
        commentArea: new Control('', Validators.required)
    })

    ngOnInit() {
        this.arrangePostImages();
        this.post_id = this.post.post_id;
        this.loadComments();
        //this.comment = new Comment(122, this.post.post_id, LocalUser.localUser.user_id, '');//local user here


    }

    private loadComments() {
        this.commentsLoading = true;
        this._postService.getCommentsForPost(this.post.post_id)
            .subscribe(
                res => {
                    this.comments = (res as any).comments;
                },
                null,
                () => {
                    this.commentsLoading = false;
                });
    }

    onSubmit(form) {
        //this.comments.push(new BasicComment( this.post.post_id, LocalUser.localUser.user_id, this.body));
        this._postService.addCommentsToPost(new BasicComment(this.post.post_id, LocalUser.localUser.user_id, this.body)) .map(res => res.json()).subscribe(res => {
            this.loadComments();
            this.body = '';

        });


    }

    arrangePostImages(){
        if(this.post.img1){
            this.postImages.push({thumb: this.post.img1.replace("Images", "Thumbs"), img: this.post.img1,
                description: this.post.img1.replace("http://localhost:8888/uploads/Images/", "")});
        }
        if(this.post.img2){
            this.postImages.push({thumb: this.post.img2.replace("Images", "Thumbs"), img: this.post.img2,
                description: this.post.img2.replace("http://localhost:8888/uploads/Images/", "")});
        }
        if(this.post.img3){
            this.postImages.push({thumb: this.post.img3.replace("Images", "Thumbs"), img: this.post.img3,
                description: this.post.img3.replace("http://localhost:8888/uploads/Images/", "")});
        }
        if(this.post.img4){
            this.postImages.push({thumb: this.post.img4.replace("Images", "Thumbs"), img: this.post.img4,
                description: this.post.img4.replace("http://localhost:8888/uploads/Images/", "")});
        }
        if(this.post.img5){
            this.postImages.push({thumb: this.post.img5.replace("Images", "Thumbs"), img: this.post.img5,
                description: this.post.img5.replace("http://localhost:8888/uploads/Images/", "")});
        }
    }
    updatePost(){
        console.log(this.post_id +" "+ this.post.is_public);
        this._postService.updatePostSharing(this.post_id,this.post.is_public).subscribe(res => console.log(res));

    }



}
