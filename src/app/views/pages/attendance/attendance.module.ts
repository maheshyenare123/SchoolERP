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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleGuard } from '../../../core/auth';
import { InterceptService, TypesUtilsService, HttpUtilsService, LayoutUtilsService , DynamicSetActionsService,} from '../../../core/_base/crud';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';


import { AttendanceComponent } from './attendance.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { AttendanceByDateComponent } from './attendance-by-date/attendance-by-date.component';
import { ApproveLeaveEditDialogComponent } from './approve-leave/approve-leave-edit/approve-leave-edit.dialog.component';
import { ApproveLeaveListComponent } from './approve-leave/approve-leave-list/approve-leave-list.component';
import { StudentAttendenceEffects, approveLeavesReducer, ApproveLeaveEffects, studentAttendencesReducer, StudentAttendenceService, ApproveLeaveService, AttendenceTypeService } from '../../../core/attendance';
import { TestComponent } from './test/test.component';
import { ApproveRejectLeaveEditDialogComponent } from './approve-leave/approve-reject-leave-edit/approve-reject-leave-edit.dialog.component';
import { DATE_FORMATS } from 'src/app/core/constants/date-formate';

const routes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		children: [
      {
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
      },
      {
				path: 'student_attendance',
				component: StudentAttendanceComponent
      },
      {
				path: 'attendance_by_date',
				component: AttendanceByDateComponent
      },
      {
				path: 'approve_leave',
				component: ApproveLeaveListComponent
      },
      {
				path: 'test',
				component: TestComponent
      },

    
    ]
  }
]


@NgModule({
  declarations: [
    AttendanceComponent,
    StudentAttendanceComponent,
    AttendanceByDateComponent,
    ApproveLeaveEditDialogComponent,
    ApproveLeaveListComponent,
    ApproveRejectLeaveEditDialogComponent,
    TestComponent
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





//state manage
StoreModule.forFeature('studentAttendences', studentAttendencesReducer),
EffectsModule.forFeature([StudentAttendenceEffects]),
StoreModule.forFeature('approveLeaves', approveLeavesReducer),
EffectsModule.forFeature([ApproveLeaveEffects]),
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
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
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
StudentAttendenceService,
ApproveLeaveService,
AttendenceTypeService,


  ],
   
    entryComponents: [
      ApproveLeaveEditDialogComponent,
      ApproveRejectLeaveEditDialogComponent
    ],
    exports: [RouterModule],
})
export class AttendanceModule { }
