import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { StaffPayslipModel } from '../_models/staff-payslip.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffPayslipService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new StaffPayslip to the server
  createStaffPayslip(staffPayslip: StaffPayslipModel): Observable<StaffPayslipModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<StaffPayslipModel>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip, staffPayslip, {headers: httpHeaders});
  }

  // READ
  getAllStaffPayslips(): Observable<StaffPayslipModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<StaffPayslipModel[]>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip, {headers: httpHeaders});
  }

  getStaffPayslipById(staffPayslipId: number): Observable<StaffPayslipModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<StaffPayslipModel>(Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip+ `/${staffPayslipId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findStaffPayslips(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the StaffPayslip on the server
  updateStaffPayslip(staffPayslip: StaffPayslipModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip+'/'+staffPayslip.id, staffPayslip, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForStaffPayslip(staffPayslips: StaffPayslipModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      staffPayslipsForUpdate: staffPayslips,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the StaffPayslip from the server
  deleteStaffPayslip(staffPayslipId: number): Observable<StaffPayslipModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip}/${staffPayslipId}`;
    return this.http.delete<StaffPayslipModel>(url,{headers: httpHeaders});
  }

  deleteStaffPayslips(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Human_Resource.StaffPayslip + '/deleteStaffPayslips';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {staffPayslipIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}

