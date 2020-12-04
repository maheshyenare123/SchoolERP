// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuAsideService {
  // Public properties
  menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * Service constructor
   *
   * @param menuConfigService: MenuConfigService
   */
  constructor(private menuConfigService: MenuConfigService) {
    this.loadMenu();
  }

  /**
   * Load menu list
   */
  loadMenu() {
    // get menu list
    // const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
    const menuItems: any =JSON.parse(localStorage.getItem("sideMenusConfig"));
//  const menuItems: any =   [
//    {"id":1,
//    "name":'Student Information',
//   //  "shortCode":"/student_information/student",
//    "systems":1,
//    "isActive":"yes",
//    "permissionCategories":[
//      {"id":1,
//      "enableAdd":1,
//      "enableDelete":1,
//      "enableEdit":1,
//      "enableView":1,
//      "name":"Student",
//      "shortCode":"/student_information/student"
//     },
//      {"id":2,"enableAdd":0,"enableDelete":0,"enableEdit":0,"enableView":1,"name":"Import Student","shortCode":"/student_information/import_student"},
//      {"id":3,"enableAdd":1,"enableDelete":1,"enableEdit":1,"enableView":1,"name":"Student Categories","shortCode":"/student_information/student_categories"},
//      {"id":4,"enableAdd":1,"enableDelete":1,"enableEdit":1,"enableView":1,"name":"Student Houses","shortCode":"/student_information/student_houses"},
//      {"id":83,"enableAdd":0,"enableDelete":0,"enableEdit":0,"enableView":1,"name":"Disable Student","shortCode":"/student_information/disable_student"},
//      {"id":99,"enableAdd":1,"enableDelete":1,"enableEdit":0,"enableView":0,"name":"Student Timeline","shortCode":"/student_information/student_timeline"},
//      {"id":103,"enableAdd":1,"enableDelete":1,"enableEdit":1,"enableView":1,"name":"Disable Reason","shortCode":"/student_information/disable_reason"}
//     ]}
//     ]
    this.menuList$.next(menuItems);
  }
}
