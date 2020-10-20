import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { ClassTimetableModel } from '../_models/class-timetable.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassTimetableService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new ClassTimetable to the server
  createClassTimetable(classTimetable: ClassTimetableModel): Observable<ClassTimetableModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<ClassTimetableModel>(Constants.URL.HOST_URL+Constants.Academics.class, classTimetable, {headers: httpHeaders});
  }

  // READ
  getAllClassTimetables(): Observable<ClassTimetableModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<ClassTimetableModel[]>(Constants.URL.HOST_URL+Constants.Academics.Class, {headers: httpHeaders});
  }

  getClassTimetableById(classTimetableId: number): Observable<ClassTimetableModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<ClassTimetableModel>(Constants.URL.HOST_URL+Constants.Academics.class+ `/${classTimetableId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findClassTimetables(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Academics.Class ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the ClassTimetable on the server
  updateClassTimetable(classTimetable: ClassTimetableModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Academics.Class+'/'+classTimetable.id, classTimetable, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForClassTimetable(classTimetables: ClassTimetableModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      classTimetablesForUpdate: classTimetables,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Academics.Class+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the ClassTimetable from the server
  deleteClassTimetable(classTimetableId: number): Observable<ClassTimetableModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Academics.Class}/${classTimetableId}`;
    return this.http.delete<ClassTimetableModel>(url, {headers: httpHeaders});
  }

  deleteClassTimetables(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Academics.Class + '/deleteClassTimetables';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {classTimetableIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


