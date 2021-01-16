/** Angular */
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicSetActionsService {
  /**
   * Convert number to string and adding '0' before
   *
   * @param value: number
   */
  getPermissionsForActions(pathname: string) {


    const menuItems: any = JSON.parse(localStorage.getItem("sideMenusConfig"));

    //   var url;
    //   this.activatedRoute.url.subscribe(activeUrl =>{
    //     url=window.location.pathname;
    //   });
    // /student_information/student
    //  var data:any[]=url.split("/");
   if(menuItems!=null){
    let obj = menuItems.find(ele => ele.shortCode === pathname.split("/")[1]);
    // console.log(obj);
    if (!obj === undefined) {
      if (obj.submenu.length > 0) {
        let obj1 = obj.submenu.find(ele => ele.shortCode === pathname.split("/")[2]);
        return obj1;
        // console.log(obj1);
      } else {
        return obj;

      }
    }
    }


    // console.log(obj);

  }


  // if (this.isNumber(value)) {
  //   return `0${value}`.slice(-2);
  // } else {
  //   return '';
  // }

}