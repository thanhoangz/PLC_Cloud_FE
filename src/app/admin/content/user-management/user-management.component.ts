import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserManagementComponent implements OnInit {

  public users = null;

  dataSource = this.users;
  columnsToDisplay = ['STT', 'Tên tài khoản', 'Trạng thái', 'Ngày tạo'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;

  constructor(
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.getAllUsers();
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }



  public getAllUsers() {
    this.startProgressBar();
    this.userService.getAllUser().subscribe(result => {
      this.users = result;
      console.log(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }
}

