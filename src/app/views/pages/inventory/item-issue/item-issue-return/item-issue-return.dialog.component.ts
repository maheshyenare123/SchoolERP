// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemIssueModel, selectItemIssuesActionLoading, ItemIssueUpdated, ItemIssueOnServerCreated, selectLastCreatedItemIssueId, AddItemModel, AddItemService, ItemCategoryModel, ItemCategoryService, ItemIssueService } from '../../../../../core/inventory';
import { Constants } from 'src/app/core/api_url';
import { RoleService, StaffService } from 'src/app/core/human-resource';
import { RolesDtoModel } from 'src/app/core/Models/rolesDto.model';
import { StaffDtoModel } from 'src/app/core/academics/_models/staffDto.model';
// // Services and Models



@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-item-issue-return-dialog',
	templateUrl: './item-issue-return.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ItemIssueReturnDialogComponent implements OnInit, OnDestroy {


	// Public properties
	itemIssue: ItemIssueModel;

	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	constructor(public dialogRef: MatDialogRef<ItemIssueReturnDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private itemIssueService: ItemIssueService,
	
	) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.store.pipe(select(selectItemIssuesActionLoading)).subscribe(res => this.viewLoading = res);
		// loadding
		this.itemIssue = this.data.itemIssue;
		
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}
	

	/**
	 * Returns page title
	 */
	getTitle(): string {
		return 'Confirm Return';
	}

	
	/**
	 * Create itemIssue
	 *
	 * @param _itemIssue: ItemIssueModel
	 */
	onReturn(_itemIssue: ItemIssueModel) {
        this.itemIssueService.returnIssueItem(_itemIssue.id).subscribe(res => {
			if (!res) {
				return;
			}
			
        });
        this.dialogRef.close({ _itemIssue, isEdit: false });

	}

	
}

