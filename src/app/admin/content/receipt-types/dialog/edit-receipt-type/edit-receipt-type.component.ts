import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
@Component({
  selector: 'app-edit-receipt-type',
  templateUrl: './edit-receipt-type.component.html',
  styleUrls: ['./edit-receipt-type.component.css']
})
export class EditReceiptTypeComponent implements OnInit {

  public receiptType = {
    id: null,
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditReceiptTypeComponent>,
    private receiptTypeService: ReceiptTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService

  ) {

  }

  ngOnInit() {
    this.getAllStatus();
    this.receiptType.name = this.data._receiptType.name;
    this.receiptType.status = this.data._receiptType.status;
    this.receiptType.note = this.data._receiptType.note;
    this.receiptType.id = this.data._receiptType.id;
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

  public updateReceiptType() {

    this.receiptTypeService.putReceiptType(this.receiptType).subscribe(result => {
      setTimeout(() => this.toastrService.success('Update thành công !', 'Dữ liệu loại thu'));
    }, error => {
    });
  }
}
