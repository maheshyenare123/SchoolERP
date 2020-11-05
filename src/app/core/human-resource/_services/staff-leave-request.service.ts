import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { StaffLeaveRequestModel } from '../_models/staff-leave-request.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffLeaveRequestService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new StaffLeaveRequest to the server
  createStaffLeaveRequest(staffLeaveRequest: StaffLeaveRequestModel): Observable<StaffLeaveRequestModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<StaffLeaveRequestModel>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest, staffLeaveRequest, {headers: httpHeaders});
  }

  // READ
  getAllStaffLeaveRequests(): Observable<StaffLeaveRequestModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<StaffLeaveRequestModel[]>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest, {headers: httpHeaders});
  }

  getStaffLeaveRequestById(staffLeaveRequestId: number): Observable<StaffLeaveRequestModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<StaffLeaveRequestModel>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest+ `/${staffLeaveRequestId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findStaffLeaveRequests(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the StaffLeaveRequest on the server
  updateStaffLeaveRequest(staffLeaveRequest: StaffLeaveRequestModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest+'/'+staffLeaveRequest.id, staffLeaveRequest, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForStaffLeaveRequest(staffLeaveRequests: StaffLeaveRequestModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      staffLeaveRequestsForUpdate: staffLeaveRequests,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the StaffLeaveRequest from the server
  deleteStaffLeaveRequest(staffLeaveRequestId: number): Observable<StaffLeaveRequestModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest}/${staffLeaveRequestId}`;
    return this.http.delete<StaffLeaveRequestModel>(url,{headers: httpHeaders});
  }

  deleteStaffLeaveRequests(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Human_Resource.StaffLeaveRequest + '/deleteStaffLeaveRequests';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {staffLeaveRequestIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}

