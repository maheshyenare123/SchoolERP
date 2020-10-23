
import { StaffDtoModel } from './staffDto.model';
import { SectionDtoModel } from './sectionDto.model';

export class AssignClassTeacherModel {
    id : number;
    classId: number;
    className: string;
    sections: SectionDtoModel;
    staffs: StaffDtoModel[]=[];


    clear() {
        this.id = 0;
        this.classId = 0;
        this.className = ';'
        this.sections = new SectionDtoModel;
        // this.staffs =new StaffDtoModel;
    }
}