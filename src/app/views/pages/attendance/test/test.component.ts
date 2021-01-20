import { Component, OnInit,ViewChild } from '@angular/core';

import { StudentAttendenceDtoModel,StudentAttendenceService } from 'src/app/core/attendance';
import { QueryParamsModel } from 'src/app/core/_base/crud';


import {HttpClient} from '@angular/common/http';


import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];
@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource : StudentAttendenceDtoModel[]= [];;
  constructor(private attendanceService: StudentAttendenceService) { }

  ngOnInit(): void {
   this.getAllStudentAttendanceList();
  }



  getAllStudentAttendanceList() {

    this.attendanceService.getAllStudentAddendaence( 1, 1, '2020-11-19').subscribe(res => {
      console.log(res);
      // studentAttendencesResult
    const data   =res['data'];
    this.dataSource=data['content'];
    })

  }


  // onSaveAttendance() {
  //   console.log(this.dataSource);
  // }
//   displayedColumns: string[] = ['created', 'state', 'number', 'title'];
//   exampleDatabase: ExampleHttpDao | null;
//   data: GithubIssue[] = [];

//   resultsLength = 0;
//   isLoadingResults = true;
//   isRateLimitReached = false;

//   // @ViewChild(MatPaginator) paginator: MatPaginator;
//   // @ViewChild(MatSort) sort: MatSort;
// 	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
// 	@ViewChild('sort1', { static: true }) sort: MatSort;
//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.exampleDatabase = new ExampleHttpDao(this.http);

//     // If the user changes the sort order, reset back to the first page.
//     // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

//     merge(this.sort.sortChange, this.paginator.page)
//       .pipe(
//         startWith({}),
//         switchMap(() => {
//           this.isLoadingResults = true;
//           return this.exampleDatabase!.getRepoIssues(
//             this.sort.active, this.sort.direction, this.paginator.pageIndex);
//         }),
//         map(data => {
//           // Flip flag to show that loading has finished.
//           this.isLoadingResults = false;
//           this.isRateLimitReached = false;
//           this.resultsLength = data.total_count;

//           return data.items;
//         }),
//         catchError(() => {
//           this.isLoadingResults = false;
//           // Catch if the GitHub API has reached its rate limit. Return empty data.
//           this.isRateLimitReached = true;
//           return observableOf([]);
//         })
//       ).subscribe(data => this.data = data);
//   }
// }

// export interface GithubApi {
//   items: GithubIssue[];
//   total_count: number;
// }

// export interface GithubIssue {
//   created_at: string;
//   number: string;
//   state: string;
//   title: string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDao {
//   constructor(private http: HttpClient) {}

//   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
//     const href = 'https://api.github.com/search/issues';
//     const requestUrl =
//         `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

//     return this.http.get<GithubApi>(requestUrl);
//   }
}










