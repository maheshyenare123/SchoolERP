// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
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
import { ClassTimetableModel, selectClassTimetablesActionLoading, ClassTimetableUpdated, ClassTimetableOnServerCreated, selectLastCreatedClassTimetableId, ClassTimetableService, StudentClassService, SectionService, AssignClassTeacherService, StudentClassModel, SectionDtoModel, SubjectGroupService, SubjectDtoModel, SubjectGroupDtoModel, SubjectService } from '../../../../../core/academics';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { StaffDtoModel } from 'src/app/core/academics/_models/staffDto.model';
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
	constructor(public dialogRef: MatDialogRef<ClassTimetableEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService,
		private classTimetableService:ClassTimetableService,
		private studentClassService: StudentClassService,
		private sectionService: SectionService,
		private assignClassTeacherService: AssignClassTeacherService,
		private subjectService: SubjectService,
		private subjectGroupService: SubjectGroupService,) {
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
loadAllSectionsByClassId(id:number) {
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

onClassSelectChange(classId){
	this.loadAllSectionsByClassId(classId);
	var classObj=this.classList.find(x => x.id === classId);
	this.searchForm.controls.classes.setValue(classObj.classses);

}
onSectionSelectChange(subjectId){		
	var sectionObj=this.sectionList.find(x => x.id === subjectId);
	this.searchForm.controls.section.setValue(sectionObj.section);

}
onSubjectSelectChange(subjectId){	
	var subjectObj=this.subjectList.find(x => x.id === subjectId);
	// this.homeworkForm.controls.subjectName.setValue(subjectObj.name);
	
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
		this.searchForm = this.fb.group({
			classId: [this.classTimetable.classId, Validators.required],
			classes:[''],
			sectionId: [this.classTimetable.sectionId, Validators.required],
			section:['',],
			subjectGroupId: [this.classTimetable.subjectGroupId, Validators.required],


		})
		this.classTimetableForm = this.fb.group({
			day: [this.classTimetable.day, Validators.required],
			items: this.fb.array([
				this.createItemRow()
			  ]),
		});
	}

	createItemRow() {
		return this.fb.group({
			subjectId: ['', Validators.required],
			subjectName: ['', ],
			staffId: ['',  Validators.required],
			timeFrom: ['',  Validators.required],
			timeTo: ['',  Validators.required],
			roomNo: ['',  Validators.required],

			
		});
	  }


	
	
	  addItemRow() {
		let itemArray = this.classTimetableForm.get('items') as FormArray;
		itemArray.push(this.createItemRow());
	  }
	
	  removeItemRow(index) {
		let itemArray = this.classTimetableForm.get('items') as FormArray;
		
		itemArray.removeAt(index);
	  }

	  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		console.log('tabChangeEvent => ', tabChangeEvent); 
		this.day =  tabChangeEvent.tab.textLabel
		console.log('index => ', tabChangeEvent.index); 
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
		_classTimetable.classes=controls1.classes.value;
		_classTimetable.sectionId = controls1.sectionId.value;
		_classTimetable.section=controls1.section.value;
		_classTimetable.subjectGroupId = controls1.subjectGroupId.value;
		_classTimetable.day =  this.day// controls.day.value;




		// _classTimetable.timeTable = controls.items.value;
	
		return _classTimetable;
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

