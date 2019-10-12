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

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;

  public courses = [];

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public keyWord = '';
  public statusSelected = null;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    console.log(this.screenWidth);
    console.log(this.screenHeight);
  }

  ngOnInit() {
    this.getCourses();
    this.getAllStatus();
  }

  public getCourses() {
    this.courseService.getAllCourses().subscribe((result: []) => {
      this.courses = result;
      this.loadTables(result);
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      console.log(widthMachine);
      this.matDialog.open(AddCourseDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getCourses();
      });
    }
  }

  public openEditCourse(course: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(EditCourseDialogComponent,
        {
          width: '25%',
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getCourses();
        });
    }
  }

  public openDetailCourse(course: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(DetailCourseDialogComponent,
        {
          width: '25%',
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getCourses();
        });
    }
  }


  public deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Xóa khóa học thành công!'); });
      this.getCourses();
    }, error => {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, không xóa thành công!');
    });
  }

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'traingTime', 'status', 'price', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.courses);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  public searchCourses() {
    console.log(this.keyWord);
    this.courseService.searchCourses(this.keyWord, this.statusSelected, this.pageSize, this.pageIndex).subscribe(result => {
      console.log(result);

    }, error => {

    });
  }

  public getPaginatorData(event) {
    console.log(event);
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

}
