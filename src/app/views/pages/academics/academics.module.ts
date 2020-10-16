import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicsComponent } from './academics.component';

import { ClassTimetableComponent } from './class-timetable/class-timetable.component';
import { TeacherTimetableComponent } from './teacher-timetable/teacher-timetable.component';
import { SubjectComponent } from './subject/subject.component';
import { SectionComponent} from './section/section.component';
import { ClassComponent} from './class/class.component';
import { AssignClassTeacherComponent } from './assign-class-teacher/assign-class-teacher.component';
import { PromoteStudentComponent } from './promote-student/promote-student.component';
import { SubjectGroupComponent } from './subject-group/subject-group.component';



@NgModule({
  declarations: [
    AcademicsComponent,
    ClassTimetableComponent,
    TeacherTimetableComponent,
    SubjectComponent,
    SectionComponent,
    ClassComponent,
    AssignClassTeacherComponent,
    PromoteStudentComponent,
    SubjectGroupComponent,


  ],
  imports: [
    CommonModule
  ]
})
export class AcademicsModule { }
