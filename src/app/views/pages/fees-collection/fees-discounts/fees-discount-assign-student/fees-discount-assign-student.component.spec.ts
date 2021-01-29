import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesDiscountAssignStudentComponent } from './fees-discount-assign-student.component';

describe('FeesDiscountAssignStudentComponent', () => {
  let component: FeesDiscountAssignStudentComponent;
  let fixture: ComponentFixture<FeesDiscountAssignStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesDiscountAssignStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDiscountAssignStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
