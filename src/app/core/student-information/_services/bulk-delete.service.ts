import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { StudentDtoModel } from '../_models/studentDto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BulkDeleteService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new BulkDelete to the server
  createBulkDelete(bulkDelete: StudentDtoModel): Observable<StudentDtoModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, bulkDelete, {headers: httpHeaders});
  }

  // READ
  getAllBulkDeletes(): Observable<StudentDtoModel[]> {
    return this.http.get<StudentDtoModel[]>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason);
  }

  getBulkDeleteById(bulkDeleteId: number): Observable<StudentDtoModel> {
    return this.http.get<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ `/${bulkDeleteId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findBulkDeletes(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // UPDATE => PUT: update the BulkDelete on the server
  updateBulkDelete(bulkDelete: StudentDtoModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, bulkDelete, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForBulkDelete(bulkDeletes: StudentDtoModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      bulkDeletesForUpdate: bulkDeletes,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the BulkDelete from the server
  deleteBulkDelete(bulkDeleteId: number): Observable<StudentDtoModel> {
    const url = `${Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason}/${bulkDeleteId}`;
    return this.http.delete<StudentDtoModel>(url);
  }

  deleteBulkDeletes(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/deleteBulkDeletes';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {bulkDeleteIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


