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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {NgxPaginationModule} from 'ngx-pagination';

import { ReportComponent } from './report.component';
import { StudentInformationsComponent } from './student-informations/student-informations.component';
import { AdmissionReportComponent } from './student-informations/admission-report/admission-report.component';
import { ClassSubjectReportComponent } from './student-informations/class-subject-report/class-subject-report.component';
import { GuardianReportComponent } from './student-informations/guardian-report/guardian-report.component';
import { HomeworkEvaluationReportComponent } from './student-informations/homework-evaluation-report/homework-evaluation-report.component';
import { SiblingReportComponent } from './student-informations/sibling-report/sibling-report.component';
import { StudentHistoryComponent } from './student-informations/student-history/student-history.component';
import { StudentLoginCredentialComponent } from './student-informations/student-login-credential/student-login-credential.component';
import { StudentProfileComponent } from './student-informations/student-profile/student-profile.component';
import { StudentReportComponent } from './student-informations/student-report/student-report.component';
import { studentsReducer, StudentEffects, StudentService } from 'src/app/core/student-information';
import { homeworksReducer, HomeworkEffects, HomeworkService } from 'src/app/core/homework';
import { FinanceComponent } from './finances/finance/finance.component';
import { BalanceFeesReportComponent } from './finances/balance-fees-report/balance-fees-report.component';
import { ExpenseGroupReportComponent } from './finances/expense-group-report/expense-group-report.component';
import { ExpenseReportComponent } from './finances/expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './finances/fees-collection-report/fees-collection-report.component';
import { FeesStatementComponent } from './finances/fees-statement/fees-statement.component';
import { IncomeGroupReportComponent } from './finances/income-group-report/income-group-report.component';
import { IncomeReportComponent } from './finances/income-report/income-report.component';
import { OnlineFeesCollectionReportComponent } from './finances/online-fees-collection-report/online-fees-collection-report.component';
import { PayrollReportComponent } from './finances/payroll-report/payroll-report.component';
import { expensesReducer, ExpenseEffects, ExpenseService, ExpenseHeadEffects, ExpenseHeadService, expenseHeadsReducer } from 'src/app/core/expense';
import { incomesReducer, IncomeEffects, incomeHeadsReducer, IncomeHeadEffects, IncomeService, IncomeHeadService } from 'src/app/core/income';
import { staffPayslipsReducer, StaffPayslipEffects, StaffPayslipService, StaffService, staffsReducer } from 'src/app/core/human-resource';
import { HostelReportComponent } from './hostel-report/hostel-report.component';
import { TransportReportComponent } from './transport-report/transport-report.component';
import { AddItemReportComponent } from './inventory/add-item-report/add-item-report.component';
import { InventoryReportComponent } from './inventory/inventory-report/inventory-report.component';
import { IssueItemReportComponent } from './inventory/issue-item-report/issue-item-report.component';
import { StockReportComponent } from './inventory/stock-report/stock-report.component';
import { itemStocksReducer, ItemStockEffects, ItemStockService } from 'src/app/core/inventory';
import { bookIssueReturnsReducer, BookIssueReturnEffects, BookIssueReturnService, BookEffects, BookService, booksReducer } from 'src/app/core/library';
import { BookDueReportComponent } from './library/book-due-report/book-due-report.component';
import { BookInventoryReportComponent } from './library/book-inventory-report/book-inventory-report.component';
import { BookIssueReportComponent } from './library/book-issue-report/book-issue-report.component';
import { BookIssueReturnReportComponent } from './library/book-issue-return-report/book-issue-return-report.component';
import { LibraryReportComponent } from './library/library-report/library-report.component';
import { HumanResourceReportComponent } from './human-resource/human-resource-report/human-resource-report.component';
import { PayrollsReportComponent } from './human-resource/payrolls-report/payrolls-report.component';
import { StaffReportComponent } from './human-resource/staff-report/staff-report.component';
import { StaffEffects } from 'src/app/core/human-resource/_effects/staff.effects';
import { AttendanceReportComponent } from './Attendances/attendance-report/attendance-report.component';
import { BiometricAttendanceLogComponent } from './Attendances/biometric-attendance-log/biometric-attendance-log.component';
import { StaffAttendanceReportComponent } from './Attendances/staff-attendance-report/staff-attendance-report.component';
import { StudentAttendanceReportComponent } from './Attendances/student-attendance-report/student-attendance-report.component';
import { StudentAttendanceTypeReportComponent } from './Attendances/student-attendance-type-report/student-attendance-type-report.component';
import { DATE_FORMATS } from 'src/app/core/constants/date-formate';




const routes: Routes = [
	{
		path: '',
		component: ReportComponent,
		children: [
      {
				path: '',
				redirectTo: 'roles',
				pathMatch: 'full'
      },
      {
				path: 'student_information',
				component: StudentInformationsComponent
      },
      {
				path: 'student_report',
				component: StudentReportComponent
      },
      {
				path: 'guardian_report',
				component:  GuardianReportComponent
      },
      {
				path: 'student_history',
				component:  StudentHistoryComponent
      },
      {
				path: 'student_login_credential',
				component:  StudentLoginCredentialComponent
      },
      {
				path: 'class_subject_report',
				component:  ClassSubjectReportComponent
      },
      {
				path: 'admission_report',
				component: AdmissionReportComponent
      },
      {
				path: 'sibling_report',
				component:  SiblingReportComponent, 
    
      },
      {
				path: 'student_profile',
				component:  StudentProfileComponent, 
      },
      {
				path: 'homework_evaluation_report',
				component:  HomeworkEvaluationReportComponent
      },
      {
				path: 'finance',
				component:  FinanceComponent
      },

      {
				path: 'fees_statement',
				component:  FeesStatementComponent, 
      },
      {
				path: 'balance_fees_report',
				component:  BalanceFeesReportComponent, 
      },
      {
				path: 'fees_collection_report',
				component:   FeesCollectionReportComponent, 
      },
      {
				path: 'online_fees_collection_report',
				component:   OnlineFeesCollectionReportComponent, 
      },
      {
				path: 'income_report',
        component:   IncomeReportComponent, 
      },
      {
				path: 'expense_report',
				component:   ExpenseReportComponent, 
      },
      {
				path: 'payroll_report',
				component:   PayrollReportComponent, 
      },
      {
				path: 'income_group_report',
				component:   IncomeGroupReportComponent,
      },
      {
				path: 'expense_group_report',
				component:   ExpenseGroupReportComponent,
      },


      {
				path: 'human_resource_report',
				component:   HumanResourceReportComponent, 
      },
      {
				path: 'staff_report',
				component:   StaffReportComponent, 
      },
      {
				path: 'payrolls_report',
				component:   PayrollsReportComponent, 
      },


      // {
			// 	path: 'attendance-report',
			// 	component:   AttendanceReportComponent, 
      // },
      // {
			// 	path: 'book-issue-report',
			// 	component:   StudentAttendanceReportComponent, 
      // },
      // {
			// 	path: 'book-due-report',
			// 	component:   StudentAttendanceTypeReportComponent, 
      // },
      // {
			// 	path: 'book-inventory-report',
			// 	component:  StaffAttendanceReportComponent,
      // },
      // {
			// 	path: 'book-issue-return-report',
			// 	component:  BiometricAttendanceLogComponent,
      // },


    
      {
				path: 'library_report',
				component:   LibraryReportComponent, 
      },
      {
				path: 'book_issue_report',
				component:   BookIssueReportComponent, 
      },
      {
				path: 'book_due_report',
				component:   BookDueReportComponent, 
      },
      {
				path: 'book_inventory_report',
				component:  BookInventoryReportComponent,
      },
      {
				path: 'book_issue_return_report',
				component:  BookIssueReturnReportComponent,
      },


      {
				path: 'inventory_report',
				component:   InventoryReportComponent, 
      },
      {
				path: 'stock_report',
				component:   StockReportComponent, 
      },
      {
				path: 'add_item_report',
				component:   AddItemReportComponent, 
      },
      {
				path: 'issue_item_report',
				component:  IssueItemReportComponent,
      },


      {
				path: 'transport_report',
				component:   TransportReportComponent,
      },
      {
				path: 'hostel_report',
				component:   HostelReportComponent,
      },
    ] 
  }
]


@NgModule({
  declarations: [
    ReportComponent,
    StudentInformationsComponent,
    StudentReportComponent,
    GuardianReportComponent, 
    StudentHistoryComponent, 
    StudentLoginCredentialComponent, 
    ClassSubjectReportComponent, 
    AdmissionReportComponent, 
    SiblingReportComponent, 
    StudentProfileComponent, 
    HomeworkEvaluationReportComponent,

    FinanceComponent,
    FeesStatementComponent, 
    BalanceFeesReportComponent, 
    FeesCollectionReportComponent, 
    OnlineFeesCollectionReportComponent, 
    IncomeReportComponent, 
    ExpenseReportComponent, 
    PayrollReportComponent, 
    IncomeGroupReportComponent, 
    ExpenseGroupReportComponent,


    AttendanceReportComponent, 
    StudentAttendanceReportComponent, 
    StudentAttendanceTypeReportComponent, 
    StaffAttendanceReportComponent, 
    BiometricAttendanceLogComponent,


    HumanResourceReportComponent, 
    StaffReportComponent, 
    PayrollsReportComponent, 

    LibraryReportComponent, 
    BookIssueReportComponent, 
    BookDueReportComponent, 
    BookInventoryReportComponent, 
    BookIssueReturnReportComponent,

    InventoryReportComponent, 
    StockReportComponent, 
    AddItemReportComponent, 
    IssueItemReportComponent,

    TransportReportComponent,
    HostelReportComponent
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
        StoreModule.forFeature('students', studentsReducer),
        EffectsModule.forFeature([StudentEffects]),
        StoreModule.forFeature('homeworks', homeworksReducer),
        EffectsModule.forFeature([HomeworkEffects]),
        StoreModule.forFeature('expenses', expensesReducer),
        EffectsModule.forFeature([ExpenseEffects]),
        StoreModule.forFeature('expenseHeads', expenseHeadsReducer),
        EffectsModule.forFeature([ExpenseHeadEffects]),
        StoreModule.forFeature('incomes', incomesReducer),
        EffectsModule.forFeature([IncomeEffects]),
        StoreModule.forFeature('incomeHeads', incomeHeadsReducer),
        EffectsModule.forFeature([IncomeHeadEffects]),
        StoreModule.forFeature('staffPayslips', staffPayslipsReducer),
        EffectsModule.forFeature([StaffPayslipEffects]),
        StoreModule.forFeature('itemStocks', itemStocksReducer),
        StoreModule.forFeature('books', booksReducer),
        EffectsModule.forFeature([BookEffects]),
        EffectsModule.forFeature([ItemStockEffects]),
        StoreModule.forFeature('bookIssueReturns', bookIssueReturnsReducer),
        EffectsModule.forFeature([BookIssueReturnEffects]),
        StoreModule.forFeature('staffs', staffsReducer),
        EffectsModule.forFeature([StaffEffects]),
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
StudentService,
HomeworkService,
ExpenseService,
ExpenseHeadService,
IncomeService,
IncomeHeadService,
StaffPayslipService,
ItemStockService,
BookService,
BookIssueReturnService,
StaffService,
  ],
    entryComponents: [
     
    ],
  exports: [RouterModule],
})
export class ReportModule { }
