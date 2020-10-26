import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { LibraryStaffMemberModel } from '../_models/library-staff-member.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibraryStaffMemberService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new LibraryStaffMember to the server
  createLibraryStaffMember(libraryStaffMember: LibraryStaffMemberModel): Observable<LibraryStaffMemberModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<LibraryStaffMemberModel>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry, libraryStaffMember, {headers: httpHeaders});
  }

  // READ
  getAllLibraryStaffMembers(): Observable<LibraryStaffMemberModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStaffMemberModel[]>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry, {headers: httpHeaders});
  }
  // READ
  getAllClasses(): Observable<LibraryStaffMemberModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStaffMemberModel[]>(Constants.URL.HOST_URL+'class', {headers: httpHeaders});
  }

  getLibraryStaffMemberById(libraryStaffMemberId: number): Observable<LibraryStaffMemberModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryStaffMemberModel>(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+ `/${libraryStaffMemberId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findLibraryStaffMembers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the LibraryStaffMember on the server
  updateLibraryStaffMember(libraryStaffMember: LibraryStaffMemberModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+'/'+libraryStaffMember.memberId, libraryStaffMember, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForLibraryStaffMember(libraryStaffMembers: LibraryStaffMemberModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      libraryStaffMembersForUpdate: libraryStaffMembers,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the LibraryStaffMember from the server
  deleteLibraryStaffMember(libraryStaffMemberId: number): Observable<LibraryStaffMemberModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry}/${libraryStaffMemberId}`;
    return this.http.delete<LibraryStaffMemberModel>(url, {headers: httpHeaders});
  }

  deleteLibraryStaffMembers(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Front_Office.Admission_Enquiry + '/deleteLibraryStaffMembers';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {libraryStaffMemberIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


