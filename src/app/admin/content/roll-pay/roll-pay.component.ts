import { element } from 'protractor';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TimeSheetService } from '../../services/time-sheet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roll-pay',
  templateUrl: './roll-pay.component.html',
  styleUrls: ['./roll-pay.component.css'],
})
export class RollPayComponent implements OnInit {
  public showProgressBar = true;

  public timeSheets = [];
  // để tìm kiếm
  public monthSearch;
  public yearSearch;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public isBangLuong = true;
  public chamcong;

  public overviewRollPay = {
    totalOfMonth: 25,
    totalOfStaffsPaid: 0,
    totalOfStaffsNotPaid: 0,
    totalOfLecturersPaid: 0,
    totalOfLecturersNotPaid: 0,
    totalMoney: 0,
    totalMoneyPersonel: 0,
    totalMoneyPersonelPaid: 0,
    totalMoneyPersonelNotPaid: 0,
    totalMoneyLecture: 0,
    totalMoneyLecturePaid: 0,
    totalMoneyLectureNotPaid: 0,
  };

  public payRollForPersonnel; // Bảng lương cho NV chưa xét duyệt
  public payRollForPersonnelOK; // Bảng lương cho NV
  public payRollForLecture; // Bảng lương cho GV
  public payRollForLectureOK; // Bảng lương cho GV

  // tslint:disable-next-line: max-line-length
  BangLuongNhanVienColumns: string[] = ['index', 'name', 'position', 'salary', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalSalary', 'advancePayment', 'totalActualSalary'];
  BangLuongNhanVienDataSource = new MatTableDataSource(this.payRollForPersonnelOK);

  // tslint:disable-next-line: max-line-length
  XetDuyetNhanVienColumns: string[] = ['index', 'name', 'position', 'salary', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalSalary', 'advancePayment', 'totalActualSalary', 'select'];
  XetDuyetNhanVienDataSource = new MatTableDataSource(this.payRollForPersonnel);

  // tslint:disable-next-line: max-line-length
  BangLuongGiaoVienColumns: string[] = ['index', 'name', 'salaryLecture', 'salaryTutor', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdaysGV', 'totalWorkdaysTG', 'totalSalary', 'advancePayment', 'totalActualSalary'];
  BangLuongGiaoVienDataSource = new MatTableDataSource(this.payRollForLecture);

  // tslint:disable-next-line: max-line-length
  XetDuyetGiaoVienColumns: string[] = ['index', 'name', 'salaryLecture', 'salaryTutor', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdaysGV', 'totalWorkdaysTG', 'totalSalary', 'advancePayment', 'totalActualSalary', 'select'];
  XetDuyetGiaoVienDataSource = new MatTableDataSource(this.payRollForLecture);

  public selection = new SelectionModel(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private salaryRollpayService: SalaryRollpayService,
    private timeSheetService: TimeSheetService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.monthSearch = new Date().getMonth() + 1;
    this.yearSearch = new Date().getFullYear();
    this.getAllYear();
    this.getPersonnelChuaXetDuyet();
    this.getPersonnelDaXetDuyet();
  }

  //#region Checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.XetDuyetNhanVienDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.XetDuyetNhanVienDataSource.data.forEach(row => this.selection.select(row));
  }
  //#endregion

  //#region update chấm công khi sửa thưởng và phụ cấp.  id chấm công
  public updatePeriodicPoint(chamcongId, phucap, thuong) {
    this.timeSheetService.getById(chamcongId).subscribe(result => {
      this.chamcong = result;
      this.chamcong.allowance = phucap;
      this.chamcong.bonus = thuong;
      this.updateChamCong();
    }, error => {
    });
  }

  public updateChamCong() {
    this.timeSheetService.putTimeSheet(this.chamcong).subscribe(result => {
      this.getPersonnelChuaXetDuyet();
    }, error => {
    });
  }
  //#endregion

  //#region Click button

  // click nút đã xét duyệt
  public ClickDaXetDuyet() {
    this.isBangLuong = true;
    this.getPersonnelDaXetDuyet();
    this.getLectureDaXetDuyet();
  }

  // click nút chưa xét duyệt
  public ClickChuaXetDuyet() {
    this.isBangLuong = false;
    console.log(this.isBangLuong);
    this.getPersonnelChuaXetDuyet();
    this.getLectureChuaXetDuyet();
  }

  public TimKiem() {
    this.getPersonnelChuaXetDuyet();
    this.getPersonnelDaXetDuyet();
    this.getLectureChuaXetDuyet();
    this.getLectureDaXetDuyet();
  }

  // Cạp nhật list xét duyệt vào bảng
  public updateSalaryPaied() {
    this.timeSheets = [];
    // tslint:disable-next-line: no-shadowed-variable
    this.selection.selected.forEach((element: any) => {
      this.timeSheets.push(element.salary.id);
    });
    this.salaryRollpayService.PostRollPay(this.timeSheets).subscribe(result => {
      this.getPersonnelChuaXetDuyet();
    }, error => {
    });
  }

  // Xem chấm công
  XemChamCong() {
    this.router.navigateByUrl('admin/time-sheet');
  }
  //#endregion

  //#region Lấy danh sách  lương Nhân viên
  // DS nhân viên chưa xét duyệt
  public getPersonnelChuaXetDuyet() {
    this.salaryRollpayService.ListChuaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForPersonnel = result;
      this.overviewRollPay.totalOfStaffsNotPaid = result.length; // tổng nhân viên
      this.overviewRollPay.totalMoneyPersonelNotPaid = 0;        // tổng tiền bla bla
      result.forEach(item => {
        this.overviewRollPay.totalMoneyPersonelNotPaid = this.overviewRollPay.totalMoneyPersonelNotPaid + item.salary.totalRealityAmount;
      });
      this.loadTablePersonnel(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // DS nhân viên đã xét duyệt
  public getPersonnelDaXetDuyet() {
    this.salaryRollpayService.ListDaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForPersonnelOK = result;
      this.overviewRollPay.totalOfStaffsPaid = result.length; // tổng nhân viên
      this.overviewRollPay.totalMoneyPersonelPaid = 0;        // tổng tiền bla bla
      result.forEach(item => {
        this.overviewRollPay.totalMoneyPersonelPaid = this.overviewRollPay.totalMoneyPersonelPaid + item.salary.totalRealityAmount;
      });
      this.loadTablePersonnelOK(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // load data nhân viên chưa xét duyệt
  public loadTablePersonnel(data: any) {
    this.XetDuyetNhanVienDataSource = new MatTableDataSource(data);
  }
  // load data nhân viên đã xét duyệt
  public loadTablePersonnelOK(data: any) {
    this.BangLuongNhanVienDataSource = new MatTableDataSource(data);
  }
  //#endregion

  //#region Lấy danh sách  lương Giáo viên - Chưa làm
  public getLectureChuaXetDuyet() {
  }

  // DS giáo viên đã xét duyệt
  public getLectureDaXetDuyet() {

  }

  // load data giáo viên
  public loadTableLecture(data: any) {

  }
  //#endregion

  //#region Linh tinh
  // Lấy năm
  public getAllYear() {
    for (let i = 2018; i <= 2030; i++) {
      this.years.push(i);
    }
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
  //#endregion


}
