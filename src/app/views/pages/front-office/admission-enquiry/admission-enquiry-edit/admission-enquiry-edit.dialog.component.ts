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
import { EnquiryModel, selectAdmissionEnquirysActionLoading, AdmissionEnquiryUpdated, AdmissionEnquiryOnServerCreated, selectLastCreatedAdmissionEnquiryId, ReferenceModel, SourceModel, AdmissionEnquiryService, SourceService, ReferenceService } from '../../../../../core/front-office';
import { StudentClassService } from 'src/app/core/academics';
// // Services and Models
// import { DeliveryPersonModel, DeliveryPersonUpdated, DeliveryPersonOnServerCreated, selectLastCreatedDeliveryPersonId, selectDeliveryPersonsActionLoading } from '../../../../../core/master-entry';
// import { EmployeeModel } from '../../../../../core/payroll/_models/employee.model';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-admission-enquiry-edit-dialog',
	templateUrl: './admission-enquiry-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AdmissionEnquiryEditDialogComponent implements OnInit, OnDestroy {

	// Public properties
	enquiry: EnquiryModel;
	enquiryForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	referenceList:ReferenceModel[] = [];
	sourceList:SourceModel[]=[];
classList=[]
	constructor(public dialogRef: MatDialogRef<AdmissionEnquiryEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private referenceService:ReferenceService,
		private sourceService:SourceService,
		private studentClassService:StudentClassService
		) {
	}

	/**
	 * On init
	 */
	ngOnInit() {

		//All Get Call
		this.loadAllReferences();
		this.loadAllSources();
		this.loadAllClasses();

		this.store.pipe(select(selectAdmissionEnquirysActionLoading)).subscribe(res => this.viewLoading = res);
		
		this.enquiry = this.data.enquiry;
		this.createForm();
	}

	//get All Complain Type List
loadAllReferences() {
	debugger
	this.referenceService.getAllReferences().subscribe(res => {
		const data=res['data'];
		this.referenceList=data['content'];
	}, err => {
	});
}
	//get All Source List
loadAllSources() {
	debugger
	this.sourceService.getAllSources().subscribe(res => {
		const data=res['data'];
		this.sourceList=data['content'];
	}, err => {
	});
}
	//get All Class List
	loadAllClasses() {
		debugger
		this.studentClassService.getAllStudentClasss().subscribe(res => {
			const data=res['data'];
			this.classList=data['content'];
			console.log(this.classList)
		}, err => {
		});
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
		this.enquiryForm = this.fb.group({


			name: [this.enquiry.name, Validators.required],
			contact: [this.enquiry.contact, [Validators.required,
				Validators.pattern("^[0-9]*$"),
				Validators.maxLength(10)]],
			email: [this.enquiry.email, Validators.compose([Validators.required, Validators.email])],
			address: [this.enquiry.address, ''],
			description: [this.enquiry.description, ''],
			note: [this.enquiry.note, ''],
			date: [this.typesUtilsService.getDateFromString(this.enquiry.date), Validators.compose([Validators.nullValidator])],
			followUpDate: [this.typesUtilsService.getDateFromString(this.enquiry.followUpDate), Validators.compose([Validators.nullValidator])],
			assigned: [this.enquiry.assigned, ''],
			reference: [this.enquiry.reference, ''],
			source: [this.enquiry.source, Validators.required],
			classId: [this.enquiry.classId, ''],
			noOfChild: [this.enquiry.noOfChild,[Validators.required,
				Validators.pattern("^[0-9]*$"),
				Validators.maxLength(10)]],

			// isActive: string;





		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.enquiry.id > 0) {
			return `Edit enquiry '${this.enquiry.name}'`;
		}

		return 'New enquiry';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.enquiryForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared enquiry
	 */
	prepareenquiry(): EnquiryModel {
		const controls = this.enquiryForm.controls;
		const _enquiry = new EnquiryModel();
		_enquiry.id = this.enquiry.id;

		_enquiry.name = controls.name.value;
		_enquiry.contact = controls.contact.value;
		_enquiry.email = controls.email.value;
		_enquiry.address = controls.address.value;
		_enquiry.description = controls.description.value;
		_enquiry.note = controls.note.value;

		const _date = controls.date.value;
		if (_date) {
			_enquiry.date = this.typesUtilsService.dateFormat(_date);
		} else {
			_enquiry.date = '';
		}
		const _followupdate = controls.followUpDate.value;
		if (_followupdate) {
			_enquiry.followUpDate = this.typesUtilsService.dateFormat(_followupdate);
		} else {
			_enquiry.followUpDate = '';
		}

		_enquiry.assigned = controls.assigned.value;
		_enquiry.reference = controls.reference.value;
		_enquiry.source = controls.source.value;
		_enquiry.classId = +controls.classId.value;
		_enquiry.noOfChild = controls.noOfChild.value;
		_enquiry.isActive='yes'
		return _enquiry;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.enquiryForm.controls;
		/** check form */
		if (this.enquiryForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedenquiry = this.prepareenquiry();
		if (editedenquiry.id > 0) {
			this.updateEnquiry(editedenquiry);
		} else {
			this.createEnquiry(editedenquiry);
		}


		
	}

	/**
	 * Update enquiry
	 *
	 * @param _enquiry: EnquiryModel
	 */
	updateEnquiry(_enquiry: EnquiryModel) {
		const updateEnquiry: Update<EnquiryModel> = {
			id: _enquiry.id,
			changes: _enquiry
		};
		this.store.dispatch(new AdmissionEnquiryUpdated({
			partialAdmissionEnquiry: updateEnquiry,
			enquiry: _enquiry
		}));

		

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _enquiry, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _enquiry, isEdit: true }
	}

	/**
	 * Create enquiry
	 *
	 * @param _enquiry: EnquiryModel
	 */
	createEnquiry(_enquiry: EnquiryModel) {
		this.store.dispatch(new AdmissionEnquiryOnServerCreated({ enquiry: _enquiry }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedAdmissionEnquiryId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _enquiry, isEdit: false });
		});

		
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	_keyPress(event: any) {
		const pattern = /[0-9]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
	
		}
	}
}

