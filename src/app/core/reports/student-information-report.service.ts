import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from '../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../_base/crud';
import { Observable } from 'rxjs';
import { StudentDtoModel } from '../student-information';


@Injectable({
    providedIn: 'root'
})
export class StudentReportService {

    constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

    // READ
    getStudentReport(): Observable<StudentDtoModel[]> {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id')
            .set('classId', '1')
            .set('sectionId', '1');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get<StudentDtoModel[]>(Constants.URL.HOST_URL + Constants.Student_Report.Student_Report, { headers: httpHeaders, params: httpParams });
    }
    getGuardianReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Guardian_report, { headers: httpHeaders, params: httpParams });
    }
    getStudentHistoryReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Student_History_Report, { headers: httpHeaders, params: httpParams });
    }
    getStudentLoginCredentialReport(queryParams: QueryParamsModel, classId, sectionId): Observable<QueryResultsModel> {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get<QueryResultsModel>(Constants.URL.HOST_URL + Constants.Student_Report.Student_Login_Credential_Report, { headers: httpHeaders, params: httpParams });
    }

    getClassSubjectReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Class_Subject_Report, { headers: httpHeaders, params: httpParams });
    }
    getAdmissionReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Admission_report, { headers: httpHeaders, params: httpParams });
    }
    getSiblingReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Sibling_Report, { headers: httpHeaders, params: httpParams });
    }
    getStudentProfileReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Student_Profile_Report, { headers: httpHeaders, params: httpParams });
    }
    getHomeWorkEvaluationReport() {
        const httpParams = new HttpParams()
            .set('pageNo', "0")
            .set('pageSize', "10")
            .set('sortBy', 'id');
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get(Constants.URL.HOST_URL + Constants.Student_Report.Homework_Evaluation_report, { headers: httpHeaders, params: httpParams });
    }

}