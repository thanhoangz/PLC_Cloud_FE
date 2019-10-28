import { CourseService } from './../../../../services/course.service';
import { LanguageClassesService } from './../../../../services/language-classes.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;

  public Class = {
    name: '',
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
    maxNumber: null,
    startDay: null,
    endDay: null,
    status: null,
    note: '',
    courseId: null
  };

  public courses;
  public status = [];
  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddClassComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.getCourses();
  }

  public getCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
    }, error => {
    });
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
    ];
  }

  public createClass() {
    this.languageClassesService.postLanguageClass(this.Class).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Tạo thành công lớp học!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, không tạo thành công!');
    });
  }

  /*Chỉ cho phép nhập số */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
