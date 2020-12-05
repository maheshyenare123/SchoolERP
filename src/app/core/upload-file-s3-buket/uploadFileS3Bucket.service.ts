import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})

export class UploadFileS3BucketService {

  constructor(private _httpClient: HttpClient, private uploadf: UploadFileS3BucketService) { }
  FOLDER = '';
data:any;
  //  profileImgPath = 'https://mdhl.s3.ap-south-1.amazonaws.com/opdsystem/ashwini/mahesh.jpg';

  // uploadfile(file):any {


  //   this.FOLDER = 'ashwini';
  //   debugger;
  //   const bucket = new S3(
  //     {
  //       accessKeyId: 'AKIAIWPK3XIWJQJIHUJA',
  //       secretAccessKey: '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',
  //       region: 'ap-south-1'
  //     }
  //   );



  //   const params = {
  //     Bucket: 'opdsystem/'+this.FOLDER,
  //     Key:file.name,
  //     Body: file,
  //     ACL: 'public-read',
  //   };
  //   // bucket.upload(params, function (err, data) {
  //   //   this.savefile = params.Body;
  //   //   if (err) {
  //   //     console.log('There was an error uploading your file: ', err);
  //   //     return false;
  //   //   } else {
  //   //     console.log('Successfully uploaded profile pic.', data);

  //   //     return true;
  //   //   }

  //   // });

  //   //for upload progress   
  //   bucket.upload(params).on('httpUploadProgress', function (evt) {
  //     console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
  //   }).send(function (err, data) {
  //     if (err) {
  //       console.log('There was an error uploading your file: ', err);
  //       return false;
  //     }
  //     this.data=data;
  //     // console.log('Successfully uploaded file.', data);
  //   //  console.log("path:::"+this.profileImgPath) ;
    
  //     return data;
  //     // return true;
  //   });


  // }
// upload file
// bucket.upload(params).on('httpUploadProgress', function(evt) {
//   var uploaded = Math.round(evt.loaded / evt.total * 100);
//   console.log(`File uploaded: ${uploaded}%`);
// }).send(function(err, data) {
//   if (err){
//       // an error occurred, handle the error
//       console.log(err, err.stack);
//       return;
//   }

//   var fileUrl = data.Location;
//   console.log('File URL:', fileUrl);
//   alert('File is uploaded successfully!');
// })

}






