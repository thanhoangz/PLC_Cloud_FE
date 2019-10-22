import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/extension/notification.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    './admin-management.component.css',
  ]
})
export class AdminManagementComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginService.islogged();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
