import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from './../../services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReceiptTypeComponent } from './dialog/add-receipt-type/add-receipt-type.component';
import { EditReceiptTypeComponent } from './dialog/edit-receipt-type/edit-receipt-type.component';
import { ReceiptTypeService } from '../../services/receipt-type.service';
import { NotificationService } from '../../services/extension/notification.service';
@Component({
  selector: 'app-receipt-types',
  templateUrl: './receipt-types.component.html',
  styleUrls: ['./receipt-types.component.css']
})
export class ReceiptTypesComponent implements OnInit {

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public receiptTypes;

  public status = [];

  public isOpenDialog = false;

  public pageSizeOptions = [10, 15, 20, 30];

  public keyWord = '';
  public statusSelected = 2;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private receiptTypeService: ReceiptTypeService,
    public matDialog: MatDialog,
    private loginService: LoginService,
    private notificationService: NotificationService,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.getReceiptTypes();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getReceiptTypes() {
    this.startProgressBar();
    this.receiptTypeService.getAllReceiptType().subscribe((result: []) => {
      this.loadTables(result);
      this.receiptTypes = result;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
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
  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.receiptTypes);

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(AddReceiptTypeComponent, {
        width: `${widthMachine}px`,
        data: {
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getReceiptTypes();
      });
    }
  }

  public openEditReceiptType(receiptType: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(EditReceiptTypeComponent,
        {
          width: `${widthMachine}px`,
          data: { _receiptType: receiptType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getReceiptTypes();
          }
        });
    }
  }

  public deleteReceiptType(receiptTypeId: number) {
    this.startProgressBar();
    this.isOpenDialog = true;
    this.receiptTypeService.deleteReceiptType(receiptTypeId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Loại thu', 'Xóa loại thu thành công!'); });
      this.getReceiptTypes();
      this.isOpenDialog = false;
    }, error => {
      this.notificationService.showNotification(3, 'Loại thu', 'Lỗi, Xóa không thành công!');
      this.stopProgressBar();
    });
  }

  public find_ReceiptType() {

  }

  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }

}
