import { TimetableModel, TimetableDayModel } from './timetable.model';
export class ClassTimetableModel {
    id : number;
    classId: number;
    // classes:string;
    sectionId: number;
    // section:string;
    subjectGroupId: number;
    // day: string;
    timeTable: TimetableDayModel;
    isActive: string;
    // roomNo:string;
    // staffId:number;
    // subjectGroupSubjectId:number;
    // subjectId:number;
    // subjectName:string;
    // timeFrom:string;
    // timeTo:string;
   

    clear() {
        this.id = 0;
        this.classId = 0;
        // this.classes= '';
        this.sectionId = 0;
        // this.section= '';
        this.subjectGroupId = 0;
        // this.day = '';
        this.isActive= '';
        // this.roomNo= '';
        // this.staffId=0;
        // this.subjectGroupSubjectId=0;
        // this.subjectId=0;
        // this.subjectName= '';
        // this.timeFrom= '';
        // this.timeTo= '';

        this.timeTable = new TimetableDayModel();


    }
}