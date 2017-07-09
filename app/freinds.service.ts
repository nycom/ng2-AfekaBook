import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import '/app/shared/obj.transform.js';
import {LocalUser} from "./DataClasses2";


@Injectable()
export class FriendsService {

    private _url = "http://localhost:8888/api.php/freinds";


    constructor(private _http: Http){}

    getFriends(userId){
        return this._http.get(this._url + "?include=users&filter=user_id,eq," + userId)
            .map(res => php_crud_api_transform(res.json()));
    }
    checkFriendExists(friend_id){
        return this._http.get(this._url + "?filter[]=user_id,eq,"+ LocalUser.localUser.user_id
                + "&filter[]=freinds,eq," + friend_id)
                .map(res => php_crud_api_transform(res.json()));
    }


    addFriend(friend_id) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        var friend = {"freinds": friend_id, "user_id": LocalUser.localUser.user_id};

        return this._http.post(this._url, JSON.stringify(friend), options)
            .map(res => res.json());

    }

    unFriend(frindship_id:number) {
        return this._http.delete(this._url + "/" + frindship_id).map(res =>res.json());
    }

}