import {Injectable} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Http, Headers, RequestOptions} from "@angular/http";
import {LocalUser} from "./DataClasses2";

@Injectable()
export class AuthenticationService {
    //authenticatedUser;
    constructor(private _router:Router, private _http: Http) {}

    logIn(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post("http://localhost:8888/login.php",JSON.stringify({"email":email, "password":password}),options)
             .map(res => res.json());
    }


    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("pass");
        localStorage.removeItem("email");
        //localStorage.removeItem("password");
        this._router.navigate(['Welcome']);
    }
    // setLocalUser(){
    //
    // }
    // sessionCheck(){
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this._http.post("http://localhost:8888/session_check.php",JSON.stringify({"email":"111", "password":"111"}),options)
    //         .map(res => res.json()).subscribe(
    //             res => {
    //               console.log(res);
    //             });
    // }

    checkCredentials() {
        if (localStorage.getItem("user") === null) {
            this._router.navigate(['Welcome']);
            return false;
        }
        // else{
        //     var retrieveUser = localStorage.getItem('user');
        //     LocalUser.localUser = JSON.parse(retrieveUser);
        //     console.log("LocalUser:" + (LocalUser.localUser.email));
        //     this._router.navigate(['Home']);
        //     return true;
        // }
    }
}