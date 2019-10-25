import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonnelsService {

  constructor(private httpClient: HttpClient) { }

  getAllPersonnels() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Personnels`);
  }

  postPersonnel(personnel: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Personnels`, personnel);
  }

  putPersonnel(personnel: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Personnels/${personnel.id}`, personnel);
  }

  deletePersonnel(personnelId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Personnels/${personnelId}`);
  }

}
