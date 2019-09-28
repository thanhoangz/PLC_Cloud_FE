import { Course } from './../../model/course';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServicesService } from '../../services/admin-services.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public courses = [];
  public status = [];
  constructor(private adminServies: AdminServicesService) { }
  public statusSelected;

  ngOnInit() {
    this.getCourses();
    this.getAllStatus();
  }

  public getCourses() {
    this.adminServies.getAllCourses().subscribe((result: []) => {
      this.courses = result;
      this.loadTables();
    });
  }

  public loadTables() {
    this.dataSource = new MatTableDataSource(this.courses);
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
}
