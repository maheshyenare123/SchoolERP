import { TimetableModel } from './timetable.model';
export class ClassTimetableModel {
    id : number;
    classId: number;
    sectionId: number;
    subjectGroupId: number;
    day: string;
    timeTable: TimetableModel;


    clear() {
        this.id = 0;
        this.classId = 0;
        this.sectionId = 0;
        this.subjectGroupId = 0;
        this.day = '';
        this.timeTable = new TimetableModel;
    }
}