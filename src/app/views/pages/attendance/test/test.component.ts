import { Component, Inject, OnInit } from '@angular/core';
import { UploadFileS3BucketService } from 'src/app/core/upload-file-s3-buket/uploadFileS3Bucket.service';

// import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from "@ngx-file-upload/core";



@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
 
  // public uploads: NgxFileUploadRequest[] = [];

  // private storage: NgxFileUploadStorage;

  // private uploadOptions: NgxFileUploadOptions;

  constructor(private uploadFileService:UploadFileS3BucketService){}
  //   @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory
  // ) {
  //     this.storage = new NgxFileUploadStorage({
  //       concurrentUploads: 2,
  //       autoStart: true,
  //       removeCompleted: 5000 // remove completed after 5 seconds
  //     });

  //     this.uploadOptions = {url: "http://localhost:3000/gallery/add"};
  // }

  ngOnInit() {
    // this.storage.change()
    //   .subscribe(uploads => this.uploads = uploads);

    // this.uploadFileService.uploadfile("C:/Users/Developer/Desktop/test.jpg");
  }

  // public onSelect(event) {
  //   const addedFiles: File[] = event.addedFiles;

  //   if (addedFiles.length) {
  //     const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
  //     this.storage.add(uploads);
  //   }
  // }
   
  // public onRemove(upload: NgxFileUploadRequest) {
  //   this.storage.remove(upload);
  // }
}



