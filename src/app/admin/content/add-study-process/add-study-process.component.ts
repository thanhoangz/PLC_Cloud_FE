
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
////////////////////

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-add-study-process',
  templateUrl: './add-study-process.component.html',
  styleUrls: ['./add-study-process.component.css']
})
export class AddStudyProcessComponent implements OnInit {
  // quá trình học
  public studyprocess = {
    // LanguageClassId: null,
  };

  public learner = {
    learnerId: '',
    cardId: '',
    firstName: '',
    lastName: '',
    sex: null,
    birthday: null,
    address: null,
    email: null,
    facebook: null,
    phone: null,
    parentFullName: null,
    parentPhone: null,
    image: null,
    status: null,
    note: null,
    dateCreated: null,
    dateModified: null,
    guestTypeId: null,
  };

  public learnerTemp;

  public learnerId;
  public learnerName;
  public learnerSex;
  public learnerBirthday;
  public learnerPhone;


  public languageClass;
  public LanguageClassId;
  public languageClassSiSo;
  public languageClassStartDay;
  public languageClassEnDay;

  public status = [];
  public statusSelected;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
  ) { }

  ngOnInit() {
    this.getLanguageClasses();

  }

  // get lớp học
  public getLanguageClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.languageClass = result;
    }, error => {

    });
  }


  public setLearner(learnerId) {
    console.log(learnerId);
    this.learnerService.getById(learnerId).subscribe((result: any) => {
      if (result) {
        this.learner = result;
        console.log(result);
      }

    }, error => {
      this.learner = null;
    });
  }





























  // lấy ra thông tin học viên
  public load_infor_learner() {
    this.learnerName = '';
    this.learnerSex = '';
    this.learnerBirthday = '';
    this.learnerPhone = '';
    // tslint:disable-next-line: triple-equals
    if (this.learnerId != '') {
      this.learnerService.getById(this.learnerId).subscribe((result: any) => {
        this.learnerName = result.firstName + ' ' + result.lastName;
        if (result.sex) {
          this.learnerSex = 'Nam';
        } else {
          this.learnerSex = 'Nữ';
        }
        this.learnerBirthday = result.birthday;
        this.learnerPhone = result.phone;
      }, error => {
      });
    }
  }

  // lấy ra thông tin lớp học - select combobox
  public load_infor_languageClasses(classId) {
    console.log(classId);
    // tslint:disable-next-line: triple-equals
    this.languageClassesService.getById(classId).subscribe((result: any) => {
      this.languageClassStartDay = result.startDay;
      this.languageClassEnDay = result.endDay;

      this.load_total_learner_languageClasses(classId);
    }, error => {
    });
  }

  // lấy ra tấ cả quá trình học tập có mã lớp id và status : sĩ số
  public load_total_learner_languageClasses(classId) {
    // tslint:disable-next-line: triple-equals
    this.studyProcessService.search_studyProcess(classId, '', 1).subscribe((result: any) => {
      this.languageClassSiSo = result.length;
    }, error => {
    });
  }

  // lấy ra tên khóa học có mã lớp id




  /*
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
  */
}
