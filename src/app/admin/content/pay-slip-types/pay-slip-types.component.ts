import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPaysliptypeDialogComponent } from './dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';
import { EditPaysliptypeDialogComponent } from './dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { PaySlipTypeService } from '../../services/pay-slip-type.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-pay-slip-types',
  templateUrl: './pay-slip-types.component.html',
  styleUrls: ['./pay-slip-types.component.css']
})
export class PaySlipTypesComponent implements OnInit {

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public paySlipType ;
  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = 2;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.paySlipType);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private paySlipTypesServies: PaySlipTypeService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.getPaySlipTypes();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getPaySlipTypes() {
    this.startProgressBar();
    this.paySlipTypesServies.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
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
        code: -1
      }];
  }


  public openCreate_PaySlipType() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      console.log(widthMachine);
      this.matDialog.open(AddPaysliptypeDialogComponent, {
        width:  `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getPaySlipTypes();
      });
    }
  }

  public openEdit_PaySlipType(paySlipType: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditPaysliptypeDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _paySlipType: paySlipType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getPaySlipTypes();
          }
        });
    }
  }

  public delete_PaySlipType(paySlipTypeId: number) {
    this.startProgressBar();
    this.isOpenDialog = true;
    this.paySlipTypesServies.deletePaySlipType(paySlipTypeId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Loại chi', 'Xóa loại chi thành công!'); });
      this.getPaySlipTypes();
      this.isOpenDialog = false;
    }, error => {
      this.notificationService.showNotification(3, 'Loại chi', 'Lỗi, Xóa không thành công!');
      this.stopProgressBar();
    });
  }


  public find_PaySlipType() {

    this.startProgressBar();
    this.paySlipTypesServies.searchPaySlipType(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.paySlipType = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Loại chi', 'Lỗi, tìm kiếm thất bại!');
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
