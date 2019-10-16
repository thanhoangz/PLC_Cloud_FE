import { PaySlipService } from './../../../../services/pay-slip.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';

@Component({
  selector: 'app-detail-payslip-dialog',
  templateUrl: './detail-payslip-dialog.component.html',
  styleUrls: ['./detail-payslip-dialog.component.css']
})
export class DetailPayslipDialogComponent implements OnInit {

  public paySlipType;
  public status = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private paySlipTypeService: PaySlipTypeService
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.getPaySlipType();
    console.log(this.data);
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoàn thành',
        code: 1
      },
      {
        name: 'Chờ xử lý',
        code: 0
      },
      {
        name: 'Đã hủy',
        code: 2
      }
    ];
  }

  public getPaySlipType() {
    this.paySlipTypeService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }
}
