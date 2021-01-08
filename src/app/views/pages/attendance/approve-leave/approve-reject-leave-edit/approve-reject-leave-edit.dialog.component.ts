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
import { ApproveLeaveDtoModel, ApproveLeaveService, ApproveRejectLeaveModel } from '../../../../../core/attendance';

// // Services and Models
// import { DeliveryPersonModel, DeliveryPersonUpdated, DeliveryPersonOnServerCreated, selectLastCreatedDeliveryPersonId, selectDeliveryPersonsActionLoading } from '../../../../../core/master-entry';
// import { EmployeeModel } from '../../../../../core/payroll/_models/employee.model';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-approve-reject-leave-edit-dialog',
	templateUrl: './approve-reject-leave-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ApproveRejectLeaveEditDialogComponent implements OnInit, OnDestroy {

	// Public properties
	approveLeave: ApproveLeaveDtoModel;

	approveRejectLeaveForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;


	constructor(public dialogRef: MatDialogRef<ApproveRejectLeaveEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private approveLeaveService: ApproveLeaveService,

	) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.approveLeave = this.data.approveLeave;

		this.createForm();
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
		this.approveRejectLeaveForm = this.fb.group({
			id: [this.approveLeave.id, ''],
			approveOrRejectReason: ['', Validators.required],

		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.approveLeave.status == 0) {
			return `Approve Leave`;
		}

		return 'Reject Leave';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.approveRejectLeaveForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared libraryStudentMember
	 */
	preparelibraryStudentMember(): ApproveRejectLeaveModel {
		const controls = this.approveRejectLeaveForm.controls;
		const _approveRejectLeave = new ApproveRejectLeaveModel();
		_approveRejectLeave.id = this.approveLeave.id;

		if (this.approveLeave.status == 0) {
			_approveRejectLeave.status = 1;
		} else if(this.approveLeave.status == 1){
			_approveRejectLeave.status = 0;
		}


		_approveRejectLeave.approveOrRejectReason = controls.approveOrRejectReason.value;

		return _approveRejectLeave;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.approveRejectLeaveForm.controls;
		/** check form */
		if (this.approveRejectLeaveForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		this.approveRejectLeaveStatusChange(this.preparelibraryStudentMember());




	}
	approveRejectLeaveStatusChange(_approveRejectLeave: ApproveRejectLeaveModel) {


		this.approveLeaveService.approveRejectLeaveStatusChange(_approveRejectLeave).subscribe(res => {

			this.dialogRef.close({ _approveRejectLeave, isEdit: false });

		}, err => {

		})

	}


	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}


}

