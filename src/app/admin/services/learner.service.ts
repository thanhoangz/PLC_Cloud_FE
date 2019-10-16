import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  constructor(private httpClient: HttpClient) { }

  getAllLearners() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners`);
  }

  postLearner(learner: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Learners`, learner);
  }

  putLearner(learner: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Learners/${learner.id}`, learner);
  }

  deleteLearner(learnerId) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Learners/${learnerId}`);
  }
}


