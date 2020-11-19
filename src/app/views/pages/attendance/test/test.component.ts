import { Component, OnInit } from '@angular/core';
import { StudentAttendenceService } from 'src/app/core/attendance/_services/student-attendance.service';
import { QueryParamsModel } from 'src/app/core/_base/crud';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];
@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = ELEMENT_DATA;
  constructor(private attendanceService: StudentAttendenceService) { }

  ngOnInit(): void {
  }


  onSaveAttendance() {
    console.log(this.dataSource);
  }

  getAllStudentAttendanceList() {

    const queryParams = new QueryParamsModel( 'id', 'asc', 'yes', 0,10 );

    this.attendanceService.findStudentAttendences(queryParams, 1, 1, '2020-11-19').subscribe(res => {
      console.log(res);
      // studentAttendencesResult

    })

  }



}
