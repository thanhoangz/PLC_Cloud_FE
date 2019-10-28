import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturersService } from '../../services/lecturers.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;
  // dùng để tìm kiếm
  public cardId = '';
  public nameLecture = '';
  public statusGenderes = '';
  public statusSelected = -1;

  public lecture;

  public length = 100;
  public pageSize = 6;
  public pageIndex = 1;
  public pageSizeOptions = [6, 9, 12, 15];

  public items = [];
  public pageOfItems: Array<any>;

  public status;
  public marritalStatus;
  public genderes;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private lecturersService: LecturersService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private router: Router,
    private exchangeDataService: ExchangeDataService,
    private confirmDialogService: ConfirmationDialogService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }
  ngOnInit() {
    this.getAllStatus();
    this.getstatusGenderes();
    this.getAllMarritalStatus();
    this.getLecture();
  }

  public getLecture() {
    this.startProgressBar();
    this.lecturersService.getAllLecturers().subscribe((result: any) => {
      this.lecture = result;
      this.items = Array(this.lecture.length).fill(0).map((x, i) => (result[i]));
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  public getstatusGenderes() {
    this.genderes = [
      {
        name: 'Nam',
        value: true
      },
      {
        name: 'Nữ',
        value: false
      },
      {
        name: 'Tất cả',
        value: ''
      }
    ];
  }
  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Nghỉ việc',
        code: 0
      },
      {
        name: 'Tất cả',
        code: -1
      }
    ];
  }

  public getAllMarritalStatus() {
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

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }

  public updateLecture(id) {
    this.createExchangeId(id);
    this.router.navigateByUrl('admin/editlecturer');
  }
  public deleteLecture(id) {
    this.lecturersService.deleteLectureId(id).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Giáo viên', 'Đã xóa giáo viên!'); });
      this.getLecture();
    }, error => {
      this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, Không xóa được!');
      this.stopProgressBar();
    });
  }
  creatLecture() {
    this.router.navigateByUrl('admin/addlecturer');
  }

  public searchLecture() {
    // tslint:disable-next-line: max-line-length
    this.lecturersService.SearchLecturers(this.cardId, this.nameLecture, this.statusGenderes, this.statusSelected).subscribe(result => {
      // tslint:disable-next-line: triple-equals
      if (result != 0) {
        this.lecture = result;
        this.items = Array(this.lecture.length).fill(0).map((x, i) => (result[i]));
        console.log(this.lecture);
      }
      // tslint:disable-next-line: one-line
      else {
        this.notificationService.showNotification(3, 'Giáo viên', 'Không tìm thấy!');
      }
    }, error => {
      this.notificationService.showNotification(3, 'Giáo viên', 'Không tìm thấy!');
    });
  }
}
