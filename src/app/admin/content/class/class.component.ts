import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';

import { LanguageClassesService } from '../../services/language-classes.service';
import { AddClassComponent } from './dialog/add-class/add-class.component';
import { EditClassComponent } from './dialog/edit-class/edit-class.component';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public isOpenDialog = false;

  public classes;
  public image = '../../../../assets/admin/dist/img/test1.png';

  public status;
  public keyWord = '';
  public statusSelected = 2;
  constructor(
    private languageClassesService: LanguageClassesService,
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
    this.getClasses();
  }

  public getClasses() {
    this.startProgressBar();
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classes = result;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

        // dialog
  public createClass() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.6 * this.screenWidth;
      this.matDialog.open(AddClassComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getClasses();
        }
      });
    }
  }


  // dialog
  public editClass(classes: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.5 * this.screenWidth;
      this.matDialog.open(EditClassComponent,
        {
          width: `${widthMachine}px`,
          data: { _class: classes }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getClasses();
          }
        });
    }
  }

  // link
  public detailClass() {
  }
  public deleteClass(classId) {
    this.languageClassesService.deleteLanguageClass(classId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Xóa lớp học thành công!'); });
      this.getClasses();
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, xóa không thành công!');
      this.stopProgressBar();
    });
  }

  public findClass() {
    this.startProgressBar();
    this.languageClassesService.searchLanguageClass(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.classes = result;
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }

    // hàm ném dữ liệu
    createExchangeId(id) {
      this.exchangeDataService.changeId(id);
    }

    public ClassId(id) {
      this.createExchangeId(id);  // truyền
      this.router.navigateByUrl('admin/study-process');
    }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Kết thúc',
        code: 0
      },
      {
        name: 'Sắp mở',
        code: 2
      },
      {
        name: 'Đã đầy',
        code: 3
      },
      {
        name: 'Tất cả',
        code: -1
      }
    ];
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
