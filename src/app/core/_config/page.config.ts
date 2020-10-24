export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: 'Dashboard',
        desc: 'Latest updates and statistic charts'
      },
    },

    'front-office': {

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

      'setup-front-office': {
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
    'student-information': {

      'student-details': {
        page: { title: 'Student Details', desc: '' }
      },
      'student-details-edit': {
        page: { title: 'Student Admission', desc: '' }
      },
      'online-admission': {
        page: { title: 'Online Admission', desc: '' }
      },
      'disabled-student': {
        page: { title: 'Disabled Student', desc: '' }
      },
      'bulk-delete': {
        page: { title: 'Bulk Delete', desc: '' }
      },
      'student-categories': {
        page: { title: 'Student Categories', desc: '' }
      },
      'student-house': {
        page: { title: 'Student House', desc: '' }
      },
      'disable-reason': {
        page: { title: 'Disable Reason', desc: '' }
      },
      
      
      
    },
    'academics': {
      
      'class-timetable': {
        page: { title: 'Class Timetable', desc: '' }
      },
      'teacher-timetable': {
        page: { title: 'Teacher Timetable', desc: '' }
      },
      'assign-class-teacher': {
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
      'subject-group': {
        page: { title: 'Subject Group', desc: '' }
      },
         
    },
    'attendance': {
      'student-attendance': {
        page: { title: 'Student Attendance', desc: '' }
      },
      'attendance-by-date': {
        page: { title: 'Attendance By Date', desc: '' }
      },
      'approve-leave': {
        page: { title: 'Approve Leave', desc: '' }
      },
    },
    'homework': {
      'homework-list': {
        page: { title: 'Home Work', desc: '' }
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
    'user-management': {
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
    error: {
      404: {
        page: { title: '404 Not Found', desc: '', subheader: false }
      },
      403: {
        page: { title: '403 Access Forbidden', desc: '', subheader: false }
      }
    },
    wizard: {
      'wizard-1': { page: { title: 'Wizard 1', desc: '' } },
      'wizard-2': { page: { title: 'Wizard 2', desc: '' } },
      'wizard-3': { page: { title: 'Wizard 3', desc: '' } },
      'wizard-4': { page: { title: 'Wizard 4', desc: '' } },
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
