import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { MatDialog } from '@angular/material/dialog';
import { PickClassComponent } from '../schedule-in-table/dialog/pick-class/pick-class.component';

@Component({
  selector: 'app-schedule-for-learner',
  templateUrl: './schedule-for-learner.component.html',
  styleUrls: ['./schedule-for-learner.component.css']
})
export class ScheduleForLearnerComponent implements OnInit {

  isOpenDialog = false;
  public courses;
  public classes;
  public courseSelected;
  public classSelected;
  public monthSelected = new Date().getMonth();
  public yearSelected = new Date().getFullYear();

  public fullDayOfMonth = [];
  public connectedTo = [];

  public lastDay: Date;
  public firstDayOfMonth;

  public dateOfweek = [];
  public scheduleMonth;

  public daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
  public showProgressBar = false;
  constructor(
    public datepipe: DatePipe,
    public scheduleService: ScheduleService,
    public courseService: CourseService,
    public languageClassesService: LanguageClassesService,
    public matDialog: MatDialog,

  ) {
    this.getDateOfMonth();
  }




  ngOnInit() {
    this.setCourses();
  }


  public getDateOfMonth() {
    this.dateOfweek = [];
    this.connectedTo = [];
    const day = new Date(this.yearSelected, this.monthSelected, 1).getDay();
    if (day === 0) {
      for (let i = 0; i < 6; i++) {
        this.dateOfweek.push('');
      }
    } else {
      for (let i = 0; i < day - 1; i++) {
        this.dateOfweek.push('');
      }
    }

    const numberOfMonth = new Date(this.yearSelected, this.monthSelected + 1, 0).getDate();

    for (let i = 1; i <= numberOfMonth; i++) {

      const date = this.datepipe.transform(new Date(this.yearSelected, this.monthSelected, i), 'dd-MM-yyyy');
      const schedule = [];

      /* duyệt xem có lịch học trong ngày không thì gắn vào. */
      if (this.scheduleMonth) {
        (this.scheduleMonth.classSessions).forEach(element => {
          const dateOfSchedule = this.datepipe.transform(element.date, 'dd-MM-yyyy');
          if (dateOfSchedule === date) {
            schedule.push(element.id + this.scheduleMonth.classroomName + '-' + element.fromTime.substring(0, 5) +
              '-' + element.toTime.substring(0, 5) + ' ' + this.scheduleMonth.lecturerName);
          }
        });
      }


      this.dateOfweek.push(
        {
          date,
          schedule
        }
      );
    }
    console.log(this.dateOfweek);


    /* Xử lí để đưa các item buổi học vào từng ngày.*/
    for (const item of this.dateOfweek) {
      this.connectedTo.push(item.date);
    }

  }

  public getScheduleMonthByClass(classId: any) {
    this.scheduleService.getScheduleMonthByClass(classId).subscribe(result => {
      this.scheduleMonth = result;
      console.log(this.scheduleMonth);
      this.getDateOfMonth();
    }, error => {

    });
  }

  public forwardMonth() {
    console.log(this.scheduleMonth);
    if (this.monthSelected === 0) {
      this.monthSelected = 11;
      this.yearSelected = this.yearSelected - 1;
    } else {
      this.monthSelected = this.monthSelected - 1;
    }
    this.dateOfweek = [];
    this.connectedTo = [];
    this.getDateOfMonth();

  }

  public nextMonth() {
    console.log(this.scheduleMonth);
    if (this.monthSelected === 11) {
      this.monthSelected = 0;
      this.yearSelected = this.yearSelected + 1;
    } else {
      this.monthSelected = this.monthSelected + 1;
    }
    this.dateOfweek = [];
    this.connectedTo = [];
    this.getDateOfMonth();

  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.previousContainer);
      console.log(event.container);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(event.previousContainer);
      console.log(event.container);
    }
  }

  public setCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
      this.courseSelected = result[0].id;
      this.changValueCourse(result[0].id);
    }, error => {

    });
  }

  public setClasses() {

  }

  public changValueCourse(courseId) {
    this.languageClassesService.getClassByCourse(courseId).subscribe(result => {
      this.classes = result;
    }, error => {

    });
  }

  public changValueClass(classId) {
    this.getScheduleMonthByClass(classId);
  }

  public autoCreateSchedule() {
    console.log(this.courseSelected);
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(PickClassComponent, {
        width: '100vh',
        data: {
          courseSelected: this.courseSelected
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }

      });
    }

  }
}

