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
import { MaterialModule } from '../material/material.module';

import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleGuard } from 'src/app/core/auth';
import { InterceptService, TypesUtilsService, HttpUtilsService, LayoutUtilsService } from 'src/app/core/_base/crud';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


import { IncomeComponent } from './income.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { SearchIncomeComponent } from './search-income/search-income.component';
import { IncomeHeadComponent } from './income-head/income-head.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { incomesReducer, IncomeEffects, IncomeService, incomeHeadsReducer, IncomeHeadEffects, IncomeHeadService } from 'src/app/core/income';
import { DATE_FORMATS } from 'src/app/core/constants/date-formate';
import { CustomDateService } from 'src/app/core/constants/custom-date.service';

const routes: Routes = [
	{
		path: '',
		component: IncomeComponent,
		children: [
      {
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
      },
      {
				path: 'add_income',
				component: AddIncomeComponent
      },
      {
				path: 'search_income',
				component: SearchIncomeComponent
      },
      {
				path: 'income_head',
				component: IncomeHeadComponent
      },
      
    ] 
  }
]

@NgModule({
  declarations: [IncomeComponent,AddIncomeComponent, SearchIncomeComponent, IncomeHeadComponent],
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
    StoreModule.forFeature('incomes', incomesReducer),
    EffectsModule.forFeature([IncomeEffects]),
    StoreModule.forFeature('incomeHeads', incomeHeadsReducer),
    EffectsModule.forFeature([IncomeHeadEffects]),
    
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
CustomDateService,
IncomeService,
IncomeHeadService
  ],
    entryComponents: [],
  exports: [RouterModule],
})
export class IncomeModule { }
