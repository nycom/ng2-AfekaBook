export class BasicUser {

    first_name:string;
    last_name:string;
    email:string;
    password:string;
    sex:string;
    address:string;

    constructor(_first_name?:string, _last_name?:string, _email?:string, _sex?:string, _password?:string,
                _address?:string, _image_url?:string) {

        this.first_name = _first_name;
        this.last_name = _last_name;
        this.sex = _sex;
        this.email = _email;
        this.address = _address;
        this.password = _password;
    }
}

export class User extends BasicUser {

    user_id:number;
    image_url:string;

    constructor(_user_id?:number, _first_name?:string, _last_name?:string, _email?:string, _sex?:string, _password?:string,
                _address?:string, _image_url?:string) {
        super(_first_name, _last_name, _email, _sex, _password, _address);
        this.user_id = _user_id;
        this.image_url = _image_url;
    }
}


export class LocalUser {
    static localUser:User;

}

export class BasicComment {

    post_id:number;
    user_id:number;
    body:string;

    constructor(_post_id?:number, _user_id?:number, _body?:string) {

        this.post_id = _post_id
        this.user_id = _user_id;
        this.body = _body;
    }
}

export class Comment extends BasicComment {
    comment_id:number;
    users = [LocalUser.localUser];

    constructor(_comment_id?:number, _post_id?:number, _user_id?:number, _body?:string) {
        super(_post_id, _user_id, _body);
        this.comment_id = _comment_id;
    }
}

export class BasicPost {
    user_id:number;
    body:string;
    is_public:string;
    img1:string;
    img2:string;
    img3:string;
    img4:string;
    img5:string;


    constructor(_user_id?:number, _body?:string,_is_public?:string, _img1?:string,_img2?:string, _img3?:string, _img4?:string, _img5?:string) {

        this.user_id = _user_id;
        this.body = _body;
        this.is_public = _is_public;
        this.img1 = _img1;
        this.img2 = _img2;
        this.img3 = _img3;
        this.img4 = _img4;
        this.img5 = _img5;
    }
}

export class Post extends BasicPost {
    users = [LocalUser.localUser];
    likes = 0;
    isLiked = false;
    post_id:number;
    date_created:string;

    constructor(_user_id?:number, _body?:string,_is_public?:string, _img1?:string,_img2?:string, _img3?:string, _img4?:string, _img5?:string, _post_id?:number, _date_created?:string, _likes?:number, _isLiked?:boolean) {

        super(_user_id, _body,_is_public,_img1,_img2, _img3, _img4, _img5);
        this.post_id = _post_id;
        this.likes = _likes;
        this.isLiked = _isLiked;
        this.date_created = _date_created;

    }

}
