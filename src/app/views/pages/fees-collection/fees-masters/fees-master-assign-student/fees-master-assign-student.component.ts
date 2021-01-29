import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignStudentFeemastersDataSource, AssignFeesStudentModel, AssignStudentFeemasterService, FeesMasterModel, AssignStudentFeemasterOnServerCreated, FeesMasterService } from '../../../../../core/fees-collection';
import { TypesUtilsService } from '../../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';


import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { StudentClassModel, SectionDtoModel, StudentClassService, SectionService } from 'src/app/core/academics';
import { CategoryService, CategoryDtoModel } from 'src/app/core/student-information';


@Component({
  selector: 'kt-fees-master-assign-student',
  templateUrl: './fees-master-assign-student.component.html',
  styleUrls: ['./fees-master-assign-student.component.scss']
})
export class FeesMasterAssignStudentComponent implements OnInit {

  // Table fields
  dataSource: AssignStudentFeemastersDataSource;
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
  assignFeesStudentForm: FormGroup;
  searchForm: FormGroup;
  hasFormErrors = false;
  viewLoading = false;
  // Private properties
  private componentSubscriptions: Subscription;

  classId: number = 0;
  sectionId: number = 0;
  category: number = 0;
  gender: string;
  rte: string;

  pageNo = 1;
  itemsPerPage = 10;

  classList: StudentClassModel[] = [];
  sectionList: SectionDtoModel[] = [];
  categoryList: CategoryDtoModel[] = [];
  feesMaster: any;
  assignFeesStudentList: any[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private typesUtilsService: TypesUtilsService,
    private studentClassService: StudentClassService,
    private sectionService: SectionService,
    private categoryService: CategoryService,
    private assignStudentFeemasterService: AssignStudentFeemasterService,
    private feesMasterService: FeesMasterService,
  ) {
  }

  /**
   * On init
   */
  ngOnInit() {
    debugger

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      debugger
      if (id && id > 0) {
        this.getFeesMasterById(id);
        console.log(id)
      } else {
        this.router.navigate(['/fees_collection/fees_master'])
      }
    });


    this.loadAllClasses();
    // this.loadAllSectionsByClassId(1);
    this.addAssignFeesStudent();
    this.loadAllStudentCategory();
    // Init DataSource
    // this.dataSource = new AssignStudentFeemastersDataSource(this.store);

    // this.feesMaster = this.data.assignFeesStudent;


  }
  /**
   * On destroy
   */


  //get All Class List
  getFeesMasterById(id) {
    this.feesMasterService.getFeesMasterById(id).subscribe(res => {
      console.log(res);
      this.feesMaster = res['data'];
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


    this.assignStudentFeemasterService.findAssignStudentFeemasters(queryParams, controls.classId.value, controls.sectionId.value,
      controls.category.value, controls.gender.value,
      controls.rte.value, this.feesMaster.feeGroupId).subscribe(res => {
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
      classId: [this.classId,],
      sectionId: [this.sectionId,],
      category: [this.category,],
      gender: [this.gender,],
      rte: [this.rte,],

    })

  }


  /**
   * On Submit
   */
  onSubmit() {
    debugger

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

      if (selectedList.length > index) {
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
      "feeGroupId": this.feesMaster.feeGroupId,
      "feeGroupName": this.feesMaster.feeGroupName,
      "studentDtos": feesMasterAssignList
    }

    this.store.dispatch(new AssignStudentFeemasterOnServerCreated({ assignStudentFeemaster: entity }));
   this.router.navigate(['/fees_collection/fees_master'])

   
  }
  onCancel() {
    this.searchForm.reset();
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
    debugger
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.assignFeesStudentList.forEach(row => this.selection.select(row));
    }
    
  }


  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }



}
