import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  public class = {
    id: '',
    name: '',
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
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
    private dialogRef: MatDialogRef<EditClassComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) {
    this.setData();
  }

  ngOnInit() {
    this.getAllStatus();
    this.getCourses();
  }

  public setData() {
    this.class.id = this.data._class.id;
    this.class.name = this.data._class.name;
    this.class.courseFee = this.data._class.courseFee;
    this.class.monthlyFee = this.data._class.monthlyFee;
    this.class.lessonFee = this.data._class.lessonFee;
    this.class.startDay = this.data._class.startDay;
    this.class.endDay = this.data._class.endDay;
    this.class.status = this.data._class.status;
    this.class.note = this.data._class.note;
    this.class.courseId = this.data._class.courseId;
  }

  public getCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
    }, error => {
    });
  }

  public updateClass() {
    this.languageClassesService.putLanguageClass(this.class).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Cập nhật lớp học thành công!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, không cập nhật thành công!');
    });
  }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Kết thúc',
        value: 0
      },
      {
        name: 'Đã đầy',
        value: 2
      }
    ];
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
