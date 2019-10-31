import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/admin/services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-schedule-in-table',
  templateUrl: './schedule-in-table.component.html',
  styleUrls: ['./schedule-in-table.component.css']
})
export class ScheduleInTableComponent implements OnInit {

  public pageSizeOptions = [10, 15, 20];
  public statusSelected = null;
  public status = [];
  public schedules;
  public schedulesSource;
  public className = '';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public scheduledColumns: string[] = ['index', 'fromDate', 'toDate', 'daysOfWeek', 'content', 'status', 'lecturer'];

  constructor(private loginService: LoginService) {
    this.loginService.islogged();
  }


  ngOnInit() {
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


  public loadTables(data: any) {
    this.schedulesSource = new MatTableDataSource(data);
    this.schedulesSource.paginator = this.paginator;
  }

  public searchSchedule() {

  }

  public openDetailSchedule(schedule) {

  }
}
