import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyProcessService {

  constructor(private httpClient: HttpClient) { }

  getAll_studyProcess() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/StudyProcesses`);
  }

  post_studyProcess(StudyProcess: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses`, StudyProcess);
  }

  put_studyProcess(StudyProcess: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/StudyProcesses/${StudyProcess.id}`, StudyProcess);
  }

  delete_studyProcess(StudyProcessId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/StudyProcesses/${StudyProcessId}`);
  }

  paging_studyProcess(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  search_studyProcess(LanguageClassId, LearnerId, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/get-all-with-conditions?LanguageClassId=${LanguageClassId}`, null);
  }

}
