import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { LibraryMemberIssueModel } from '../_models/library-member-lssue.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibraryMemberListService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new LibraryMemberList to the server
  createLibraryMemberList(libraryMemberList: LibraryMemberIssueModel): Observable<LibraryMemberIssueModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<LibraryMemberIssueModel>(Constants.URL.HOST_URL+Constants.Library.Library_Member, libraryMemberList, {headers: httpHeaders});
  }

  // READ
  getAllLibraryMemberLists(): Observable<LibraryMemberIssueModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryMemberIssueModel[]>(Constants.URL.HOST_URL+Constants.Library.Library_Member, {headers: httpHeaders});
  }
  // READ
  getAllClasses(): Observable<LibraryMemberIssueModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryMemberIssueModel[]>(Constants.URL.HOST_URL+'class', {headers: httpHeaders});
  }

  getLibraryMemberListById(libraryMemberListId: number): Observable<LibraryMemberIssueModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<LibraryMemberIssueModel>(Constants.URL.HOST_URL+Constants.Library.Library_Member+ `/${libraryMemberListId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findLibraryMemberLists(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Library.Library_Member;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
     params: httpParams
    });
  }

  // UPDATE => PUT: update the LibraryMemberList on the server
  updateLibraryMemberList(libraryMemberList: LibraryMemberIssueModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Library.Library_Member+'/'+libraryMemberList.memberId, libraryMemberList, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForLibraryMemberList(libraryMemberLists: LibraryMemberIssueModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      libraryMemberListsForUpdate: libraryMemberLists,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Library.Library_Member+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the LibraryMemberList from the server
  deleteLibraryMemberList(libraryMemberListId: number): Observable<LibraryMemberIssueModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Library.Library_Member}/${libraryMemberListId}`;
    return this.http.delete<LibraryMemberIssueModel>(url, {headers: httpHeaders});
  }

  deleteLibraryMemberLists(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Library.Library_Member + '/deleteLibraryMemberLists';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {libraryMemberListIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


