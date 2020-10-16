import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { SchoolHousModel } from '../_models/schoolHous.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentHouseService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new studentHouse to the server
  createStudentHouse(studentHouse: SchoolHousModel): Observable<SchoolHousModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<SchoolHousModel>(Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason, studentHouse, {headers: httpHeaders});
  }

  // READ
  getAllStudentHouses(): Observable<SchoolHousModel[]> {
    return this.http.get<SchoolHousModel[]>(Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason);
  }

  getStudentHouseById(studentHouseId: number): Observable<SchoolHousModel> {
    return this.http.get<SchoolHousModel>(Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason+ `/${studentHouseId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findStudentHouses(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // UPDATE => PUT: update the studentHouse on the server
  updateStudentHouse(studentHouse: SchoolHousModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason, studentHouse, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForStudentHouse(studentHouses: SchoolHousModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      studentHousesForUpdate: studentHouses,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the studentHouse from the server
  deleteStudentHouse(studentHouseId: number): Observable<SchoolHousModel> {
    const url = `${Constants.URL.HOST_URL+Constants.Front_Office.Disable_Reason}/${studentHouseId}`;
    return this.http.delete<SchoolHousModel>(url);
  }

  deleteStudentHouses(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/deleteStudentHouses';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {studentHouseIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


