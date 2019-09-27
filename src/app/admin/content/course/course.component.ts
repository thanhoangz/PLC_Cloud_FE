import { Course } from './../../model/course';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServicesService } from '../../services/admin-services.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public courses = [
    //{ Name: 'xx', TraingTime: 'xxx', Status: 1, Price: 1000000 }
  ];

  constructor(private adminServies: AdminServicesService) { }

  ngOnInit() {
    this.getCourses();
    //this.loadTables();
  }

  public getCourses() {
    this.adminServies.getAllCourses().subscribe((result: []) => {
      this.courses = result;

      console.log(this.courses);
      this.loadTables();
    });
  }

  public loadTables() {
    this.dataSource = new MatTableDataSource(this.courses);
  }

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['select', 'Name', 'TraingTime', 'Status', 'Price'];
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

}
