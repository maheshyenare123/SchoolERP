import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-online-fees-collection-report',
  templateUrl: './online-fees-collection-report.component.html',
  styleUrls: ['./online-fees-collection-report.component.scss']
})
export class OnlineFeesCollectionReportComponent implements OnInit {
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  feesStatement() {
		this.router.navigate(["/report/fees-statement"])
  }
  
  balanceFeesReport() {
		this.router.navigate(["/report/balance-fees-report"])
  }

  feesCollectionReport() {
		this.router.navigate(["/report/fees-collection-report"])
  }

  onlineFeesCollectionReport() {
		this.router.navigate(["/report/online-fees-collection-report"])
  }

  incomeReport() {
		this.router.navigate(["/report/income-report"])
  }

  expenseReport() {
		this.router.navigate(["/report/expense-report"])
  }

  payrollReport() {
		this.router.navigate(["/report/payroll-report"])
  }

  incomeGroupReport() {
		this.router.navigate(["/report/income-group-report"])
  }

  expenseGroupReport() {
		this.router.navigate(["/report/expense-group-report"])
  }

}

