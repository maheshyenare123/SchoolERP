import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/core/api_url';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  
//  url=`http://yamistha.cloudjiffy.net/auth/login/`;

 url= Constants.URL.HOST_URL+Constants. Authentication.Login;

 

  constructor(private  http:HttpClient) { }
  isLogin(loginRequest): any {
    return this.http.post(this.url, loginRequest);
  }
  
 
}
