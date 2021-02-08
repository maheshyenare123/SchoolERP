
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";

import { catchError, finalize } from "rxjs/operators";
import { StudentReportService } from "src/app/core/reports/student-information-report.service";
import { StudentDtoModel } from "src/app/core/student-information";



export class StudentReportDataSource implements DataSource<StudentDtoModel> {

    private studentSubject = new BehaviorSubject<StudentDtoModel[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private studentReportService: StudentReportService) {
    }

    loadStudentReport(courseId: number,
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        this.studentReportService.getStudentReport().pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(lessons => this.studentSubject.next(lessons));

    }


    connect(collectionViewer: CollectionViewer): Observable<StudentDtoModel[]> {
        console.log("Connecting data source");
        return this.studentSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.studentSubject.complete();
        this.loadingSubject.complete();
    }

}