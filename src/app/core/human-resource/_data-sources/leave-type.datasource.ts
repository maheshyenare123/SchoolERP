// import { selectProductsInitWaitingMessage } from './../_selectors/product.selectors';
// RxJS
import { delay, distinctUntilChanged } from 'rxjs/operators';
// CRUD
import { QueryResultsModel, BaseDataSource } from '../../_base/crud';
// State
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
// Selectors
import { selectLeaveTypesInStore, selectLeaveTypesPageLoading,selectLeaveTypesShowInitWaitingMessage } from '../_selectors/leave-type.selectors';

export class LeaveTypesDataSource extends BaseDataSource {
  constructor(private store: Store<AppState>) {
    super();
    this.loading$ = this.store.pipe(
      select(selectLeaveTypesPageLoading)
    );

    this.isPreloadTextViewed$ = this.store.pipe(
      select(selectLeaveTypesShowInitWaitingMessage)
    );

    this.store.pipe(
      select(selectLeaveTypesInStore)
    ).subscribe((response: QueryResultsModel) => {
      this.paginatorTotalSubject.next(response.totalCount);
      this.entitySubject.next(response.items);
    });
  }
}
