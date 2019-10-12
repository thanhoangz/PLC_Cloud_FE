
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';

@Component({
  selector: 'app-edit-paysliptype-dialog',
  templateUrl: './edit-paysliptype-dialog.component.html',
  styleUrls: ['./edit-paysliptype-dialog.component.css']
})
export class EditPaysliptypeDialogComponent implements OnInit {

  public paysliptype = {
    id: 0,
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditPaysliptypeDialogComponent>,
    private paySlipTypeService: PaySlipTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getAllStatus();

    this.paysliptype.name = this.data._paySlipType.name;
    this.paysliptype.status = this.data._paySlipType.status;
    this.paysliptype.note = this.data._paySlipType.note;
    this.statusSelected = this.data._paySlipType.status;
    this.paysliptype.id = this.data._paySlipType.id;
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

  public update_Paysliptype() {

    this.paySlipTypeService.putPaySlipType(this.paysliptype).subscribe(result => {
      setTimeout(() => this.toastrService.success('Cập nhật thành công !', 'Dữ liệu loại chi'));
    }, error => {

    });
  }
}
