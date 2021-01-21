import { Constants } from "../../api_url";

export class ApproveLeaveDtoModel {

    applyDate: string;
    approveBy: number;
   
    docs: string;
    fromDate: string;
    id: number;
    isActive: string;
    reason: string;
    requestType: number;
    status: number;
    studentSessionId: number;
    toDate: string;


    approveOrRejectReason: string;
    classes: string;
    leaveType: string;
    leaveTypeId: number;
    section: string;
    staff: string;
    studentName: string;

	
    classesId: number;
    sectionId: number;
    studentId: number;

    clear() {
        this.applyDate = '';
        this.approveBy = 0;
       
        this.docs = '';
        this.fromDate = '';
        this.id = 0;
        this.isActive = '';
        this.reason = '';
        this.requestType = 0;
        this.status = Constants.StudentLeaveStatus.Pending;
        this.studentSessionId = 0;
        this.toDate = '';


        this.approveOrRejectReason = '';
        this.classes = '';
        this.leaveType = '';
        this.leaveTypeId = 0;
        this.section = '';
        this.staff = '';

        this.studentName='';
        this.classesId = 0;
        this.sectionId = 0;
        this.studentId = 0;

    }
}