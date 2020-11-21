import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { AssignFeesStudentModel } from '../_models/assign-fees-student.model';
import { Observable } from 'rxjs';
import { AssignFeeStudentRequestDtoModel } from '../_models/assign-fee-student-request-dto.model';


@Injectable({
  providedIn: 'root'
})
export class AssignFeesStudentService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new AssignFeesStudent to the server
  createAssignFeesStudent(assignFeesStudent: AssignFeeStudentRequestDtoModel): Observable<AssignFeeStudentRequestDtoModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<AssignFeeStudentRequestDtoModel>(Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent, assignFeesStudent, {headers: httpHeaders});
  }

  // READ
  getAllAssignFeesStudents(): Observable<AssignFeesStudentModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<AssignFeesStudentModel[]>(Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent, {headers: httpHeaders});
  }

  getAssignFeesStudentById(assignFeesStudentId: number): Observable<AssignFeesStudentModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<AssignFeesStudentModel>(Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+ `/${assignFeesStudentId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findAssignFeesStudents(queryParams,classId:number,sectionId:number,category:number,gender:string,rte:string,feeGroupId:number): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
   // const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
//

if(gender == null && rte == null){
  const httpParams =new HttpParams()
  .set('classesId', classId.toString())
  .set('pageNo', queryParams.pageNo.toString())
  .set('pageSize', queryParams.itemsPerPage.toString())
  .set('sectionId', sectionId.toString())
  .set('sortBy', 'id');
  const url =Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+'/'+feeGroupId ;
  return this.http.get<QueryResultsModel>(url, {
    headers: httpHeaders,
    params: httpParams
  });
}


    if(gender == null){
      const httpParams =new HttpParams()
      .set('classesId', classId.toString())
      
      .set('rte', rte.toString())
      .set('pageNo', queryParams.pageNo.toString())
      .set('pageSize', queryParams.itemsPerPage.toString())
      .set('sectionId', sectionId.toString())
      .set('sortBy', 'id');

      const url =Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+'/'+feeGroupId ;
      return this.http.get<QueryResultsModel>(url, {
        headers: httpHeaders,
        params: httpParams
      });
    }
		if(rte == null){
      const httpParams =new HttpParams()
      .set('classesId', classId.toString())
      .set('gender', gender.toString())
     
      .set('pageNo', queryParams.pageNo.toString())
      .set('pageSize', queryParams.itemsPerPage.toString())
      .set('sectionId', sectionId.toString())
      .set('sortBy', 'id');

      const url =Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+'/'+feeGroupId ;
      return this.http.get<QueryResultsModel>(url, {
        headers: httpHeaders,
        params: httpParams
      });
    }
  
    
  
  }

  // UPDATE => PUT: update the AssignFeesStudent on the server
  updateAssignFeesStudent(assignFeesStudent: AssignFeesStudentModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+'/'+assignFeesStudent.studentId, assignFeesStudent, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForAssignFeesStudent(assignFeesStudents: AssignFeesStudentModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      assignFeesStudentsForUpdate: assignFeesStudents,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the AssignFeesStudent from the server
  deleteAssignFeesStudent(assignFeesStudentId: number): Observable<AssignFeesStudentModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent}/${assignFeesStudentId}`;
    return this.http.delete<AssignFeesStudentModel>(url, {headers: httpHeaders});
  }

  deleteAssignFeesStudents(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Fees_Collection.AssignFeesStudent + '/deleteAssignFeesStudents';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {assignFeesStudentIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


