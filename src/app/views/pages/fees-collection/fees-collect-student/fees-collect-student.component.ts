import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StudentFeeDepositesDataSource, StudentFeeDepositeModel, StudentFeeDepositesPageRequested, OneStudentFeeDepositeDeleted, ManyStudentFeeDepositesDeleted, StudentFeeDepositeService, StudentFeeAmountDetailsModel, } from '../../../../core/fees-collection';
import { QueryParamsModel, LayoutUtilsService, MessageType } from '../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
// import { StudentFeeDepositeEditDialogComponent } from '../class-timetable-edit/class-timetable-edit.dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentClassModel, SectionDtoModel, StudentClassService } from 'src/app/core/academics';
import { FeeCollectEditDialogComponent } from '../fee-collect-edit/fee-collect-edit.dialog.component';

import { StudentDtoModel, StudentService } from 'src/app/core/student-information';
import { StudentModel } from 'src/app/core/Models/student.model';
import { FeeCollectMultipleDialogComponent } from '../fee-collect-multiple/fee-collect-multiple.dialog.component';
import { AllRolesLoaded } from 'src/app/core/auth';
@Component({
  selector: 'kt-fees-collect-student',
  templateUrl: './fees-collect-student.component.html',
  styleUrls: ['./fees-collect-student.component.scss']
})
export class FeesCollectStudentComponent implements OnInit {



  displayedColumns = ['select', 'feesGroup', 'feesCode', 'dueDate', 'status', 'amount', 'paymentId', 'mode', 'date', 'discount', 'fine', 'paid', 'balance', 'actions'];

  selection = new SelectionModel<StudentFeeDepositeModel>(true, []);
  studentFeeDepositesResult: StudentFeeDepositeModel[] = [];

  masterSelected: boolean;
  showCollectAll: boolean = false;


  classList: StudentClassModel[] = [];
  sectionList: SectionDtoModel[] = [];
  collectionFeeShowFlag: boolean = false;
  student: StudentDtoModel;
  studentListFlag: boolean = true;
  feesDepositeList: StudentFeeDepositeModelCheckBox[] = [];
  feesDiscountList: any;

  totalAmount: number = 0;
  totalDiscount: number = 0;
  totalFine: number = 0;
  totalPaid: number = 0;
  totalBalance: number = 0;

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private subheaderService: SubheaderService,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    private studentClassService: StudentClassService,
    private studentFeeDepositeService: StudentFeeDepositeService,
    private studentService: StudentService) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      debugger
      if (id && id > 0) {
        this.getStudentById(id);
        this.loadAllFeesDiscount(id);
        this.getStudentFeeDepositeById(id);
        console.log(id)
      } else {
        this.router.navigate(['/fees_collection/fees_master'])
      }
    });


  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(res => {
      // const data = res['data'];
      // console.log(res);
      this.student = res['data'];



    })

  }



  getStudentFeeDepositeById(id) {
    debugger
    this.feesDepositeList = []
    this.masterSelected = false;
    this.studentFeeDepositeService.getStudentFeeDepositeById(id).subscribe(res => {
      //  if(res){
      //   const data =  res['message'];
      //   alert(data);
      //   return
      //  }

      const data = res['data'];

      if (data == undefined) {
        const data = res['message'];
        alert(data);
        return
      }


      this.studentFeeDepositesResult = data['studentFeeDetails'];

      this.totalAmount = 0;
      this.totalDiscount = 0;
      this.totalFine = 0;
      this.totalPaid = 0;
      this.totalBalance = 0;

      this.studentFeeDepositesResult.forEach(element => {

        this.feesDepositeList.push({ 'data': element, 'checked': false });
        this.totalAmount += element.amount;
        this.totalDiscount += element.discount;
        this.totalFine += element.fine;
        this.totalPaid += element.paid;
        this.totalBalance += element.balance;

      })
      console.log(this.feesDepositeList)


    }, err => {
    });
  }

  loadAllFeesDiscount(id) {
    debugger
    this.feesDiscountList = []
    this.studentFeeDepositeService.getStudentDiscountById(id).subscribe(res => {
      const data1 = res['data'];
      this.feesDiscountList = data1;
      console.log(this.feesDiscountList)
    }, err => {
    });
  }

  collectStudentFee(studentFeeDeposite: StudentFeeDepositeModel, type: string) {
    debugger
    let student = this.student

    const _saveMessage = 'Collect Fees ';
    const _messageType = MessageType.Create;
    const dialogRef = this.dialog.open(FeeCollectEditDialogComponent, { data: { studentFeeDeposite, type, student } });
    dialogRef.afterClosed().subscribe(res => {
      this.getStudentFeeDepositeById(this.student.id)
      if (!res) {
        return;
      }
      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
      // this.loadStudentsList();
    });
  }

  collectAllStudentFees(type: string) {
    let student = this.student
    let selectedList = []
    for (let ele of this.feesDepositeList) {
      if (ele.checked) {
        selectedList.push(ele.data);
      }
    }
    const _saveMessage = 'Collect Fees ';
    const _messageType = MessageType.Create;
    const dialogRef = this.dialog.open(FeeCollectMultipleDialogComponent, { data: { selectedList, type, student }, width: '500' });
    dialogRef.afterClosed().subscribe(res => {
      this.getStudentFeeDepositeById(this.student.id)
      if (!res) {
        return;
      }
    });

    this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
  }


  /**
     * Check all rows are selected
     */

  checkAll(ev) {
    debugger;
    this.feesDepositeList.forEach(x => x.checked = ev.target.checked)
    if (ev.target.checked) {
      this.showCollectAll = true;
    } else {
      this.showCollectAll = false;
    }
  }

  isAllChecked() {
    debugger;

    this.showCollectAll = this.masterSelected = this.feesDepositeList.every(_ => _.checked);

    for (let ele of this.feesDepositeList) {
      if (ele.checked) {
        this.showCollectAll = true;
        break;
      } else {
        this.showCollectAll = false;
      }

    }
  }

  // masterSelected:boolean;
  // checklist:any;
  // checkedList:any;


  // checkUncheckAll() {
  //   for (var i = 0; i < this.checklist.length; i++) {
  //     this.checklist[i].isSelected = this.masterSelected;
  //   }
  //   this.getCheckedItemList();
  // }
  // isAllSelected() {
  //   this.masterSelected = this.checklist.every(function(item:any) {
  //       return item.isSelected == true;
  //     })
  //   this.getCheckedItemList();
  // }

  // getCheckedItemList(){
  //   this.checkedList = [];
  //   for (var i = 0; i < this.checklist.length; i++) {
  //     if(this.checklist[i].isSelected)
  //     this.checkedList.push(this.checklist[i]);
  //   }
  //   this.checkedList = JSON.stringify(this.checkedList);
  // }




}
export class StudentFeeDepositeModelCheckBox {
  data: StudentFeeDepositeModel
  checked?: boolean;
}
