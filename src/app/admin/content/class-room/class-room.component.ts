import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddClassRoomComponent } from './dialog/add-class-room/add-class-room.component';
import { EditClassRoomComponent } from './dialog/edit-class-room/edit-class-room.component';
import { ClassroomService } from '../../services/classroom.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.css']
})
export class ClassRoomComponent implements OnInit {

  public classRooms = [];

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = null;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.classRooms);
  constructor(
    private classroomService: ClassroomService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
  }

  ngOnInit() {

    this.getClassRooms();
    this.getAllStatus();
  }

  public getClassRooms() {
    this.classroomService.getAllClassRoom().subscribe((result: []) => {
      this.loadTables(result);
      this.classRooms = result;
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }

  public getAllStatus() {
    this.status = [
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Khóa',
        code: 0
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const createDialog = this.matDialog.open(AddClassRoomComponent, {
        width: '50%',
        data: {
        }
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getClassRooms();
      });
    }
  }

  public openEditClassRoom(classRoom: any) {
    console.log(this.isOpenDialog);
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(EditClassRoomComponent,
        {
          width: '50%',
          data: { _classRoom: classRoom }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getClassRooms();
        });
    }
  }

  public deleteClassRoom(classRoomId: number) {
    console.log(classRoomId);
    this.classroomService.deleteClassRoom(classRoomId).subscribe(result => {
      setTimeout(() => this.toastr.success('Xóa phòng học thành công !', 'Dữ liệu phòng học'));
      this.getClassRooms();
    });
  }
}
