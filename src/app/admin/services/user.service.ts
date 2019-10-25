import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUser() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/AppUsers`);
  }

  postUser(user: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AppUsers/Register`, user);
  }

  putCourse(course: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Courses/${course.id}`, course);
  }

  deleteCourse(courseId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Courses/${courseId}`);
  }
}
