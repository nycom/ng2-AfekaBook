import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Post, BasicPost, BasicComment, LocalUser} from "./DataClasses2";
import '/app/shared/obj.transform.js';


@Injectable()
export class PostService {

    //private _url = "https://jsonplaceholder.typicode.com/posts";
    private _url = "http://localhost:8888/api.php/";

    constructor(private _http: Http){}


    addPost(post:BasicPost){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

            return this._http.post(this._url + "posts", JSON.stringify(post), options)
                .map(res => res.json()).subscribe(res => res);
    }

    getPosts() {
        var url = this._url + "posts?include=users,likes&order=date_created,desc&filter[]=is_public,eq,1";
        //http://localhost:8888/api.php/posts?include=users,likes&order=date_created&transform=true&filter%5B%5D=is_public%2Ceq%2C1

        return this._http.get(url).map(res => php_crud_api_transform(res.json()));
        //http.get(url).map(res => php_crud_api_transform(res.json()));
    }
    getPrivatePosts() {
        var url = this._url + "posts?include=users,likes&order=date_created,desc&filter[]=is_public,eq,0&filter[]=user_id,eq,"+LocalUser.localUser.user_id;
        //http://localhost:8888/api.php/posts?include=users,likes&order=date_created&transform=true&filter%5B%5D=is_public%2Ceq%2C1

        return this._http.get(url).map(res => php_crud_api_transform(res.json()));
        //http.get(url).map(res => php_crud_api_transform(res.json()));
    }

    getCommentsForPost(post_id: number){
        //console.log(this._url + "comments/post_id/" + post_id );
        return this._http.get(this._url + "comments?include=users&filter[]=post_id,eq," + post_id).map(res => php_crud_api_transform(res.json()));
    }

    addCommentsToPost(comment:BasicComment){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._url + "comments", JSON.stringify(comment), options);
    }
    updatePostSharing(post_id,isPublic){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(isPublic);
        console.log(this._url + "posts/" + post_id);
        console.log(JSON.stringify({is_public:isPublic}));
        return this._http.put(this._url + "posts/" + post_id, JSON.stringify({is_public:isPublic}), options)
            .map(res => res.json());
    }

}