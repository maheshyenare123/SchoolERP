export class StudentLoginCredentialModel {

    id: number;
    admissionNo: string;
    isActive: string;
    firstname: string;
    lastname: string;
    userName: string;
    password: string;
    parentUserName: string;
    parentPassword: string;


    clear() {
        this.id = 0;
        this.admissionNo = '';
        this.isActive = '';
        this.firstname = '';
        this.lastname = '';
        this.userName = '';
        this.password = '';
        this.parentUserName = '';
        this.parentPassword = '';
    }
}