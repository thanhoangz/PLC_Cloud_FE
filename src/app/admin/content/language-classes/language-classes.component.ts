import { LoginService } from './../../services/login.service';
import { LanguageClassesService } from './../../services/language-classes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { AddLanguageClassComponent } from './dialog/add-language-class/add-language-class.component';
import { EditLanguageClassComponent } from './dialog/edit-language-class/edit-language-class.component';
import { DetailLanguageClassComponent } from './dialog/detail-language-class/detail-language-class.component';

@Component({
  selector: 'app-language-classes',
  templateUrl: './language-classes.component.html',
  styleUrls: ['./language-classes.component.css']
})
export class LanguageClassesComponent implements OnInit {

  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;

  public languageClasses;

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = null;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.languageClasses);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private languageClassesService: LanguageClassesService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
    this.getLanguageClass();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getLanguageClass() {
    this.startProgressBar();
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.languageClasses = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }

  public getAllStatus() {
    this.status = [
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Khóa',
        code: 0
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  public openCreateDialog() {
    console.log(this.isOpenDialog);
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(AddLanguageClassComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getLanguageClass();
        }
      });
    }
  }

  public openEditLanguageClass(languageClass: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditLanguageClassComponent,
        {
          width: `${widthMachine}px`,
          data: { _languageClass: languageClass }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getLanguageClass();
          }
        });
    }
  }
  public openDetailLanguageClass(languageClass: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(DetailLanguageClassComponent,
        {
          width: `${widthMachine}px`,
          data: { _languageClass: languageClass }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getLanguageClass();
          }
        });
    }
  }
  public deleteLanguageClass(languageClassId: number) {
    this.languageClassesService.deleteLanguageClass(languageClassId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Xóa lớp học thành công!'); });
      this.getLanguageClass();
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, xóa không thành công!');
      this.stopProgressBar();
    });
  }


  public searchClassRoom() {
    this.startProgressBar();
    this.languageClassesService.searchLanguageClass(this.keyWord, '', this.statusSelected).subscribe(result => {
      if (result) {
        this.languageClasses = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }

  public getPaginatorData(event) {
    console.log(event);
  }


  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }

}
