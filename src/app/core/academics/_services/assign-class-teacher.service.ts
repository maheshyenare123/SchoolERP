import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { AssignClassTeacherModel } from '../_models/assign-class-teacher.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignClassTeacherService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new AssignClassTeacher to the server
  createAssignClassTeacher(assignClassTeacher: AssignClassTeacherModel): Observable<AssignClassTeacherModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<AssignClassTeacherModel>(Constants.URL.HOST_URL+Constants.Academics.Class, assignClassTeacher, {headers: httpHeaders});
  }

  // READ
  getAllAssignClassTeachers(): Observable<AssignClassTeacherModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<AssignClassTeacherModel[]>(Constants.URL.HOST_URL+Constants.Academics.Class, {headers: httpHeaders});
  }

  getAssignClassTeacherById(assignClassTeacherId: number): Observable<AssignClassTeacherModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<AssignClassTeacherModel>(Constants.URL.HOST_URL+Constants.Academics.Class+ `/${assignClassTeacherId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findAssignClassTeachers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Academics.Class ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the AssignClassTeacher on the server
  updateAssignClassTeacher(assignClassTeacher: AssignClassTeacherModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Academics.Class+'/'+assignClassTeacher.id, assignClassTeacher, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForAssignClassTeacher(assignClassTeachers: AssignClassTeacherModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      assignClassTeachersForUpdate: assignClassTeachers,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Academics.Class+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the AssignClassTeacher from the server
  deleteAssignClassTeacher(assignClassTeacherId: number): Observable<AssignClassTeacherModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Academics.Class}/${assignClassTeacherId}`;
    return this.http.delete<AssignClassTeacherModel>(url, {headers: httpHeaders});
  }

  deleteAssignClassTeachers(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Academics.Class + '/deleteAssignClassTeachers';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {assignClassTeacherIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


