import { Observable, of } from "rxjs";
import { BaseDataSource, QueryParamsModel, QueryResultsModel } from "../_base/crud";
import 'rxjs/add/observable/of';
import { CustomersPageLoaded, CustomersService } from "../e-commerce";
import { catchError, finalize } from "rxjs/operators";
import { StudentReportService } from "./student-information-report.service";
// import { of } from 'rxjs';
export class StudentReportDataSource extends BaseDataSource {

    constructor(private studentReportService: StudentReportService) {
        super();
        // this.loading$ = Observable.of(true);
        // this.isPreloadTextViewed$ = Observable.of(true);
    }

    loadStudentLoginCredentialReport(page, classId, sectionId) {
        this.loading$ = Observable.of(true);
        this.isPreloadTextViewed$ = Observable.of(true);
        this.studentReportService.getStudentLoginCredentialReport(page, classId, sectionId).pipe(
            catchError(() => of([])),
            finalize(() => this.isPreloadTextViewed$ = this.loading$ = Observable.of(false),)
        ).subscribe(response => {
            this.loading$ = Observable.of(false);
            this.isPreloadTextViewed$ = Observable.of(false);
            const data = response['data'];
            this.paginatorTotalSubject.next(data.totalElements);
            this.entitySubject.next(data['content']);
            // const result: QueryResultsModel = response[0];
            // const lastQuery: QueryParamsModel = response[1];
            // this.paginatorTotalSubject.next(result.totalCount);
            // this.entitySubject.next(result.items);
        })
    }









}