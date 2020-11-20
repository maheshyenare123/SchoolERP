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
import { AppState } from '../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../core/_base/crud';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentFeeDepositeModel, selectStudentFeeDepositesActionLoading, StudentFeeDepositeUpdated, selectLastCreatedStudentFeeDepositeId, StudentFeeDepositeOnServerCreated } from '../../../../core/fees-collection';
import { StudentDtoModel, StudentService } from 'src/app/core/student-information';
import { SectionDtoModel, StudentClassModel, SectionService, StudentClassService } from 'src/app/core/academics';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-fee-collect-edit-dialog',
	templateUrl: './fee-collect-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class FeeCollectEditDialogComponent implements OnInit, OnDestroy {
	
	
// Public properties
studentFeeDeposite: StudentFeeDepositeModel;
studentFeeDepositeForm: FormGroup;
hasFormErrors = false;
viewLoading = false;
// Private properties
private componentSubscriptions: Subscription;
files: File[] = [];

classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
studentList: StudentDtoModel[] = [];

constructor(public dialogRef: MatDialogRef<FeeCollectEditDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
	private fb: FormBuilder,
	private store: Store<AppState>,
	private typesUtilsService: TypesUtilsService,
	private studentClassService: StudentClassService,
	private sectionService: SectionService,
	private studentService: StudentService) {
}

/**
 * On init
 */
ngOnInit() {
	debugger
	this.store.pipe(select(selectStudentFeeDepositesActionLoading)).subscribe(res => this.viewLoading = res);
	// loadding
	this.studentFeeDeposite = this.data.studentFeeDeposite;
	this.createForm();
}
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
	loadAllSectionsByClassId(id:number) {
		debugger
		this.sectionService.getAllSections().subscribe(res => {
			const data = res['data'];
			this.sectionList = data['content'];
			console.log(this.sectionList)
			
		}, err => {
		});
	}

	loadAllStudent() {
		debugger
		this.studentService.getAllStudents().subscribe(res => {
			const data = res['data'];
			this.studentList = data['content'];
			console.log(this.studentList)
		
		
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

	if(this.data.type == 'single'){
		this.studentFeeDepositeForm = this.fb.group({

			amount: [this.studentFeeDeposite.amountDetails.amount,],
			amountDiscount: [this.studentFeeDeposite.amountDetails.amountDiscount, ''],
			amountFine: [this.studentFeeDeposite.amountDetails.amountFine, ''],
			date: [this.typesUtilsService.getDateFromString(this.studentFeeDeposite.amountDetails.date), Validators.compose([Validators.nullValidator])],
			description: [this.studentFeeDeposite.amountDetails.description,],
			paymentMode: [this.studentFeeDeposite.amountDetails.paymentMode,]
		
			});
	}

	if(this.data.type == 'All'){
		this.studentFeeDepositeForm = this.fb.group({

			amount: [this.studentFeeDeposite.amountDetails.amount,],
			amountDiscount: [this.studentFeeDeposite.amountDetails.amountDiscount, ''],
			amountFine: [this.studentFeeDeposite.amountDetails.amountFine, ''],
			date: [this.typesUtilsService.getDateFromString(this.studentFeeDeposite.amountDetails.date), Validators.compose([Validators.nullValidator])],
			description: [this.studentFeeDeposite.amountDetails.description,],
			paymentMode: [this.studentFeeDeposite.amountDetails.paymentMode,]
		
			});
	}

	
}

/**
 * Returns page title
 */
getTitle(): string {
	// if (this.studentFeeDeposite.id > 0) {
	// 	return `Edit Approve Leave '${this.studentFeeDeposite.studentSessionId}'`;
	// }

	return 'Collect Fee';
}

/**
 * Check control is invalid
 * @param controlName: string
 */
isControlInvalid(controlName: string): boolean {
	const control = this.studentFeeDepositeForm.controls[controlName];
	const result = control.invalid && control.touched;
	return result;
}

/** ACTIONS */

/**
 * Returns prepared studentFeeDeposite
 */
preparestudentFeeDeposite(): StudentFeeDepositeModel {
	const controls = this.studentFeeDepositeForm.controls;
	const _studentFeeDeposite = new StudentFeeDepositeModel();
	_studentFeeDeposite.feeGroupId = this.studentFeeDeposite.feeGroupId;

		const _date = controls.date.value;
		if (_date) {
			_studentFeeDeposite.amountDetails.date = this.typesUtilsService.dateFormat(_date);
		} else {
			_studentFeeDeposite.amountDetails.date = '';
		}
		

	_studentFeeDeposite.amountDetails.amount = controls.amount.value;
	_studentFeeDeposite.amountDetails.amountDiscount = controls.amountDiscount.value;
	_studentFeeDeposite.amountDetails.amountFine = controls.amountFine.value;
	_studentFeeDeposite.amountDetails.description = controls.description.value;
	_studentFeeDeposite.amountDetails.paymentMode = controls.paymentMode.value;

	
	return _studentFeeDeposite;
}

/**
 * On Submit
 */
onSubmit() {
	this.hasFormErrors = false;
	const controls = this.studentFeeDepositeForm.controls;
	/** check form */
	if (this.studentFeeDepositeForm.invalid) {
		Object.keys(controls).forEach(controlName =>
			controls[controlName].markAsTouched()
		);

		this.hasFormErrors = true;
		return;
	}

	const editedStudentFeeDeposite = this.preparestudentFeeDeposite();
	if (editedStudentFeeDeposite.feeGroupId > 0) {
		this.updateStudentFeeDeposite(editedStudentFeeDeposite);
	} else {
		this.createStudentFeeDeposite(editedStudentFeeDeposite);
	}
}

/**
 * Update studentFeeDeposite
 *
 * @param _studentFeeDeposite: StudentFeeDepositeModel
 */
updateStudentFeeDeposite(_studentFeeDeposite: StudentFeeDepositeModel) {
	const updateStudentFeeDeposite: Update<StudentFeeDepositeModel> = {
		id: _studentFeeDeposite.feeGroupId,
		changes: _studentFeeDeposite
	};
	this.store.dispatch(new StudentFeeDepositeUpdated({
		partialStudentFeeDeposite: updateStudentFeeDeposite,
		studentFeeDeposite: _studentFeeDeposite
	}));

	// integrate StudentFeeDeposite  update api

	// Remove this line
	of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _studentFeeDeposite, isEdit: true }));
	// Uncomment this line
	// this.dialogRef.close({ _studentFeeDeposite, isEdit: true }
}

/**
 * Create StudentFeeDeposite
 *
 * @param _studentFeeDeposite: StudentFeeDepositeModel
 */
createStudentFeeDeposite(_studentFeeDeposite: StudentFeeDepositeModel) {
	this.store.dispatch(new StudentFeeDepositeOnServerCreated({ studentFeeDeposite: _studentFeeDeposite }));
	this.componentSubscriptions = this.store.pipe(
		select(selectLastCreatedStudentFeeDepositeId),
		delay(1000), // Remove this line
	).subscribe(res => {
		if (!res) {
			return;
		}

		this.dialogRef.close({ _studentFeeDeposite, isEdit: false });
	});

	// integrate studentFeeDeposite  create api
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

