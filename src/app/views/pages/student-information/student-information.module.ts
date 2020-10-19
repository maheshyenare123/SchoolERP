import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { CodePreviewModule } from '../../partials/content/general/code-preview/code-preview.module';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatIconRegistry } from '@angular/material/icon';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MaterialModule } from '../material/material.module';
//component
import { StudentDetailsListComponent } from './student-details/student-details-list/student-details-list.component';
import { StudentDetailsEditComponent } from './student-details/student-details-edit/student-details-edit.component';
import { StudentInformationComponent } from './student-information.component';
import { OnlineAdmissionListComponent } from './online-admission-list/online-admission-list.component';
import { StudentCategoriesComponent } from './student-categories/student-categories.component';
import { StudentHouseComponent } from './student-house/student-house.component';
import { DisableReasonComponent } from './disable-reason/disable-reason.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { disableReasonsReducer, DisableReasonEffects, studentDetailsReducer, studentsReducer, StudentEffects, CategoryEffects, studentHousesReducer, StudentHouseEffects, categorysReducer, DisableReasonService, StudentService, StudentHouseService, CategoryService } from 'src/app/core/student-information';

const routes: Routes = [
	{
		path: '',
		component: StudentInformationComponent,
		children: [
			{
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
			},
			{
				path: 'student-details',
				component: StudentDetailsListComponent
			},
			{
				path: 'student-details-edit',
				component: StudentDetailsEditComponent
			},

			{
				path: 'online-admission',
				component: OnlineAdmissionListComponent
			},
			{
				path: 'student-categories',
				component: StudentCategoriesComponent
			},
			{
				path: 'student-house',
				component: StudentHouseComponent
			},
			{
				path: 'disable-reason',
				component: DisableReasonComponent
			},
			{
				path: 'bulk-delete',
				component: BulkDeleteComponent
			},
		]
	}
]

@NgModule({
	declarations: [
		StudentDetailsListComponent,
		StudentInformationComponent,
		StudentDetailsEditComponent,
		OnlineAdmissionListComponent,
		StudentCategoriesComponent,
		StudentHouseComponent,
		DisableReasonComponent,
		BulkDeleteComponent,

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
		StoreModule.forFeature('disableReasons', disableReasonsReducer),
		EffectsModule.forFeature([DisableReasonEffects]),
		StoreModule.forFeature('stduents', studentsReducer),
		EffectsModule.forFeature([StudentEffects]),
		StoreModule.forFeature('categorys', categorysReducer),
		EffectsModule.forFeature([CategoryEffects]),
		StoreModule.forFeature('studentHouses', studentHousesReducer),
		EffectsModule.forFeature([StudentHouseEffects]),

	], providers: [
		NgbAlertConfig,
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
	
		DisableReasonService,
		StudentService,
		CategoryService,
		StudentHouseService
	
	
	
	
	],
	entryComponents: [

	],
	exports: [RouterModule],
})
export class StudentInformationModule { }
