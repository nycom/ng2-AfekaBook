import {Component, Input, OnInit} from '@angular/core';
import {} from "./posts.service";
import {LocalUser} from "./DataClasses2";
import {LikeService} from "./likes.service";
import * as _ from 'lodash';

@Component({
    selector: 'like',
    template: `
    <i
       class="glyphicon glyphicon-thumbs-up" 
       [class.highlighted]="iLike"
       (click)="onClick()">
    </i>
    <span>{{ totalLikes }}</span>
    `,
    styles: [`
        .glyphicon-thumbs-up{
            color: #ccc;
            cursor: pointer;
            font-size: 20px;
        }
        .highlighted {
            color: blue;
        }   
    `],
    providers: [LikeService]
})
export class LikeComponent implements OnInit {

    @Input() totalLikes;
    @Input() iLike:boolean;
    like_id;
    @Input() post_id:number;
    @Input() likes;

    likeUpdating = false

    constructor(private _likeService:LikeService) {
    }

    ngOnInit() {
        this.calculateLikes();
    }

    onClick() {
        //this.iLike = !this.iLike;

        if (!this.iLike) {
            this._likeService.likePost(this.post_id).subscribe(res => {
                console.log(res);
                this.reloadLikes();
            });
        } else if(this.like_id!=-1){
            //console.log(this.like_id.id);
            this._likeService.unlikePost(this.like_id)
                .subscribe(res => {
                    console.log(res);
                    this.reloadLikes();
                });
        }
    }

    calculateLikes() {

        this.totalLikes = _.size(this.likes);

        //Calculate iLike
        var finder = _.find(this.likes, function (o) {
            return ((o as any).user_id == LocalUser.localUser.user_id);
        });
        finder ? this.iLike = true : this.iLike = false;
        //console.log(this.iLike);

        if (this.iLike) {

            //Calculate like_id
            var find_id = _.find(this.likes, function (o) {
                if ((o as any).user_id == LocalUser.localUser.user_id) {
                    //console.log(o.id);
                    return (o as any).id;
                } else {
                    //console.log("id not found");
                }
            });
            find_id ? this.like_id = (find_id as any).id : this.like_id = -1;

        } else {
            this.like_id = -1;
        }
        //console.log(this.like_id);
        // console.log(this.iLike);
        // console.log(this.totalLikes);
        //console.log(this.like_id);
        // //console.log(_.find(this.post.likes, 'user_id', LocalUser.localUser.user_id));
        // console.log(_.filter(this.post.likes, ['active', false]));
        // //console.log(this.post.likes);

    }

    reloadLikes() {
        this.likes = null;

        this._likeService.getLikesForPost(this.post_id)
            .subscribe(res => {
                this.likes = (res as any).likes;
                //console.log("Likes Reloaded");
                this.calculateLikes();
            });

    }

}