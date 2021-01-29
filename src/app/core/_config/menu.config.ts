export class MenuConfig {
  public defaults: any = {
    // header: {
    //   // self: {},
    //   // items: [
    //   //   {
    //   //     title: 'Dashboards',
    //   //     root: true,
    //   //     alignment: 'left',
    //   //     page: '/dashboard',
    //   //     translate: 'MENU.DASHBOARD',
    //   //   },
    //     // {
    //     //   title: 'Front Office',
    //     //   bullet: 'dot',
    //     //   icon: 'flaticon-interface-7',
    //     //   submenu: [
    //     //     {
    //     //       title: 'Admission Enquiry',
    //     //       page: '/frontoffice/admissionenqury'
    //     //     },
    //     //     {
    //     //       title: 'Visitor Book',
    //     //       page: '/frontoffice/visitorbook'
    //     //     },
    //     //     {
    //     //       title: 'Phone Call Log',
    //     //       page: '/frontoffice/phonecalllog'
    //     //     },
    //     //     {
    //     //       title: 'Postal Dispatch',
    //     //       page: '/frontoffice/postaldispatch'
    //     //     },
    //     //     {
    //     //       title: 'Complain',
    //     //       page: '/frontoffice/complain'
    //     //     },
    //     //     {
    //     //       title: 'Setup Front Office ',
    //     //       bullet: 'dot',
    //     //       submenu: [
    //     //         {
    //     //           title: 'Purpose',
    //     //           page: '/frontoffice/setup-front-office/purpose',
    //     //           // permission: 'accessToECommerceModule'
    //     //         },
    //     //         {
    //     //           title: 'Complain Type',
    //     //           page: '/frontoffice/setup-front-office/complaintype',
    //     //         },
    //     //         {
    //     //           title: 'Source',
    //     //           page: '/frontoffice/setup-front-office/source',
    //     //         },
    //     //         {
    //     //           title: 'Reference',
    //     //           page: '/frontoffice/setup-front-office/reference',
    //     //         },
                
    //     //       ]
    //     //     },
            
    //     //   ]
    //     // },
       
       
       
       
    //   ]
    // },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
      
        {
          title: 'Front Office',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            {
              title: 'Admission Enquiry',
              page: '/front_office/admissionenqury'
            },
            {
              title: 'Visitor Book',
              page: '/front_office/visitorbook'
            },
            {
              title: 'Phone Call Log',
              page: '/front_office/phonecalllog'
            },
            {
              title: 'Postal Dispatch',
              page: '/front_office/postaldispatch'
            },{
              title: 'Postal Receive',
              page: '/front_office/postalreceive'
            },
            
            {
              title: 'Complain',
              page: '/front_office/complain'
            },
            {
              title: 'Setup Front Office ',
              bullet: 'dot',
              submenu: [
                {
                  title: 'Purpose',
                  page: '/front_office/setup_front_office/purpose',
                  // permission: 'accessToECommerceModule'
                },
                {
                  title: 'Complain Type',
                  page: '/front_office/setup_front_office/complaintype',
                },
                {
                  title: 'Source',
                  page: '/front_office/setup_front_office/source',
                },
                {
                  title: 'Reference',
                  page: '/front_office/setup_front_office/reference',
                },
                
              ]
            },
            
          ]
        },
        {
          title: 'Student Information',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            {
              title: 'Student Details ',
              page: '/student_information/student_details'
            },
            {
              title: 'Student Admission',
              page: '/student_information/student_edit/:id'
            },
            // {
            //   title: 'Online Admission',
            //   page: '/student-information/online-admission'
            // },
            // {
            //   title: 'Disabled Student',
            //   page: '/student-information/disabled-student'
            // },
            // {
            //   title: 'Bulk Delete',
            //   page: '/student-information/bulk-delete'
            // },
            {
              title: 'Student Categories',
              page: '/student_information/student_categories'
            },
            {
              title: 'Student House',
              page: '/student_information/student_house'
            },
            {
              title: 'Disable Reason',
              page: '/student_information/disable_reason'
            },
           
            
          ]
        },
        {
          title: 'Academics',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Class Timetable',
              page: '/academics/class_timetable'
            },

            {
              title: 'Teacher Timetable',
              page: '/academics/teacher_timetable'
            },
            {
              title: 'Assign Class Teacher',
              page: '/academics/assign_class_teacher'
            },
            
            {
              title: 'Class',
              page: '/academics/class'
            },
            {
              title: 'Section',
              page: '/academics/section'
            },
            {
              title: 'Subject',
              page: '/academics/subject'
            },
            {
              title: 'Subject Group',
              page: '/academics/subject_group'
            },
            
          ]
        },
        {
          title: 'Attendance',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Student Attendance',
              page: '/attendance/student_attendance'
            },
            {
              title: 'Attendance By Date',
              page: '/attendance/attendance_by_date'
            },
            {
              title: 'Approve Leave',
              page: '/attendance/approve_leave'
            },
            
          ]
        },

        {
          title: 'HomeWork',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Homework',
              page: '/homework/homework_list'
            },
            
          ]
        },

        {
          title: 'Library',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Book List',
              page: '/library/book_list'
            },
            {
              title: 'Issue Return',
              page: '/library/library_member_list'
            },
            {
              title: 'Library Student Member',
              page: '/library/library_student_member'
            },
            {
              title: 'Library Staff Member',
              page: '/library/library_staff_member'
            },
            

            
          ]
        },

        
        {
          title: 'Human Resource',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
           
            {
              title: 'Add Staff',
              page: '/human_resource/staff'
            },
            {
              title: 'Staff Directory',
              page: '/human_resource/staff_directory'
            },
            {
              title: 'Staff Attendance',
              page: '/human_resource/staff_attendance'
            },
            {
              title: 'Apply Leave',
              page: '/human_resource/apply_leave'
            },
            {
              title: 'Approve Leave Request',
              page: '/human_resource/approve_leave_request'
            },
            
            {
              title: 'Leave Type',
              page: '/human_resource/leave_type'
            },
            {
              title: 'Department',
              page: '/human_resource/department'
            },
            {
              title: 'Designation',
              page: '/human_resource/designation'
            },
            {
              title: 'Payroll',
              page: '/human_resource/payroll'
            },
            
            // {
            //   title: 'Disabled Staff',
            //   page: '/human_resource/disabled_staff'
            // },
            // {
            //   title: 'Staff Rating',
            //   page: '/human_resource/staff_rating'
            // },

            
            
          ]
        },
        
        {
          title: 'Fees Collection',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Fees Type',
              page: '/fees_collection/fees_type'
            },
            {
              title: 'Fees Group',
              page: '/fees_collection/fees_group'
            },
            {
              title: 'Fees Discount',
              page: '/fees_collection/fees_discount'
            },
 
            {
              title: 'Fees Master',
              page: '/fees_collection/fees_master'
            },
            
            {
              title: 'Fees Collect',
              page: '/fees_collection/fees_collect'
            },

            {
              title: 'Search Fees Payment',
              page: '/fees_collection/search_fees_payment'
            },

            {
              title: 'Search Due Fees',
              page: '/fees_collection/search_due_fees'
            },
            {
              title: 'Fees Reminder',
              page: '/fees_collection/fees_reminder'
            },
            
          ]
        },
        

        {
          title: 'Income',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Add Income',
              page: '/income/add_income'
            },
            {
              title: 'Search Income',
              page: '/income/search_income'
            },
            {
              title: 'Income Head',
              page: '/income/income_head'
            },
            
          ]
        },

        {
          title: 'Expense',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Add Expense',
              page: '/expense/add_expense'
            },
            {
              title: 'Search Expense',
              page: '/expense/search_expense'
            },
            {
              title: 'Expense Head',
              page: '/expense/expense_head'
            },
            
          ]
        },
        

        {
          title: 'Transport',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Routes',
              page: '/transport/routes'
            },
            {
              title: 'Vehicles',
              page: '/transport/vehicles'
            },
            {
              title: 'Assign Vehicle',
              page: '/transport/assign_vehicle'
            },
            
          ]
        },
        

        {
          title: 'Hostel',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Hostel',
              page: '/hostel/hostel'
            },
            {
              title: 'Room Type',
              page: '/hostel/room_type'
            },
            {
              title: 'Hostel Room',
              page: '/hostel/hostel_room'
            },
            
          ]
        },

        {
          title: 'Inventory',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Item Category',
              page: '/inventory/item_category'
            },
            {
              title: 'Add Item',
              page: '/inventory/add_item'
            },
            {
              title: 'Item Store',
              page: '/inventory/item_store'
            },
            {
              title: 'Item Supplier',
              page: '/inventory/item_supplier'
            },
            {
              title: 'Item Stock',
              page: '/inventory/item_stock'
            },
            {
              title: 'Item Issue',
              page: '/inventory/item_issue'
            },
            
          ]
        },

        {
          title: 'Examination',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            
            {
              title: 'Exam Group',
              page: '/examination/exam_group'
            },
            // {
            //   title: 'Exam',
            //   page: '/examination/exam/:id'
            // },
            {
              title: 'Exam Schedule',
              page: '/examination/exam_schedule'
            },  
            {
              title: 'Exam Subject Marks',
              page: '/examination/exam_subject_marks/:examId/:examSubjectId/:examGroupId'
            },
            // {
            //   title: 'Exam Result',
            //   page: '/examination/exam_result'
            // },  

            
          ]
        },

        

        {
          title: 'Certificate',
          bullet: 'dot',
          icon: 'flaticon-interface-7',
          submenu: [
            {
              title: 'Certificate Design',
              page: '/certificate/certificate_design'
            },
          ]
        },



        // {
        //   title: 'Communication',
        //   bullet: 'dot',
        //   icon: 'flaticon-interface-7',
        //   submenu: [
            
        //     {
        //       title: 'Notice Board',
        //       page: '/communication/notice_board'
        //     },
        //     {
        //       title: 'Send Email',
        //       page: '/communication/send_email'
        //     },
        //     {
        //       title: 'Send Sms',
        //       page: '/communication/send_sms'
        //     },  
        //     {
        //       title: 'Email Sms Log',
        //       page: '/communication/email_sms_log'
        //     },  

            
        //   ]
        // },

 
        // {
        //   title: 'System Setting',
        //   bullet: 'dot',
        //   icon: 'flaticon-interface-7',
        //   submenu: [
            
        //     {
        //       title: 'Roles Permissions',
        //       page: '/system_setting/roles'
        //     },
        //     {
        //       title: 'Session Setting',
        //       page: '/system_setting/sessions'
        //     },
        //     {
        //       title: 'Email Setting',
        //       page: '/system_setting/email_setting'
        //     },  
        //     {
        //       title: 'Sms Setting',
        //       page: '/system_setting/sms_setting'
        //     },
        //     {
        //       title: 'Backup Restore',
        //       page: '/system_setting/backup_restore'
        //     },  
        //     {
        //       title: 'Notification Setting',
        //       page: '/system_setting/notification_setting'
        //     },  
        //     {
        //       title: 'Users',
        //       page: '/system_setting/users'
        //     }, 
        //   ]
        // },



        // {
        //   title: 'Report',
        //   bullet: 'dot',
        //   icon: 'flaticon-interface-7',
        //   submenu: [
            
        //     {
        //       title: 'Student Information',
        //       page: '/report/student_information'
        //     },
        //     {
        //       title: 'Finance',
        //       page: '/report/finance'
        //     },

            
            
        //     {
        //       title: 'Human Resource',
        //       page: '/report/human_resource_report'
        //     },

        //     {
        //       title: 'Library',
        //       page: '/report/library_report'
        //     },

        //     {
        //       title: 'Inventory',
        //       page: '/report/inventory_report'
        //     },

        //     {
        //       title: 'Transport',
        //       page: '/report/transport_report'
        //     },
        //     {
        //       title: 'Hostel',
        //       page: '/report/hostel_report'
        //     },
            
        //   ]
        // },
       
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
