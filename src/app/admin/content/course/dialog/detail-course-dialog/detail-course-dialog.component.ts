import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-course-dialog',
  templateUrl: './detail-course-dialog.component.html',
  styleUrls: ['./detail-course-dialog.component.css']
})
export class DetailCourseDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailCourseDialogComponent>,
    private dataService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

}
