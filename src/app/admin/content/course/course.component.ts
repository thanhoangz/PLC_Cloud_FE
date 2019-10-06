import { Course } from './../../model/course';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './dialog/add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './dialog/edit-course-dialog/edit-course-dialog.component';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public pageSize = 10;
  public length = 100;
  public pageSizeOptions = [6, 10, 20];

  public isShow = true;
  public courses = [];

  public status = [];

  constructor(
    private dataServies: AdminService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) { }

  public statusSelected;

  ngOnInit() {
    //setTimeout(() => this.toastr.success('Thêm thành công !', 'Căng củ cọt'));
    this.getCourses();
    this.getAllStatus();
  }

  public Find() {
    this.isShow = !this.isShow;
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
    const createDialog = this.matDialog.open(AddCourseDialogComponent, {
      width: '50%',
      data: {
      }
    }).afterClosed().subscribe(result => {
      this.getCourses();
    });

  }
  public editCourse(course: any) {
    this.matDialog.open(EditCourseDialogComponent,
      {
        width: '50%',
        data: { _course: course }

      }).afterClosed().subscribe(result => {
        this.getCourses();
      });

  }
  public deleteCourse(courseId: number) {
    console.log(courseId);
    this.dataServies.deleteCourse(courseId).subscribe(result => {
      setTimeout(() => this.toastr.success('Xóa khóa học thành công !', 'Dữ liệu khóa học'));
      this.getCourses();
    });
  }

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['select', 'name', 'traingTime', 'status', 'price', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.courses);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Name + 1}`;
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Hoạt động',
        code: 0
      },
      {
        Name: 'Khóa',
        code: 1
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  course = [];

  getPaginatorData(event) {
    this.pageSize = event.pageSize;
    this.length = this.courses.length;
    this.course = [];
    for (let i = this.pageSize * event.pageIndex; i < this.pageSize * event.pageIndex + this.pageSize; i++) {
      if (i <= (this.length - 1))
        this.course.push(this.courses[i]);
    }

    this.dataSource = new MatTableDataSource(this.course);

  }

}
