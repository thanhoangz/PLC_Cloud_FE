import { DetailCourseDialogComponent } from './dialog/detail-course-dialog/detail-course-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './dialog/add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './dialog/edit-course-dialog/edit-course-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

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
    private dataServies: AdminService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCourses();
    this.getAllStatus();
  }

  public getCourses() {
    this.dataServies.getAllCourses().subscribe((result: []) => {
      this.courses = result;
      this.loadTables();
    });
  }

  public loadTables() {
    this.dataSource = new MatTableDataSource(this.courses);
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const createDialog = this.matDialog.open(AddCourseDialogComponent, {
        width: '50%',
        data: {
        }
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
          width: '50%',
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
          width: '50%',
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getCourses();
        });
    }
  }


  public deleteCourse(courseId: number) {
    console.log(courseId);
    this.dataServies.deleteCourse(courseId).subscribe(result => {
      setTimeout(() => this.toastr.success('Xóa khóa học thành công !', 'Dữ liệu khóa học'));
      this.getCourses();
    });
  }

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'traingTime', 'status', 'price', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.courses);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  public findCourse() {
    console.log(this.keyWord);
    this.dataServies.searchCourses(this.keyWord, this.statusSelected, this.pageSize, this.pageIndex).subscribe(result => {
      console.log(result);
      //this.length = 
    }, error => {

    })
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
