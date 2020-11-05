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
import {AssignFeesStudentService} from '../_services/assign-student.service';
// State
import {AppState} from '../../reducers';
// Actions
import {
  AssignFeesStudentActionToggleLoading,
  AssignFeesStudentActionTypes,
  AssignFeesStudentCreated,
  AssignFeesStudentOnServerCreated,
  AssignFeesStudentsPageLoaded,
  AssignFeesStudentsPageRequested,
  AssignFeesStudentsPageToggleLoading,
  AssignFeesStudentsStatusUpdated,
  AssignFeesStudentUpdated,
  ManyAssignFeesStudentsDeleted,
  OneAssignFeesStudentDeleted
} from '../_actions/assign-student.actions';

@Injectable()
export class AssignFeesStudentEffects {
  showPageLoadingDistpatcher = new AssignFeesStudentsPageToggleLoading({isLoading: true});
  showActionLoadingDistpatcher = new AssignFeesStudentActionToggleLoading({isLoading: true});
  hideActionLoadingDistpatcher = new AssignFeesStudentActionToggleLoading({isLoading: false});

  @Effect()
  loadAssignFeesStudentsPage$ = this.actions$.pipe(
    ofType<AssignFeesStudentsPageRequested>(AssignFeesStudentActionTypes.AssignFeesStudentsPageRequested),
    mergeMap(({payload}) => {
      this.store.dispatch(this.showPageLoadingDistpatcher);
      const requestToServer = this.assignFeesStudentsService.findAssignFeesStudents(payload.page);
      const lastQuery = of(payload.page);
      return forkJoin(requestToServer, lastQuery);
    }),
    map(response => {
      const result: QueryResultsModel = response[0];
      const lastQuery: QueryParamsModel = response[1];
      const data : FindResultsModel= result['data'];
      return new AssignFeesStudentsPageLoaded({
        assignFeesStudents: data.content,
    totalCount: data.totalPages,
    page: lastQuery
      });
    })
  );
  
  @Effect()
  deleteAssignFeesStudent$ = this.actions$
    .pipe(
      ofType<OneAssignFeesStudentDeleted>(AssignFeesStudentActionTypes.OneAssignFeesStudentDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.assignFeesStudentsService.deleteAssignFeesStudent(payload.id);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  @Effect()
  deleteAssignFeesStudents$ = this.actions$
    .pipe(
      ofType<ManyAssignFeesStudentsDeleted>(AssignFeesStudentActionTypes.ManyAssignFeesStudentsDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.assignFeesStudentsService.deleteAssignFeesStudents(payload.ids);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  @Effect()
  updateAssignFeesStudent$ = this.actions$
    .pipe(
      ofType<AssignFeesStudentUpdated>(AssignFeesStudentActionTypes.AssignFeesStudentUpdated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.assignFeesStudentsService.updateAssignFeesStudent(payload.assignFeesStudent);
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      })
    );

  @Effect()
  updateAssignFeesStudentsStatus$ = this.actions$
    .pipe(
      ofType<AssignFeesStudentsStatusUpdated>(AssignFeesStudentActionTypes.AssignFeesStudentsStatusUpdated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.assignFeesStudentsService.updateStatusForAssignFeesStudent(payload.assignFeesStudents, payload.status);
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      })
    );

  @Effect()
  createAssignFeesStudent$ = this.actions$
    .pipe(
      ofType<AssignFeesStudentOnServerCreated>(AssignFeesStudentActionTypes.AssignFeesStudentOnServerCreated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.assignFeesStudentsService.createAssignFeesStudent(payload.assignFeesStudent).pipe(
          tap(res => {
            this.store.dispatch(new AssignFeesStudentCreated({assignFeesStudent: res['data']}));
          })
        );
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  constructor(private actions$: Actions, private assignFeesStudentsService: AssignFeesStudentService, private store: Store<AppState>) {
  }
}
