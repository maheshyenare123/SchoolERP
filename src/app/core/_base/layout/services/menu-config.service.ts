// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';

@Injectable()
export class MenuConfigService {
  // Public properties
  onConfigUpdated$: Subject<any>;
  // Private properties
  private menuConfig: any;

  /**
   * Service Constructor
   */
  constructor() {
    // register on config changed event and set default config
    this.onConfigUpdated$ = new Subject();
  }

  /**
   * Returns the menuConfig
   */
  getMenus() {
    return this.menuConfig;
  }

  /**
   * Load config
   *
   * @param config: any
   */
  loadConfigs(config: any) {
    const menus = {
      "aside": {
          "self": {},
          "items": [
            {

              title: "Dashboard",
              root: "true",
              icon: "flaticon2-architecture-and-city",
              page: "/dashboard",
              translate: "MENU.DASHBOARD",
              bullet: "dot"
            } ,{
              title: 'Front Office',
              bullet: 'dot',
              icon: 'flaticon-interface-7',
              submenu: [
                {
                  
                  title: 'Admission Enquiry',
                  page: '/front-office/admissionenqury'
                },
                {
                  title: 'Visitor Book',
                  page: '/front-office/visitorbook'
                },
                {
                  title: 'Phone Call Log',
                  page: '/front-office/phonecalllog'
                },
                {
                  title: 'Postal Dispatch',
                  page: '/front-office/postaldispatch'
                },{
                  title: 'Postal Receive',
                  page: '/front-office/postalreceive'
                },
                
                {
                  title: 'Complain',
                  page: '/front-office/complain'
                },
                {
                  title: 'Setup Front Office ',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Purpose',
                      page: '/front-office/setup-front-office/purpose',
                      // permission: 'accessToECommerceModule'
                    },
                    {
                      title: 'Complain Type',
                      page: '/front-office/setup-front-office/complaintype',
                    },
                    {
                      title: 'Source',
                      page: '/front-office/setup-front-office/source',
                    },
                    {
                      title: 'Reference',
                      page: '/front-office/setup-front-office/reference',
                    },
                    
                  ]
                },
                
              ]
            },
          
          ]
          // { "type2" : [{"name":"image"},{"name":"img2"},{"name":"img3"},{"name":"img4"}]} ,
          // { "type3" : [{"name":"mp3"}]}
        }
}
    

    this.menuConfig = menus;

    // this.menuConfig = config;
    console.log(this.menuConfig);



    this.onConfigUpdated$.next(this.menuConfig);





  }




}
