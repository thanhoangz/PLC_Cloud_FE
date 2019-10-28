import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LecturersComponent } from '../../lecturers.component';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';

@Component({
  selector: 'app-add-page-lecture',
  templateUrl: './add-page-lecture.component.html',
  styleUrls: ['./add-page-lecture.component.css']
})
export class AddPageLectureComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public lectureFormGroup: FormGroup;
  public floatLabel = 'always';

  public check;
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
    private router: Router,
    private exchangeDataService: ExchangeDataService,


  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }
  private initLectureForm() {
    this.lectureFormGroup = new FormGroup({
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
      position : new FormControl(),
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
    // đéo cần biết nó gửi cái noằn j
    this.exchangeDataService.idSource.subscribe(message => {
      this.check = message;
    });
    this.getAllStatus();
    this.getAllMarritalStatus();
    this.initLectureForm();
    this.lecture.sex = String(this.genderes[0].value);
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
  public createLecture() {
      this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
      console.log(this.lecture);
      this.lecturersService.postLecturers(this.lecture).subscribe(result => {
        this.notificationService.showNotification(1, 'Giáo viên', 'Thêm giáo viên thành công!');
        this.router.navigateByUrl('admin/lecture');
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, thêm giáo viên thất bại!');
      });
      this.router.navigateByUrl('admin/lecture');
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
