import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPayslipDialogComponent } from './dialog/add-payslip-dialog/add-payslip-dialog.component';
import { EditPayslipDialogComponent } from './dialog/edit-payslip-dialog/edit-payslip-dialog.component';
import { DetailPayslipDialogComponent } from './dialog/detail-payslip-dialog/detail-payslip-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { PaySlipService } from '../../services/pay-slip.service';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css']
})
export class PaySlipComponent implements OnInit {

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public paySlip ;
  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = null;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'PaySlipTypeName', 'date', 'receiver', 'total', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.paySlip);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private paySlipServies: PaySlipService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
   }

  ngOnInit() {
    this.getPaySlips();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public getPaySlips() {
    this.startProgressBar();
    this.paySlipServies.getAllPaySlip().subscribe(result => {
      this.paySlip = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Hoàn thành',
        code: 1
      },
      {
        Name: 'Chờ xử lý',
        code: 0
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
  /////////////////////////////////////////////////////////////////
  /* Control */
  public openCreate_PaySlip() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      console.log(widthMachine);
      this.matDialog.open(AddPayslipDialogComponent, {
        width:  `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getPaySlips();
      });
    }
  }

  public openEdit_PaySlip(paySlip: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditPayslipDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _paySlip: paySlip }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getPaySlips();
          }
        });
    }
  }

  public delete_PaySlip(paySlipId: number) {
    this.startProgressBar();
    this.paySlipServies.deletePaySlip(paySlipId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Xóa phiếu chi thành công!'); });
      this.getPaySlips();
    }, error => {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Xóa không thành công!');
      this.stopProgressBar();
    });
  }

  public openDetail_PaySlip(paySlip: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(DetailPayslipDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _paySlip: paySlip }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getPaySlips();
          }
        });
    }
  }

  public find_PaySlip() {

    this.startProgressBar();
    this.paySlipServies.searchPaySlip(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.paySlip = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }

}
