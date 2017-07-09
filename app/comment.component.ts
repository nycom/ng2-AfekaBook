import {Component, Input} from '@angular/core';

@Component({
    selector: 'comment',
    template: `
                <li class="media comment">
                    <div class="media-left">
                        <img class="media-object img-rounded" src="https://unsplash.it/46/?random" alt="u-img">
                        
                    </div>
                    <div class="media-body">
                        <h5 class="media-heading username">{{comment.users[0].first_name + comment.users[0].first_name}}</h5>
                        <p class="comment-body">{{comment.body}}</p>
                    </div>
                </li>
    `,
})
export class CommentComponent {
    @Input() comment;


}
