import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesCollectStudentComponent } from './fees-collect-student.component';

describe('FeesCollectStudentComponent', () => {
  let component: FeesCollectStudentComponent;
  let fixture: ComponentFixture<FeesCollectStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesCollectStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesCollectStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
