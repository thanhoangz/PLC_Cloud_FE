import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AddPaysliptypeDialogComponent } from './dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';
import { EditPaysliptypeDialogComponent } from './dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';

import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { PaySlipTypeService } from '../../services/pay-slip-type.service';

@Component({
  selector: 'app-pay-slip-types',
  templateUrl: './pay-slip-types.component.html',
  styleUrls: ['./pay-slip-types.component.css']
})
export class PaySlipTypesComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;

  public paySlipType = [];
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
  public dataSource = new MatTableDataSource(this.paySlipType);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private paySlipTypesServies: PaySlipTypeService,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.getPaySlipTypes();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getPaySlipTypes() {
    this.paySlipTypesServies.getAllPaySlipTypes().subscribe((result: []) => {
      this.paySlipType = result;
      this.loadTables();
    });
  }

  public loadTables() {
    this.dataSource = new MatTableDataSource(this.paySlipType);
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
        code: 2
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
          this.getPaySlipTypes();
        });
    }
  }

  public delete_PaySlipType(paySlipTypeId: number) {
    this.paySlipTypesServies.deletePaySlipType(paySlipTypeId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Loại chi', 'Xóa loại chi thành công!'); });
      this.getPaySlipTypes();
    }, error => {
      this.notificationService.showNotification(3, 'Loại chi', 'Lỗi, Xóa không thành công!');
    });
  }


  public find_PaySlipType() {
    console.log(this.keyWord);
    this.paySlipTypesServies.searchPaySlipType(this.keyWord, this.statusSelected, this.pageSize, this.pageIndex).subscribe(result => {
      console.log(result);
    }, error => {
    });
  }


}
