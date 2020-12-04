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
import { InterceptService, TypesUtilsService, HttpUtilsService, LayoutUtilsService, DynamicSetActionsService } from 'src/app/core/_base/crud';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


import { FeesCollectionComponent } from './fees-collection.component';
import { FeesReminderComponent } from './fees-reminder/fees-reminder.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FeesDiscountComponent } from './fees-discounts/fees-discount/fees-discount.component';
import { FeesDiscountAssignStudentDialogComponent } from './fees-discounts/fees-discount-assign-student/fees-discount-assign-student.dialog.component';
import { FeesMasterComponent } from './fees-masters/fees-master/fees-master.component';
import { FeesMasterAssignStudentDialogComponent } from './fees-masters/fees-master-assign-student/fees-master-assign-student.dialog.component';
import { FeesCarryForwordComponent } from './fees-carry-forword/fees-carry-forword.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdmissionEnquiryEffects } from 'src/app/core/front-office';
import { feesTypesReducer, FeesTypeEffects, FeesTypeService, feesGroupsReducer, FeesGroupEffects, FeesGroupService, feesDiscountsReducer, FeesDiscountService, feesMastersReducer, FeesMasterEffects, FeesMasterService, FeesDiscountEffects, assignFeesStudentsReducer, AssignFeesStudentEffects, AssignFeesStudentService, StudentFeeDepositeService, studentFeeDepositesReducer, StudentFeeDepositeEffects } from 'src/app/core/fees-collection';
import { FeesCollectComponent } from './fees-collect/fees-collect.component';
import { FeeCollectEditDialogComponent } from './fee-collect-edit/fee-collect-edit.dialog.component';
import { SearchFeesPaymentComponent } from './search-fees-payment/search-fees-payment.component';
import { SearchDueFeesComponent } from './search-due-fees/search-due-fees.component';
import {NgxPaginationModule} from 'ngx-pagination';
const routes: Routes = [
	{
		path: '',
		component: FeesCollectionComponent,
		children: [
      {
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
      },
      {
				path: 'fees_type',
				component: FeesTypeComponent
      },
      {
				path: 'fees_group',
				component: FeesGroupComponent
      },
      {
				path: 'fees_discount',
				component: FeesDiscountComponent
      },
      {
				path: 'fees_master',
				component: FeesMasterComponent
      },
      {
				path: 'collect_fees',
				component: FeesCollectComponent
      },
      {
				path: 'search_fees_payment',
				component: SearchFeesPaymentComponent
      },
      {
				path: 'search_due_fees',
				component: SearchDueFeesComponent
      },
      {
				path: 'fees_reminder',
				component: FeesReminderComponent
      },
      {
				path: 'fees_carry_forward',
				component: FeesCarryForwordComponent
      },
      
    ] 
  }
]


@NgModule({
  declarations: [
    FeesCollectionComponent,
    FeesReminderComponent,
    FeesTypeComponent,
    FeesGroupComponent,
    FeesDiscountComponent,
    FeesDiscountAssignStudentDialogComponent,
    FeesMasterComponent,
    FeesMasterAssignStudentDialogComponent,
    FeesCarryForwordComponent,
    FeesCollectComponent,
    FeeCollectEditDialogComponent,
    SearchFeesPaymentComponent,
    SearchDueFeesComponent
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
    NgxPaginationModule,
   // CKEditorModule
    
// state manage
    StoreModule.forFeature('feesTypes', feesTypesReducer),
    EffectsModule.forFeature([FeesTypeEffects]),

    StoreModule.forFeature('feesGroups', feesGroupsReducer),
    EffectsModule.forFeature([FeesGroupEffects]),

    StoreModule.forFeature('feesDiscounts', feesDiscountsReducer),
    EffectsModule.forFeature([FeesDiscountEffects]),

    StoreModule.forFeature('feesMasters', feesMastersReducer),
    EffectsModule.forFeature([FeesMasterEffects]),


    StoreModule.forFeature('assignFeesStudents', assignFeesStudentsReducer),
    EffectsModule.forFeature([AssignFeesStudentEffects]),

    StoreModule.forFeature('studentFeeDeposites', studentFeeDepositesReducer),
    EffectsModule.forFeature([StudentFeeDepositeEffects]),

  ],
  providers: [
    NgbAlertConfig,
    MatIconRegistry,
    ModuleGuard,
    InterceptService,
    TypesUtilsService,
    HttpUtilsService,
    LayoutUtilsService,
    DynamicSetActionsService,
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
        width: '900px'
      }
    },

//custom service
FeesTypeService,
FeesGroupService,
FeesDiscountService,
FeesMasterService,
AssignFeesStudentService,
StudentFeeDepositeService
  ],
    entryComponents: [
      FeesDiscountAssignStudentDialogComponent,
      FeesMasterAssignStudentDialogComponent,
      FeeCollectEditDialogComponent
    ],
  exports: [RouterModule],
})
export class FeesCollectionModule { }
