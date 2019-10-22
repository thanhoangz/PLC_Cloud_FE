import { EditGuestDialogComponent } from './dialog/edit-guest-dialog/edit-guest-dialog.component';
import { AddGuestDialogComponent } from './dialog/add-guest-dialog/add-guest-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { GuestTypeService } from '../../services/guest-type.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-guest-type',
  templateUrl: './guest-type.component.html',
  styleUrls: ['./guest-type.component.css']
})
export class GuestTypeComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = true;
  public status;
  public keyWord = '';
  public statusSelected = null;

  public guestTypes;
  public pageSizeOptions = [10, 15, 20];
  public isOpenDialog = false;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.guestTypes);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private guestTypeService: GuestTypeService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  private getAllStatus() {
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

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public getGuestTypes() {
    this.startProgressBar();
    this.guestTypeService.getAllGuestTypes().subscribe(result => {
      this.guestTypes = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(AddGuestDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getGuestTypes();
        }
      });
    }
  }

  public openEditGuestType(guest: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditGuestDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _guest: guest }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getGuestTypes();
          }
        });
    }
  }

  public deleteGuestType(guestId: number) {
    this.guestTypeService.deleteGuestType(guestId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Đối tượng', 'Xóa đối tượng thành công!'); });
      this.getGuestTypes();
    }, error => {
      this.notificationService.showNotification(3, 'Đối tượng', 'Lỗi, xóa thất bại!');
      this.stopProgressBar();
    });
  }

  public searchGuestType() {
    this.startProgressBar();
    this.guestTypeService.searchGuestType(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.guestTypes = result;
        this.loadTables(result);
        this.stopProgressBar();
      }
      this.stopProgressBar();
    }, error => {
      this.notificationService.showNotification(3, 'Đối tượng', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getGuestTypes();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }


  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
