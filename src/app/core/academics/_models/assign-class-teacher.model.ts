import { SectionModel } from './section.model';
import { StaffDtoModel } from './staffDto.model';
export class AssignClassTeacherModel {
    id : number;
    classId: number;
    className: string;
    sections: SectionModel;
    staffs: StaffDtoModel[]=[];


    clear() {
        this.id = 0;
        this.classId = 0;
        this.className = ';'
        this.sections = new SectionModel;
        // this.staffs =new StaffDtoModel;
    }
}