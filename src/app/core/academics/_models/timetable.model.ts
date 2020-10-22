export class TimetableModel {
    subjectId: number;
    subjectName: string;
    staffId: number;
    staffName: string;
    timeFrom: string;
    timeTo: string;
    roomNo: string;


    clear() {
        this.subjectId = 0;
        this.subjectName = '';
        this.staffId = 0;
        this.staffName = '';
        this.timeFrom = '';
        this.timeTo = '';
        this.roomNo = '';
    }
}