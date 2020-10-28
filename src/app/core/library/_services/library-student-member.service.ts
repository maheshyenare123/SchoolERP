import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { LibraryStudentMemberModel } from '../_models/library-student-member.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibraryStudentMemberService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new LibraryStudentMember to the server
  createLibraryStudentMember(libraryStudentMember: LibraryStudentMemberModel): Observable<LibraryStudentMemberModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<LibraryStudentMemberModel>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry, libraryStudentMember, {headers: httpHeaders});
  }

  // READ
  getAllLibraryStudentMembers(): Observable<LibraryStudentMemberModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStudentMemberModel[]>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry, {headers: httpHeaders});
  }
  // READ
  getAllClasses(): Observable<LibraryStudentMemberModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStudentMemberModel[]>(Constants.URL.HOST_URL+'class', {headers: httpHeaders});
  }

  getLibraryStudentMemberById(libraryStudentMemberId: number): Observable<LibraryStudentMemberModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStudentMemberModel>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+ `/${libraryStudentMemberId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findLibraryStudentMembers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the LibraryStudentMember on the server
  updateLibraryStudentMember(libraryStudentMember: LibraryStudentMemberModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+'/'+libraryStudentMember.studentId, libraryStudentMember, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForLibraryStudentMember(libraryStudentMembers: LibraryStudentMemberModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      libraryStudentMembersForUpdate: libraryStudentMembers,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the LibraryStudentMember from the server
  deleteLibraryStudentMember(libraryStudentMemberId: number): Observable<LibraryStudentMemberModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry}/${libraryStudentMemberId}`;
    return this.http.delete<LibraryStudentMemberModel>(url, {headers: httpHeaders});
  }

  deleteLibraryStudentMembers(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry + '/deleteLibraryStudentMembers';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {libraryStudentMemberIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


