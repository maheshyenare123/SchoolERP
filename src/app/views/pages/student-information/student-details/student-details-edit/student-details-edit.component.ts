// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentDtoModel, selectStudentDetailsActionLoading, StudentDetailUpdated, StudentDetailOnServerCreated, selectLastCreatedStudentDetailId } from '../../../../../core/student-information';
// // Services and Models
// import { DeliveryPersonModel, DeliveryPersonUpdated, DeliveryPersonOnServerCreated, selectLastCreatedDeliveryPersonId, selectDeliveryPersonsActionLoading } from '../../../../../core/master-entry';
// import { EmployeeModel } from '../../../../../core/payroll/_models/employee.model';


@Component({
  selector: 'kt-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StudentDetailsEditComponent implements OnInit {

  // Public properties
  studentDetail: StudentDtoModel;
  studentDetailForm: FormGroup;
  hasFormErrors = false;
  viewLoading = false;
  // Private properties
  private componentSubscriptions: Subscription;

  isLinear = false;
  studentInformationFormGroup: FormGroup;
  parentGuardianFormGroup: FormGroup;
  addMoreDetailFormGroup: FormGroup;
  filesStudent: File[] = [];
  filesFather: File[] = [];
  filesMother: File[] = [];
  filesGuardian: File[] = [];
  filesTitle: File[] = [];
  filesTitle1: File[] = [];
  filesTitle2: File[] = [];
  filesTitle3: File[] = [];


  constructor(
    //public dialogRef: MatDialogRef<StudentDetailsEditDialogComponent>,
    //  @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private typesUtilsService: TypesUtilsService) {
  }

  /**
   * On init
   */
  ngOnInit() {
    this.store.pipe(select(selectStudentDetailsActionLoading)).subscribe(res => this.viewLoading = res);

    //this.studentDetail = this.data.studentDetail;
    this.createForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }


  createForm() {
    this.studentInformationFormGroup = this.fb.group({
      rollNo: [this.studentDetail.rollNo, ''],
      classId: [this.studentDetail.classId, Validators.required],
      sectionId: [this.studentDetail.sectionId, Validators.required],
      firstname: [this.studentDetail.firstname, Validators.required],
      lastname: [this.studentDetail.lastname, ''],
      dob: [this.typesUtilsService.getDateFromString(this.studentDetail.dob), Validators.compose([Validators.nullValidator])],
      categoryId: [this.studentDetail.categoryId, 0],
      religion: [this.studentDetail.religion, ''],
      cast: [this.studentDetail.cast, ''],
      mobileno: [this.studentDetail.mobileno, [Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      email: [this.studentDetail.email, Validators.compose([Validators.required, Validators.email])],
      admissionDate: [this.typesUtilsService.getDateFromString(this.studentDetail.admissionDate), Validators.compose([Validators.nullValidator])],
      bloodGroup: [this.studentDetail.bloodGroup, ''],
      schoolHouseId: [this.studentDetail.schoolHouseId, 0],
      height: [this.studentDetail.height, ''],
      weight: [this.studentDetail.weight, ''],
      measurementDate: [this.typesUtilsService.getDateFromString(this.studentDetail.measurementDate), Validators.compose([Validators.nullValidator])],
      image: [this.studentDetail.image, ''],
      siblingId: [this.studentDetail.siblingId, 0],
    });

    this.parentGuardianFormGroup = this.fb.group({
      fatherName: [this.studentDetail.fatherName, ''],
      fatherPhone: [this.studentDetail.fatherPhone, [Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      fatherOccupation: [this.studentDetail.fatherOccupation, ''],
      fatherPic: [this.studentDetail.fatherPic, ''],
      motherName: [this.studentDetail.motherName, ''],
      motherPhone: [this.studentDetail.motherPhone, [Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      motherOccupation: [this.studentDetail.motherOccupation, ''],
      motherPic: [this.studentDetail.motherPic, ''],
      guardianIs: [this.studentDetail.guardianIs, Validators.required],
      guardianName: [this.studentDetail.guardianName, Validators.required],
      guardianPhone: [this.studentDetail.guardianPhone, [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]],
      guardianOccupation: [this.studentDetail.guardianOccupation, ''],
      guardianPic: [this.studentDetail.guardianPic, ''],
      guardianRelation: [this.studentDetail.guardianRelation, ''],
      guardianEmail: [this.studentDetail.guardianEmail, Validators.compose([Validators.required, Validators.email])],
      guardianAddress: [this.studentDetail.guardianAddress, ''],
    });

    this.addMoreDetailFormGroup = this.fb.group({
      currentAddress: [this.studentDetail.currentAddress, ''],
      permanentAddress: [this.studentDetail.permanentAddress, ''],
      routeId: [this.studentDetail.routeId, 0],

      hostelRoomId: [this.studentDetail.hostelRoomId, 0],
      bankAccountNo: [this.studentDetail.bankAccountNo, ''],
      bankName: [this.studentDetail.bankName, ''],
      ifscCode: [this.studentDetail.ifscCode, ''],


      rte: [this.studentDetail.rte, ''],
      previousSchool: [this.studentDetail.previousSchool, ''],
      note: [this.studentDetail.note, ''],
    });

    this.studentDetailForm = this.fb.group({

      adharNo: [this.studentDetail.adharNo, ''],
      admissionNo: [this.studentDetail.admissionNo, ''],
      appKey: [this.studentDetail.appKey, ''],
      batchId: [this.studentDetail.batchId, 0],
      city: [this.studentDetail.city, ''],
      disNote: [this.studentDetail.disNote, ''],
      disReasonId: [this.studentDetail.disReasonId, 0],
      disableAt: [this.studentDetail.disableAt, ''],
      feesDiscount: [this.studentDetail.feesDiscount, 0],
      isActive: [this.studentDetail.isActive, ''],
      parentId: [this.studentDetail.parentId, 0],
      pincode: [this.studentDetail.pincode, ''],
      samagraId: [this.studentDetail.samagraId, ''],
      state: [this.studentDetail.state, ''],
      transportFees: [this.studentDetail.transportFees, 0],
      vehrouteId: [this.studentDetail.vehrouteId, 0],


    });
  }

  /**
   * Returns page title
   */
  getTitle(): string {
    if (this.studentDetail.id > 0) {
      return `Edit Student Detail '${this.studentDetail.firstname}' '${this.studentDetail.lastname}'`;
    }

    return 'New Student Detail';
  }

  /**
   * Check control is invalid
   * @param controlName: string
   */
  isControlInvalid(controlName: string): boolean {
    const control = this.studentDetailForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /** ACTIONS */

  /**
   * Returns prepared studentDetail
   */
  preparestudentDetail(): StudentDtoModel {
    const controls = this.studentDetailForm.controls;
    const _studentDetail = new StudentDtoModel();
    _studentDetail.id = this.studentDetail.id;

    _studentDetail.adharNo = controls.adharNo.value;
    const _admissionDate = controls.admissionDate.value;
    if (_admissionDate) {
      _studentDetail.admissionDate = this.typesUtilsService.dateFormat(_admissionDate);
    } else {
      _studentDetail.admissionDate = '';
    }
    _studentDetail.admissionNo = controls.admissionNo.value;
    _studentDetail.appKey = controls.appKey.value;
    _studentDetail.bankAccountNo = controls.bankAccountNo.value;
    _studentDetail.bankName = controls.bankName.value;
    _studentDetail.batchId = controls.batchId.value;
    _studentDetail.bloodGroup = controls.bloodGroup.value;
    _studentDetail.cast = controls.cast.value;
    _studentDetail.categoryId = controls.categoryId.value;


    _studentDetail.city = controls.city.value;
    _studentDetail.classId = controls.classId.value;
    _studentDetail.currentAddress = controls.currentAddress.value;
    _studentDetail.disNote = controls.disNote.value;
    _studentDetail.disReasonId = controls.disReasonId.value;
    _studentDetail.disableAt = controls.disableAt.value;
    const _dob = controls.dob.value;
    if (_dob) {
      _studentDetail.dob = this.typesUtilsService.dateFormat(_dob);
    } else {
      _studentDetail.dob = '';
    }
    _studentDetail.email = controls.email.value;
    _studentDetail.fatherName = controls.fatherName.value;
    _studentDetail.fatherOccupation = controls.fatherOccupation.value;
    _studentDetail.fatherPhone = controls.fatherPhone.value;
    _studentDetail.fatherPic = controls.fatherPic.value;
    _studentDetail.feesDiscount = controls.feesDiscount.value;
    _studentDetail.firstname = controls.firstname.value;
    _studentDetail.guardianAddress = controls.guardianAddress.value;
    _studentDetail.guardianEmail = controls.guardianEmail.value;
    _studentDetail.guardianIs = controls.guardianIs.value;
    _studentDetail.guardianName = controls.guardianName.value;
    _studentDetail.guardianOccupation = controls.guardianOccupation.value;
    _studentDetail.guardianPhone = controls.guardianPhone.value;
    _studentDetail.guardianPic = controls.guardianPic.value;
    _studentDetail.guardianRelation = controls.guardianRelation.value;
    _studentDetail.height = controls.height.value;
    _studentDetail.hostelRoomId = controls.hostelRoomId.value;
    _studentDetail.ifscCode = controls.ifscCode.value;
    _studentDetail.image = controls.image.value;
    _studentDetail.isActive = controls.isActive.value;
    _studentDetail.lastname = controls.lastname.value;
    _studentDetail.measurementDate = controls.measurementDate.value;
    _studentDetail.mobileno = controls.mobileno.value;
    _studentDetail.motherName = controls.motherName.value;
    _studentDetail.motherOccupation = controls.motherOccupation.value;
    _studentDetail.motherPhone = controls.motherPhone.value;
    _studentDetail.motherPic = controls.motherPic.value;
    _studentDetail.note = controls.note.value;
    _studentDetail.parentId = controls.parentId.value;
    _studentDetail.permanentAddress = controls.permanentAddress.value;
    _studentDetail.pincode = controls.pincode.value;
    _studentDetail.previousSchool = controls.previousSchool.value;
    _studentDetail.religion = controls.religion.value;
    _studentDetail.rollNo = controls.rollNo.value;
    _studentDetail.routeId = controls.routeId.value;
    _studentDetail.rte = controls.rte.value;
    _studentDetail.samagraId = controls.samagraId.value;
    _studentDetail.schoolHouseId = controls.schoolHouseId.value;
    _studentDetail.sectionId = controls.sectionId.value;
    _studentDetail.siblingId = controls.siblingId.value;
    _studentDetail.state = controls.state.value;
    _studentDetail.transportFees = controls.transportFees.value;
    _studentDetail.vehrouteId = controls.vehrouteId.value;
    _studentDetail.weight = controls.weight.value;

    // _studentDetail.isActive='yes'
    return _studentDetail;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.studentDetailForm.controls;
    /** check form */
    if (this.studentDetailForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    const editedstudentDetail = this.preparestudentDetail();
    if (editedstudentDetail.id > 0) {
      this.updateStudentDetail(editedstudentDetail);
    } else {
      this.createStudentDetail(editedstudentDetail);
    }
  }

  onSubmit1() {
    this.hasFormErrors = false;
    const controls = this.studentDetailForm.controls;
    /** check form */
    if (this.studentDetailForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    const editedstudentDetail = this.preparestudentDetail();
    if (editedstudentDetail.id > 0) {
      this.updateStudentDetail(editedstudentDetail);
    } else {
      this.createStudentDetail(editedstudentDetail);
    }
  }
  /**
   * Update studentDetail
   *
   * @param _studentDetail: StudentDtoModel
   */
  updateStudentDetail(_studentDetail: StudentDtoModel) {
    const updateStudentDetail: Update<StudentDtoModel> = {
      id: _studentDetail.id,
      changes: _studentDetail
    };
    this.store.dispatch(new StudentDetailUpdated({
      partialStudentDetails: updateStudentDetail,
      studentDetail: _studentDetail
    }));



    // Remove this line
    //of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _studentDetail, isEdit: true }));
    // Uncomment this line
    // this.dialogRef.close({ _studentDetail, isEdit: true }
  }

  /**
   * Create studentDetail
   *
   * @param _studentDetail: StudentDtoModel
   */
  createStudentDetail(_studentDetail: StudentDtoModel) {
    this.store.dispatch(new StudentDetailOnServerCreated({ studentDetail: _studentDetail }));
    this.componentSubscriptions = this.store.pipe(
      select(selectLastCreatedStudentDetailId),
      delay(1000), // Remove this line
    ).subscribe(res => {
      if (!res) {
        return;
      }

      // this.dialogRef.close({ _studentDetail, isEdit: false });
    });


  }

  onCancel() {
    this.studentDetailForm.reset();
    this.studentDetail.clear();
    this.createForm();
  }


  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  onSelectStudent(event) {
    console.log(event);
    this.filesStudent.push(...event.addedFiles);
  }

  onRemoveStudent(event) {
    console.log(event);
    this.filesStudent.splice(this.filesStudent.indexOf(event), 1);
  }

  onSelectFather(event) {
    console.log(event);
    this.filesFather.push(...event.addedFiles);
  }

  onRemoveFather(event) {
    console.log(event);
    this.filesFather.splice(this.filesFather.indexOf(event), 1);
  }

  onSelectMother(event) {
    console.log(event);
    this.filesMother.push(...event.addedFiles);
  }

  onRemoveMother(event) {
    console.log(event);
    this.filesMother.splice(this.filesMother.indexOf(event), 1);
  }

  onSelectGuardian(event) {
    console.log(event);
    this.filesGuardian.push(...event.addedFiles);
  }

  onRemoveGuardian(event) {
    console.log(event);
    this.filesGuardian.splice(this.filesGuardian.indexOf(event), 1);
  }

  onSelectTitle(event) {
    console.log(event);
    this.filesTitle.push(...event.addedFiles);
  }

  onRemoveTitle(event) {
    console.log(event);
    this.filesTitle.splice(this.filesTitle.indexOf(event), 1);
  }

  onSelectTitle1(event) {
    console.log(event);
    this.filesTitle1.push(...event.addedFiles);
  }

  onRemoveTitle1(event) {
    console.log(event);
    this.filesTitle1.splice(this.filesTitle1.indexOf(event), 1);
  }

  onSelectTitle2(event) {
    console.log(event);
    this.filesTitle2.push(...event.addedFiles);
  }

  onRemoveTitle2(event) {
    console.log(event);
    this.filesTitle2.splice(this.filesTitle2.indexOf(event), 1);
  }

  onSelectTitle3(event) {
    console.log(event);
    this.filesTitle3.push(...event.addedFiles);
  }

  onRemoveTitle3(event) {
    console.log(event);
    this.filesTitle3.splice(this.filesTitle3.indexOf(event), 1);
  }

  onChangeGuardianIs($event) {
    if($event.target.value == "Father"){

    }
    if($event.target.value == "Mother"){

    }

  }

}


