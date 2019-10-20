import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login() {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/AppUsers/Login/${courseId}`);
  }

}
