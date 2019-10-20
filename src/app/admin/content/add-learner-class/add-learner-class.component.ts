import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';

import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';

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
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public learnerOutClass;
  public learnerInClass;
  public class;
  public classId;
  public learnerId;

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

    private notificationService: NotificationService,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.classId = 'LC1';
    this.studyProcess.languageClassId = this.classId;
    this.getLearnerOutClass();
    this.getLearnerInClass();
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
    console.log(this.studyProcess);
    this.studyProcessService.post_studyProcess(this.studyProcess).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lớp', 'Thêm vào lớp thành công!'); });
    }, error => {
      this.notificationService.showNotification(3, 'Xếp lớp', 'Lỗi, Thêm vào lớp không thành công!');
    });
  }
  public testId() {
    console.log();
  }









  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
