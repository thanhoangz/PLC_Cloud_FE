import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/admin/services/course.service';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})

export class AddCourseDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public  course = {
    name: '',
    price: null,
    content: '',
    traingTime: null,
    numberOfSession: null,
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.getAllStatus();
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Ngừng hoạt động',
        value: 0
      }
    ];
  }

  public createCourse() {
    console.log(this.course);
    this.courseService.postCourse(this.course).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Tạo thành công khóa học!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, không tạo thành công!');
    });
  }

}
