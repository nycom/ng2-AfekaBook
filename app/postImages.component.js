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
var image_modal_popup_1 = require('./angular2-image-popup/image-modal-popup');
var PostImagesComponent = (function () {
    function PostImagesComponent() {
        this.openModalWindow = false;
    }
    PostImagesComponent.prototype.ngOnInit = function () {
    };
    PostImagesComponent.prototype.OpenImageModel = function (imageSrc, images) {
        //alert('OpenImages');
        var imageModalPointer;
        for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
                imageModalPointer = i;
                //console.log('jhhl',i);
                break;
            }
        }
        this.openModalWindow = true;
        this.images = images;
        this.imagePointer = imageModalPointer;
    };
    PostImagesComponent.prototype.cancelImageModel = function () {
        this.openModalWindow = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PostImagesComponent.prototype, "images", void 0);
    PostImagesComponent = __decorate([
        core_1.Component({
            selector: 'post-images',
            directives: [image_modal_popup_1.ImageModal],
            template: "\n        <ImageModal [modalImages]=\"images\"></ImageModal>\n        <div *ngIf=\"openModalWindow\">\n          <ImageModal [modalImages]=\"images\" [imagePointer] = \"imagePointer\" (cancelEvent) =\"cancelImageModel()\"></ImageModal>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], PostImagesComponent);
    return PostImagesComponent;
}());
exports.PostImagesComponent = PostImagesComponent;
//# sourceMappingURL=postImages.component.js.map