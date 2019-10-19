import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { LearnerService } from '../../services/learner.service';


@Component({
  selector: 'app-add-study-process',
  templateUrl: './add-study-process.component.html',
  styleUrls: ['./add-study-process.component.css']
})
export class AddStudyProcessComponent implements OnInit {

  // quá trình học
  public studyprocess = {
    LanguageClassId: null,
  };
  // học viên => load ra thông tin học viên
  public learnerId;
  public learner;

  public languageClass;

  public status = [];
  public statusSelected;
  constructor(

    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private learnerService: LearnerService
  ) { }

  ngOnInit() {
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Đang học',
        code: 1
      },
      {
        name: 'Đã chuyển lớp',
        code: 2
      },
      {
        name: 'Đã nghỉ',
        code: 0
      },
      {
        name: 'Tạm nghỉ',
        code: 3
      },
      {
        name: 'Tất cả',
        code: 4
      }
    ];
  }
  // lấy ra thông tin học viên
  /*
  public getPaySlipTypes() {
    this.learnerService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }*/

}
