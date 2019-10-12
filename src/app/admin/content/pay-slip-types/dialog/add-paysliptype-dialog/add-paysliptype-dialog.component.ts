
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';

@Component({
  selector: 'app-add-paysliptype-dialog',
  templateUrl: './add-paysliptype-dialog.component.html',
  styleUrls: ['./add-paysliptype-dialog.component.css']
})
export class AddPaysliptypeDialogComponent implements OnInit {

  public Paysliptype = {
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddPaysliptypeDialogComponent>,
    private paySlipTypeService: PaySlipTypeService,
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
        value: 0
      },
      {
        name: 'Ngừng hoạt động',
        value: 1
      }
    ];
  }

  public create_Paysliptype() {
    this.paySlipTypeService.postPaySlipType(this.Paysliptype).subscribe(result => {
      setTimeout(() => this.toastrService.success('Thêm mới thành công !', 'Dữ liệu phiếu chi'));
    });
  }
}
