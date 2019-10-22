import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

constructor(private httpClient: HttpClient) { }
getAllLecturers() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/Lecturers`);
}

postLecturers(lecture: any) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/Lecturers`, lecture);
}
}
