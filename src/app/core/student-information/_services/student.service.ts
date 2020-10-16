import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { StudentDtoModel } from '../_models/studentDto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new student to the server
  createStudent(student: StudentDtoModel): Observable<StudentDtoModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, student, {headers: httpHeaders});
  }

  // READ
  getAllStudents(): Observable<StudentDtoModel[]> {
    return this.http.get<StudentDtoModel[]>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason);
  }

  getStudentById(studentId: number): Observable<StudentDtoModel> {
    return this.http.get<StudentDtoModel>(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ `/${studentId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findStudents(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/find';
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // UPDATE => PUT: update the student on the server
  updateStudent(student: StudentDtoModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason, student, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForStudent(students: StudentDtoModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      studentsForUpdate: students,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the student from the server
  deleteStudent(studentId: number): Observable<StudentDtoModel> {
    const url = `${Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason}/${studentId}`;
    return this.http.delete<StudentDtoModel>(url);
  }

  deleteStudents(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Student_Information.Disable_Reason + '/deleteStudents';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {studentIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


