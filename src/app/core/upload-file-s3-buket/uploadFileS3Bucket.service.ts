import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})

export class UploadFileS3BucketService {

  constructor(private _httpClient: HttpClient, private uploadf: UploadFileS3BucketService) { }
  FOLDER = '';




  uploadfile(file, type) {
    this.FOLDER = 'folder name';
    debugger;
    const bucket = new S3(
      {
        accessKeyId: 'AKIA2KDW2TUD7O7CAENR',
        secretAccessKey: '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',
        region: 'ap-south-1'
      }
    );



    const params = {
      Bucket: 'buket name',
      Key: 'key',
      Body: file,
      ACL: 'public-read',
    };
    bucket.upload(params, function (err, data) {
      this.savefile = params.Body;
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      } else {
        console.log('Successfully uploaded profile pic.', data);

        return true;
      }

    });

    //for upload progress   
    bucket.upload(params).on('httpUploadProgress', function (evt) {
      console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
    }).send(function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });





  }


}






