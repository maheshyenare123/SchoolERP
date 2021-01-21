


import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";


import { catchError, finalize } from "rxjs/operators";
import { FindResultsModel, QueryParamsModel, QueryResultsModel } from "../../_base/crud";
import { LibraryStudentMemberModel } from "../_models/library-student-member.model";

import { LibraryStudentMemberService } from "../_services/library-student-member.service";



export class StudentMemberLibarayDataSource implements DataSource<LibraryStudentMemberModel> {

    private StudentMemberLibaray = new BehaviorSubject<LibraryStudentMemberModel[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    paginatorTotalSubject = new BehaviorSubject<number>(0);
    paginatorTotal$: Observable<number>;



    constructor(private libraryStudentMembersService: LibraryStudentMemberService,) {

    }

    loadLessons(page: QueryParamsModel, classId: number, sectionId: number) {

        this.loadingSubject.next(true);
        this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
        this.libraryStudentMembersService.findLibraryStudentMembers(page, classId, sectionId).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(response => {

                // const result: QueryResultsModel = response[0];
                // const lastQuery: QueryParamsModel = response[1];
                const data: FindResultsModel = response['data'];
                this.paginatorTotalSubject.next(data.totalElements);
                // this.paginatorTotal$=data.totalElements;
                this.StudentMemberLibaray.next(data.content)
                  console.log(data.content);
                // return data.content;

            }
 
            );

    }

    connect(collectionViewer: CollectionViewer): Observable<LibraryStudentMemberModel[]> {
        console.log("Connecting data source");
        return this.StudentMemberLibaray.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.StudentMemberLibaray.complete();
        this.paginatorTotalSubject.complete();
        this.loadingSubject.complete();
    }

}

