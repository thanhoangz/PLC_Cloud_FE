import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {

  public course = {
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
    private dataService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllStatus();
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

  public createCourse() {
    this.dataService.postCourse(this.course).subscribe(result => {
      setTimeout(() => this.toastrService.success('Thêm mới thành công !', 'Dữ liệu khóa học'));
    });
  }


}
