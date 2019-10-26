import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-add-learner-class',
  templateUrl: './add-learner-class.component.html',
  styleUrls: ['./add-learner-class.component.css']
})
export class AddLearnerClassComponent implements OnInit {

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public length = 100;
  public pageSize = 10;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20, 30, 50];

  public learnerOutClass;
  public learnerInClass;
  public classId;
  public learnerId;
  public keyword;


  public class = {
    id: null,
    name: null,
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
    startDay: null,
    endDay: null,
    status: null,
    courseId: null,
    courseName: null,
    total: null,
    note: null,
  };
  public studyProcess = {
    languageClassId: null,
    learnerId: null,
  };


  // tslint:disable-next-line: member-ordering
  public displayedColumnsOutClass: string[] = ['index', 'learnerId', 'name', 'sex', 'birthday', 'controls'];
  public displayedColumnsInClass: string[] = ['index', 'learnerId', 'name', 'sex', 'birthday', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSourceOutClass = new MatTableDataSource(this.learnerOutClass);
  public dataSourceInClass = new MatTableDataSource(this.learnerInClass);

  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private exchangeDataService: ExchangeDataService,
    private router: Router,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {

    this.exchangeDataService.idSource.subscribe(message => {
      this.classId = message;
    });

    //  this.classId = 'LC1';
    this.load_infor_languageClasses(this.classId);
    this.getLearnerOutClass();
    this.getLearnerInClass();
    this.studyProcess.languageClassId = this.classId;
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }


  public getLearnerOutClass() {
    this.startProgressBar();
    this.learnerService.getOutClass(this.classId).subscribe((result: any) => {
      this.learnerOutClass = result;
      this.loadTablesOutClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public getLearnerInClass() {
    this.startProgressBar();
    this.learnerService.getInClass(this.classId).subscribe((result: any) => {
      this.learnerInClass = result;
      this.loadTablesInClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTablesOutClass(data: any) {
    this.dataSourceOutClass = new MatTableDataSource(data);
    this.dataSourceOutClass.paginator = this.paginator;
  }

  public loadTablesInClass(data: any) {
    this.dataSourceInClass = new MatTableDataSource(data);
    this.dataSourceInClass.paginator = this.paginator;
  }

  public createStudyProcess(learnerId: any) {
    this.studyProcess.learnerId = learnerId;
    this.studyProcessService.post_studyProcess(this.studyProcess).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lớp', 'Thêm học viên thành công!'); });
      this.getLearnerOutClass();
      this.getLearnerInClass();
      this.load_infor_languageClasses(this.classId);
    }, error => {
      this.notificationService.showNotification(3, 'Xếp lớp', 'Lỗi, Thêm học viên không thành công!');
    });
  }

  public deleteStudyProcess(learnerId: any) {
    this.studyProcessService.delete_studyProcess_byLearnerId(this.studyProcess.languageClassId, learnerId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lớp', 'Xóa học viên thành công!'); });
      this.getLearnerOutClass();
      this.getLearnerInClass();
      this.load_infor_languageClasses(this.classId);
    }, error => {
      this.notificationService.showNotification(3, 'Xếp lớp', 'Lỗi, Xóa không thành công!');
      this.stopProgressBar();
    });
  }

  ////////////// Infor lớp học
  public load_infor_languageClasses(classId) {
    this.languageClassesService.getById(classId).subscribe((result: any) => {
      this.class.name = result.name;

      const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
      const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
      this.class.courseFee = result.courseFee;
      this.class.monthlyFee = result.monthlyFee;
      this.class.lessonFee = result.lessonFee;
      this.class.startDay = startDate;
      this.class.endDay = endDate;
      this.class.status = result.status;
      this.class.courseId = result.courseId;
      this.class.note = result.note;
      this.load_total(classId);
      this.load_CourseName(result.courseId);
    }, error => {
    });
  }

  public load_total(classId) {
    // tslint:disable-next-line: triple-equals
    this.studyProcessService.search_studyProcess(classId, '', 1).subscribe((result: any) => {
      this.class.total = result.length;
    }, error => {
    });
  }

  public load_CourseName(courseId: number) {
    // tslint:disable-next-line: triple-equals
    this.courseService.findCourseId(courseId).subscribe((result: any) => {
      this.class.courseName = result.name;
    }, error => {
    });
  }

  public loadFind() {
    // tslint:disable-next-line: triple-equals
    if (this.keyword == '') {
      this.getLearnerOutClass();
    } else {
      this.findOutClass();
    }
  }

  public findOutClass() {
    this.startProgressBar();
    this.learnerService.getOutClassWithCondition(this.classId, this.keyword).subscribe((result: any) => {
      this.learnerOutClass = result;
      this.loadTablesOutClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }




  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
