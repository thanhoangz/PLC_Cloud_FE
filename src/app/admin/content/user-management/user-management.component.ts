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

  userSource = this.users;
  userColumns = ['index', 'userName', 'status', 'dateCreated'];


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

  public loadUserTables(data: any) {
    this.userSource = new MatTableDataSource(data);
    this.userSource.paginator = this.paginator;
  }



  public getAllUsers() {
    this.startProgressBar();
    this.userService.getAllUser().subscribe(result => {
      this.users = result;
      this.loadUserTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }


  // public openCreateDialog() {
  //   if (!this.isOpenDialog) {
  //     this.isOpenDialog = true;
  //     const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
  //     const dialogRef = this.matDialog.open(AddCourseDialogComponent, {
  //       width: `${widthMachine}px`,
  //       data: {
  //       },
  //       disableClose: false
  //     });
  //     dialogRef.backdropClick().subscribe(_ => {
  //       // Close the dialog
  //       dialogRef.close();
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       this.isOpenDialog = false;
  //       if (result) {
  //         this.getCourses();
  //       }

  //     });
  //   }
  // }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }
}

