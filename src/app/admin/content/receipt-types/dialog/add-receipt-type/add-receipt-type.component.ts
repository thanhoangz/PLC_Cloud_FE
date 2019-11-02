import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from './../../../../services/extension/notification.service';
@Component({
  selector: 'app-add-receipt-type',
  templateUrl: './add-receipt-type.component.html',
  styleUrls: ['./add-receipt-type.component.css']
})
export class AddReceiptTypeComponent implements OnInit {
  public recepiptType = {
    name: '',
    status: 1,
    note: '',
  };


  public status = [];
  public FormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddReceiptTypeComponent>,
    private receiptTypeService: ReceiptTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private notificationService: NotificationService,
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.initLectureForm();
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
    if (this.FormGroup.valid) {
      this.receiptTypeService.postReceiptType(this.recepiptType).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Loại thu', 'Tạo thành công loại thu!'); });
        this.dialogRef.close(true);
      }, error => {
      });
    } else {
      this.notificationService.showNotification(3, 'Loai phiếu thu', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }
}
