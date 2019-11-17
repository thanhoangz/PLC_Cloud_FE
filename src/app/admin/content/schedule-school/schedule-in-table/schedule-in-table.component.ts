import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/admin/services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddScheduleDialogComponent } from './dialog/add-schedule-dialog/add-schedule-dialog.component';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateScheduleDialogComponent } from './dialog/update-schedule-dialog/update-schedule-dialog.component';
import { Router } from '@angular/router';

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
  public isOpenDialog = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public scheduledColumns: string[] = ['index', 'fromDate', 'toDate', 'daysOfWeek', 'content', 'status', 'lecturer'];

  constructor(
    private loginService: LoginService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
  ) {
    this.loginService.islogged();
  }


  ngOnInit() {
    this.getAllStatus();
    this.getAllSchedule();
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


  public loadTables(data: any) {
    this.schedulesSource = new MatTableDataSource(data);
    this.schedulesSource.paginator = this.paginator;
  }

  public searchSchedule() {

  }

  public openDetailSchedule(schedule) {

  }

  getAllSchedule() {
    this.scheduleService.getAllSchedules().subscribe(data => {
      if (data) {
        this.loadTables(data);
      }

    }, error => {

    });
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.dialog.open(AddScheduleDialogComponent, {
        width: '80vh',
        data: {
        },
      });
      dialogRef.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }
        this.getAllSchedule();
      });
    }
  }


  public openUpdateDialog(schedule) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.dialog.open(UpdateScheduleDialogComponent, {
        width: '80vh',
        data: {
          _schedule: schedule
        },
      });
      dialogRef.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }
        this.getAllSchedule();
      });
    }
  }

  public gotoSchedule() {
    this.router.navigateByUrl('admin/schedule');
  }

}
