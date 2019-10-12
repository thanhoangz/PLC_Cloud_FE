import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReceiptTypeComponent } from './dialog/add-receipt-type/add-receipt-type.component';
import { from } from 'rxjs';
import { EditReceiptTypeComponent } from './dialog/edit-receipt-type/edit-receipt-type.component';
import { ReceiptTypeService } from '../../services/receipt-type.service';

@Component({
  selector: 'app-receipt-types',
  templateUrl: './receipt-types.component.html',
  styleUrls: ['./receipt-types.component.css']
})
export class ReceiptTypesComponent implements OnInit {


  public receiptTypes = [];

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = null;

  constructor(
    private receiptTypeService: ReceiptTypeService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getReceiptTypes();
    this.getAllStatus();
  }

  public getReceiptTypes() {
    this.receiptTypeService.getAllReceiptType().subscribe((result: []) => {
      this.loadTables(result);
      this.receiptTypes = result;
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
  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.receiptTypes);

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const createDialog = this.matDialog.open(AddReceiptTypeComponent, {
        width: '50%',
        data: {
        }
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getReceiptTypes();
      });
    }
  }

  public openEditReceiptType(receiptType: any) {
    console.log(this.isOpenDialog);
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(EditReceiptTypeComponent,
        {
          width: '50%',
          data: { _receiptType: receiptType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getReceiptTypes();
        });
    }
  }

  public deleteReceiptType(receiptTypeId: number) {
    console.log(receiptTypeId);
    this.receiptTypeService.deleteReceiptType(receiptTypeId).subscribe(result => {
      setTimeout(() => this.toastr.success('Xóa loại thu thành công !', 'Dữ liệu loại thu'));
      this.getReceiptTypes();
    });
  }

  public findReceiptType() {

      console.log(this.keyWord);
      this.receiptTypeService.searchReceiptType(this.keyWord, this.pageSize, this.pageIndex).subscribe(result => {
        console.log(result);
      }, error => {
      });

  }

}
