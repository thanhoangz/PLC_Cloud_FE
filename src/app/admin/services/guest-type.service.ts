import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestTypeService {

  constructor(private httpClient: HttpClient) { }

  getAllGuestTypes() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/GuestTypes`);
  }

  postLearner(guestType: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/GuestTypes`, guestType);
  }

  putLearner(guestType: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/GuestTypes/${guestType.id}`, guestType);
  }

  deleteLearner(guestTypeId) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/GuestTypes/${guestTypeId}`);
  }
}
