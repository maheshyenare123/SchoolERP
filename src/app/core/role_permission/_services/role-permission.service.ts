import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // READ
  getAllPermissionsByRole() {
    const httpParams =new HttpParams()
 
    .set('pageNo', "0")
    .set('pageSize', "10")
   
    .set('sortBy', 'id');
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get(Constants.URL.HOST_URL+Constants.Role_permission.Permission,{headers:httpHeaders,params:httpParams});
  }

}