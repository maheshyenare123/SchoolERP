import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-student-information',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.scss']
})
export class StudentInformationsComponent implements OnInit {

  constructor(private router: Router,) { }

  @Input() tabName: string;


  studentReportsData = [

    {
      tabName: 'Student Report',
      path: '/report/student_report'
    },
    {
      tabName: 'Guardian Report',
      path: '/report/guardian_report'
    },
    {
      tabName: 'Student History',
      path: '/report/student_history'
    },
    {
      tabName: 'Student Login Credential',
      path: '/report/student_login_credential'
    },
    {
      tabName: 'Class Subject Report',
      path: '/report/class_subject_report'
    },
    {
      tabName: 'Admission Report',
      path: '/report/admission_report'
    },
    {
      tabName: 'Sibling Report',
      path: '/report/sibling_report'
    },
    {
      tabName: 'Student Profile',
      path: '/report/student_profile'
    },
    {
      tabName: 'Homework Evaluation Report',
      path: '/report/homework_evaluation_report'
    },

  ]

  selectedItem = 'Student Report';


  ngOnInit(): void {
    this.selectedItem = this.tabName;
  }

  
  listClick(tabName, path) {
    console.log(tabName);
    this.selectedItem = tabName;  //
    this.router.navigate([path])
  }
}
