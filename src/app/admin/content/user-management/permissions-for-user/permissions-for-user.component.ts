import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/admin/services/function.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LoginService } from 'src/app/admin/services/login.service';

import { PermissionService } from 'src/app/admin/services/permission.service';
@Component({
  selector: 'app-permissions-for-user',
  templateUrl: './permissions-for-user.component.html',
  styleUrls: ['./permissions-for-user.component.css']
})
export class PermissionsForUserComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  groupFunctions;

  userId = 'ec0d77ab-918a-4b45-8cac-08d75ac91ff8';
  numberPer = 0;
  permissionsForUser;
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
    private permissionService: PermissionService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
  ) {
    this.loginService.islogged();
  }


  ngOnInit() {
    this.getAllGroupFunctions();
    this.getPermissForUser('ec0d77ab-918a-4b45-8cac-08d75ac91ff8');
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

  public getPermissForUser(userId) {
    this.permissionService.getPermissionForUser(userId).subscribe(result => {
      this.permissionsForUser = result;
      console.log(result);
    }, error => {

    });
  }
  public getAllGroupFunctions() {
    this.functionService.getAllFunctionsByGroup().subscribe((result: [any]) => {
      this.groupFunctions = result;
      console.log(result);
      result.forEach(element => {
        this.numberPer += element.childFunctionViewModels.length;
      });
      this.getAllPermissionByUser(result, this.numberPer);
      console.log(this.numberPer);
    }, errror => {

    });
  }

  public changeAdd(isChecked: boolean, funct: any) {
    console.log(isChecked);
    console.log(funct);
  }
  public changeUpdate(isChecked: boolean, funct: any) {
    console.log(isChecked);
    console.log(funct);
  }
  public changeDelete(isChecked: boolean, funct: any) {
    console.log(isChecked);
    console.log(funct);
  }
  public changeRead(isChecked: boolean, funct: any) {
    console.log(isChecked);
    console.log(funct);
  }

  public getAllPermissionByUser(fun: [any], numb: any) {

  }
}
