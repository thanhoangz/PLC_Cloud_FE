import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page-lecture',
  templateUrl: './edit-page-lecture.component.html',
  styleUrls: ['./edit-page-lecture.component.css']
})
export class EditPageLectureComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public lectureFormGroup: FormGroup;
  public floatLabel = 'always';

  public status;
  public marritalStatus;
  public genderes = [
    {
      name: 'Nam',
      value: true
    },
    {
      name: 'Nữ',
      value: false
    }
  ];
  public lecture = {
    id: null,
    cardId: null,
    firstName: null,
    lastName: null,
    sex: null,
    birthday: null,
    address: null,
    nationality: null,
    marritalStatus: 0,
    experienceRecord: null,
    email: null,
    facebook: null,
    phone: null,
    position: null,
    certificate: null,
    image: '../../../../../../assets/admin/dist/img/user_def.png',
    basicSalary: null,
    allowance: null,
    bonus: null,
    insurancePremium: null,
    wageOfLecturer: null,
    wageOfTutor: null,
    isVisitingLecturer: false,
    isTutor: false,
    status: 1,
    note: null,
  };

  constructor(
    private lecturersService: LecturersService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private exchangeDataService: ExchangeDataService,
    private router: Router,

  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }
  private initLectureForm() {
    this.lectureFormGroup = new FormGroup({
      cardId: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      sex: new FormControl(),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      marritalStatus: new FormControl(null, [Validators.required]),
      experienceRecord: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      facebook: new FormControl(),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern(/[0-9\+\-\ ]/)]),
      position: new FormControl(),
      certificate: new FormControl(),
      basicSalary: new FormControl(),
      allowance: new FormControl(),
      bonus: new FormControl(),
      insurancePremium: new FormControl(),
      wageOfLecturer: new FormControl(),
      wageOfTutor: new FormControl(),
      isVisitingLecturer: new FormControl(),
      isTutor: new FormControl(),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }
  ngOnInit() {

    this.exchangeDataService.idSource.subscribe(message => {
      this.lecture.id = message;
      console.log(this.lecture.id);

    });


    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getLectureId();
    this.initLectureForm();
  }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Nghỉ việc',
        code: 0
      },
    ];
  }

  private getAllMarritalStatus() {
    this.marritalStatus = [
      {
        name: 'Đã kết hôn',
        code: 1
      },
      {
        name: 'Độc thân',
        code: 0
      },
    ];
  }
  public getLectureId() {
    this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
    console.log(this.lecture);
    this.startProgressBar();
    this.lecturersService.getLectureId(this.lecture.id).subscribe((result: any) => {
      this.lecture.cardId = result.cardId;
      this.lecture.cardId = result.cardId;
      this.lecture.firstName = result.firstName;
      this.lecture.lastName = result.lastName;
      this.lecture.sex = String(result.sex);
      this.lecture.birthday = result.birthday;
      this.lecture.address = result.address;
      this.lecture.nationality = result.nationality;
      this.lecture.marritalStatus = result.marritalStatus;
      this.lecture.experienceRecord = result.experienceRecord;
      this.lecture.email = result.email;
      this.lecture.facebook = result.facebook;
      this.lecture.phone = result.phone;
      this.lecture.position = result.position;
      this.lecture.certificate = result.certificate;
      this.lecture.image = result.image;
      this.lecture.basicSalary = result.basicSalary;
      this.lecture.allowance = result.allowance;
      this.lecture.bonus = result.bonus;
      this.lecture.insurancePremium = result.insurancePremium;
      this.lecture.wageOfLecturer = result.wageOfLecturer;
      this.lecture.wageOfTutor = result.wageOfTutor;
      this.lecture.isVisitingLecturer = result.isVisitingLecturer;
      this.lecture.isTutor = result.isTutor;
      this.lecture.status = result.status;
      this.lecture.note = result.note;
      console.log(this.lecture);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }
  public updateLecture() {
    this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
    console.log(this.lecture);
    this.lecturersService.putLecture(this.lecture).subscribe(result => {
      this.notificationService.showNotification(1, 'Giáo viên', 'Update giáo viên thành công!');
      this.router.navigateByUrl('admin/lecture');
    }, error => {
      this.stopProgressBar();
      this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, Update giáo viên thất bại!');
    });
  }

  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.lecture.image = data.link;
  }

  getImageWidth() {
    if (this.screenWidth < 500) {
      return 0.6 * this.screenWidth;
    }
    return 0.11 * this.screenWidth;
  }
  getImageHeigth() {
    return this.getImageWidth();
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }



}
