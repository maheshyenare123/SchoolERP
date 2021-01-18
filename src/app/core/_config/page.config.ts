export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: 'Dashboard',
        desc: 'Latest updates and statistic charts'
      },
    },

    'front_office': {
      admissionenqury: {
        page: { title: 'Admission Enquiry', desc: '' }
      },
      visitorbook: {
        page: { title: 'Visitor Book', desc: '' }
      },
      phonecalllog: {
        page: { title: 'Phone Call Log', desc: '' }
      },
      postaldispatch: {
        page: { title: 'Postal Dispatch', desc: '' }
      },
      postalreceive: {
        page: { title: 'Postal Receive', desc: '' }
      },
      
      complain: {
        page: { title: 'Complain', desc: '' }
      },

      'setup_front_office': {
        purpose: {
          page: { title: 'Purpose', desc: '' }
        },
        complaintype: {
          page: { title: 'Complain Type', desc: '' }
        },
        source: {
          page: { title: 'Source', desc: '' }
        },
        reference: {
          page: { title: 'Reference', desc: '' }
        }
      },

    },
    'student_information': {


      // student_details: {
      //   edit: {
      //     page: { title: 'Edit Student Details', desc: '' }
      //   },
      //   add: {
      //     page: { title: 'Student Details', desc: '' }
      //   }
      // },
      



      'student_details': {
        page: { title: 'Student Details', desc: '' }
      },
      'student_edit/:id': {
        page: { title: 'Student Admission', desc: '' }
      },
      // 'online-admission': {
      //   page: { title: 'Online Admission', desc: '' }
      // },
      // 'disabled-student': {
      //   page: { title: 'Disabled Student', desc: '' }
      // },
      // 'bulk-delete': {
      //   page: { title: 'Bulk Delete', desc: '' }
      // },
      'student_categories': {
        page: { title: 'Student Categories', desc: '' }
      },
      'student_house': {
        page: { title: 'Student House', desc: '' }
      },
      'disable_reason': {
        page: { title: 'Disable Reason', desc: '' }
      },
      
      
      
    },
    'academics': {
      
      'class_timetable': {
        page: { title: 'Class Timetable', desc: '' }
      },
      'teacher_timetable': {
        page: { title: 'Teacher Timetable', desc: '' }
      },
      'assign_class_teacher': {
        page: { title: 'Assign Class Teacher', desc: '' }
      },
      'class': {
        page: { title: 'Class', desc: '' }
      },
      'section': {
        page: { title: 'Section', desc: '' }
      },
      'subject': {
        page: { title: 'Subject', desc: '' }
      },
      'subject_group': {
        page: { title: 'Subject Group', desc: '' }
      },
         
    },
    'attendance': {
      'student_attendance': {
        page: { title: 'Student Attendance', desc: '' }
      },
      'attendance_by_date': {
        page: { title: 'Attendance By Date', desc: '' }
      },
      'approve_leave': {
        page: { title: 'Approve Leave', desc: '' }
      },
    },
    'homework': {
      'homework_list': {
        page: { title: 'Home Work', desc: '' }
      },
      
    },
    'library': {
      'book_list': {
        page: { title: 'Book List', desc: '' }
      },
      'library_member_list': {
        page: { title: 'Issue Return', desc: '' }
      },
      'library_student_member': {
        page: { title: 'Library Student Member', desc: '' }
      },
      'library_staff_member': {
        page: { title: 'Library Staff Member', desc: '' }
      },
    
      
    },

    'human_resource': {
      staff: {
        edit: {
          page: { title: 'Edit Staff', desc: '' }
        },
        add: {
          page: { title: 'Add Staff', desc: '' }
        }
      },
      
      // 'staff': {
      //   page: { title: 'Add Staff', desc: '' }
      // },
      'staff_directory': {
        page: { title: 'Staff Directory', desc: '' }
      },
      'staff_attendance': {
        page: { title: 'Staff Attendance', desc: '' }
      },
      'apply_leave': {
        page: { title: 'Apply Leave', desc: '' }
      },
      'approve_leave_request': {
        page: { title: 'Approve Leave Request', desc: '' }
      },
      'leave_type': {
        page: { title: 'Leave Type', desc: '' }
      },
      'department': {
        page: { title: 'Department', desc: '' }
      },
      'designation': {
        page: { title: 'Designation', desc: '' }
      },
      'payroll': {
        page: { title: 'Payroll', desc: '' }
      },
      'disabled_staff': {
        page: { title: 'Disabled Staff', desc: '' }
      },
      'staff_rating': {
        page: { title: 'Staff Rating', desc: '' }
      },
      
    },

    'fees_collection': {
      
      'fees_type': {
        page: { title: 'Fees Type', desc: '' }
      },
      'fees_group': {
        page: { title: 'Fees Group', desc: '' }
      },
      'fees_discount': {
        page: { title: 'Fees Discount', desc: '' }
      },
      'fees_master': {
        page: { title: 'Fees Master', desc: '' }
      },
      'fees_collect': {
        page: { title: 'Fees Collect', desc: '' }
      },
      'search_fees_payment': {
        page: { title: 'Search Fees Payment', desc: '' }
      },
      'search_due_fees': {
        page: { title: 'Search Due Fees', desc: '' }
      },
      
      
      'fees_reminder': {
        page: { title: 'Fees Reminder', desc: '' }
      },
      
    },

    'income': {
      'add_income': {
        page: { title: 'Add Income', desc: '' }
      },
      'search_income': {
        page: { title: 'Search Income', desc: '' }
      },
      'income_head': {
        page: { title: 'Income Head', desc: '' }
      },
    },

    'expense': {
      'add_expense': {
        page: { title: 'Add Expense', desc: '' }
      },
      'search_expense': {
        page: { title: 'Search Expense', desc: '' }
      },
      'expense_head': {
        page: { title: 'Expense Head', desc: '' }
      },
    },

    'transport': {
      'routes': {
        page: { title: 'Routes', desc: '' }
      },
      'vehicles': {
        page: { title: 'Vehicles', desc: '' }
      },
      'assign_vehicle': {
        page: { title: 'Assign Vehicle', desc: '' }
      },
    },


    'hostel': {
      'hostel': {
        page: { title: 'Hostel', desc: '' }
      },
      'room_type': {
        page: { title: 'Room Type', desc: '' }
      },
      'hostel_room': {
        page: { title: 'Hostel Room', desc: '' }
      },
    },
    'inventory': {
      'item_category': {
        page: { title: 'Item Category', desc: '' }
      },
      'add_item': {
        page: { title: 'Add Item', desc: '' }
      },
      'item_store': {
        page: { title: 'Item Store', desc: '' }
      },
      'item_supplier': {
        page: { title: 'Item Supplier', desc: '' }
      },
      'item_stock': {
        page: { title: 'Item Stock', desc: '' }
      },
      'item_issue': {
        page: { title: 'Item Issue', desc: '' }
      },
    },
    
    'examination': {
      'exam_group': {
        page: { title: 'Exam Group', desc: '' }
      },
      'exam_schedule': {
        page: { title: 'Exam Schedule', desc: '' }
      },
      'exam/:id': {
        page: { title: 'Exam', desc: '' }
      },
      'exam_subject_marks/:examId/:examSubjectId/:examGroupId': {
        page: { title: 'Exam Subject Marks', desc: '' }
      },
      'exam_result': {
        page: { title: 'Exam Result', desc: '' }
      },

      
    },

    'certificate': {
      'certificate_design': {
        page: { title: 'Certificate Design', desc: '' }
      },
      
    },

    'communication': {
      'notice_board': {
        page: { title: 'Notice Board', desc: '' }
      },
      'send_email': {
        page: { title: 'Send Email', desc: '' }
      },
      'send_sms': {
        page: { title: 'Send Sms', desc: '' }
      },
      'email_sms_log': {
        page: { title: 'Email Sms Log', desc: '' }
      },
    },


    'report': {
      'student_information': {
        page: { title: 'Student Information', desc: '' }
      },
      'student_report': {
        page: { title: 'Student Report', desc: '' }
      },
      'guardian_report': {
        page: { title: 'Guardian Report', desc: '' }
      },
      'student_history': {
        page: { title: 'Student History', desc: '' }
      },
      'student_login_credential': {
        page: { title: 'Student Login Credential', desc: '' }
      },
      'class_subject_report': {
        page: { title: 'Class Subject Report', desc: '' }
      },
      'admission_report': {
        page: { title: 'Admission Report', desc: '' }
      },
      'sibling_report': {
        page: { title: 'Sibling Report', desc: '' }
      },
      'student_profile': {
        page: { title: 'Student Profile', desc: '' }
      },
      'homework_evaluation_report': {
        page: { title: 'Homework Evaluation Report', desc: '' }
      },
      'finance': {
        page: { title: 'Finance', desc: '' }
      },


      'fees_statement': {
        page: { title: 'Fees Statement', desc: '' }
      },
      'balance_fees_report': {
        page: { title: 'Balance Fees Report', desc: '' }
      },
      'fees_collection_report': {
        page: { title: 'Fees Collection Report', desc: '' }
      },
      'online_fees_collection_report': {
        page: { title: 'Online Fees Collection Report', desc: '' }
      },
      'income_report': {
        page: { title: 'Income Report', desc: '' }
      },
      'expense_report': {
        page: { title: 'Expense Report', desc: '' }
      },
      'payroll_report': {
        page: { title: 'Payroll Report', desc: '' }
      },
      'income_group_report': {
        page: { title: 'Income Group Report', desc: '' }
      },
      'expense-group-report': {
        page: { title: 'Expense Group Report', desc: '' }
      },


      'human_resource_report': {
        page: { title: 'Human Resource', desc: '' }
      },
      'staff_report': {
        page: { title: 'Staff Report', desc: '' }
      },
      'payrolls_report': {
        page: { title: 'Payrolls Report', desc: '' }
      },


      'library_report': {
        page: { title: 'Library', desc: '' }
      },
      'book_issue_report': {
        page: { title: 'Book Issue Report', desc: '' }
      },
      'book_due_report': {
        page: { title: 'Book Due Report', desc: '' }
      },
      'book_inventory_report': {
        page: { title: 'Book Inventory Report', desc: '' }
      },
      'book_issue_return_report': {
        page: { title: 'Book Issue Return Report', desc: '' }
      },


      'inventory_report': {
        page: { title: 'Inventory', desc: '' }
      },
      'stock_report': {
        page: { title: 'Stock Report', desc: '' }
      },
      'add_item_report': {
        page: { title: 'Add Item Report', desc: '' }
      },
      'issue_item_report': {
        page: { title: 'Issue Item Report', desc: '' }
      },


      'transport_report': {
        page: { title: 'Transport', desc: '' }
      },
      'hostel_report': {
        page: { title: 'Hostel', desc: '' }
      },
    },


    'system_setting': {
      'roles': {
        page: { title: 'Roles Permissions', desc: '' }
      },
      'sessions': {
        page: { title: 'Session Setting', desc: '' }
      },
      'email_setting': {
        page: { title: 'Email Setting', desc: '' }
      },
      'sms_setting': {
        page: { title: 'Sms Setting', desc: '' }
      },
      'backup_restore': {
        page: { title: 'Backup Restore', desc: '' }
      },
      'notification_setting': {
        page: { title: 'Notification Setting', desc: '' }
      },
      'users': {
        page: { title: 'Users', desc: '' }
      },
    },


    ecommerce: {
      customers: {
        page: { title: 'Customers', desc: '' }
      },
      products: {
        edit: {
          page: { title: 'Edit product', desc: '' }
        },
        add: {
          page: { title: 'Create product', desc: '' }
        }
      },
      orders: {
        page: { title: 'Orders', desc: '' }
      }
    },
    'user_management': {
      users: {
        page: { title: 'Users', desc: '' }
      },
      roles: {
        page: { title: 'Roles', desc: '' }
      }
    },
    builder: {
      page: { title: 'Layout Builder', desc: '' }
    },
    header: {
      actions: {
        page: { title: 'Actions', desc: 'Actions example page' }
      }
    },
    profile: {
      page: { title: 'User Profile', desc: '' }
    },
   
  };

  public get configs(): any {
    return this.defaults;
  }
}
