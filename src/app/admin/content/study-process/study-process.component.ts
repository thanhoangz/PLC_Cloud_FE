import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { DatePipe } from '@angular/common';

import { CourseService } from '../../services/course.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
@Component({
  selector: 'app-study-process',
  templateUrl: './study-process.component.html',
  styleUrls: ['./study-process.component.css']
})
export class StudyProcessComponent implements OnInit {

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public status = [];
  public tempstatus: number;
  public learnerInClass;
  public classId;
  public learnerId;

  public class = {
    id: null,
    name: null,
    startDay: null,
    endDay: null,
    status: null,
    courseId: null,
    courseName: null,
    total: null,
  };

  // tslint:disable-next-line: member-ordering
  public displayedColumnsInClass: string[] = ['index', 'learnerId', 'name', 'sex', 'birthday', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
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
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }
  /////////////////////// trạng thái của bảng là của studyProcess : 1.đang học : nghỉ :  tạm nghỉ : chuyển lớp : kết thúc
  ngOnInit() {
    this.classId = 'LC1';
    this.tempstatus = 1;
    this.getLearnerInClass();
    this.getAllStatus();
    this.load_infor_Classes(this.classId);
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  applyFilter(filterValue: any) {
    this.dataSourceInClass.filter = filterValue.trim().toLowerCase();
  }

  public getLearnerInClass() {
    this.startProgressBar();
    this.studyProcessService.getAll_byClassId(this.classId, this.tempstatus).subscribe((result: any) => {
      this.learnerInClass = result;
      this.loadTablesInClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTablesInClass(data: any) {
    this.dataSourceInClass = new MatTableDataSource(data);
    this.dataSourceInClass.paginator = this.paginator;
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Tất cả',
        code: 4
      },
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Tạm nghỉ',
        code: 2
      },
      {
        Name: 'Nghỉ',
        code: 0
      },
      {
        Name: 'Chuyển lớp',
        code: 3
      }];
  }

  public loadTable() {
    this.getLearnerInClass();
  }

  ////////////// Infor lớp học
  public load_infor_Classes(classId) {
    // tslint:disable-next-line: triple-equals
    this.languageClassesService.getById(classId).subscribe((result: any) => {
      this.class.name = result.name;                                                         //   tên khóa học
      const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
      const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
      this.class.startDay = startDate;                                                      // ngày bắt đầu
      this.class.endDay = endDate;
      this.class.status = result.status;  // tình trạng
      this.class.courseId = result.courseId;  // mã khóa học
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



  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
