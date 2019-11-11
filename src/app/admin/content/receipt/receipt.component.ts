import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LoginService } from '../../services/login.service';
import { ReceiptTypeService } from '../../services/receipt-type.service';
import { ReceiptsService } from '../../services/receipts.service';
import { ReceiptDetailService } from '../../services/Receipt-Detail.service';
import { PersonnelsService } from '../../services/personnels.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;
  public pageSizeOptions = [5, 10, 15, 20];

  public isOpenDialog = false;

  // phiếu thu
  public receipts;

  public dataSource = new MatTableDataSource(this.receipts);
  public selection = new SelectionModel(true, []);


  displayedColumns1 = ['index', 'id', 'receiptTypeId', 'collectionDate', 'learnerId', 'nameOfPaymentApplicant',
    'personnelId', 'totalAmount', 'status', 'note', 'control'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }

  // get all phiếu thu
  public getAllReceipt() {
    this.receiptsService.getAllReceipts().subscribe((result: any) => {
      this.receipts = result;
      this.loadTables(result);
    }, error => {
    });
  }
  constructor(
    private receiptTypeService: ReceiptTypeService,
    private receiptsService: ReceiptsService,
    private receiptDetailService: ReceiptDetailService,
    private learnerService: LearnerService,
    private personnelsService: PersonnelsService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private loginService: LoginService,
    private exchangeDataService: ExchangeDataService,
    private fomatDateService: FomatDateService,
    private router: Router,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);

  }

  ngOnInit() {
    this.getAllReceipt();

  }



}
