import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  /* Processing ... */
  /* Course */
  getAllCourses() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/courses`);
  }

  postCourse(course: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Courses`, course);
  }

  putCourse(course: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Courses/${course.Id}`, course);
  }

  deleteCourse(courseId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Courses/${courseId}`);
  }

  searchCourses(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Course/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }
}
