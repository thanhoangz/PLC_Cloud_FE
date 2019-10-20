import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AppUsers/Login`, user);
  }

  /*
    - Kiểm tra nếu đã đăng nhập rồi thì tiếp các tác vụ khác
    - Nếu chưa đăng nhập thì sẽ auto cho bay về trang login
   */
  islogged() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/admin/home');
    }
  }

}
