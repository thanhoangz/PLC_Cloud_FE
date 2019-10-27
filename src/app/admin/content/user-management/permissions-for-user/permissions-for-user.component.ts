import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/admin/services/function.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LoginService } from 'src/app/admin/services/login.service';

@Component({
  selector: 'app-permissions-for-user',
  templateUrl: './permissions-for-user.component.html',
  styleUrls: ['./permissions-for-user.component.css']
})
export class PermissionsForUserComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  groupFunctions;

  numberPer = 0;
  permissionList = {
    id: 0,
    appUserId: '',
    functionId: '',
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
    status: false
  };

  constructor(
    private functionService: FunctionService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
  }


  ngOnInit() {
    this.getAllGroupFunctions();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public getAllGroupFunctions() {
    this.functionService.getAllFunctionsByGroup().subscribe((result: [any]) => {
      this.groupFunctions = result;
      console.log(result);
      result.forEach(element => {
        this.numberPer += element.childFunctionViewModels.length;
      });
      console.log(this.numberPer);
    }, errror => {

    });
  }
}
