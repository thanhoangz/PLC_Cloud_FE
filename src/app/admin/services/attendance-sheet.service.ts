import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSheetService {

  constructor(private httpClient: HttpClient) { }

  postAttendance(attendance: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheets`, attendance);
  }


  getByDateClass(classId, date) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/AttendanceSheets/getByDate?classId=${classId}&date=${date}`);
  }
}