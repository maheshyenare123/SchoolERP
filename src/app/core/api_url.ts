export class Constants {
   public static URL: any = {
      HOST_URL: 'http://yamistha.cloudjiffy.net/',
      accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsIlNlc3Npb25JRCI6MSwiaWF0IjoxNjAyOTIxMjk1LCJleHAiOjE2MDMwMDc2OTV9.9yG8Kaw2H3rW_x36syT2HZbznn8KbjjrNNkiw29WpJ3TA_HFnixPRJuFcRZfN9DL_83rCV7ZXtvK7wzLwcu1RA',
      sessionId: '1',

   }


   public static DISPATCH: string = 'dispatch';
   public static RECEIVE: string = 'receive';


   public static Front_Office: any = {
      Admission_Enquiry: 'api/enquiry',
      Complain: 'api/complaint',
      ComplainType: 'api/complaint-type',
      Phone_Call_Log: 'api/general-call',
      Postal_Dispatch: 'api/dispatch-receive',
      Postal_Receive: 'api/dispatch-receive',
      Visitor_Book: 'api/visitors-book',
      Visitor_Purpose: 'api/visitor-purpose',
      Reference: 'api/reference',
      Source: 'api/source',
   }

   public static Student_Information: any = {
      Student: 'api/student',
      Student_Category: 'api/category',
      Disable_Reason: 'api/disable-reason',
      Student_House: 'api/school-house',
      Disable_Student: 'api/student/api/disable-student',
      Online_Addmission: 'api/',
   }

   public static Academics: any = {
      Class_TimeTable: 'api/subject-class-timetable',
      Teacher_TimeTable: 'api/',
      Assign_Class_Teacher: 'api/assign-class-teacher',
      Class: 'api/class',
      Section: 'api/section',
      Subject: 'api/subject',
      Subject_Group: 'api/subject-group',

   }

   public static Attendance: any = {

      Approve_Leave: 'api/student-apply-leave',
      //   Attendance_By_Date:'',
      Student_Attendance: 'api/student-attendance',
      Attendance_Type: 'api/attendance-type'
   }


   public static Homework: any = {

      Homework_Add: 'api/homework',

   }
   public static Library: any = {

      Book: 'api/book',
      Library_Member: 'api/library-member',
      Library_student_Member: 'api/library-member/student',
      Library_Staff_Member: 'api/library-member/staff',
      Book_Issue_Return:'api/library-member/issue'
   }


   public static Human_Resource: any = {
      Staff: 'api/staff',
      StaffDesignation: 'api/staffDesignation',
      Department: 'api/department',
      StaffAttendance: 'api/staffAttendance',
      StaffRating: 'api/staffRating',

      Leave_Type: 'api/leave-type',
    

   }

   public static Fees_Collection: any = {
      Fees_Group: 'api/fee-group',
      Fees_Type: 'api/fee-type',
      Fees_Discount: 'api/fee-discount',
      Fees_Master: 'api/feemaster',
      AssignFeesStudent: 'api/feemaster/assign/student'
   }



   
   public static Incomes: any = {
      Income: 'api/income',
      IncomeHead: 'api/incomeHead',
   }

   public static Expenses: any = {
      Expense: 'api/expense',
      ExpenseHead: 'api/expenseHead',
   }
  

}