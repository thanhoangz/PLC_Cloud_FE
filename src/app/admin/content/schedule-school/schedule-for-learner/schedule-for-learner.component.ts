import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-schedule-for-learner',
  templateUrl: './schedule-for-learner.component.html',
  styleUrls: ['./schedule-for-learner.component.css']
})
export class ScheduleForLearnerComponent implements OnInit {

  public fullDayOfMonth = [];

  public showProgressBar = true;
  constructor() {
    for (let i = 0; i < 49; i++) {
      this.fullDayOfMonth.push(i);
    }
  }




  ngOnInit() {


  }

}

