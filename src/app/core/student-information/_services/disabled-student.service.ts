import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { StudentDtoModel } from '../_models/studentDto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DisabledStudentService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new DisabledStudent to the server
  createDisabledStudent(disabledStudent: StudentDtoModel): Observable<StudentDtoModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, disabledStudent, {headers: httpHeaders});
  }

  // READ
  getAllDisabledStudents(): Observable<StudentDtoModel[]> {
    return this.http.get<StudentDtoModel[]>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason);
  }

  getDisabledStudentById(disabledStudentId: number): Observable<StudentDtoModel> {
    return this.http.get<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ `/${disabledStudentId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findDisabledStudents(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // UPDATE => PUT: update the DisabledStudent on the server
  updateDisabledStudent(disabledStudent: StudentDtoModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, disabledStudent, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForDisabledStudent(disabledStudents: StudentDtoModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      disabledStudentsForUpdate: disabledStudents,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the DisabledStudent from the server
  deleteDisabledStudent(disabledStudentId: number): Observable<StudentDtoModel> {
    const url = `${Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason}/${disabledStudentId}`;
    return this.http.delete<StudentDtoModel>(url);
  }

  deleteDisabledStudents(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/deleteDisabledStudents';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {disabledStudentIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


