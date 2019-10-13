import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';

@Component({
  selector: 'app-add-paysliptype-dialog',
  templateUrl: './add-paysliptype-dialog.component.html',
  styleUrls: ['./add-paysliptype-dialog.component.css']
})
export class AddPaysliptypeDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  private Paysliptype = {
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
    private notificationService: NotificationService,
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

  public create_Paysliptype() {
    this.paySlipTypeService.postPaySlipType(this.Paysliptype).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Loại chi', 'Tạo thành công loại chi!'); });
      this.dialogRef.close(true);
    });
  }
}
