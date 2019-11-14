import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryRollpayService {

constructor(private httpClient: HttpClient) { }

// Đã xét duyệt lương
ListDaXetDuyet(month, year) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/Salary/paied-roll-personnels?month=${month}&year=${year}`, null);
}

// Chưa xét duyệt lương
ListChuaXetDuyet(month, year) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/Salary/not-paied-roll-personnels?month=${month}&year=${year}`, null);
}

}
