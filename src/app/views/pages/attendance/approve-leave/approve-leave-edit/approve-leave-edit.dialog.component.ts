// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApproveLeaveDtoModel, selectApproveLeavesActionLoading, ApproveLeaveUpdated, selectLastCreatedApproveLeaveId, ApproveLeaveOnServerCreated, ApproveLeaveService } from '../../../../../core/attendance';
import { StudentDtoModel, StudentService } from 'src/app/core/student-information';
import { SectionDtoModel, StudentClassModel, SectionService, StudentClassService } from 'src/app/core/academics';
import { LeaveTypeModel, LeaveTypeService } from 'src/app/core/human-resource';
import { constants } from 'buffer';
import { Constants } from 'src/app/core/api_url';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-approve-leave-edit-dialog',
	templateUrl: './approve-leave-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ApproveLeaveEditDialogComponent implements OnInit, OnDestroy {


	// Public properties
	approveLeave: ApproveLeaveDtoModel;
	approveLeaveForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;
	files: File[] = [];

	classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
	studentList: StudentDtoModel[] = [];

	leaveTypeList: LeaveTypeModel[] = [];
	constructor(public dialogRef: MatDialogRef<ApproveLeaveEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private studentService: StudentService,
		private leaveTypeService: LeaveTypeService,
		private approveLeaveService: ApproveLeaveService) {
	}

	/**
	 * On init
	 */
	ngOnInit() {

		this.loadAllClasses();
		this.loadAllLeaveType();
		this.store.pipe(select(selectApproveLeavesActionLoading)).subscribe(res => this.viewLoading = res);
		// loadding
		this.approveLeave = this.data.approveLeave;
		if (this.data._saveMessage === 'Edit Approve Leave') {

			this.loadAllSectionsByClassId(this.approveLeave.classesId);
			this.loadAllStudent(this.approveLeave.classesId, this.approveLeave.sectionId)

		}


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
	onClassSelectChange(classes) {
		debugger
		var leaveObj = this.classList.find(x => x.classses === classes);
		this.approveLeaveForm.controls['classId'].setValue(leaveObj.id);
		this.loadAllSectionsByClassId(leaveObj.id);
	}
	loadAllSectionsByClassId(id: number) {
		debugger
		this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {
			this.sectionList = res['data'];
			console.log(this.sectionList)
		}, err => {
		});
	}

	onSectionSelectChange(section) {
		debugger
		var sectionObj = this.sectionList.find(x => x.section === section);
		this.loadAllStudent(this.approveLeaveForm.controls['classId'].value, sectionObj.id)
	}


	loadAllStudent(classsId, sectionId) {
		debugger
		this.studentService.getAllStudents(classsId, sectionId).subscribe(res => {
			const data = res['data'];
			this.studentList = data['content'];
			console.log(this.studentList)

		}, err => {
		});
	}
	loadAllLeaveType() {
		debugger
		this.leaveTypeService.getAllLeaveTypes().subscribe(res => {
			const data = res['data'];
			this.leaveTypeList = data['content'];
			console.log(this.leaveTypeList)
		}, err => {
		});
	}
	onLeaveTypeSelectChange(leaveId) {
		var leaveObj = this.leaveTypeList.find(x => x.id === leaveId);
		this.approveLeaveForm.controls.leaveType.setValue(leaveObj.type);
	}
	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	createForm() {
		this.approveLeaveForm = this.fb.group({

			classId: [this.approveLeave.classesId,],
			sectionId: [this.approveLeave.sectionId,],
			studentId: [this.approveLeave.studentId,],
			applyDate: [this.typesUtilsService.getDateFromString(this.approveLeave.applyDate), Validators.compose([Validators.nullValidator])],
			fromDate: [this.typesUtilsService.getDateFromString(this.approveLeave.fromDate), Validators.compose([Validators.nullValidator])],
			toDate: [this.typesUtilsService.getDateFromString(this.approveLeave.toDate), Validators.compose([Validators.nullValidator])],
			approveBy: [this.approveLeave.approveBy,],
			docs: [this.approveLeave.docs, ''],
			isActive: [this.approveLeave.isActive, ''],
			reason: [this.approveLeave.reason, ''],
			requestType: [this.approveLeave.requestType,],
			status: [this.approveLeave.status,],
			studentSessionId: [this.approveLeave.studentSessionId,],

			leaveType: [this.approveLeave.leaveType, Validators.required],
			leaveTypeId: [this.approveLeave.leaveTypeId, Validators.required],
			approveOrRejectReason: [this.approveLeave.approveOrRejectReason, ''],
			classes: [this.approveLeave.classes, Validators.required],
			section: [this.approveLeave.section, Validators.required],
			staff: [this.approveLeave.staff, '']
			


		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.approveLeave.id > 0) {
			return `Edit Approve Leave '${this.approveLeave.studentSessionId}'`;
		}

		return 'New Approve Leave';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.approveLeaveForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared approveLeave
	 */
	prepareapproveLeave(): ApproveLeaveDtoModel {
		debugger;
		const controls = this.approveLeaveForm.controls;
		const _approveLeave = new ApproveLeaveDtoModel();
		_approveLeave.id = this.approveLeave.id;
		if (_approveLeave.id > 0) {
			_approveLeave.isActive = controls.isActive.value;
			_approveLeave.status = controls.status.value;
		} else {
			_approveLeave.isActive = "yes";
			_approveLeave.status = Constants.StudentLeaveStatus.Pending
		}

		const _applyDate = controls.applyDate.value;
		if (_applyDate) {
			_approveLeave.applyDate = this.typesUtilsService.dateFormat(_applyDate);
		} else {
			_approveLeave.applyDate = '';
		}
		const _fromDate = controls.fromDate.value;
		if (_fromDate) {
			_approveLeave.fromDate = this.typesUtilsService.dateFormat(_fromDate);
		} else {
			_approveLeave.fromDate = '';
		}
		const _toDate = controls.toDate.value;
		if (_toDate) {
			_approveLeave.toDate = this.typesUtilsService.dateFormat(_toDate);
		} else {
			_approveLeave.toDate = '';
		}

		_approveLeave.approveBy = controls.approveBy.value;
		_approveLeave.docs = controls.docs.value;
		_approveLeave.reason = controls.reason.value;
		_approveLeave.requestType = controls.requestType.value;

		// _approveLeave.studentSessionId = controls.studentSessionId.value;
		_approveLeave.studentSessionId = 1;

		_approveLeave.leaveType = controls.leaveType.value;
		_approveLeave.leaveTypeId = controls.leaveTypeId.value;
		_approveLeave.approveOrRejectReason = controls.approveOrRejectReason.value;
		_approveLeave.classes = controls.classes.value;
		_approveLeave.section = controls.section.value;
		_approveLeave.staff = controls.staff.value;


		return _approveLeave;


		// {
		// 	"

		// 	"approveOrRejectReason": "string",
		// 	"classes": "string",
		// 	"leaveType": "string",
		// 	"leaveTypeId": 0,
		// 	"section": "string",
		// 	"staff": "string",



		//   }














	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.approveLeaveForm.controls;
		/** check form */
		if (this.approveLeaveForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedApproveLeave = this.prepareapproveLeave();
		if (editedApproveLeave.id > 0) {
			this.updateApproveLeave(editedApproveLeave);
		} else {
			this.createApproveLeave(editedApproveLeave);
		}
	}

	/**
	 * Update approveLeave
	 *
	 * @param _approveLeave: ApproveLeaveDtoModel
	 */
	updateApproveLeave(_approveLeave: ApproveLeaveDtoModel) {
		const updateApproveLeave: Update<ApproveLeaveDtoModel> = {
			id: _approveLeave.id,
			changes: _approveLeave
		};
		// this.store.dispatch(new ApproveLeaveUpdated({
		// 	partialApproveLeave: updateApproveLeave,
		// 	approveLeave: _approveLeave
		// }));

		this.approveLeaveService.updateApproveLeave(_approveLeave).subscribe(res => {

			this.dialogRef.close({ _approveLeave, isEdit: true });

		});


		// integrate ApproveLeave  update api

		// Remove this line
		// of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _approveLeave, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _approveLeave, isEdit: true }
	}

	/**
	 * Create ApproveLeave
	 *
	 * @param _approveLeave: ApproveLeaveDtoModel
	 */
	createApproveLeave(_approveLeave: ApproveLeaveDtoModel) {
		debugger;
		// this.store.dispatch(new ApproveLeaveOnServerCreated({ approveLeave: _approveLeave }));
		// this.componentSubscriptions = this.store.pipe(
		// 	select(selectLastCreatedApproveLeaveId),
		// 	delay(1000), // Remove this line
		// ).subscribe(res => {
		// 	if (!res) {
		// 		return;
		// 	}

		// 	
		// });

		this.approveLeaveService.createApproveLeave(_approveLeave).subscribe(res => {

			this.dialogRef.close({ _approveLeave, isEdit: false });

		})




		// integrate approveLeave  create api
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

	_keyPress(event: any) {
		const pattern = /[0-9]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();

		}
	}
}

