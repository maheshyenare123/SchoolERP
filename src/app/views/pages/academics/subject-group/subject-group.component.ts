
import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SubjectGroupsDataSource, SubjectGroupDtoModel,selectSubjectGroupsActionLoading } from 'src/app/core/academics';
import { QueryParamsModel, LayoutUtilsService, MessageType ,TypesUtilsService} from 'src/app/core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';

import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { SubjectGroupsPageRequested, OneSubjectGroupDeleted, ManySubjectGroupsDeleted, SubjectGroupsStatusUpdated, SubjectGroupUpdated, SubjectGroupOnServerCreated, selectLastCreatedSubjectGroupId } from '../../../../core/academics';

@Component({
  selector: 'kt-subject-group',
  templateUrl: './subject-group.component.html',
  styleUrls: ['./subject-group.component.scss']
})
export class SubjectGroupComponent implements OnInit {

   // Table fields
dataSource: SubjectGroupsDataSource;
//  dataSource = new MatTableDataSource(ELEMENT_DATA);
displayedColumns = ['id', 'name', 'classSection', 'subject', 'actions'];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('sort1', {static: true}) sort: MatSort;
// Filter fields
@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
filterStatus = '';
filterType = '';
// Selection
selection = new SelectionModel<SubjectGroupDtoModel>(true, []);
subjectGroupsResult: SubjectGroupDtoModel[] = [];
// Subscriptions
private subscriptions: Subscription[] = [];

// Public properties
subjectGroup: SubjectGroupDtoModel;
subjectGroupForm: FormGroup;
hasFormErrors = false;
viewLoading = false;
// Private properties
private componentSubscriptions: Subscription;




  constructor(public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private typesUtilsService: TypesUtilsService) { }

  ngOnInit() {

	debugger;
	
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadSubjectGroupList())
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
				this.loadSubjectGroupList();
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);

		// Init DataSource
		this.dataSource = new SubjectGroupsDataSource(this.store);
	
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			debugger
	console.log(res);
			this.subjectGroupsResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadSubjectGroupList();
		}); // Remove this line, just loading imitation

this.addSubjectGroup();
		
  }
/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/**
	 * Load SubjectGroups List from service through data-source
	 */
	loadSubjectGroupList() {
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
		this.store.dispatch(new SubjectGroupsPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		filter.class = searchText;
		if (!searchText) {
			return filter;
		}
    filter.name = searchText;
    filter.classSection = searchText;
    filter.subject = searchText;
  
		return filter;
	}

	/** ACTIONS */
	/**
	 * Delete SubjectGroup
	 *
	 * @param _item: SubjectGroupDtoModel
	 */
	deleteSubjectGroup(_item: SubjectGroupDtoModel) {

		const _title = 'Purpose';
		const _description = 'Are you sure to permanently delete selected purpose?';
		const _waitDesciption = 'Purpose is deleting...';
		const _deleteMessage = ' Selected purpose has been deleted';



		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OneSubjectGroupDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadSubjectGroupList();
		});
		

	}

	/**
	 * Show add SubjectGroup dialog
	 */
	addSubjectGroup() {
		this.subjectGroup=new SubjectGroupDtoModel();
		this.subjectGroup.clear(); //
		this.createForm();

	}

	/**
	 * Show Edit SubjectGroup dialog and save after success close result
	 * @param subjectGroup: SubjectGroupDtoModel
	 */
	editSubjectGroup(subjectGroup: SubjectGroupDtoModel) {
		
		this.subjectGroup=subjectGroup;
		this.createForm();

	}



createForm() {
	debugger;
	this.subjectGroupForm = this.fb.group({
		name: [this.subjectGroup.name, Validators.required],
    classId: [this.subjectGroup.classId, Validators.required],
    className: [this.subjectGroup.className, ],
		description: [this.subjectGroup.description, ],
    sections: [this.subjectGroup.sections, Validators.required],
		subjects: [this.subjectGroup.subjects, Validators.required],
	});
}


/**
 * Check control is invalid
 * @param controlName: string
 */
isControlInvalid(controlName: string): boolean {
	const control = this.subjectGroupForm.controls[controlName];
	const result = control.invalid && control.touched;
	return result;
}

/** ACTIONS */

/**
 * Returns prepared SubjectGroup
 */
prepareSubjectGroup(): SubjectGroupDtoModel {
	const controls = this.subjectGroupForm.controls;
	const _subjectGroup = new SubjectGroupDtoModel();
	_subjectGroup.id = this.subjectGroup.id;
	_subjectGroup.name = controls.name.value;
  _subjectGroup.classId = controls.classId.value;
  _subjectGroup.className = controls.className.value;
  _subjectGroup.description = controls.description.value;
  _subjectGroup.sections = controls.sections.value;
  _subjectGroup.subjects = controls.subjects.value;
   
	return _subjectGroup;
}

/**
 * On Submit
 */
onSubmit() {
	this.hasFormErrors = false;
	const controls = this.subjectGroupForm.controls;
	/** check form */
	if (this.subjectGroupForm.invalid) {
		Object.keys(controls).forEach(controlName =>
			controls[controlName].markAsTouched()
		);

		this.hasFormErrors = true;
		return;
	}

	const editedSubjectGroup = this.prepareSubjectGroup();
	if (editedSubjectGroup.id > 0) {
		this.updateSubjectGroup(editedSubjectGroup);
	} else {
		this.createSubjectGroup(editedSubjectGroup);
	}
	this.loadSubjectGroupList();
	const	_saveMessage= editedSubjectGroup.id > 0 ? 'Purpose  has been updated' : 'Purpose has been created';
		
	const _messageType = editedSubjectGroup.id > 0 ? MessageType.Update : MessageType.Create;
	
		this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
		
		this.subjectGroupForm.reset();

		this.addSubjectGroup();
		// this.subjectGroup.clear();
		// this.createForm();

}
onCancel(){
	this.subjectGroupForm.reset();
	this.addSubjectGroup();
	// this.subjectGroup.clear();
	// this.createForm();
}
/**
 * Update SubjectGroup
 *
 * @param _subjectGroup: SubjectGroupDtoModel
 */
updateSubjectGroup(_subjectGroup: SubjectGroupDtoModel) {
	const updateSubjectGroup: Update<SubjectGroupDtoModel> = {
		id: _subjectGroup.id,
		changes: _subjectGroup
	};
	this.store.dispatch(new SubjectGroupUpdated({
		partialSubjectGroup: updateSubjectGroup,
		subjectGroup: _subjectGroup
	}));


}

/**
 * Create SubjectGroup
 *
 * @param _subjectGroup: SubjectGroupDtoModel
 */
createSubjectGroup(_subjectGroup:SubjectGroupDtoModel) {
	this.store.dispatch(new SubjectGroupOnServerCreated({ subjectGroup: _subjectGroup }));
	this.componentSubscriptions = this.store.pipe(
		select(selectLastCreatedSubjectGroupId),
		// delay(1000), // Remove this line
	).subscribe(res => {
		if (!res) {
			return;
		}

		// this.dialogRef.close({ _subjectGroup, isEdit: false });
	});
}

/** Alect Close event */
onAlertClose($event) {
	this.hasFormErrors = false;
}

subjectGroupChange($event,subjectGroupid){
	if($event.target.checked === true){
		//this.subjectGroup.subjects.push()

	}else{

	}
}
classChange($event){
//this.subjectGroup.sections ==
}
sectionChange($event){
//this.subjectGroup.sections ==
}

}
// export class NgbdTimepickerSteps {
//     time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
//     hourStep = 1;
//     minuteStep = 15;
//     secondStep = 30;
// }
