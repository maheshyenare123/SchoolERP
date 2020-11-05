// import { selectProductsInitWaitingMessage } from './../_selectors/product.selectors';
// RxJS
import { delay, distinctUntilChanged } from 'rxjs/operators';
// CRUD
import { QueryResultsModel, BaseDataSource } from '../../_base/crud';
// State
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
// Selectors
import { selectAssignFeesStudentsInStore, selectAssignFeesStudentsPageLoading,selectAssignFeesStudentsShowInitWaitingMessage } from '../_selectors/assign-student.selectors';

export class AssignFeesStudentsDataSource extends BaseDataSource {
  constructor(private store: Store<AppState>) {
    super();
    this.loading$ = this.store.pipe(
      select(selectAssignFeesStudentsPageLoading)
    );

    this.isPreloadTextViewed$ = this.store.pipe(
      select(selectAssignFeesStudentsShowInitWaitingMessage)
    );

    this.store.pipe(
      select(selectAssignFeesStudentsInStore)
    ).subscribe((response: QueryResultsModel) => {
      this.paginatorTotalSubject.next(response.totalCount);
      this.entitySubject.next(response.items);
    });
  }
}
