import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/admin/services/classroom.service';
@Component({
  selector: 'app-edit-class-room',
  templateUrl: './edit-class-room.component.html',
  styleUrls: ['./edit-class-room.component.css']
})
export class EditClassRoomComponent implements OnInit {

  public classRoom = {
    id: null,
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditClassRoomComponent>,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllStatus();

    this.classRoom.name = this.data._classRoom.name;
    this.classRoom.status = this.data._classRoom.status;
    this.classRoom.note = this.data._classRoom.note;
    this.classRoom.id = this.data._classRoom.id;
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
  public updateClassRoom() {

    this.classroomService.putClassRoom(this.classRoom).subscribe(result => {
      setTimeout(() => this.toastrService.success('Update thành công !', 'Dữ liệu phòng học'));
    }, error => {
    });
  }
}
