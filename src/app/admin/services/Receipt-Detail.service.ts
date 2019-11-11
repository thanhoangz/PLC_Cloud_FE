import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiptDetailService {

constructor(private httpClient: HttpClient) { }

// tìm kiếm all chi tiết  của phiếu thu
getReceiptsDetailById(receiptId) {
  return this.httpClient
  .post(`${environment.PLCServicesDomain}/api/ReceiptDetails/get-all-with-conditions?receiptId=${receiptId}`, null);
}
AddListReceiptDetail(receiptDetail) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/ReceiptDetails/add-list-receiptDetail`, receiptDetail);
}
}
