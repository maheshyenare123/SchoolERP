import { BaseModel } from '../../_base/crud';

export class Role extends BaseModel {
  id: number;
  title: string;
  permissions: number[];
  isCoreRole = false;

  clear(): void {
    this.id = undefined;
    this.title = '';
    this.permissions = [];
    this.isCoreRole = false;
  }

//dyanamic role using backend
  // id: number;
  // title: string;	
  //   isActive: string;
  //   isSuperadmin: number;	  
  // isSystem: number;
  // name: string;
  // roleName: string;
  // slug: string;


  // clear(): void {	  
  //   this.id = undefined;	      
  //   this.title = '';	      
  //   this.isActive = '';
  //     this.isSuperadmin = 0; 
  //      this.isSystem = 0;
  //     this.name = '';
  //     this.roleName = '';
  //     this.slug = '';
  // }	  
  
}
