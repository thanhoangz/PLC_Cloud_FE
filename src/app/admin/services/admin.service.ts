import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  /* Processing ... */
  getAllCourses() {
    return this.httpClient.get(`${environment.PLCServicesDomain}/api/courses`);
  }


}
