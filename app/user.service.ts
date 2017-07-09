import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import '/app/shared/obj.transform.js';
import {User, BasicUser, LocalUser} from "./DataClasses2";


@Injectable()
export class UserService {

	private _url = "http://localhost:8888/api.php/users";

	constructor(private _http: Http){}

	getUsers(){
		return this._http.get(this._url)
			.map(res => php_crud_api_transform(res.json()));
	}
    
    getUser(userId){
		return this._http.get(this._url + "?filter[]=user_id,eq," + userId)
			.map(res => php_crud_api_transform(res.json()));
	}


    addUser(user:BasicUser){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this._http.post("http://localhost:8888/sign_up.php", JSON.stringify(user), options)
			.map(res => res.json());
	}
    
    updateUser(user:User){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this._http.put(this._url + "/" + LocalUser.localUser.user_id, JSON.stringify(user), options)
			.map(res => res.json());
	}

	updateUserImage(image_url){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this._http.put(this._url + "/" + LocalUser.localUser.user_id, JSON.stringify({image_url:image_url}), options)
			.map(res => res.json());
	}

	// deleteUser(userId){
	// 	return this._http.delete(this.getUserUrl(userId))
	// 		.map(res => res.json());
	// }
    
    // private getUserUrl(userId){
	// 	//console.log(this._url + "?filter[]=user_id,eq," + userId);
	// 	return this._url + "?filter[]=user_id,eq," + userId;
	// }
}