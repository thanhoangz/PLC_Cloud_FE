import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

constructor(private httpClient: HttpClient) { }

getAllReceipts() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/Receipts`);
}

postReceipt(PaySlip: any) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/Receipts`, PaySlip);
}

putReceipt(PaySlip: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/Receipts/${PaySlip.id}`, PaySlip);
}

deleteReceipt(PaySlipId: number) {
  return this.httpClient
    .delete(`${environment.PLCServicesDomain}/api/Receipts/${PaySlipId}`);
}

pagingReceipts(keyWord, status, pageSize, pageIndex) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/Receipts/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
}

  // tìm kiếm all phiếu thu của học viên X
  getReceiptsByLearnerId(learnerId) {
    return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/Receipts/get-all-with-conditions?learnerId=${learnerId}`, null);
  }
}
