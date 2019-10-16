import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { PaySlipTypeService } from './../../../../services/pay-slip-type.service';
import { PaySlipService } from './../../../../services/pay-slip.service';
import { PaySlipComponent } from '../../pay-slip.component';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';

@Component({
  selector: 'app-add-payslip-dialog',
  templateUrl: './add-payslip-dialog.component.html',
  styleUrls: ['./add-payslip-dialog.component.css']
})
export class AddPayslipDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public paySlip = {
    id: '',
    content: '',
    date: null,
    receiver: '',
    total: null,
    status: null,
    note: '',
    paySlipTypeId: null,
    appUserId: null,
    personnelId: '',
    sendPersonnelId: ''
  };

  public paySlipType;
  public status = [];
  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private paySlipTypeService: PaySlipTypeService
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.getPaySlipTypes();
    this.paySlip.date = new Date();
    this.paySlip.appUserId = '4b900a74-e2d9-4837-b9a4-9e828752716e';
    this.paySlip.personnelId = 'hhhhh';
    this.paySlip.sendPersonnelId = 'hhhhh';
  }

  public getPaySlipTypes() {
    this.paySlipTypeService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }
  public getAllStatus() {
    this.status = [
      {
        name: 'Hoàn thành',
        code: 1
      },
      {
        name: 'Chờ xử lý',
        code: 2
      },
      {
        name: 'Đã hủy',
        code: 0
      }
    ];
  }

  public create_PaySlip() {
    this.paySlipService.postPaySlip(this.paySlip).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Tạo thành công phiếu chi!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Tạo không thành công!');
    });
  }

}
