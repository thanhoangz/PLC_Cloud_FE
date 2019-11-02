import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { PaySlipTypeService } from './../../../../services/pay-slip-type.service';
import { PaySlipService } from './../../../../services/pay-slip.service';
import { PaySlipComponent } from '../../pay-slip.component';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { PersonnelsService } from './../../../../services/personnels.service';
import { ConstService } from 'src/app/admin/services/extension/Const.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-payslip-dialog',
  templateUrl: './add-payslip-dialog.component.html',
  styleUrls: ['./add-payslip-dialog.component.css']
})
export class AddPayslipDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public paySlip = {
    //    id: '',
    content: '',
    date: null,
    receiver: '',
    total: null,
    status: null,
    note: '',
    paySlipTypeId: null,
    appUserId: null,
    personnelId: '',
  };

  public paySlipType;
  public personnel;
  public status = [];
  public statusSelected;
  public paySlipFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private paySlipTypeService: PaySlipTypeService,
    private personnelComponent: PersonnelsService
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.paySlipFormGroup = new FormGroup({
      personnelId: new FormControl(null, [Validators.required]),
      paySlipTypeId: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      receiver: new FormControl(),
      total: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }
  ngOnInit() {
    this.getAllStatus();
    this.getPaySlipTypes();
    this.getPersonnel();
    this.initLectureForm();
    this.paySlip.date = new Date();
    this.paySlip.appUserId = ConstService.user.id;

  }
  /////////////////////////
  public getPersonnel() {
    this.personnelComponent.getAllPersonnels().subscribe(result => {
      this.personnel = result;
    }, error => {
    });
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
    if (this.paySlipFormGroup.valid) {
      console.log(this.paySlip);
      this.paySlipService.postPaySlip(this.paySlip).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Tạo thành công phiếu chi!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Tạo không thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

}
