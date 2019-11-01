import { ControlsPersonnelComponent } from './../content/personnel/page/controls-personnel/controls-personnel.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/extension/notification.service';
import { LoginService } from '../services/login.service';
import { ConstService } from '../services/extension/Const.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    './admin-management.component.css',
  ]
})
export class AdminManagementComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) { }

  public user;
  public permissions;

  ngOnInit() {
    this.loginService.islogged();
    this.getPermissionByUser();
  }

  public getPermissionByUser() {
    this.loginService.getProfile().subscribe((result: any) => {
      ConstService.user = result.user;
      ConstService.permissions = result.permission;
      this.user = result.user;
      this.permissions = result.permission;
      console.log(ConstService.user);
      console.log(this.permissions);
    }, error => {
      this.logout();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
