import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { CodePreviewModule } from '../../partials/content/general/code-preview/code-preview.module';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatIconRegistry } from '@angular/material/icon';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MaterialModule } from '../material/material.module';

import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleGuard } from 'src/app/core/auth';
import { InterceptService, TypesUtilsService, HttpUtilsService, LayoutUtilsService } from 'src/app/core/_base/crud';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';






import { HumanResourceComponent } from './human-resource.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { ApplyLeaveComponent } from './staff-leave/apply-leave/apply-leave.component';
import { StaffDirectoryComponent } from './staff/staff-directory/staff-directory.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { DisabledStaffComponent } from './disabled-staff/disabled-staff.component';
import { StaffRatingComponent } from './staff-rating/staff-rating.component';
import { ApproveLeaveRequestComponent } from './staff-leave/approve-leave-request/approve-leave-request.component';
import { PayrollComponent } from './staff-payroll/payroll/payroll.component';
import { ApplyLeaveEditDialogComponent } from './staff-leave/apply-leave-edit/apply-leave-edit.dialog.component';
import { ApplyLeaveViewDialogComponent } from './staff-leave/apply-leave-view/apply-leave-view.dialog.component';
import { GeneratePayrollEditDialogComponent } from './staff-payroll/generate-payroll-edit/generate-payroll-edit.dialog.component';
import { ProceedPayEditDialogComponent } from './staff-payroll/proceed-pay-edit/proceed-pay-edit.dialog.component';
import { ViewPayslipEditDialogComponent } from './staff-payroll/view-payslip-edit/view-payslip-edit.dialog.component';
import { ApproveLeaveRequestViewDialogComponent } from './staff-leave/approve-leave-request-view/approve-leave-request-view.dialog.component';
import { ApproveLeaveRequestEditDialogComponent } from './staff-leave/approve-leave-request-edit/approve-leave-request-edit.dialog.component';
const routes: Routes = [
	{
		path: '',
		component: HumanResourceComponent,
		children: [
      {
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
      },
      {
				path: 'add-staff',
				component: AddStaffComponent
      },
      {
				path: 'staff-directory',
				component: StaffDirectoryComponent
      },
      {
				path: 'staff-attendance',
				component: StaffAttendanceComponent
      },
			{
				path: 'apply-leave',
				component: ApplyLeaveComponent
      },
      {
				path: 'approve-leave-request',
				component: ApproveLeaveRequestComponent
      },
      {
				path: 'leave-type',
				component: LeaveTypeComponent
      },
      {
				path: 'department',
				component: DepartmentComponent
      },
       {
				path: 'designation',
				component: DesignationComponent
      },
      {
				path: 'payroll',
				component: PayrollComponent
      },
      {
				path: 'disabled-staff',
				component: DisabledStaffComponent
      },
      {
				path: 'staff-rating',
				component: StaffRatingComponent
      },

    ] 
  }
]

@NgModule({
  declarations: [
    HumanResourceComponent,
    DesignationComponent,
    DepartmentComponent,
    LeaveTypeComponent,
    ApplyLeaveComponent,
    StaffDirectoryComponent,
    AddStaffComponent,
    StaffAttendanceComponent,
    DisabledStaffComponent,
    StaffRatingComponent,
    ApproveLeaveRequestComponent,
    PayrollComponent,
    ApplyLeaveEditDialogComponent,
    GeneratePayrollEditDialogComponent,
    ProceedPayEditDialogComponent,
    ViewPayslipEditDialogComponent,
    ApplyLeaveViewDialogComponent,
    ApproveLeaveRequestViewDialogComponent,
    ApproveLeaveRequestEditDialogComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
		NgbModule,
		CoreModule,
		CodePreviewModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
    PerfectScrollbarModule,
    MaterialModule,
    TranslateModule.forChild(),
    NgxPermissionsModule.forChild(),
   // CKEditorModule

    
//state manage
    // StoreModule.forFeature('admissionEnquirys', admissionEnquirysReducer),
    // EffectsModule.forFeature([AdmissionEnquiryEffects]),
   
  ],
  providers: [
    NgbAlertConfig,
    MatIconRegistry,
    ModuleGuard,
    InterceptService,
    TypesUtilsService,
    HttpUtilsService,
    LayoutUtilsService,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },

    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '1200px'
      }
    },
//custom service

  ],
    entryComponents: [
      ApplyLeaveEditDialogComponent,
      GeneratePayrollEditDialogComponent,
      ProceedPayEditDialogComponent,
      ViewPayslipEditDialogComponent,
      ApplyLeaveViewDialogComponent,
      ApproveLeaveRequestViewDialogComponent,
      ApproveLeaveRequestEditDialogComponent
	],
  exports: [RouterModule],

})

export class HumanResourceModule { }
