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
import { StudentFeeDepositeModel, selectStudentFeeDepositesActionLoading, StudentFeeDepositeUpdated, selectLastCreatedStudentFeeDepositeId, StudentFeeDepositeOnServerCreated, StudentFeeDepositeService, StudentFeeAmountDetailsService, selectLastCreatedStudentFeeAmountDetailsId, StudentFeeAmountDetailsOnServerCreated, StudentFeeAmountDetailsUpdated } from '../../../../core/fees-collection';
import { StudentDtoModel, StudentService } from 'src/app/core/student-information';
import { SectionDtoModel, StudentClassModel, SectionService, StudentClassService } from 'src/app/core/academics';
import { StudentModel } from 'src/app/core/Models/student.model';
import { StudentFeeAmountDetailsModel } from 'src/app/core/fees-collection/_models/student-fee-amount-details.model';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-fee-collect-multiple-dialog',
	templateUrl: './fee-collect-multiple.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class FeeCollectMultipleDialogComponent implements OnInit, OnDestroy {


	// Public properties
	studentFeeDeposite: StudentFeeDepositeModel[] = [];
	studentFeeAmountDetails: StudentFeeAmountDetailsModel;
	studentFeeAmountDetailsForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;
	files: File[] = [];

	classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
	studentList: StudentDtoModel[] = [];
	feesDiscountList: any[];
	student: StudentModel;
	errormsg: string;
	totalPay: number = 0;
	constructor(public dialogRef: MatDialogRef<FeeCollectMultipleDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private studentService: StudentService,
		private studentFeeDepositeService: StudentFeeDepositeService,
		private studentFeeAmountDetailsService: StudentFeeAmountDetailsService
	) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		debugger
		this.store.pipe(select(selectStudentFeeDepositesActionLoading)).subscribe(res => this.viewLoading = res);
		// loadding
		const studentFeeAmountDetails = new StudentFeeAmountDetailsModel();
		studentFeeAmountDetails.clear(); // Set all defaults fields
		// this.studentFeeDeposite = this.data.selectedList;

		this.studentFeeDeposite = this.data.selectedList
		this.studentFeeDeposite.forEach(ele => {
			if (ele.balance == 0) {
				this.totalPay += ele.amount;
			} else {
				this.totalPay += ele.balance;
			}

		})


		// this.studentFeeAmountDetails.amountFine = this.studentFeeDeposite.fine;
		// this.studentFeeAmountDetails.paymentMode = 'Cash';
		// this.studentFeeAmountDetails.feeMastersId = this.studentFeeDeposite.feeMastersId;
		// this.studentFeeAmountDetails.studentFeeMasterId = this.studentFeeDeposite.studentFeeMasterId;


		this.student = this.data.student
		console.log(this.studentFeeDeposite)
		this.createForm();
		this.loadAllFeesDiscount();
	}
	//get All Class List





	loadAllFeesDiscount() {
		debugger
		this.feesDiscountList = []
		this.studentFeeDepositeService.getStudentDiscountById(this.student.studentSessionId).subscribe(res => {
			const data1 = res['data'];
			this.feesDiscountList = data1;
			console.log(this.feesDiscountList)
		}, err => {
		});
	}
	onFeesDiscountChange(id) {
		this.feesDiscountList.map(item => {
			if (item.id == id) {
				let amount = this.studentFeeAmountDetailsForm.get("amount").value - item.feesDiscountAmount;
				this.studentFeeAmountDetailsForm.get("amount").setValue(amount)
				this.studentFeeAmountDetailsForm.get("amountDiscount").setValue(item.feesDiscountAmount)
			}
		})
	}
	amountEnter($event) {
		this.errormsg = "";

	}

	loadAllClasses() {
		debugger
		this.studentClassService.getAllStudentClasss().subscribe(res => {
			const data = res['data'];
			this.classList = res['data'];
			console.log(this.classList)
		}, err => {
		});
	}
	loadAllSectionsByClassId(id: number) {
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
		//add classid sectionid
		this.studentService.getAllStudents(0, 0).subscribe(res => {
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

		this.studentFeeAmountDetailsForm = this.fb.group({

			// amount: [this.studentFeeAmountDetails.amount,],
			// amountDiscount: [this.studentFeeAmountDetails.amountDiscount,],
			// amountFine: [this.studentFeeAmountDetails.amountFine,],
			date: [this.typesUtilsService.getDateFromString(this.studentFeeAmountDetails.date), Validators.compose([Validators.nullValidator])],
			description: [this.studentFeeAmountDetails.description,],
			// feeMastersId: [this.studentFeeAmountDetails.feeMastersId,],
			paymentMode: [this.studentFeeAmountDetails.paymentMode,],
			// studentFeeMasterId: [this.studentFeeAmountDetails.studentFeeMasterId,]

		});

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
		const control = this.studentFeeAmountDetailsForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared studentFeeAmountDetails
	 */
	preparestudentFeeAmountDetails(): StudentFeeAmountDetailsModel[] {


		let studentFeesDetails = [];

		this.studentFeeDeposite.forEach(ele => {

			const controls = this.studentFeeAmountDetailsForm.controls;
			const _studentFeeAmountDetails = new StudentFeeAmountDetailsModel();
			const _date = controls.date.value;
			if (_date) {
				_studentFeeAmountDetails.date = this.typesUtilsService.dateFormat(_date);
			} else {
				_studentFeeAmountDetails.date = '';
			}
			_studentFeeAmountDetails.amount = ele.amount;
			// _studentFeeAmountDetails.amountDiscount = ele.amountDiscount;
			// _studentFeeAmountDetails.amountFine = ele.amountFine;
			_studentFeeAmountDetails.description = controls.description.value;
			_studentFeeAmountDetails.feeMastersId = ele.feeMastersId;
			_studentFeeAmountDetails.paymentMode = controls.paymentMode.value;
			_studentFeeAmountDetails.studentFeeMasterId = ele.studentFeeMasterId;

			studentFeesDetails.push(_studentFeeAmountDetails);


		})


		// amount: number;
		// amountDiscount: number;
		// amountFine: number;
		// date: string;
		// description: string;
		// feeMastersId: number;
		// paymentMode: string;
		// studentFeeMasterId: number;

		return studentFeesDetails;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		debugger
		this.hasFormErrors = false;
		const controls = this.studentFeeAmountDetailsForm.controls;
		/** check form */
		if (this.studentFeeAmountDetailsForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedStudentFeeAmountDetails = this.preparestudentFeeAmountDetails();

		this.createStudentFeeAmountDetails(this.preparestudentFeeAmountDetails());
		// }
	}


	createStudentFeeAmountDetails(_studentFeeAmountDetails: StudentFeeAmountDetailsModel[]) {

		this.studentFeeAmountDetailsService.createStudentFeeDepositeAll(_studentFeeAmountDetails).subscribe(res => {
			console.log(res);

		})

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

