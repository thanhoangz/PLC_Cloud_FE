import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.css']
})
export class AddScheduleDialogComponent implements OnInit {

  public floatLabel = 'always';
  public schedule = {
    id: 0,
    fromDate: '',
    toDate: '',
    timeShift: '',
    daysOfWeek: '',
    status: 1,
    dateCreated: '',
    dateModified: '',
    note: '',
    lecturerId: '',
    classroomId: 0,
    languageClassId: '',
    content: ''
  };

  public lecturers;
  public classroom;
  public classes;

  public status = [];

  constructor(
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddScheduleDialogComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllStatus();
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Khóa',
        code: 0
      }];
  }

  public createSchedule() {
    this.scheduleService.postSchedule(this.schedule).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lịch', 'TXếp lịch thành công!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Xếp lịch', 'Lỗi, xếp lịch không thành công!');
    });
  }
}

