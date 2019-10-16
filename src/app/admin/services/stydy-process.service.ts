import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StydyProcessService {

constructor(private httpClient: HttpClient) { }

getAll_studyProcess() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/PaySlips`);
}

post_studyProcess(PaySlip: any) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/PaySlips`, PaySlip);
}

put_studyProcess(PaySlip: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/PaySlips/${PaySlip.id}`, PaySlip);
}

delete_studyProcess(PaySlipId: number) {
  return this.httpClient
    .delete(`${environment.PLCServicesDomain}/api/PaySlips/${PaySlipId}`);
}

paging_studyProcess(keyWord, status, pageSize, pageIndex) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/PaySlips/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
}

search_studyProcess(startDate, endDate, keyWord, status) {
  if (startDate && endDate) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PaySlips/get-all-with-conditions?startDate=${startDate}&endDate=${endDate}&keyword=${keyWord}&status=${status}`, null);
  } else {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PaySlips/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
  }
}
}
