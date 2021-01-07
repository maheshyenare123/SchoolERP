// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
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
import { StaffModel, StaffPayslipModel, selectStaffPayslipsActionLoading, StaffPayslipUpdated, selectLastCreatedStaffPayslipId, StaffPayslipOnServerCreated } from '../../../../../core/human-resource';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-view-payslip-edit-dialog',
	templateUrl: './view-payslip-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ViewPayslipEditDialogComponent implements OnInit, OnDestroy {
	
	
// Public properties
staff: StaffModel;
staffPayslip: StaffPayslipModel;



viewLoading = false;
// Private properties
private componentSubscriptions: Subscription;

constructor(public dialogRef: MatDialogRef<ViewPayslipEditDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
	private fb: FormBuilder,
	private store: Store<AppState>,
	private typesUtilsService: TypesUtilsService) {
}

/**
 * On init
 */
ngOnInit() {
	this.store.pipe(select(selectStaffPayslipsActionLoading)).subscribe(res => this.viewLoading = res);
	// loadding
	debugger
	//staff details show purpose and from staff.id call api for PaymentSlip for details  showing
	this.staff = this.data.staff;
	this.staffPayslip = this.data.payslip


	this.staffPayslip.grossSalary=this.staffPayslip.basic+this.staffPayslip.totalAllowance;

	console.log(this.staffPayslip.grossSalary);
}

/**
 * On destroy
 */
ngOnDestroy() {
	if (this.componentSubscriptions) {
		this.componentSubscriptions.unsubscribe();
	}
}
print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('content').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Payslip</title>
          <style>
       
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

/**
 * Returns page title
 */
getTitle(): string {
	// if (this.staffPayslip.id > 0) {
	// 	return ` view PaySlip'${this.staffPayslip.id}'`;
	// }

	return 'View PaySlip';
}


}

