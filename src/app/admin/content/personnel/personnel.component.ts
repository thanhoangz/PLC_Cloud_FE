import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonnelsService } from '../../services/personnels.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public length = 100;
  public pageSize = 6;
  public pageIndex = 1;
  public pageSizeOptions = [6, 9, 12, 15];

  public personnel;

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

  public keyWord = '';
  public statusSelected = 2;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private personnelsService: PersonnelsService,
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
    this.getAllMarritalStatus();
    this.getPersonnels();
  }

  public getPersonnels() {
    this.startProgressBar();
    this.personnelsService.getAllPersonnels().subscribe((result: any) => {
      this.personnel = result;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }
/*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.personnel.image = data.link;
  }

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }

  public controlPersonnel(id) {
    this.createExchangeId(id);  // truyền
    this.router.navigateByUrl('admin/control-personnel');
  }

  creatPersonnel() {
    this.router.navigateByUrl('admin/add-personnel');
  }

  public deletePersonnel(id) {
    this.personnelsService.deletePersonnel(id).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Nhân viên', 'Đã xóa nhân viên!'); });
      this.getPersonnels();
    }, error => {
      this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, Không xóa được!');
      this.stopProgressBar();
    });
  }
  public searchPersonnel() {
    this.startProgressBar();
    this.personnelsService.getPersonnelWithCondition(this.keyWord, this.statusSelected, this.personnel).subscribe((result: any) => {
      this.personnel = result;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
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
      {
        name: 'Tất cả',
        code: 2
      }
    ];
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
