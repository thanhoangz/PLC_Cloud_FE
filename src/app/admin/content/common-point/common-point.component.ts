import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { DetailStudyprocessComponent } from '../study-process/dialog/detail-studyprocess/detail-studyprocess.component';
import { EditStudyprocessComponent } from '../study-process/dialog/edit-studyprocess/edit-studyprocess.component';
import { ChangeClassComponent } from '../study-process/dialog/change-class/change-class.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PeriodicPointDeltailService } from '../../services/periodic-point-deltail.service';
import { PeriodicPointService } from '../../services/periodic-point.service';
import { ToastrService } from 'ngx-toastr';
import { CreatPointComponent } from './dialog/creat-point/creat-point.component';

@Component({
  selector: 'app-common-point',
  templateUrl: './common-point.component.html',
  styleUrls: ['./common-point.component.css']
})
export class CommonPointComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;

  public length = 100;
  public pageSize = 20;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20, 30, 50];

  public isOpenDialog = false;


  public weekSelected;

  public periodicPointDetail = [];
  public periodicPoint;


  public classMessageId;

  // public learnerId;
  public classList;

  // get name class and name week
  public weekName: number;
  public lecturerName;
  public lecturerId;

  public dateOnPoint;



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
    maxNumber: null,
    note: null,
  };

  // tslint:disable-next-line: max-line-length
  public displayedColumns: string[] = ['index', 'learnerCardId', 'learnerName', 'learnerSex', 'learnerBriday', 'point', 'averagePoint', 'sortedByPoint', 'sortedByAveragePoint', 'note'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.periodicPointDetail);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private periodicPointDeltailService: PeriodicPointDeltailService,
    private periodicPointService: PeriodicPointService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
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
      this.classMessageId = message;
    });

    this.getPeriodicWeek();
    this.getAllClass();
    this.load_infor_Classes(this.classMessageId);
    // this.getPeriodicDetail();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  public getPeriodicWeek() {
    if (this.classMessageId != null) {
      this.periodicPointService.getPeriodicPointConditions(this.classMessageId).subscribe((result: any) => {
        this.periodicPoint = result;
        console.log(this.periodicPoint);
      }, error => {
      });
    }
  }
  /// để lấy tên tuần gán ngoài html
  public getPeriodicId() {
    this.periodicPointService.getByPeriodicPointId(this.weekSelected).subscribe((result: any) => {
      this.weekName = result.week;
      this.lecturerName = result.lecturerName;
      this.dateOnPoint = result.dateOnPoint;
      console.log(this.weekName);
      console.log(this.lecturerName);
      console.log(this.dateOnPoint);

    }, error => {
    });
  }
  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public loadClassList() {
    this.load_infor_Classes(this.classMessageId);
    this.weekSelected = 0;
    this.getPeriodicWeek();
    this.getPeriodicDetail();
    console.log(this.weekSelected);
  }

  public getPeriodicDetail() {
    // if  (this.weekSelected != null) {
    this.periodicPointDeltailService.getPeriodicPointDeltailConditions(this.weekSelected).subscribe((result: any) => {
      this.loadTables(result);
      this.periodicPointDetail = result;
      console.log(this.periodicPointDetail);

    }, error => {
    });
  }
  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  // change bảng điểm định kỳ chi tiết
  public reloadTable() {
    this.getPeriodicDetail();
    this.getPeriodicId();
    console.log(this.periodicPointDetail);
    console.log(this.weekSelected);

  }

  public CreatPeriodicPoint() {
    if (!this.isOpenDialog) {
      if (this.classMessageId == null) {
        this.notificationService.showNotification(3, 'Điểm', 'Lỗi, Hãy chọn lớp học!');
      }
      // tslint:disable-next-line: one-line
      else {
        this.isOpenDialog = true;
        const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
        this.matDialog.open(CreatPointComponent, {
          width: `${widthMachine}px`,
          data: {
            classId: this.classMessageId
          },
          disableClose: false
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.periodicPointDeltailService.addPeriodicPointDeltailCondition().subscribe(done => {
            }, error => {
            });
            this.getPeriodicWeek();           }
        });
      }
    }
  }
  ////////////// Infor lớp học của thằng Phương k quan tâm
  public load_infor_Classes(classMessageId) {
    // tslint:disable-next-line: triple-equals
    if (this.classMessageId != null) {
      this.languageClassesService.getById(classMessageId).subscribe((result: any) => {
        this.class.name = result.name;                                                         //   tên khóa học
        const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
        const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
        this.class.startDay = startDate;                                                      // ngày bắt đầu
        this.class.endDay = endDate;
        this.class.courseFee = result.courseFee;
        this.class.monthlyFee = result.monthlyFee;
        this.class.lessonFee = result.lessonFee;
        this.class.status = result.status;  // tình trạng
        this.class.courseId = result.courseId;  // mã khóa học
        this.class.note = result.note;
        this.class.maxNumber = result.maxNumber;
        this.load_total(classMessageId);
        this.load_CourseName(result.courseId);
      }, error => {
      });
    }
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

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }
///////////////////////////////////////////////////////////////////////////////////////////////////
// chỉ nhập số
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  public updatePeriodicPoint(periodicDetail) {
    this.periodicPointDeltailService.putPeriodicPointDeltail(periodicDetail, this.classMessageId).subscribe(result => {
      console.log('success');
      this.getPeriodicDetail();
    }, error => {
    });
  }

}
