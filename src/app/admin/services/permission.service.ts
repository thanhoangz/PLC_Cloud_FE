import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor(private httpClient: HttpClient) { }

  getPermissionForUser(userId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Permissions/get-permission-by-user/`, userId);
  }
}
