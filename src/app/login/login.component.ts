import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = '22';
  passwork = 'xx';

  listUser;
  value: string;

  user = { FullName: 'yyyy', Username: 'iemP', Password: 'Piem', Status: 1 };

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/admin/home');
    }
  }

  login() {
    console.log('xxx');
  }
}
