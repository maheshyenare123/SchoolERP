
import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignFeesStudentsDataSource, AssignFeesStudentModel, AssignFeesStudentService, FeesDiscountModel } from '../../../../../core/fees-collection';
import { QueryParamsModel, LayoutUtilsService, MessageType, TypesUtilsService } from '../../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../../core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';

import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AssignFeesStudentsPageRequested, OneAssignFeesStudentDeleted, ManyAssignFeesStudentsDeleted, AssignFeesStudentsStatusUpdated, AssignFeesStudentUpdated, AssignFeesStudentOnServerCreated, selectLastCreatedAssignFeesStudentId } from '../../../../../core/fees-collection';
import { StudentClassModel, SectionDtoModel, StudentClassService, SectionService } from 'src/app/core/academics';
import { CategoryDtoModel, CategoryService } from 'src/app/core/student-information';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-fees-discount-assign-student-dialog',
	templateUrl: './fees-discount-assign-student.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeesDiscountAssignStudentDialogComponent implements OnInit {

	// Table fields
	dataSource: AssignFeesStudentsDataSource;
	//  dataSource = new MatTableDataSource(ELEMENT_DATA);


	displayedColumns = ['select','admissionNo', 'name', 'class', 'fatherName', 'gender', 'category'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	// @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	filterStatus = '';
	filterType = '';
	// Selection
	selection = new SelectionModel<AssignFeesStudentModel>(true, []);
	assignFeesStudentsResult: AssignFeesStudentModel[] = [];
	assignFeesStudentForFill: AssignFeesStudentModel[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];

	// Public properties
	assignFeesStudent: AssignFeesStudentModel;
	assignFeesStudentForm: FormGroup;
	searchForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	classId: number;
	sectionId: number;
	category: string;
	gender: string;
	rte: string;

	classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
	categoryList:CategoryDtoModel[]=[];
	feesDiscount: FeesDiscountModel;
	
	constructor(public dialogRef: MatDialogRef<FeesDiscountAssignStudentDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,

		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private categoryService:CategoryService,
		private assignFeesStudentService:AssignFeesStudentService
		) {
	}

	/**
	 * On init
	 */
	ngOnInit() {

		this.loadAllClasses();
		this.loadAllSectionsByClassId(1);
		this.addAssignFeesStudent();
		this.loadAllStudentCategory();
		// Init DataSource
		this.dataSource = new AssignFeesStudentsDataSource(this.store);
		this.feesDiscount = this.data.assignFeesStudent;
		console.log(this.feesDiscount)
	}
	/**
	 * On destroy
	 */


//get All Class List
loadAllClasses() {
	debugger
	this.studentClassService.getAllStudentClasss().subscribe(res => {
		const data = res['data'];
		this.classList = data['content'];
		console.log(this.classList)
	}, err => {
	});
}
onClassSelectChange(classObj:StudentClassModel){
	// this.loadAllSectionsByClassId(classObj.id);
}
loadAllSectionsByClassId(id:number) {
	debugger
	this.sectionService.getAllSections().subscribe(res => {
		const data = res['data'];
		this.sectionList = data['content'];
		console.log(this.sectionList)
	}, err => {
	});
}


		//get All Source List
		loadAllStudentCategory() {
			debugger
			this.categoryService.getAllCategorys().subscribe(res => {
				const data=res['data'];
				this.categoryList=data['content'];
				console.log(this.categoryList)
			}, err => {
			});
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
	
		this.getAllAssignFeesStudentList(
			controls.classId.value,
			controls.sectionId.value,
			controls.category.value,
			controls.gender.value,
			controls.rte.value
			);


	}


	getAllAssignFeesStudentList(classId,sectionId,category,gender,rte){

		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
 this.subscriptions.push(sortSubscription);

 /* Data load will be triggered in two cases:
 - when a pagination event occurs => this.paginator.page
 - when a sort event occurs => this.sort.sortChange
 **/
 const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
   tap(() => this.loadAssignFeesStudentList(classId,sectionId,category,gender,rte))
 )
 .subscribe();
 this.subscriptions.push(paginatorSubscriptions);

//  // Filtration, bind to searchInput
//  const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
//    // tslint:disable-next-line:max-line-length
//    debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
//    distinctUntilChanged(), // This operator will eliminate duplicate values
//    tap(() => {
//      this.paginator.pageIndex = 0;
//      this.loadClassTimetablesList(classId,sectionId);
//    })
//  )
//  .subscribe();
//  this.subscriptions.push(searchSubscription);

 // Init DataSource
 this.dataSource = new AssignFeesStudentsDataSource(this.store);
 const entitiesSubscription = this.dataSource.entitySubject.pipe(
   skip(1),
   distinctUntilChanged()
 ).subscribe(res => {
   this.assignFeesStudentsResult = res;
   console.log(this.assignFeesStudentsResult);
   if(this.assignFeesStudentsResult.length==0)this.dataSource.hasItems=false;
 });
 this.subscriptions.push(entitiesSubscription);
 // First load
 of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
    this.loadAssignFeesStudentList(classId,sectionId,category,gender,rte);
 });

}


	// getAllAssignFeesStudentList(classId, sectionId, date) {

	// 	const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
	// 	this.subscriptions.push(sortSubscription);

	// 	const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
	// 		tap(() => this.loadAssignFeesStudentList(classId, sectionId, date))
	// 	)
	// 		.subscribe();
	// 	this.subscriptions.push(paginatorSubscriptions);

	// 	// // Filtration, bind to searchInput
	// 	// const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
	// 	// 	// tslint:disable-next-line:max-line-length
	// 	// 	debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
	// 	// 	distinctUntilChanged(), // This operator will eliminate duplicate values
	// 	// 	tap(() => {
	// 	// 		this.paginator.pageIndex = 0;
	// 	// 		this.loadAssignFeesStudentList();
	// 	// 	})
	// 	// )
	// 	// .subscribe();
	// 	// this.subscriptions.push(searchSubscription);

	// 	// Init DataSource
	// 	this.dataSource = new AssignFeesStudentsDataSource(this.store);

	// 	const entitiesSubscription = this.dataSource.entitySubject.pipe(
	// 		skip(1),
	// 		distinctUntilChanged()
	// 	).subscribe(res => {
	// 		// debugger
	// 		console.log(res);
	// 		this.AssignFeesStudentsResult = res;
	// 		console.log(this.AssignFeesStudentsResult);
	// 		if(this.AssignFeesStudentsResult){
	// 			this.AssignFeesStudentForFill=this.AssignFeesStudentsResult;
	// 		}
		
	// 	});
	// 	this.subscriptions.push(entitiesSubscription);
	// 	// First load
	// 	of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
	// 		this.loadAssignFeesStudentList(classId, sectionId, date);
	// 	}); // Remove this line, just loading imitation



	// }


	/**
		 * On Destroy
		 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/**
	 * Load AssignFeesStudents List from service through data-source
	 */
	loadAssignFeesStudentList(classId, sectionId, category, gender, rte) {
		debugger;
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
		 this.store.dispatch(new AssignFeesStudentsPageRequested({ page: queryParams, classId: classId, sectionId: sectionId, category: category, gender: gender, rte:rte }));
		this.selection.clear();
	}

//save
	onSave(){

		// create list for selected item
		
console.log(this.assignFeesStudentForFill);



	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		// const searchText: string = this.searchInput.nativeElement.value;
		const searchText: string = '';
		filter.class = searchText;
		if (!searchText) {
			return filter;
		}
		filter.assignFeesStudent = searchText;
		return filter;
	}


	/**
	 * Show add AssignFeesStudent dialog
	 */
	addAssignFeesStudent() {
		this.assignFeesStudent = new AssignFeesStudentModel();
		this.assignFeesStudent.clear(); //
		this.createForm();

	}

	/**
	 * Show Edit AssignFeesStudent dialog and save after success close result
	 * @param AssignFeesStudent: AssignFeesStudentModel
	 */
	editAssignFeesStudent(assignFeesStudent: AssignFeesStudentModel) {

		this.assignFeesStudent = assignFeesStudent;
		this.createForm();

	}


	createForm() {
		debugger;
		this.searchForm = this.fb.group({
			classId: [this.classId, ],
			sectionId: [this.sectionId, ],
			category: [this.category, ],
			gender: [this.gender, ],
			rte: [this.rte, ],

		})

	}


	/**
	 * On Submit
	 */
	onSubmit() {
	

	}
	onCancel() {
		this.searchForm.reset();
	}





	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

}


