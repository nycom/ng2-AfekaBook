import {Component, Input, OnInit} from '@angular/core';
import {ImageModal} from './angular2-image-popup/image-modal-popup';

@Component({
    selector : 'post-images',
    directives: [ImageModal],
    template:  `
        <ImageModal [modalImages]="images"></ImageModal>
        <div *ngIf="openModalWindow">
          <ImageModal [modalImages]="images" [imagePointer] = "imagePointer" (cancelEvent) ="cancelImageModel()"></ImageModal>
        </div>
    `
})

export class PostImagesComponent implements OnInit{
    openModalWindow:boolean=false;
    imagePointer:number;
    @Input() images;
    constructor() {}

    ngOnInit() {
       }
    OpenImageModel(imageSrc,images) {
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
        this.imagePointer  = imageModalPointer;
    }
    cancelImageModel() {
        this.openModalWindow = false;
    }
}