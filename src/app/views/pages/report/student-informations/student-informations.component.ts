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


  studentReportsData=['Student Report','Guardian Report','Student History','Student Login Credential','Class Subject Report','Admission Report' ,'Sibling Report','Student Profile','Homework Evaluation Report']

 
 

  ngOnInit(): void {
  }

  studentReport() {
		this.router.navigate(["/report/student_report"])
  }
  
  guardianReport() {
		this.router.navigate(["/report/guardian_report"])
  }

  studentHistory() {
		this.router.navigate(["/report/student_history"])
  }

  studentLoginCredential() {
		this.router.navigate(["/report/student_login_credential"])
  }

  classSubjectReport() {
		this.router.navigate(["/report/class_subject_report"])
  }

  admissionReport() {
		this.router.navigate(["/report/admission_report"])
  }

  siblingReport() {
		this.router.navigate(["/report/sibling_report"])
  }

  studentProfile() {
		this.router.navigate(["/report/student_profile"])
  }

  homeworkEvaluationReport() {
		this.router.navigate(["/report/homework_evaluation_report"])
  }

}
