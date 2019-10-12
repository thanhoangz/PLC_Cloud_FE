import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/admin/services/classroom.service';

@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrls: ['./add-class-room.component.css']
})
export class AddClassRoomComponent implements OnInit {
  public classRoom = {
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddClassRoomComponent>,
    private classroomService: ClassroomService,
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
        value: 1
      },
      {
        name: 'Khóa',
        value: 0
      }
    ];
  }

  public createClassRoom() {
    this.classroomService.postClassRoom(this.classRoom).subscribe(result => {
      setTimeout(() => this.toastrService.success('Thêm mới thành công !', 'Dữ liệu phòng học'));
    });
  }
}
