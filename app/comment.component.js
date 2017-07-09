"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CommentComponent = (function () {
    function CommentComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "comment", void 0);
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'comment',
            template: "\n                <li class=\"media comment\">\n                    <div class=\"media-left\">\n                        <img class=\"media-object img-rounded\" src=\"https://unsplash.it/46/?random\" alt=\"u-img\">\n                        \n                    </div>\n                    <div class=\"media-body\">\n                        <h5 class=\"media-heading username\">{{comment.users[0].first_name + comment.users[0].first_name}}</h5>\n                        <p class=\"comment-body\">{{comment.body}}</p>\n                    </div>\n                </li>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map