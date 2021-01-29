import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesMasterAssignStudentComponent } from './fees-master-assign-student.component';

describe('FeesMasterAssignStudentComponent', () => {
  let component: FeesMasterAssignStudentComponent;
  let fixture: ComponentFixture<FeesMasterAssignStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesMasterAssignStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesMasterAssignStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
