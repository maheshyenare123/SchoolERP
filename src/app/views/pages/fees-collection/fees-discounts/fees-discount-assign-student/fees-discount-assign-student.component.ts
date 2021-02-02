
import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignStudentFeediscountsDataSource, AssignFeesStudentModel, AssignStudentFeediscountService, FeesDiscountModel, AssignStudentFeediscountOnServerCreated, FeesDiscountService } from '../../../../../core/fees-collection';
import { QueryParamsModel, LayoutUtilsService, MessageType, TypesUtilsService } from '../../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../../core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';

import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { StudentClassModel, SectionDtoModel, StudentClassService, SectionService } from 'src/app/core/academics';
import { CategoryDtoModel, CategoryService } from 'src/app/core/student-information';

@Component({
  selector: 'kt-fees-discount-assign-student',
  templateUrl: './fees-discount-assign-student.component.html',
  styleUrls: ['./fees-discount-assign-student.component.scss']
})
export class FeesDiscountAssignStudentComponent implements OnInit {


  // Table fields
  dataSource: AssignStudentFeediscountsDataSource;
  //  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns = ['select', 'admissionNo', 'name', 'class', 'fatherName', 'gender', 'category'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  // @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  filterStatus = '';
  filterType = '';
  // Selection
  selection = new SelectionModel<AssignFeesStudentModel>(true, []);
  
  

  
  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Public properties
  assignFeesStudent: AssignFeesStudentModel;
  searchForm: FormGroup;
  hasFormErrors = false;

  // Private properties
  private componentSubscriptions: Subscription;


  classList: StudentClassModel[] = [];
  sectionList: SectionDtoModel[] = [];
  categoryList: CategoryDtoModel[] = [];
  feesDiscount: FeesDiscountModel;


  assignFeesStudentList: AssignFeesStudentModel[] = [];


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentClassService: StudentClassService,
    private sectionService: SectionService,
    private categoryService: CategoryService,
    private assignStudentFeediscountService: AssignStudentFeediscountService,
    private feesDiscountService: FeesDiscountService,
   private layoutUtilsService:LayoutUtilsService,

  ) {
  }

  /**
   * On init
   */
  ngOnInit() {


    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      debugger
      if (id && id > 0) {
        this.getFeesDiscountBy(id);
        console.log(id)
      } else {
        this.router.navigate(['/fees_collection/fees_discount'])
      }
    });


    this.loadAllClasses();
    this.addAssignFeesStudent();
    this.loadAllStudentCategory();




    // this.feesDiscount = this.data.assignFeesStudent;
    console.log(this.feesDiscount)
  }
  /**
   * On destroy
   */


  //get All Class List

  getFeesDiscountBy(id) {
    this.feesDiscountService.getFeesDiscountById(id).subscribe(res => {
      console.log(res);
      this.feesDiscount = res['data'];
    })

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
  onClassSelectChange(classId) {
    this.loadAllSectionsByClassId(classId);

  }
  loadAllSectionsByClassId(id: number) {
    debugger
    this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {

      this.sectionList = res['data'];
      console.log(this.sectionList)
    }, err => {
    });
  }

  //get All Source List
  loadAllStudentCategory() {
    debugger
    this.categoryService.getAllCategorys().subscribe(res => {
      const data = res['data'];
      this.categoryList = data['content'];
      console.log(this.categoryList)
    }, err => {
    });
  }

  onSearch() {
    debugger;
    this.hasFormErrors = false;
    const controls = this.searchForm.controls;
    /** check form */
    if (this.searchForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    let queryParams = {
      'pageNo': 0,
      'itemsPerPage': 10,
    }


    this.assignStudentFeediscountService.findAssignStudentFeediscounts(queryParams, controls.classId.value, controls.sectionId.value,
      controls.category.value, controls.gender.value,
      controls.rte.value, this.feesDiscount.id).subscribe(res => {
        const data = res['data'];
        this.assignFeesStudentList = data.studentDetails.content;//  ['content'];
        this.assignFeesStudentList.forEach(ele => {
          if (ele.isSaved) {
            this.selection = new SelectionModel<AssignFeesStudentModel>(true, [ele]);
          }



        });



      }, err => {
      });

  }


  /**
     * On Destroy
     */
  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }



  /**
   * Returns object for filter
   */
  filterConfiguration(): any {
    const filter: any = {};
    // const searchText: string = this.searchInput.nativeElement.value;
    const searchText: string = '';
    filter.class = searchText;
    if (!searchText) {
      return filter;
    }
    filter.assignFeesStudent = searchText;
    return filter;
  }


  /**
   * Show add AssignFeesStudent dialog
   */
  addAssignFeesStudent() {
    this.assignFeesStudent = new AssignFeesStudentModel();
    this.assignFeesStudent.clear(); //
    this.createForm();

  }

  /**
   * Show Edit AssignFeesStudent dialog and save after success close result
   * @param AssignFeesStudent: AssignFeesStudentModel
   */
  editAssignFeesStudent(assignFeesStudent: AssignFeesStudentModel) {

    this.assignFeesStudent = assignFeesStudent;
    this.createForm();

  }


  createForm() {
    debugger;
    this.searchForm = this.fb.group({
      classId: ['',],
      sectionId: ['',],
      category: ['0',],
      gender: ['',],
      rte: ['',],

    })

  }


  /**
   * On Submit
   */
  onSubmit() {
    if (this.selection.selected.length === 0) {

      return
    }

    debugger;
    let selectedList = [];
    this.selection.selected.forEach(elem => {
      console.log(elem);
      elem.isSaved =
        selectedList.push({
          admissionNo: elem.admissionNo,
          amount: elem.amount,
          category: elem.category,
          className: elem.className,
          fatherName: elem.fatherName,
          feeSessionGroupId: elem.feeSessionGroupId,
          firstname: elem.firstname,
          gender: elem.gender,
          isActive: elem.isActive,
          lastname: elem.lastname,
          rollNo: elem.rollNo,
          sectionName: elem.sectionName,
          studentFeeMasterId: elem.studentFeeMasterId,
          studentId: elem.studentId,
          studentSessionId: elem.studentSessionId,
          isSaved: 1

        });



    });



    let feesMasterAssignList=[];
    this.assignFeesStudentList.forEach((element: AssignFeesStudentModel, index) => {
      let selected: AssignFeesStudentModel = new AssignFeesStudentModel();
      selected.clear();

      if (selectedList.length >= index) {
        selected = selectedList[index];
      }

      if (selected.studentId === element.studentId) {
        feesMasterAssignList.push(element);
      } else {
        element.isSaved = 0;
        feesMasterAssignList.push(element);
      }

    });


    let entity = {
      "feeDiscountId": this.feesDiscount.id,
      "studentDtos": feesMasterAssignList
    }

    // this.store.dispatch(new AssignStudentFeediscountOnServerCreated({ assignStudentFeediscount: entity }));
    this.assignStudentFeediscountService.createAssignStudentFeediscountList(entity).subscribe(res => {
      console.log(res);
    });



      this.router.navigate(['/fees_collection/fees_discount']);
    // this.dialogRef.close({ entity, isEdit: false });

  }
  onCancel() {
    this.searchForm.reset();
  }

  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

 






  /**
     * Check all rows are selected
     */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.assignFeesStudentList.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection
   */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.assignFeesStudentList.forEach(row => this.selection.select(row));
    }
  }





}


