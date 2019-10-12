import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AddPaysliptypeDialogComponent } from './dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';
import { EditPaysliptypeDialogComponent } from './dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';
import { DetailPaysliptypeDialogComponent } from './dialog/detail-paysliptype-dialog/detail-paysliptype-dialog.component';

import { PaySlipTypeService } from '../../services/pay-slip-type.service';

@Component({
  selector: 'app-pay-slip-types',
  templateUrl: './pay-slip-types.component.html',
  styleUrls: ['./pay-slip-types.component.css']
})
export class PaySlipTypesComponent implements OnInit {

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

  constructor(
    private courseServies: PaySlipTypeService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getPaySlipTypes();
    this.getAllStatus();
  }

  public getPaySlipTypes() {
    this.courseServies.getAllPaySlipTypes().subscribe((result: []) => {
      this.paySlipType = result;
      this.loadTables();
    });
  }

  public loadTables() {
    this.dataSource = new MatTableDataSource(this.paySlipType);
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
      const createDialog = this.matDialog.open(AddPaysliptypeDialogComponent, {
        width: '50%',
        data: {
        }
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getPaySlipTypes();
      });
    }
  }

  public openEdit_PaySlipType(paySlipType: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(EditPaysliptypeDialogComponent,
        {
          width: '50%',
          data: { _paySlipType: paySlipType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getPaySlipTypes();
        });
    }
  }

  public delete_PaySlipType(paySlipTypeId: number) {
    console.log(paySlipTypeId);
    this.courseServies.deletePaySlipType(paySlipTypeId).subscribe(result => {
      setTimeout(() => this.toastr.success('Xóa loại chi thành công !', 'Dữ liệu loại chi'));
      this.getPaySlipTypes();
    });
  }

  public openDetail_PaySlipType(paySlipType: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(DetailPaysliptypeDialogComponent,
        {
          width: '50%',
          data: { _paySlipType: paySlipType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getPaySlipTypes();
        });
    }
  }

  public find_PaySlipType() {
    console.log(this.keyWord);
    this.courseServies.searchPaySlipType(this.keyWord, this.statusSelected, this.pageSize, this.pageIndex).subscribe(result => {
      console.log(result);
    }, error => {
    });
  }


}
