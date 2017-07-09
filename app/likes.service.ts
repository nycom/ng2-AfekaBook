import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {LocalUser} from "./DataClasses2";
import '/app/shared/obj.transform.js';


@Injectable()
export class LikeService {

    private _url = "http://localhost:8888/api.php/likes";

    constructor(private _http:Http) {
    }

    getLikesForPost(post_id:number) {
        return this._http.get(this._url + "?filter[]=post_id,eq," + post_id).map(res => php_crud_api_transform(res.json()));
    }

    likePost(post_id) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        var like = {"post_id": post_id, "user_id": LocalUser.localUser.user_id};
        console.log(JSON.stringify(like));

        return this._http.post(this._url, JSON.stringify(like), options)
            .map(res => res.json());

    }

    unlikePost(like_id:number) {
        return this._http.delete(this._url + "/" + like_id).map(res =>res.json());
    }


}