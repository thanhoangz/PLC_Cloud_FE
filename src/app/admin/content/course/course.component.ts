import { DetailCourseDialogComponent } from './dialog/detail-course-dialog/detail-course-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './dialog/add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './dialog/edit-course-dialog/edit-course-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;

  public courses;

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 10;
  public pageIndex = 1;
  public pageSizeOptions = [10, 15, 20];

  public keyWord = '';
  public statusSelected = null;
  public showTrainingTime = false;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'traingTime', 'status', 'price', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.courses);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    if (this.screenWidth > 500) {
      this.showTrainingTime = true;
    }
  }

  ngOnInit() {
    this.getCourses();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
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
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  public getCourses() {
    this.startProgressBar();
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
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

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(AddCourseDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getCourses();
        }

      });
    }
  }

  public openEditCourse(course: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditCourseDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getCourses();
          }
        });
    }
  }

  public openDetailCourse(course: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(DetailCourseDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getCourses();
          }
        });
    }
  }


  public deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Xóa khóa học thành công!'); });
      this.getCourses();
    }, error => {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, không xóa thành công!');
      this.stopProgressBar();
    });
  }



  public searchCourses() {
    this.startProgressBar();
    this.courseService.searchCourses(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.courses = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }


  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
