import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  feesStatement() {
		this.router.navigate(["/report/fees_statement"])
  }
  
  balanceFeesReport() {
		this.router.navigate(["/report/balance_fees_report"])
  }

  feesCollectionReport() {
		this.router.navigate(["/report/fees_collection_report"])
  }

  onlineFeesCollectionReport() {
		this.router.navigate(["/report/online_fees_collection_report"])
  }

  incomeReport() {
		this.router.navigate(["/report/income_report"])
  }

  expenseReport() {
		this.router.navigate(["/report/expense_report"])
  }

  payrollReport() {
		this.router.navigate(["/report/payroll_report"])
  }

  incomeGroupReport() {
		this.router.navigate(["/report/income_group_report"])
  }

  expenseGroupReport() {
		this.router.navigate(["/report/expense_group_report"])
  }

}
