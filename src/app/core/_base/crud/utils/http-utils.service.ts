// Angular
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
// CRUD
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { HttpExtenstionsModel } from '../../crud/models/http-extentsions-model';
import { Constants } from '../../../../core/api_url';

@Injectable()
export class HttpUtilsService {
  /**
   * Prepare query http params
   * @param queryParams: QueryParamsModel
   */
  getFindHTTPParams(queryParams): HttpParams {
    return new HttpParams()
      // .set('lastNamefilter', queryParams.filter)
      // .set('sortOrder', queryParams.sortOrder)
      .set('sortBy', queryParams.sortField)
      .set('pageNo', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());
    // @RequestParam(defaultValue = "0") Integer pageNo,
    // @RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy
  }

  /**
   * get standard content-type
   */
  getHTTPHeaders(): HttpHeaders {
    let result = new HttpHeaders();
    const accessToken = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');

    result = result.set('Content-Type', 'application/json');
    result = result.set('Authorization', 'Bearer ' + accessToken);
    result = result.set('sessionid', sessionId);
    return result;
  }

  baseFilter(entities: any[], queryParams: QueryParamsModel, filtrationFields: string[] = []): QueryResultsModel {
    const httpExtension = new HttpExtenstionsModel();
    return httpExtension.baseFilter(entities, queryParams, filtrationFields);
  }

  sortArray(incomingArray: any[], sortField: string = '', sortOrder: string = 'asc'): any[] {
    const httpExtension = new HttpExtenstionsModel();
    return httpExtension.sortArray(incomingArray, sortField, sortOrder);
  }

  searchInArray(incomingArray: any[], queryObj: any, filtrationFields: string[] = []): any[] {
    const httpExtension = new HttpExtenstionsModel();
    return httpExtension.searchInArray(incomingArray, queryObj, filtrationFields);
  }
}
