import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { SectionDtoModel, SectionModel, StudentClassModel, StudentClassService } from 'src/app/core/academics';
import { RolesDtoModel } from 'src/app/core/Models/rolesDto.model';
import { AppState } from 'src/app/core/reducers';
import { RoleService } from 'src/app/core/role_permission';

@Component({
  selector: 'kt-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  // Public properties
  //  noticeboard: NoticeBoardModel;
  sendEmailForm: FormGroup;
  hasFormErrors = false;
  viewLoading = false;

  ckeConfig: any;

  roleCheckBoxList: RoleCheckBox[] = [];
  rolesList: RolesDtoModel[] = [];

  classList: StudentClassModel[] = [];
  sectionList: SectionDtoModel[] = [];
  sectionCheckBoxList: SectionCheckBox[] = [];
  constructor(private fb: FormBuilder,
		private store: Store<AppState>,	private roleService:RoleService,
		private studentClassService:StudentClassService) { }

  ngOnInit(): void {

    this.createForm();
    this.ckEditorConfig();
    this.loadAllRoles();
    this.loadAllClasses();
  }

  ckEditorConfig() {
    this.ckeConfig = {
      height: 50,
      enterMode: 2,
      allowedContent: true,
      forcePasteAsPlainText: true,

      font_names: 'Arial;Comic Sans Ms;Times New Roman;Verdana;Tahoma',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        // '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        // { name: 'links', groups: ['links'] },
        // { name: 'insert', groups: ['insert'] },
        // '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] },

      ],


      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };

    this.ckeConfig.extraPlugins = 'autogrow';
    this.ckeConfig.autoGrow_minHeight = 250;
    this.ckeConfig.autoGrow_maxHeight = 600;
  }


	loadAllRoles() {
		debugger
		this.roleService.getAllRoles().subscribe(res => {
		  const data = res['data'];
		  this.rolesList = data['content'];
		  console.log(this.rolesList)
		  this.setRoleDataInChecboxList();
		}, err => {
		});

    }
    setRoleDataInChecboxList(){
      this.rolesList.forEach(element => {
      
        this.roleCheckBoxList.push({ 'data':	new RolesDtoModel(element.id,element.name), 'isChecked': false })
        console.log(this.roleCheckBoxList)
      })
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
onClassSelectChange(classId){
	this.loadAllSectionsByClassId(classId);


}
loadAllSectionsByClassId(id:number) {
  debugger
  this.studentClassService.getAllSectionByClasssId(id).subscribe(res => {
  
    this.sectionList = res['data'];
    console.log(this.sectionList)
    this.setSectionDataInChecboxList();
  }, err => {
  });
}
setSectionDataInChecboxList(){
	this.sectionCheckBoxList=[];
	this.sectionList.forEach(element => {
		this.sectionCheckBoxList.push({ 'data':new SectionModel(element.id,element.section,element.id), 'isChecked': false })
	})
	
}

  createForm() {
    this.sendEmailForm = this.fb.group({
      title: ["", Validators.required],
      message: ["", Validators.required],
      messageTo: ["", Validators.required],
      classId:[""],
      isActive: ["", ''],
    });
  }

  isControlInvalid(controlName: string): boolean {
		const control = this.sendEmailForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
  }
  
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		console.log('tabChangeEvent => ', tabChangeEvent);
		console.log(tabChangeEvent.tab.textLabel);
    // console.log('index => ', tabChangeEvent.index);
    
    // if(tabChangeEvent.tab.textLabel == 'Student'){
    //   this.getAllStudentList('ROLE_STUDENT');
    // }
    // if(tabChangeEvent.tab.textLabel == 'Parent'){
    //   this.getAllStaff('ROLE_PARENT')
    // }
    // if(tabChangeEvent.tab.textLabel == 'Staff'){
    //   this.getAllStaff('ROLE_STAFF')
    // }
	}



  // preparenoticeboard(): NoticeBoardModel {
	// 	const controls = this.noticeboardForm.controls;
	// 	const _noticeboard = new NoticeBoardModel();
	// 	_noticeboard.id = this.noticeboard.id;

	// 	_noticeboard.title = controls.title.value;
	// 	_noticeboard.message = controls.message.value;
	// 	_noticeboard.messageTo = controls.messageTo.value;

	// 	const _noticeDate = controls.noticeDate.value;
	// 	if (_noticeDate) {
	// 		_noticeboard.noticeDate = this.typesUtilsService.dateFormat(_noticeDate);
	// 	} else {
	// 		_noticeboard.noticeDate = '';
	// 	}
	// 	const _publishOn = controls.publishOn.value;
	// 	if (_publishOn) {
	// 		_noticeboard.publishOn = this.typesUtilsService.dateFormat(_publishOn);
	// 	} else {
	// 		_noticeboard.publishOn = '';
	// 	}

	// 	_noticeboard.isActive='yes'


	

	// 	const roleData: RolesDtoModel[] = [];
	// 	this.roleCheckBoxList.forEach(element => {
	// 		if (element.isChecked) {
	// 			roleData.push(element.data);
	// 		}
	// 	})

	// 	return _noticeboard;
	// }
  onSubmit() {
  }
  onCancel(){

  }
  onAddBtn(){
    
  }
	// onSubmit() {
	// 	this.hasFormErrors = false;
	// 	const controls = this.noticeboardForm.controls;
	// 	/** check form */
	// 	if (this.noticeboardForm.invalid) {
	// 		Object.keys(controls).forEach(controlName =>
	// 			controls[controlName].markAsTouched()
	// 		);

	// 		this.hasFormErrors = true;
	// 		return;
	// 	}

	// 	const editednoticeboard = this.preparenoticeboard();
	// 	if (editednoticeboard.id > 0) {
	// 		this.updateNoticeBoard(editednoticeboard);
	// 	} else {
	// 		this.createNoticeBoard(editednoticeboard);
	// 	}
	// 	this.roleCheckBoxList = [];

		
	// }

	// /**
	//  * Update noticeboard
	//  *
	//  * @param _noticeboard: NoticeBoardModel
	//  */
	// updateNoticeBoard(_noticeboard: NoticeBoardModel) {
	// 	const updateNoticeBoard: Update<NoticeBoardModel> = {
	// 		id: _noticeboard.id,
	// 		changes: _noticeboard
	// 	};
	// 	this.store.dispatch(new NoticeBoardUpdated({
	// 		partialNoticeBoard: updateNoticeBoard,
	// 		noticeBoard: _noticeboard
	// 	}));

		

	// 	// Remove this line
	// 	of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _noticeboard, isEdit: true }));
	// 	// Uncomment this line
	// 	// this.dialogRef.close({ _noticeboard, isEdit: true }
	// }

	// /**
	//  * Create noticeboard
	//  *
	//  * @param _noticeboard: NoticeBoardModel
	//  */
	// createNoticeBoard(_noticeboard: NoticeBoardModel) {
	// 	this.store.dispatch(new NoticeBoardOnServerCreated({ noticeBoard: _noticeboard }));
	// 	this.componentSubscriptions = this.store.pipe(
	// 		select(selectLastCreatedNoticeBoardId),
	// 		delay(1000), // Remove this line
	// 	).subscribe(res => {
	// 		if (!res) {
	// 			return;
	// 		}

	// 		this.dialogRef.close({ _noticeboard, isEdit: false });
	// 	});

		
	// }

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



  onChangeMessage($event: any): void {

    console.log("onChange");

    // this.adminChallangeForm.get('description').value
    // console.log("CK Tag=" + this.adminChallangeForm.get('description').value);
    // let a = this.adminChallangeForm.get('description').value;

    // let d = document.createElement('div');
    // d.innerHTML = a;
    // console.log(d.innerText);
    // //set
    // this.adminChallangeForm.get('sponserDescription').setValue(d.innerText);

  }

  onPasteMessage($event: any): void {

    console.log("onPaste" + $event.data.dataValue);
    //this.log += new Date() + "<br />";
  }

}
export class RoleCheckBox {
	data:RolesDtoModel;
	isChecked:boolean;
  }
  export class SectionCheckBox {
    data:SectionModel;
    isChecked:boolean;
    }