import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HomeworksDataSource, HomeworkDtoModel, HomeworksPageRequested, OneHomeworkDeleted, ManyHomeworksDeleted } from 'src/app/core/homework';
import { QueryParamsModel, LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { HomeworkEditDialogComponent } from '../homework-edit/homework-edit.dialog.component';
import { HomeworkEvaluationEditDialogComponent } from '../homework-evaluation-edit/homework-evaluation-edit.dialog.component';


@Component({
  selector: 'kt-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.scss']
})
export class HomeworkListComponent implements OnInit {

  // Table fields
dataSource: HomeworksDataSource;
displayedColumns = ['class', 'section', 'subjectGroup', 'subject', 'homeworkDate', 'submitDate', 'evaluationDate', 'createdBy', 'actions'];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('sort1', {static: true}) sort: MatSort;
// Filter fields
@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
filterStatus = '';
filterCondition = '';
lastQuery: QueryParamsModel;
// Selection
selection = new SelectionModel<HomeworkDtoModel>(true, []);
homeworksResult: HomeworkDtoModel[] = [];
private subscriptions: Subscription[] = [];
searchForm: FormGroup;
hasFormErrors = false;
homework: HomeworkDtoModel;
temp: HomeworkDtoModel;
constructor(public dialog: MatDialog,
             private activatedRoute: ActivatedRoute,
             private router: Router,
             private subheaderService: SubheaderService,
             private layoutUtilsService: LayoutUtilsService,
             private store: Store<AppState>,
             private fb: FormBuilder,) { }


/**
 * On init
 */
ngOnInit() {
  
//  this.getAllHomeworkList()
 // If the user changes the sort order, reset back to the first page.
 const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
 this.subscriptions.push(sortSubscription);

 /* Data load will be triggered in two cases:
 - when a pagination event occurs => this.paginator.page
 - when a sort event occurs => this.sort.sortChange
 **/
 const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
   tap(() => this.loadHomeworksList())
 )
 .subscribe();
 this.subscriptions.push(paginatorSubscriptions);

 // Filtration, bind to searchInput
 const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
   // tslint:disable-next-line:max-line-length
   debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
   distinctUntilChanged(), // This operator will eliminate duplicate values
   tap(() => {
     this.paginator.pageIndex = 0;
     this.loadHomeworksList();
   })
 )
 .subscribe();
 this.subscriptions.push(searchSubscription);

 // Init DataSource
 this.dataSource = new HomeworksDataSource(this.store);
 this.dataSource .loading$;
 const entitiesSubscription = this.dataSource.entitySubject.pipe(
   skip(1),
   distinctUntilChanged()
 ).subscribe(res => {
   this.homeworksResult = res;
   console.log(this.homeworksResult);
 });
 this.subscriptions.push(entitiesSubscription);
 // First load
 of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
   this.loadHomeworksList();
 }); // Remove this line, just loading imitation
}
getAllHomeworkList() {
  // this.enqService.getList().subscribe((res: any) => {
  //   var data = res['data'];
  //   var content = data['content'];
  //   this.homeworksResult = content.map((key) => ({ ...key }));
  
  // }, (err) => {
  //   console.log('Error while fetching data');
  //   console.error(err);
  // });
  this.createForm();
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
loadHomeworksList() {
  this.selection.clear();
  const queryParams = new QueryParamsModel(
    this.filterConfiguration(),
    this.sort.direction,
    this.sort.active,
    this.paginator.pageIndex,
    this.paginator.pageSize
  );
  // Call request from server
  this.store.dispatch(new HomeworksPageRequested({ page: queryParams }));
 
  this.selection.clear();
}

/**
 * Returns object for filter
 */
filterConfiguration(): any {
  const filter: any = {};
  const searchText: string = this.searchInput.nativeElement.value;

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


createForm() {
  this.searchForm = this.fb.group({
    classesId: [this.homework.classesId, Validators.required],
    sectionId: [this.homework.sectionId, Validators.required],
    subjectGroupSubjectId: [this.homework.subjectGroupSubjectId, Validators.required],
    subjectId: [this.homework.subjectId, Validators.required],

  })

}

	/**
	 * On Search
	 */
	onSearch() {
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

		//search api

		
	}

/** ACTIONS */
/**
 * Delete product
 *
 * @param _item: HomeworkDtoModel
 */
deleteHomework(_item: HomeworkDtoModel) {
  const _title = ' Homework Delete';
  const _description = 'Are you sure to permanently delete this  Homework?';
  const _waitDesciption = ' Homework is deleting...';
  const _deleteMessage = ` Homework has been deleted`;

  const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
  dialogRef.afterClosed().subscribe(res => {
    if (!res) {
      return;
    }
//delete api call
    this.store.dispatch(new OneHomeworkDeleted({ id: _item.id }));
    this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
  });
}

/**
 * Delete products
 */
deleteProducts() {
  const _title = ' Homeworks Delete';
  const _description = 'Are you sure to permanently delete selected  Homeworks?';
  const _waitDesciption = ' Homeworks are deleting...';
  const _deleteMessage = 'Selected  Homeworks have been deleted';

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
    this.store.dispatch(new ManyHomeworksDeleted({ ids: idsForDeletion }));
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
	 * Show add customer dialog
	 */
	addHomework() {
		const newCustomer = new HomeworkDtoModel();
		newCustomer.clear(); // Set all defaults fields
    this.editHomework(newCustomer);
    this.temp = newCustomer;
	}

	/**
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
	editHomework(homework: HomeworkDtoModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    const _saveMessage = homework.id > 0 ? 'Edit  Homework' : 'Create  Homework';
    
		const _messageType = homework.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(HomeworkEditDialogComponent, { data: { homework } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadHomeworksList();
		});
  }
  
  evaluateHomework(homework: HomeworkDtoModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    //const _saveMessage = homework.id > 0 ? 'Edit  Homework' : 'Create  Homework';
    
		//const _messageType = homework.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(HomeworkEvaluationEditDialogComponent, { data: { homework } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

		//	this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadHomeworksList();
		});
	}

/**
 * Check all rows are selected
 */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.homeworksResult.length;
  return numSelected === numRows;
}
/** Alect Close event */
onAlertClose($event) {
  this.hasFormErrors = false;
}
/**
 * Selects all rows if they are not all selected; otherwise clear selection
 */
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
  } else {
    this.homeworksResult.forEach(row => this.selection.select(row));
  }
}

/* UI */
/**
 * Returns status string
 *
 * @param status: number
 */
getItemStatusString(status: String ): string {
  switch (status) {
    case 'yes':
      return 'Active';
    case 'no':
      return 'DeActive';
  }
  return '';
}

/**
 * Returns CSS Class by status
 *
 * @param status: number
 */
getItemCssClassByStatus(status: String): string {
  switch (status) {
    case 'yes':
      return 'success';
    case 'no':
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


