// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// Material
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassTimetableModel, selectClassTimetablesActionLoading, ClassTimetableUpdated, ClassTimetableOnServerCreated, selectLastCreatedClassTimetableId, ClassTimetableService, StudentClassService, SectionService, AssignClassTeacherService, StudentClassModel, SectionDtoModel, SubjectGroupService, SubjectDtoModel, SubjectGroupDtoModel, SubjectService, TimetableDayModel } from '../../../../../core/academics';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { StaffDtoModel } from 'src/app/core/academics/_models/staffDto.model';
import { selectAdmissionEnquirysActionLoading } from 'src/app/core/front-office';
// // Services and Models
// import { DeliveryPersonModel, DeliveryPersonUpdated, DeliveryPersonOnServerCreated, selectLastCreatedDeliveryPersonId, selectDeliveryPersonsActionLoading } from '../../../../../core/master-entry';
// import { EmployeeModel } from '../../../../../core/payroll/_models/employee.model';



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-class-timetable-edit-dialog',
	templateUrl: './class-timetable-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ClassTimetableEditDialogComponent implements OnInit, OnDestroy {

	// Public properties
	classTimetable: ClassTimetableModel;
	searchForm: FormGroup;
	classTimetableForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	classList: StudentClassModel[] = [];
	sectionList: SectionDtoModel[] = [];
	staffList: StaffDtoModel[] = [];
	subjectList: SubjectDtoModel[] = [];
	subjectGroupList: SubjectGroupDtoModel[] = [];
	day: string = "Monday";


	tabsForTabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	constructor(public dialogRef: MatDialogRef<ClassTimetableEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private classTimetableService: ClassTimetableService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private assignClassTeacherService: AssignClassTeacherService,
		private subjectService: SubjectService,
		private subjectGroupService: SubjectGroupService,
	) {
	}

	/**
	 * On init
	 */
	ngOnInit() {

		//All Get Call
		debugger;
		this.loadAllStaff();
		this.loadAllClasses();
		this.loadAllSubject();
		this.loadAllSubjectGroup();

		this.store.pipe(select(selectClassTimetablesActionLoading)).subscribe(res => this.viewLoading = res);

		this.classTimetable = this.data.classTimetable;
		this.createForm();
	}

	//get All Class List
	loadAllClasses() {
		debugger
		this.studentClassService.getAllStudentClasss().subscribe(res => {
			const data = res['data'];
			this.classList = data['content'];
			console.log(this.classList)
		}, err => {
		});
	}
	loadAllSectionsByClassId(id: number) {
		debugger
		this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {

			this.sectionList = res['data'];
			console.log(this.sectionList)

		}, err => {
		});
	}

	loadAllSubject() {
		debugger
		this.subjectService.getAllSubjects().subscribe(res => {
			const data = res['data'];
			this.subjectList = data['content'];
			console.log(this.subjectList)


		}, err => {
		});
	}
	loadAllSubjectGroup() {
		debugger
		this.subjectGroupService.getAllSubjectGroups().subscribe(res => {
			const data = res['data'];
			this.subjectGroupList = data['content'];
			console.log(this.subjectList)
		}, err => {
		});
	}


	loadAllStaff() {
		debugger
		this.assignClassTeacherService.getAllStaffs().subscribe(res => {
			console.log("response collage List")
			console.log(res)
			const data = res['data'];
			this.staffList = data['content'];
			console.log(this.staffList)
			// this.setDataInChecboxList();

		}, err => {
		});
	}

	onClassSelectChange(classId) {
		this.loadAllSectionsByClassId(classId);
		var classObj = this.classList.find(x => x.id === classId);
		// this.searchForm.controls.classes.setValue(classObj.classses);

	}
	onSectionSelectChange(subjectId) {
		var sectionObj = this.sectionList.find(x => x.id === subjectId);
		// this.searchForm.controls.section.setValue(sectionObj.section);

	}
	onSubjectSelectChange(subjectId,indexi,indexj) {
		var subjectObj = this.subjectList.find(x => x.id === subjectId);
		let daysArray = this.classTimetableForm.get('days') as FormArray;
		let itemArray = daysArray.controls[indexi].get('items') as FormArray;
itemArray.controls[indexj].get('subjectName').setValue(subjectObj.name);

	}
	onStaffSelectChange(staffId,indexi,indexj) {
		var staffObj = this.staffList.find(x => x.id === staffId);
		let daysArray = this.classTimetableForm.get('days') as FormArray;
		let itemArray = daysArray.controls[indexi].get('items') as FormArray;
itemArray.controls[indexj].get('staffName').setValue(staffObj.name);

	}
	staffName
	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}


	createForm() {
		this.searchForm = this.fb.group({
			classId: [this.classTimetable.classId, Validators.required],
			// classes: [''],
			sectionId: [this.classTimetable.sectionId, Validators.required],
			// section: ['',],
			subjectGroupId: [this.classTimetable.subjectGroupId, Validators.required],


		})
		this.classTimetableForm = this.fb.group({
			// day: [this.classTimetable.day, Validators.required],
			// days:this.fb.array([this.createDaysRow()]),
			days: this.fb.array(this.tabsForTabs.map(tab => this.createDaysRow(tab))),

		});


	}

	createDaysRow(tab) {
		return this.fb.group({
			dayName: [tab,],
			items: this.fb.array([
				this.createItemRow(tab)
			]),
		});
	}
	createItemRow(dayName) {
		return this.fb.group({
			day:[dayName,],
			subjectId: ['',],
			subjectName: ['',],
			staffId: ['',],
			staffName:['',],
			timeFrom: ['',],
			timeTo: ['',],
			roomNo: ['',],
			isActive:['yes',]

		});
	}




	addItemRow(index,tab) {
		let daysArray = this.classTimetableForm.get('days') as FormArray;
		let itemArray = daysArray.controls[index].get('items') as FormArray;
		itemArray.push(this.createItemRow(tab));
	}

	removeItemRow(indexi, indexj,id) {

		//delete api
	var flag=this.deleteTimetableRow(id);
	if(flag){
		let daysArray = this.classTimetableForm.get('days') as FormArray;
		let itemArray = daysArray.controls[indexi].get('items') as FormArray;
		itemArray.removeAt(indexj);
	}
	}

	tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		console.log('tabChangeEvent => ', tabChangeEvent);
		this.day = tabChangeEvent.tab.textLabel
		console.log('index => ', tabChangeEvent.index);
	}
	deleteTimetableRow(id): Observable<Boolean> {
		var flag;
		this.classTimetableService.deleteClassTimetable(id).subscribe(res => {
			flag=1;
		}, er => {
			flag=0;
		})
		return flag;
	}
	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.classTimetable.id > 0) {
			return `Edit Class Timetable '${this.classTimetable.id}'`;
		}

		return 'New Class Timetable';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.classTimetableForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared classTimetable
	 */
	prepareclassTimetable(): ClassTimetableModel {
		const controls = this.classTimetableForm.controls;
		const controls1 = this.searchForm.controls;
		const _classTimetable = new ClassTimetableModel();
		_classTimetable.id = this.classTimetable.id;

		_classTimetable.classId = controls1.classId.value;
		// _classTimetable.classes = controls1.classes.value;
		_classTimetable.sectionId = controls1.sectionId.value;
		// _classTimetable.section = controls1.section.value;
		_classTimetable.subjectGroupId = controls1.subjectGroupId.value;
		// _classTimetable.day =  this.day// controls.day.value;

		const days = controls.days.value;
		console.log(days);

		// var timeTableArr = [];
		const _dayTimetable = new TimetableDayModel();
		for (var i = 0; i < days.length; i++) {
		// var day=days[i].dayName;
		// if(days[i].items[0].subjectId>0){
		// 	// timeTableArr.push({[day]:days[i].items});
		// }else{
		// 	// timeTableArr.push({[day]:[]});
		// }
	
		if(days[i].dayName=="Monday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.monday=days[i].items;
			}else{
				_dayTimetable.monday=[];
			}
			
		}else if(days[i].dayName=="Tuesday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.tuesday=days[i].items;
			}else{
				_dayTimetable.tuesday=[];
			}
			

		}else if(days[i].dayName=="Wednesday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.wednesday=days[i].items;
			}else{
				_dayTimetable.wednesday=[];
			}
			
		}
		else if(days[i].dayName=="Thursday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.thursday=days[i].items;
			}else{
				_dayTimetable.thursday=[];
			}
			
		}
		else if(days[i].dayName=="Friday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.friday=days[i].items;
			}else{
				_dayTimetable.friday=[];
			}
			
		}
		else if(days[i].dayName=="Saturday"){
			if(days[i].items[0].subjectId>0){
				_dayTimetable.saturday=days[i].items;
			}else{
				_dayTimetable.saturday=[];
			}
			
		}
		else {
			if(days[i].items[0].subjectId>0){
				_dayTimetable.sunday=days[i].items;
			}else{
				_dayTimetable.sunday=[];
			}
		}

		}
  _classTimetable.timeTable =_dayTimetable;
// console.log(timeTableArr)
		// _classTimetable.timeTable =timeTableArr.toString;

		return _classTimetable;
	}

	setTimetableData(data) {
		// roomNo: "1001"
		// staffId: 1
		// subjectId: 1
		// subjectName: ""
		// timeFrom: "11:30 AM"
		// timeTo: "12:00 PM"
	}


	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.classTimetableForm.controls;
		/** check form */
		if (this.classTimetableForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedclassTimetable = this.prepareclassTimetable();
		if (editedclassTimetable.id > 0) {
			this.updateClassTimetable(editedclassTimetable);
		} else {
			this.createClassTimetable(editedclassTimetable);
		}



	}

	// this.updateClassTimetable(editedclassTimetable);

	/**
	 * On Search
	 */
	onSearch() {
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

		//search api
//set data on table

	}

	/**
	 * Update classTimetable
	 *
	 * @param _classTimetable: ClassTimetableModel
	 */
	updateClassTimetable(_classTimetable: ClassTimetableModel) {
		const updateClassTimetable: Update<ClassTimetableModel> = {
			id: _classTimetable.id,
			changes: _classTimetable
		};
		this.store.dispatch(new ClassTimetableUpdated({
			partialClassTimetable: updateClassTimetable,
			classTimetable: _classTimetable
		}));



		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _classTimetable, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _classTimetable, isEdit: true }
	}

	/**
	 * Create classTimetable
	 *
	 * @param _classTimetable: ClassTimetableModel
	 */
	createClassTimetable(_classTimetable: ClassTimetableModel) {
		this.store.dispatch(new ClassTimetableOnServerCreated({ classTimetable: _classTimetable }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedClassTimetableId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _classTimetable, isEdit: false });
		});


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
}

