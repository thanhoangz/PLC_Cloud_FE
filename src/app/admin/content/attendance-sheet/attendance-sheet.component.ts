import { AttendanceSheetService } from 'src/app/admin/services/attendance-sheet.service';
import { ConstService } from './../../services/extension/Const.service';
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
import { AttendanceSheetDetailService } from '../../services/attendance-sheet-detail.service';
import { DatePipe } from '@angular/common';

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
  public notCheckedLearners = [];
  public checkedAll = false;

  public statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
  public currentAttendance;
  public attendanceSheetDetails = [];
  constructor(
    public learnerService: LearnerService,
    public languageClassesService: LanguageClassesService,
    public attendanceSheetDetailService: AttendanceSheetDetailService,
    public attendanceSheetService: AttendanceSheetService,

    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
    public datepipe: DatePipe,
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
          _user: ConstService.user
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
    const dateSelected = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.checkCreatedAttendance(this.currentClassId, dateSelected);



  }

  public getAllLearnerInClass(classId) {
    this.learnerService.getFullLearningByClass(classId).subscribe((result: any[]) => {
      this.learnersSource = result;
      this.getInfoClass(result);
    }, error => {

    });

  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
      this.currentClassId = result[0].id;
      const dateSelected = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
      this.checkCreatedAttendance(result[0].id, dateSelected);
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

    const dateSelected = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.checkCreatedAttendance(classId, dateSelected);

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
      this.checkedLearners.push({
        learnerId: selectedOptions[i].value,
        languageClassId: this.currentClassId,
        attendanceSheetId: this.currentAttendance.id,
      });
    }

  }

  public changeAllSelection() {
    this.checkedAll = !this.checkedAll;
    if (this.checkedAll === true) {
      this.learners.selectAll();
      this.checkedLearners = [];

      this.learnersSource.forEach(element => {
        this.checkedLearners.push({
          learnerId: element.id,
          languageClassId: this.currentClassId,
          attendanceSheetId: this.currentAttendance.id
        });
      });
    } else {
      this.learners.deselectAll();
      this.checkedLearners = [];
    }
  }

  public updateAttendance() {
    this.notCheckedLearners = [];
    // tslint:disable-next-line: no-shadowed-variable
    this.learnersSource.forEach(element => {
      this.notCheckedLearners.push({
        learnerId: element.id,
        languageClassId: this.currentClassId,
        attendanceSheetId: this.currentAttendance.id
      });
    });

    this.checkedLearners.forEach((selected: any) => {
      this.notCheckedLearners.forEach((notSelected: any) => {
        if (selected.learnerId === notSelected.learnerId) {
          this.notCheckedLearners.splice(this.notCheckedLearners.indexOf(notSelected), 1);
        }
      });
    });

    this.attendanceSheetDetailService.postAttendanceDetail(this.checkedLearners).subscribe(result => {

    }, error => { });

    this.attendanceSheetDetailService.deleteAttendanceDetails(this.notCheckedLearners).subscribe(data => {
      this.notificationService.showNotification(1, '', 'Cập nhật thành công!');
    }, error => { this.notificationService.showNotification(3, '', 'Vui lòng thử lại sau!'); });
  }

  public checkCreatedAttendance(classId, date) {
    this.attendanceSheetService.getByDateClass(classId, date).subscribe((result: any) => {
      if (result) {
        this.currentAttendance = result;
        this.getAllAttendanceDetails(result.id);
        this.statusOfCurrentAttendance = 'Đã có phiếu điểm danh';
      } else {
        this.statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
      }

    }, error => {
      this.statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
      this.getAllAttendanceDetails(this);
    });
  }

  /* Get chi tiết điểm danh theo bảng điểm danh */
  public getAllAttendanceDetails(attendanceId) {
    this.attendanceSheetDetailService.getAttendanceDetailsByAttendance(attendanceId).subscribe((result: any[]) => {
      this.attendanceSheetDetails = result;
      console.log(result);
      this.getAllLearnerInClass(this.currentClassId);
    }, error => { });

  }

  public isChecked(learnerId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.attendanceSheetDetails.length; i++) {
      if (learnerId === this.attendanceSheetDetails[i].learnerId) {
        return true;
      }
    }
    return false;
  }


  public resetAll() {


    this.learnersSource = [];
    this.inforClass = {
      maleNumber: 0,
      femaleNumber: 0,
      totalNumber: 0
    };
    this.checkedAll = false;
    this.statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
    this.currentAttendance = null;
    this.attendanceSheetDetails = [];
  }

  /* Điểm danh ké cho học viên lớp khác */
  public rollCallOutClass() {
    this.confirmService.openDeleteConfirmDialog();
  }
}