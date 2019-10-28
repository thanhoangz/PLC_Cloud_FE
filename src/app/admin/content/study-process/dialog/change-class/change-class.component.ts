import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { StudyProcessService } from 'src/app/admin/services/study-process.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { CourseService } from 'src/app/admin/services/course.service';
@Component({
  selector: 'app-change-class',
  templateUrl: './change-class.component.html',
  styleUrls: ['./change-class.component.css']
})
export class ChangeClassComponent implements OnInit {

  public studyProcess;  // infor HV                          => xong
  public oldClass = null;               // infor Lớp cũ             => xong
  public oldCourse = null;             // infor khóa học tương ứng  => xong
  public classList = null;
  public newClass;          // lớp mới
  public newCourse;         // khóa học mới
  public tempClassId;
  // no hope
  public receiptsDetail;           // find list by classId and learnerId   : lấy tổng số tiền đã đóng
  public tienConLai;
  public tienPhaiDong;

  public tempDisable = false;
  public status = [];
  public statusClass;
  public startDay1;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ChangeClassComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,

  ) {
    this.setData();
    this.findOldClass();
  //  this.findNewClass();
  }

  ngOnInit() {
    this.findClassByStatus( this.studyProcess.languageClassId);  // lớp có trạng thái 1,2 và khác mã lớp hiện tại
  }

  public setData() {
    // this.studyProcess = this.data._learnerInClass;
    this.studyProcess = JSON.stringify(this.data._learnerInClass);
    this.studyProcess = JSON.parse(this.studyProcess);
  }

  // find Class by id and Course
  public findOldClass() {
    this.languageClassesService.getById(this.studyProcess.languageClassId).subscribe(result => {
      this.oldClass = result;
      this.newClass = result;
      this.findOldCourse();
  //    this.tempClassId = this.studyProcess.languageClassId;
    });
  }
  public findOldCourse() {
    this.courseService.findCourseId(this.oldClass.courseId).subscribe(result => {
      this.oldCourse = result;
      this.newCourse = result;
    });
  }

  public findClassByStatus( id) { // load lên danh sách lớp : có status =1 và 2, khác mã lớp hiện tại ( khác mã lớp đã học) viết BE.
    this.languageClassesService.getClassStatus12(id).subscribe(result => {
      this.classList = result;
    });
  }

  public inforNewClass() {
    this.findNewClass();
    this.tempDisable = true;          // = true thì ms chuyển lớp
  }

// find Class by id and Course
  public findNewClass() {
    this.languageClassesService.getById(this.tempClassId).subscribe(result => {
    this.newClass = result;
    this.findNewCourse();
    });
  }

  public findNewCourse() {
    this.courseService.findCourseId(this.newClass.courseId).subscribe(result => {
      this.newCourse = result;
    });
  }

}

