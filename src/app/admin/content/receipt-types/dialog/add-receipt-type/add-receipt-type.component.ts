import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';

@Component({
  selector: 'app-add-receipt-type',
  templateUrl: './add-receipt-type.component.html',
  styleUrls: ['./add-receipt-type.component.css']
})
export class AddReceiptTypeComponent implements OnInit {
  public recepiptType = {
    name: '',
    status: null,
    note: ''
  };


  public status = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddReceiptTypeComponent>,
    private receiptTypeService: ReceiptTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService,
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
        name: 'Ngừng hoạt động',
        value: 0
      }
    ];
  }

  public createReceiptType() {
    this.receiptTypeService.postReceiptType(this.recepiptType).subscribe(result => {
      setTimeout(() => this.toastrService.success('Thêm mới thành công !', 'Dữ liệu loại thu'));
    });
  }
}
