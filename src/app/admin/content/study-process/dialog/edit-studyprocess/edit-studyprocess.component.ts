import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { StudyProcessService } from 'src/app/admin/services/study-process.service';

@Component({
  selector: 'app-edit-studyprocess',
  templateUrl: './edit-studyprocess.component.html',
  styleUrls: ['./edit-studyprocess.component.css']
})
export class EditStudyprocessComponent implements OnInit {

  public learnerInClass: any;

  public status1 = [];
  public temp;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditStudyprocessComponent>,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private studyProcessService: StudyProcessService,
    private notificationService: NotificationService,

  ) {
    this.setData();
  }

  public format = {
    ngaysinh: null,
    ngayvao: null,
    ngayra: null,
  };

  ngOnInit() {
    this.Date();
    this.getAllStatus();
    console.log(this.learnerInClass);
  }

  public setData() {
    this.learnerInClass = JSON.stringify(this.data._learnerInClass);
    this.learnerInClass = JSON.parse(this.learnerInClass);
  }

  public updateStudyProcess() {
    this.studyProcessService.put_studyProcess({
      id: this.learnerInClass.id,
      inDate: this.learnerInClass.inDate,
      outDate: this.learnerInClass.outDate,
      status: this.learnerInClass.status,
      dateCreated: this.learnerInClass.dateCreated,
      dateModified: this.learnerInClass.dateModified,
      languageClassId: this.learnerInClass.languageClassId,
      learnerId: this.learnerInClass.learnerId,
      note: this.learnerInClass.note,
    }).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Quá trình học tập', 'Cập nhật thành công!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Quá trình học tập', 'Lỗi, Cập nhật không thành công!');
    });
  }

  public Date() {
    const ngaysinh = this.datePipe.transform(this.data._learnerInClass.learner.birthday, 'dd-MM-yyyy');
    const ngayra = this.datePipe.transform(this.data._learnerInClass.outDate, 'dd-MM-yyyy');
    const ngayvao = this.datePipe.transform(this.data._learnerInClass.inDate, 'dd-MM-yyyy');
    this.format.ngaysinh = ngaysinh;
    this.format.ngayra = ngayra;
    this.format.ngayvao = ngayvao;
  }

  private getAllStatus() {
    this.status1 = [
      {
        Name: 'Tất cả',
        code: -1
      },
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Tạm nghỉ',
        code: 2
      },
      {
        Name: 'Nghỉ',
        code: 0
      },
      {
        Name: 'Chuyển lớp',
        code: 3
      }];
  }
}
