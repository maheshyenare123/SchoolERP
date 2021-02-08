
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, skip, take, tap } from 'rxjs/operators';
import { StudentClassModel, SectionDtoModel, StudentClassService, SectionService } from 'src/app/core/academics';
import { AppState } from 'src/app/core/reducers';

import { StudentReportService } from 'src/app/core/reports/student-information-report.service';
import { CategoryDtoModel, CategoryService, StudentDtoModel, StudentsDataSource, StudentService, StudentsPageRequested } from 'src/app/core/student-information';
import { QueryParamsModel, TypesUtilsService } from 'src/app/core/_base/crud';
import { SubheaderService } from 'src/app/core/_base/layout';
import { StudentReportDataSource } from './student-report.datasource';

@Component({
	selector: 'kt-student-report',
	templateUrl: './student-report.component.html',
	styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
	// Table fields

	dataSource: StudentsDataSource;
	// , 'localIdentificationNo','nationalIdentificationNo'			
	displayedColumns = ['section','admissionNo', 'name', 'fatherName', 'dob', 'gender', 'category', 'contact','rte'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	filterStatus = '';
	filterCondition = '';
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<StudentDtoModel>(true, []);
	studentsResult: StudentDtoModel[] = [];
	private subscriptions: Subscription[] = [];


	// course: StudentDtoModel;
	// dataSource: StudentReportDataSource;
	// displayedColumns = ['section', 'admissionNo', 'studentName'];

	// // Section	Admission No	Student Name	Father Name	Date of Birth	Gender	Category	Mobile Number	Local Identification Number	National Identification Number	RTE

	// @ViewChild(MatPaginator) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;
	// @ViewChild('input') input: ElementRef;

	// Public properties
	searchForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;


	classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
	categoryList: CategoryDtoModel[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,

		private store: Store<AppState>,
		private fb: FormBuilder,
		private studentService: StudentService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private categoryService: CategoryService
	) { }

	ngOnInit(): void {

		this.loadAllClasses();
		this.loadAllSectionsByClassId(1);
		this.loadAllStudentCategory();
		// Init DataSource

		this.createForm();
		// this.getDataWithDatasource();
		this.dataSource = new StudentsDataSource(this.store);
	}

	onSearch() {
		debugger;
		this.hasFormErrors = false;
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
		this.getAllStudentList(controls.classId.value, controls.sectionId.value);


	}


	getAllStudentList(classId, sectionId) {


		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadStudentsList(classId, sectionId))
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		// // Filtration, bind to searchInput
		// const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
		//   // tslint:disable-next-line:max-line-length
		//   debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
		//   distinctUntilChanged(), // This operator will eliminate duplicate values
		//   tap(() => {
		//     this.paginator.pageIndex = 0;
		//     this.loadStudentsList(classId,sectionId);
		//   })
		// )
		// .subscribe();
		// this.subscriptions.push(searchSubscription);

		// Init DataSource
		this.dataSource = new StudentsDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.studentsResult = res;
			console.log(this.studentsResult);
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadStudentsList(classId, sectionId);
		}); // Remove this line, just loading imitation

	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/**
	 * Load Products List
	 */
	loadStudentsList(classId, sectionId) {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
		this.store.dispatch(new StudentsPageRequested({ page: queryParams, classId, sectionId }));

		this.selection.clear();
	}





	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		// const searchText: string = this.searchInput.nativeElement.value;
		const searchText: string = '';

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterCondition && this.filterCondition.length > 0) {
			filter.condition = +this.filterCondition;
		}

		filter.model = searchText;

		filter.manufacture = searchText;
		filter.color = searchText;
		filter.VINCode = searchText;
		return filter;
	}
	// getDataWithDatasource() {
	// 	this.dataSource = new StudentReportDataSource(this.studentReportService);

	// 	this.dataSource.loadStudentReport(0, '', 'asc', 0, 3);
	// }

	// ngAfterViewInit() {

	// 	this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

	// 	fromEvent(this.input.nativeElement, 'keyup')
	// 		.pipe(
	// 			debounceTime(150),
	// 			distinctUntilChanged(),
	// 			tap(() => {
	// 				this.paginator.pageIndex = 0;
	// 				this.loadStudentReport();
	// 			})
	// 		)
	// 		.subscribe();

	// 	merge(this.sort.sortChange, this.paginator.page)
	// 		.pipe(
	// 			tap(() => this.loadStudentReport())
	// 		)
	// 		.subscribe();

	// }

	// loadStudentReport() {
	// 	this.dataSource.loadStudentReport(
	// 		0,
	// 		this.input.nativeElement.value,
	// 		this.sort.direction,
	// 		this.paginator.pageIndex,
	// 		this.paginator.pageSize);
	// }










	//get All Class List
	loadAllClasses() {
		debugger
		this.studentClassService.getAllStudentClasss().subscribe(res => {
			const data = res['data'];
			this.classList = res['data'];
			console.log(this.classList)
		}, err => {
		});
	}
	onClassSelectChange(classObj: StudentClassModel) {
		this.loadAllSectionsByClassId(classObj.id);
	}
	loadAllSectionsByClassId(id: number) {
		debugger
		this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {
			// const data = res['data'];
			this.sectionList = res['data'];;
			console.log(this.sectionList)
		}, err => {
		});
	}

	//get All Source List
	loadAllStudentCategory() {
		debugger
		this.categoryService.getAllCategorys().subscribe(res => {
			const data = res['data'];
			this.categoryList = data['content'];
			console.log(this.categoryList)
		}, err => {
		});
	}



	createForm() {
		debugger;
		this.searchForm = this.fb.group({
			classId: ['',],
			sectionId: ['',],
			category: ['',],
			gender: ['',],
			rte: ['',],

		})

	}





	// 	resultsLength = 0;
	// 	isLoadingResults = true;
	// 	isRateLimitReached = false;

	// 	constructor(private exampleDatabase: ExampleHttpDao,
	// 				private paginator: MatPaginator,
	// 				private sort: MatSort) {
	// 	  super();
	// 	}

	// 	/** Connect function called by the table to retrieve one stream containing the data to render. */
	// 	connect(): Observable<GithubIssue[]> {
	// 	  const displayDataChanges = [
	// 		this.sort.sortChange,
	// 		this.paginator.page
	// 	  ];

	// 	  // If the user changes the sort order, reset back to the first page.
	// 	  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

	// 	  return merge(...displayDataChanges)
	// 		.pipe(
	// 		  startWith(null),
	// 		  switchMap(() => {
	// 			return this.exampleDatabase.getRepoIssues(
	// 			  this.sort.active, this.sort.direction, this.paginator.pageIndex);
	// 		  }),
	// 		  map(data => {
	// 			// Flip flag to show that loading has finished.
	// 			this.isLoadingResults = false;
	// 			this.isRateLimitReached = false;
	// 			this.resultsLength = data.total_count;

	// 			return data.items;
	// 		  }),
	// 		  catchError(() => {
	// 			this.isLoadingResults = false;
	// 			// Catch if the GitHub API has reached its rate limit. Return empty data.
	// 			this.isRateLimitReached = true;
	// 			return Observable.of([]);
	// 		  })
	// 		);
	// 	}

	// 	disconnect() {}
	//   }













}
