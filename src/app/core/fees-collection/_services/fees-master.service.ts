import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Constants } from '../../api_url';
import { HttpUtilsService, QueryResultsModel, QueryParamsModel } from '../../_base/crud';
import { FeesMasterModel } from '../_models/fees-master.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeesMasterService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // CREATE =>  POST: add a new FeesMaster to the server
  createFeesMaster(feesMaster: FeesMasterModel): Observable<FeesMasterModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<FeesMasterModel>(Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster, feesMaster, {headers: httpHeaders});
  }

  // READ
  getAllFeesMasters(): Observable<FeesMasterModel[]> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<FeesMasterModel[]>(Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster, {headers: httpHeaders});
  }

  getFeesMasterById(feesMasterId: number): Observable<FeesMasterModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<FeesMasterModel>(Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster+ `/${feesMasterId}`, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  // Server should return filtered/sorted result
  findFeesMasters(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    const url =Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster ;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      // params: httpParams
    });
  }

  // UPDATE => PUT: update the FeesMaster on the server
  updateFeesMaster(feesMaster: FeesMasterModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster+'/'+feesMaster.id, feesMaster, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForFeesMaster(feesMasters: FeesMasterModel[], status: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      feesMastersForUpdate: feesMasters,
      newStatus: status
    };
    const url = Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster+ '/updateStatus';
    return this.http.put(url, body, {headers: httpHeaders});
  }

  // DELETE => delete the FeesMaster from the server
  deleteFeesMaster(feesMasterId: number): Observable<FeesMasterModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const url = `${Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster}/${feesMasterId}`;
    return this.http.delete<FeesMasterModel>(url, {headers: httpHeaders});
  }

  deleteFeesMasters(ids: number[] = []): Observable<any> {
    const url = Constants.URL.HOST_URL+Constants.Fees_Collection.FeesMaster + '/deleteFeesMasters';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {feesMasterIdsForDelete: ids};
    return this.http.put<QueryResultsModel>(url, body, {headers: httpHeaders});
  }


}


