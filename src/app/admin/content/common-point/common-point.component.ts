import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-common-point',
  templateUrl: './common-point.component.html',
  styleUrls: ['./common-point.component.css']
})
export class CommonPointComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;


  public dataSource = new MatTableDataSource();

  public selection = new SelectionModel(true, []);

  constructor(
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
  }

}
