import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LoginService } from 'src/app/admin/services/login.service';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {


  screenHeight: any;
  screenWidth: any;
  public status = [];

  public statusSelected;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
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
}
