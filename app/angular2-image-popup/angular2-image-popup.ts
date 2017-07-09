import {Component, Input,Output,ElementRef,EventEmitter,OnInit} from '@angular/core';
import {DomSanitizationService} from "@angular/platform-browser";

@Component({
    selector: 'ImageModal',
   template: `
   <div class="ng-gallery" *ngIf="showRepeat"> 
     <div *ngFor ="let i of modalImages; let index = index">
       <img  [src]="updateImgUrl(i.thumb)" class="ng-thumb" (click)="openGallery(index)" alt="Image {{ index + 1 }}" />
      </div>
   </div>
   <div class="ng-overlay" *ngIf="opened">
    <div class="ng-gallery-content" >
    <div class="uil-ring-css" *ngIf="loading"><div></div></div>         
    <a class="close-popup" (click)="closeGallery()"><i class="fa fa-close"></i></a>
     <a class="nav-left" *ngIf="modalImages.length >1" (click)="prevImage()"><i class="fa fa-angle-left"></i></a>
     <img *ngIf="!loading" [src]="updateImgUrl(imgSrc)" (click)="nextImage()" class="effect" />
     <a class="nav-right" *ngIf="modalImages.length >1" (click)="nextImage()"><i class="fa fa-angle-right"></i></a>
     <span class="info-text">{{ currentImageIndex + 1 }}/{{ modalImages.length }} - Image {{currentImageIndex+1}}</span>
   </div>
   </div>
       ` 
})
export class ImageModal implements OnInit {
   public _element:any;
   public opened:boolean = false;
   public imgSrc:string;
   public currentImageIndex:number;
   public loading:boolean= false;
   public showRepeat:boolean= false;
  @Input('modalImages') public modalImages:any;
  @Input('imagePointer') public imagePointer:number;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();

    constructor(public element: ElementRef,
              private sanitizer: DomSanitizationService) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
      this.loading = true;
      if(this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if(this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length-1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if(this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index) {
    if(!index) {
    this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
      this.opened = true;
     for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex ) {
              this.imgSrc = this.modalImages[i].img;
              this.loading = false;
              //console.log('this.loading',this.loading);
              break;
            }
       }
  }
    updateImgUrl(id: string) {
        //Set Url To Be Trusted
           return this.sanitizer.bypassSecurityTrustUrl(id);
    }
}
