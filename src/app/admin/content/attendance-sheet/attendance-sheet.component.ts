import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LearnerService } from '../../services/learner.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { MatSelectionList } from '@angular/material/list';
import { AddAttendanceDialogComponent } from './dialog/add-attendance-dialog/add-attendance-dialog.component';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {
  showProgressBar = false;

  @ViewChild('learners', { static: true, read: MatSelectionList }) learners: MatSelectionList;
  public floatLabel = 'always';
  public isOpenDialog = false;
  public iconMale = '../../../../assets/admin/dist/img/gender/boy.png';
  public iconFemale = '../../../../assets/admin/dist/img/gender/girl.png';
  public currentClassId;
  public currentDate = new Date();

  public classes;

  public learnersSource;

  public inforClass = {
    maleNumber: 0,
    femaleNumber: 0,
    totalNumber: 0
  };

  public checkedLearners = [];
  public checkedAll = false;
  constructor(
    public learnerService: LearnerService,
    public languageClassesService: LanguageClassesService,

    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
  }

  ngOnInit() {
    this.getAllClasses();
  }

  public createAttendanceDialog() {

    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.matDialog.open(AddAttendanceDialogComponent, {
        width: `50vh`,
        data: {
        },
      });
      dialogRef.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }

      });
    }
  }

  public changeCurrentDate(date) {

  }

  public getAllLearnerInClass(classId) {
    this.learnerService.getFullLearningByClass(classId).subscribe((result: any[]) => {
      this.learnersSource = result;
      console.log(result);
      this.getInfoClass(result);
    }, error => {

    });

  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
      this.currentClassId = result[0].Id;
    }, error => {

    });
  }

  public getInfoClass(learners: any[]) {
    this.inforClass = {
      maleNumber: 0,
      femaleNumber: 0,
      totalNumber: 0
    };
    this.inforClass.totalNumber = learners.length;
    learners.forEach(element => {
      if (element.sex === true) {
        this.inforClass.maleNumber++;
      } else {
        this.inforClass.maleNumber++;
      }
    });
  }

  public changeClass(classId) {
    console.log(classId);
    this.getAllLearnerInClass(classId);
  }

  public getYear(date: Date) {
    return date.getFullYear();
  }

  public getIconGender(gender: boolean) {
    if (gender === true) {
      return 'fas fa-mars fa-2x';
    } else {
      return 'fas fa-venus fa-2x';
    }
  }

  public selectionChange(event, selectedOptions) {
    this.checkedLearners = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedOptions.length; i++) {
      if ('allSelection' === selectedOptions[i].value) {
        continue;
      }
      this.checkedLearners.push(selectedOptions[i].value);
    }
  }

  public changeAllSelection() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll === true) {
      this.learners.selectAll();
      this.checkedLearners = [];

      this.learnersSource.forEach(element => {
        this.checkedLearners.push(element.ID);
      });
    } else {
      this.learners.deselectAll();
      this.checkedLearners = [];
    }
  }
}
