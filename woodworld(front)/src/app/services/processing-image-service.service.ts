import { Injectable } from '@angular/core';
import { Produit } from '../models/Produit';
import { FileHandle } from '../models/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProcessingImageServiceService {

  constructor(private sanitizer:DomSanitizer) { }


  public createImage(course:Produit){
    const courseImage: any[] =course.images;
    console.log(course);
    const courseImagesToFileHandle: FileHandle[]=[];
    for (let i = 0; i < courseImage.length; i++) {
      const imageFileData = courseImage[i];
      const imageBlob=this.dataURIToBlob(imageFileData.imageData,imageFileData.type);
      const imageFile=new File([imageBlob],imageFileData.name,{type : imageFileData.type});
      const finalFileHandle : FileHandle={
        file : imageFile,
        url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      
      courseImagesToFileHandle.push(finalFileHandle);
    
    }
    course.images=courseImagesToFileHandle;
    return course;
  }
  

  public dataURIToBlob(picByte:any,imageType:any){
    const byteString=window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for(let i = 0 ; i<byteString.length;i++){
      int8Array[i]=byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array],{type:imageType});
    return blob;
  }

}