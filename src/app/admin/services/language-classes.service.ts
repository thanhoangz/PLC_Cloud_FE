import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageClassesService {

constructor(private httpClient: HttpClient) { }

getAllLanguageClasses() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/LanguageClasses`);
}

postLanguageClass(course: any) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/LanguageClasses`, course);
}

putLanguageClass(course: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/LanguageClasses/${course.id}`, course);
}

deleteLanguageClass(courseId: number) {
  return this.httpClient
    .delete(`${environment.PLCServicesDomain}/api/LanguageClasses/${courseId}`);
}

pagingCourses(keyWord, status, pageSize, pageIndex) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/LanguageClasses/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
}

searchLanguageClass(keyWord, status) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/LanguageClasses/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
}
}
