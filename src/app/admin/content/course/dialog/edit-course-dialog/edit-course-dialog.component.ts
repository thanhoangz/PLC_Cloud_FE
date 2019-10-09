import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {


  public course = {
    id: 0,
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
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private dataService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getAllStatus();

    this.course.name = this.data._course.name;
    this.course.price = this.data._course.price;
    this.course.content = this.data._course.content;
    this.course.traingTime = this.data._course.traingTime;
    this.course.numberOfSession = this.data._course.numberOfSession;
    this.course.status = this.data._course.status;
    this.course.note = this.data._course.note;
    this.statusSelected = this.data._course.status;
    this.course.id = this.data._course.id;
  }

  public updateCourse() {

    this.dataService.putCourse(this.course).subscribe(result => {
      setTimeout(() => this.toastrService.success('Cập nhập thành công !', 'Dữ liệu khóa học'));
    }, error => {

    });
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 0
      },
      {
        name: 'Ngừng hoạt động',
        value: 1
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
