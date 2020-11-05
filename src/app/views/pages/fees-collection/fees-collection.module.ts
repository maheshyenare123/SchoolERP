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


import { FeesCollectionComponent } from './fees-collection.component';
import { FeesReminderComponent } from './fees-reminder/fees-reminder.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FeesDiscountComponent } from './fees-discounts/fees-discount/fees-discount.component';
import { FeesDiscountAssignStudentDialogComponent } from './fees-discounts/fees-discount-assign-student/fees-discount-assign-student.dialog.component';
import { FeesMasterComponent } from './fees-masters/fees-master/fees-master.component';
import { FeesMasterAssignStudentDialogComponent } from './fees-masters/fees-master-assign-student/fees-master-assign-student.dialog.component';
import { FeesCarryForwordComponent } from './fees-carry-forword/fees-carry-forword.component';

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
				path: 'fees-type',
				component: FeesTypeComponent
      },
      {
				path: 'fees-group',
				component: FeesGroupComponent
      },
      {
				path: 'fees-discount',
				component: FeesDiscountComponent
      },
      {
				path: 'fees-master',
				component: FeesMasterComponent
      },
      {
				path: 'fees-reminder',
				component: FeesReminderComponent
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
    FeesCarryForwordComponent
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
        width: '900px'
      }
    },

//custom service

  ],
    entryComponents: [FeesDiscountAssignStudentDialogComponent,FeesMasterAssignStudentDialogComponent],
  exports: [RouterModule],
})
export class FeesCollectionModule { }
