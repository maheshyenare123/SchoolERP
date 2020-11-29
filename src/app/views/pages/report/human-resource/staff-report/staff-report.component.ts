
import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StaffsDataSource, StaffModel,selectStaffsActionLoading, RoleService, StaffDesignationModel, StaffDesignationService } from '../../../../../core/human-resource';
import { QueryParamsModel, LayoutUtilsService, MessageType ,TypesUtilsService} from '../../../../../core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, merge, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../../core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { tap, debounceTime, distinctUntilChanged, skip, delay, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';

import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { StaffsPageRequested, OneStaffDeleted, ManyStaffsDeleted, StaffsStatusUpdated, StaffUpdated, StaffOnServerCreated, selectLastCreatedStaffId } from '../../../../../core/human-resource';
import { RolesDtoModel } from '../../../../../core/Models/rolesDto.model';


@Component({
  selector: 'kt-staff-report',
  templateUrl: './staff-report.component.html',
  styleUrls: ['./staff-report.component.scss']
})
export class StaffReportComponent implements OnInit {

   // Table fields
   dataSource: StaffsDataSource;
   //  dataSource = new MatTableDataSource(ELEMENT_DATA);
   
      
   displayedColumns = ['id', 'staffId','name','role','department','designation','mobileNo'];
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild('sort1', {static: true}) sort: MatSort;
   // Filter fields
   @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
   filterStatus = '';
   filterType = '';
   // Selection
   selection = new SelectionModel<StaffModel>(true, []);
   staffsResult: StaffModel[] = [];
   // Subscriptions
   private subscriptions: Subscription[] = [];
   
   // Public properties
   staff: StaffModel;
   staffForm: FormGroup;
   searchForm: FormGroup;
   hasFormErrors = false;
   viewLoading = false;
   // Private properties
   private componentSubscriptions: Subscription;
   
   searchText : number;
   roleId : number;
   
   rolesList: RolesDtoModel[] = [];
   designationList:StaffDesignationModel[] = [];
     constructor(public dialog: MatDialog,
       public snackBar: MatSnackBar,
       private layoutUtilsService: LayoutUtilsService,
       private translate: TranslateService,
       private store: Store<AppState>,
       private fb: FormBuilder,
       private typesUtilsService: TypesUtilsService,
       private roleService:RoleService,
       private router: Router,
       private designationService:StaffDesignationService,) { }
   
     ngOnInit() {
   
     debugger;
     this.loadAllRoles();
     this.loadAllDesignation();
       this.createForm();
     this.dataSource = new StaffsDataSource(this.store);
     }

  staffReport() {
		this.router.navigate(["/report/staff-report"])
  }
  
  payrollsReport() {
		this.router.navigate(["/report/payrolls-report"])
  }

  loadAllRoles() {
    debugger
    this.roleService.getAllRoles().subscribe(res => {
      const data = res['data'];
      this.rolesList = data['content'];
      console.log(this.rolesList)
    }, err => {
    });
    }

    loadAllDesignation() {
      debugger
      this.designationService.getAllStaffDesignations().subscribe(res => {
        const data = res['data'];
        this.designationList = data['content'];
        console.log(this.designationList)
      }, err => {
      });
    }
  /**
     * On Destroy
     */
    ngOnDestroy() {
      this.subscriptions.forEach(el => el.unsubscribe());
    }
  
    /**
     * Load Staffs List from service through data-source
     */
    loadStaffList(roleId) {
      debugger;
      this.selection.clear();
      const queryParams = new QueryParamsModel(
        this.filterConfiguration(),
        this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
      // Call request from server
      this.store.dispatch(new StaffsPageRequested({ page: queryParams,roleId }));
      this.selection.clear();
    }
  
    /**
     * Returns object for filter
     */
    filterConfiguration(): any {
      const filter: any = {};
      const searchText: string = this.searchInput.nativeElement.value;
  
      filter.class = searchText;
      if (!searchText) {
        return filter;
      }
      filter.staff = searchText;
      return filter;
    }
  
    
  
  
  createForm() {
    debugger;
    this.searchForm = this.fb.group({
      roleId: [this.roleId, ],
      searchText: [this.searchText, ],
     
  
    })
  
    
  }
  
  
    /**
     * On Search
     */
    onSearch() {
      this.hasFormErrors = false;
      const controls = this.searchForm.controls;
      /** check form */
      if (this.searchForm.invalid) {
        Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
        );
  
        this.hasFormErrors = true;
        return;
      }
  
      //search api
      this.getAllStaff(controls.roleId.value);
  
      
    }
  getAllStaff(roleId){
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.subscriptions.push(sortSubscription);
  
    /* Data load will be triggered in two cases:
    - when a pagination event occurs => this.paginator.page
    - when a sort event occurs => this.sort.sortChange
    **/
    const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.loadStaffList(roleId))
    )
    .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  
    // Filtration, bind to searchInput
    const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // tslint:disable-next-line:max-line-length
      debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
      distinctUntilChanged(), // This operator will eliminate duplicate values
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadStaffList(roleId);
      })
    )
    .subscribe();
    this.subscriptions.push(searchSubscription);
  
    // Init DataSource
    this.dataSource = new StaffsDataSource(this.store);
  
    const entitiesSubscription = this.dataSource.entitySubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      debugger
  console.log(res);
      this.staffsResult = res;
    });
    this.subscriptions.push(entitiesSubscription);
    // First load
    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
      this.loadStaffList(roleId);
    }); // Remove this line, just loading imitation
  
  }
  
    
  /** ACTIONS */
  /**
   * Delete product
   *
   * @param _item: StaffModel
   */
  deleteStaff(_item: StaffModel) {
    const _title = ' Staff Delete';
    const _description = 'Are you sure to permanently delete this  Staff?';
    const _waitDesciption = ' Staff is deleting...';
    const _deleteMessage = ` Staff has been deleted`;
  
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
  //delete api call
      this.store.dispatch(new OneStaffDeleted({ id: _item.id }));
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  }