import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditPaysliptypeDialogComponent>,
    private paySliptypeService: PaySlipTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService

  ) {
    this.setData();
  }

  public setData() {
    this.paysliptype.id = this.data._paySlipType.id;
    this.paysliptype.name = this.data._paySlipType.name;
    this.paysliptype.status = this.data._paySlipType.status;
    this.paysliptype.note = this.data._paySlipType.note;
  }

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

  public update_Paysliptype() {
    this.paySliptypeService.putPaySlipType(this.paysliptype).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Loại chi', 'Cập nhật loại chi thành công!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Loại chi', 'Lỗi, Cập nhật không thành công!');
    });
  }
}
