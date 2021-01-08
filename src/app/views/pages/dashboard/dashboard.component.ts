// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSetActionsService } from '../../../core/_base/crud';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  actionsData;
  constructor(
    private activatedRoute: ActivatedRoute,
              private dynamicActionsService: DynamicSetActionsService
  
               ) { }
    ngOnInit(): void {	 
      var url;
    this.activatedRoute.url.subscribe(activeUrl =>{
      url=window.location.pathname;
    });
      this.actionsData=this.dynamicActionsService.getPermissionsForActions(url);
    }	  
}
