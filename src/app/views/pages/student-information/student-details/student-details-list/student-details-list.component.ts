import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsDataSource, StudentDtoModel, StudentsPageRequested, OneStudentDeleted, ManyStudentsDeleted,StudentService } from 'src/app/core/student-information';
import { QueryParamsModel, LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//import { StudentEditDialogComponent } from '../admission-enquiry-edit/admission-enquiry-edit.dialog.component';
import { StudentClassModel, SectionDtoModel, StudentClassService, SectionService } from 'src/app/core/academics';
import { StudentProfileViewDialogComponent } from '../student-profile-view/student-profile-view.dialog.component';
import { StudentFeesCollectDialogComponent } from '../student-fees-collect/student-fees-collect.dialog.component';

@Component({
  selector: 'kt-student-details-list',
  templateUrl: './student-details-list.component.html',
  styleUrls: ['./student-details-list.component.scss']
})
export class StudentDetailsListComponent implements OnInit {

  // Table fields
dataSource: StudentsDataSource;
displayedColumns = ['admissionNo', 'name', 'class', 'fatherName', 'dob', 'gender', 'category', 'contact', 'actions'];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('sort1', {static: true}) sort: MatSort;
// Filter fields
@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
filterStatus = '';
filterCondition = '';
lastQuery: QueryParamsModel;
// Selection
selection = new SelectionModel<StudentDtoModel>(true, []);
studentsResult: StudentDtoModel[] = [];
private subscriptions: Subscription[] = [];

  searchForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;

  classId: number;
	sectionId: number;
	searchText: string;

  classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];

constructor(
  public dialog: MatDialog,
             private activatedRoute: ActivatedRoute,
             private router: Router,
             private subheaderService: SubheaderService,
             private layoutUtilsService: LayoutUtilsService,
             private store: Store<AppState>,
             private fb: FormBuilder,
             private studentService: StudentService,
             private studentClassService: StudentClassService,
             private sectionService: SectionService,
            
             ) { }


/**
 * On init
 */
ngOnInit() {
  this.router.navigate(["student_information/student_details"])
  this.loadAllClasses();
  // this.loadAllSectionsByClassId(1);
  this.dataSource = new StudentsDataSource(this.store);
  this.createForm();
}


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
onClassSelectChange(classId){
  this.loadAllSectionsByClassId(classId);
 
}
loadAllSectionsByClassId(id:number) {
	debugger
	this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {

		this.sectionList = res['data'];
		console.log(this.sectionList)
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
		this.getAllStudentList(controls.classId.value, controls.sectionId.value);


	}


	getAllStudentList(classId,sectionId){


    // If the user changes the sort order, reset back to the first page.
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.subscriptions.push(sortSubscription);
   
    /* Data load will be triggered in two cases:
    - when a pagination event occurs => this.paginator.page
    - when a sort event occurs => this.sort.sortChange
    **/
    const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.loadStudentsList(classId,sectionId))
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
      this.loadStudentsList(classId,sectionId);
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
loadStudentsList(classId,sectionId) {
  this.selection.clear();
  const queryParams = new QueryParamsModel(
    this.filterConfiguration(),
    this.sort.direction,
    this.sort.active,
    this.paginator.pageIndex,
    this.paginator.pageSize
  );
  // Call request from server
  this.store.dispatch(new StudentsPageRequested({ page: queryParams ,classId,sectionId}));
 
  this.selection.clear();
}



createForm() {
  debugger;
  this.searchForm = this.fb.group({
    classId: [this.classId, Validators.required],
    sectionId: [this.sectionId, Validators.required],
    // searchText: [this.searchText, ],21

  })

  
}


/**
 * Returns object for filter
 */
filterConfiguration(): any {
  const filter: any = {};
  // const searchText: string = this.searchInput.nativeElement.value;
  const searchText: string ='';
  
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

/**
 * Restore state
 *
 * @param queryParams: QueryParamsModel
 * @param id: number
 */
restoreState(queryParams: QueryParamsModel, id: number) {

  if (!queryParams.filter) {
    return;
  }

  if ('condition' in queryParams.filter) {
    this.filterCondition = queryParams.filter.condition.toString();
  }

  if ('status' in queryParams.filter) {
    this.filterStatus = queryParams.filter.status.toString();
  }

  if (queryParams.filter.model) {
    this.searchInput.nativeElement.value = queryParams.filter.model;
  }
}

/** ACTIONS */
/**
 * Delete product
 *
 * @param _item: StudentDtoModel
 */
deleteStudent(_item: StudentDtoModel) {
  const _title = 'Product Delete';
  const _description = 'Are you sure to permanently delete this product?';
  const _waitDesciption = 'Product is deleting...';
  const _deleteMessage = `Product has been deleted`;

  const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
  dialogRef.afterClosed().subscribe(res => {
    if (!res) {
      return;
    }
//delete api call
    this.store.dispatch(new OneStudentDeleted({ id: _item.id }));
    this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
  });
}

/**
 * Delete products
 */
deleteProducts() {
  const _title = 'Products Delete';
  const _description = 'Are you sure to permanently delete selected products?';
  const _waitDesciption = 'Products are deleting...';
  const _deleteMessage = 'Selected products have been deleted';

  const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
  dialogRef.afterClosed().subscribe(res => {
    if (!res) {
      return;
    }

    const idsForDeletion: number[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selection.selected.length; i++) {
      idsForDeletion.push(this.selection.selected[i].id);
    }

    //many product deleted
    this.store.dispatch(new ManyStudentsDeleted({ ids: idsForDeletion }));
    this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    this.selection.clear();
  });
}

/**
 * Fetch selected products
 */
// fetchProducts() {
//   // tslint:disable-next-line:prefer-const
//   let messages = [];
//   this.selection.selected.forEach(elem => {
//     messages.push({
//       text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
//       id: elem.VINCode,
//       status: elem.status
//     });
//   });
//   this.layoutUtilsService.fetchElements(messages);
// }

/**
 * Update status dialog
 */
// updateStatusForProducts() {
//   const _title = 'Update status for selected products';
//   const _updateMessage = 'Status has been updated for selected products';
//   const _statuses = [{ value: 0, text: 'Selling' }, { value: 1, text: 'Sold' }];
//   const _messages = [];

//   this.selection.selected.forEach(elem => {
//     _messages.push({
//       text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
//       id: elem.VINCode,
//       status: elem.status,
//       statusTitle: this.getItemStatusString(elem.status),
//       statusCssClass: this.getItemCssClassByStatus(elem.status)
//     });
//   });

//   const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
//   dialogRef.afterClosed().subscribe(res => {
//     if (!res) {
//       this.selection.clear();
//       return;
//     }

//     this.store.dispatch(new ProductsStatusUpdated({
//       status: +res,
//       products: this.selection.selected
//     }));

//     this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update);
//     this.selection.clear();
//   });
// }

/**
 * Redirect to edit page
 *
 * @param id: any
 */
/**
	 * Show add student dialog
	 */
	addStudent() {
		const newStudent = new StudentDtoModel();
		newStudent.clear(); // Set all defaults fields
		this.editStudent(newStudent);
	}

	/**
	 * Show Edit student dialog and save after success close result
	 * @param student: StudentDtoModel
	 */
	editStudent(student: StudentDtoModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    const _saveMessage = student.id > 0 ? 'Edit product' : 'Create product';
    
		const _messageType = student.id > 0 ? MessageType.Update : MessageType.Create;
		// const dialogRef = this.dialog.open(StudentEditDialogComponent, { data: { student } });
		// dialogRef.afterClosed().subscribe(res => {
		// 	if (!res) {
		// 		return;
		// 	}

		// 	this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
		// 	this.loadStudentsList();
    // });
    
    this.router.navigate(["student_information/student_edit/"+student.id])

	}

  onStudentProfileView(student: StudentDtoModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    const _saveMessage = student.id > 0 ? 'Student Profile View' : 'Create product';
    
		const _messageType = student.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(StudentProfileViewDialogComponent, { data: { student } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			// this.loadStudentsList(classId,sectionId);
		});
	}

  onStudentFeesCollect(student: StudentDtoModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    const _saveMessage = student.id > 0 ? 'Student Fees Collect' : 'Create product';
    
		const _messageType = student.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(StudentFeesCollectDialogComponent, { data: { student } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			// this.loadStudentsList();
		});
	}

/**
 * Check all rows are selected
 */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.studentsResult.length;
  return numSelected === numRows;
}

/**
 * Selects all rows if they are not all selected; otherwise clear selection
 */
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
  } else {
    this.studentsResult.forEach(row => this.selection.select(row));
  }
}

/* UI */
/**
 * Returns status string
 *
 * @param status: number
 */
getItemStatusString(status: number = 0): string {
  switch (status) {
    case 0:
      return 'Selling';
    case 1:
      return 'Sold';
  }
  return '';
}

/**
 * Returns CSS Class by status
 *
 * @param status: number
 */
getItemCssClassByStatus(status: number = 0): string {
  switch (status) {
    case 0:
      return 'success';
    case 1:
      return 'metal';
  }
  return '';
}

/**
 * Rerurns condition string
 *
 * @param condition: number
 */
getItemConditionString(condition: number = 0): string {
  switch (condition) {
    case 0:
      return 'New';
    case 1:
      return 'Used';
  }
  return '';
}

/**
 * Returns CSS Class by condition
 *
 * @param condition: number
 */
getItemCssClassByCondition(condition: number = 0): string {
  switch (condition) {
    case 0:
      return 'danger';
    case 1:
      return 'primary';
  }
  return '';
}
}

