// import { selectProductsInitWaitingMessage } from './../_selectors/product.selectors';
// RxJS
import { Observable, of } from "rxjs";
import 'rxjs/add/observable/of';
import { catchError, delay, distinctUntilChanged, finalize } from 'rxjs/operators';
// CRUD
import { QueryResultsModel, BaseDataSource } from '../../_base/crud';
// State
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
// Selectors
import { selectReferencesInStore, selectReferencesPageLoading, selectReferencesShowInitWaitingMessage } from '../_selectors/reference.selectors';

import { ReferenceService } from '../_services/reference.service';


export class ReferencesDataSource extends BaseDataSource {
  constructor(private referenService: ReferenceService) {
    super();
    //   this.loading$ = this.store.pipe(
    //     select(selectReferencesPageLoading)
    //   );

    //   this.isPreloadTextViewed$ = this.store.pipe(
    //     select(selectReferencesShowInitWaitingMessage)
    //   );

    //   this.store.pipe(
    //     select(selectReferencesInStore)
    //   ).subscribe((response: QueryResultsModel) => {
    //     this.paginatorTotalSubject.next(response.totalCount);
    //     this.entitySubject.next(response.items);
    //   });
  }

  loadPageRequesed(page) {
    this.loading$ = Observable.of(true);
    this.isPreloadTextViewed$ = Observable.of(true);
    this.referenService.findReferences(page).pipe(
      catchError(() => of([])),
      finalize(() => this.isPreloadTextViewed$ = this.loading$ = Observable.of(false),)
    ).subscribe(response => {
      this.loading$ = Observable.of(false);
      this.isPreloadTextViewed$ = Observable.of(false);
      const data = response['data'];
      this.paginatorTotalSubject.next(data.totalElements);
      this.entitySubject.next(data['content']);
      // const result: QueryResultsModel = response[0];
      // const lastQuery: QueryParamsModel = response[1];
      // this.paginatorTotalSubject.next(result.totalCount);
      // this.entitySubject.next(result.items);
    })
  }

}
