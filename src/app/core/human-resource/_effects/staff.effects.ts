import {QueryParamsModel} from '../../_base/crud/models/query-models/query-params.model';
import {forkJoin, of} from 'rxjs';
// Angular
import {Injectable} from '@angular/core';
// RxJS
import {map, mergeMap, tap} from 'rxjs/operators';
// NGRX
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
// CRUD
import {QueryResultsModel, FindResultsModel} from '../../_base/crud';
// Services
import {StaffService} from '../_services/staff.service';
// State
import {AppState} from '../../reducers';
// Actions
import {
  StaffActionToggleLoading,
  StaffActionTypes,
  StaffCreated,
  StaffOnServerCreated,
  StaffsPageLoaded,
  StaffsPageRequested,
  StaffsPageToggleLoading,
  StaffsStatusUpdated,
  StaffUpdated,
  ManyStaffsDeleted,
  OneStaffDeleted
} from '../_actions/staff.actions';

@Injectable()
export class StaffEffects {
  showPageLoadingDistpatcher = new StaffsPageToggleLoading({isLoading: true});
  showActionLoadingDistpatcher = new StaffActionToggleLoading({isLoading: true});
  hideActionLoadingDistpatcher = new StaffActionToggleLoading({isLoading: false});

  @Effect()
  loadStaffsPage$ = this.actions$.pipe(
    ofType<StaffsPageRequested>(StaffActionTypes.StaffsPageRequested),
    mergeMap(({payload}) => {
      this.store.dispatch(this.showPageLoadingDistpatcher);
      const requestToServer = this.staffsService.findStaffs(payload.page);
      const lastQuery = of(payload.page);
      return forkJoin(requestToServer, lastQuery);
    }),
    map(response => {
      const result: QueryResultsModel = response[0];
      const lastQuery: QueryParamsModel = response[1];
      const data : FindResultsModel= result['data'];
      return new StaffsPageLoaded({
        staffs: data.content,
        totalCount: data.totalPages,
        page: lastQuery
      });
    })
  );
  
  @Effect()
  deleteStaff$ = this.actions$
    .pipe(
      ofType<OneStaffDeleted>(StaffActionTypes.OneStaffDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.staffsService.deleteStaff(payload.id);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  @Effect()
  deleteStaffs$ = this.actions$
    .pipe(
      ofType<ManyStaffsDeleted>(StaffActionTypes.ManyStaffsDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.staffsService.deleteStaffs(payload.ids);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  @Effect()
  updateStaff$ = this.actions$
    .pipe(
      ofType<StaffUpdated>(StaffActionTypes.StaffUpdated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.staffsService.updateStaff(payload.staff);
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      })
    );

  @Effect()
  updateStaffsStatus$ = this.actions$
    .pipe(
      ofType<StaffsStatusUpdated>(StaffActionTypes.StaffsStatusUpdated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.staffsService.updateStatusForStaff(payload.staffs, payload.status);
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      })
    );

  @Effect()
  createStaff$ = this.actions$
    .pipe(
      ofType<StaffOnServerCreated>(StaffActionTypes.StaffOnServerCreated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.staffsService.createStaff(payload.staff).pipe(
          tap(res => {
            this.store.dispatch(new StaffCreated({staff: res['data']}));
          })
        );
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  constructor(private actions$: Actions, private staffsService: StaffService, private store: Store<AppState>) {
  }
}
