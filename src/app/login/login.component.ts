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
  }

  changeUsername(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.username = element.value;

  }

  changePassword(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.passwork = element.value;

  }

  login() {
    this.httpClient.get(`localhost:62602/api/Users`).subscribe(data => {
      this.listUser = data;

      for (var i = 0; this.listUser.length; i++) {
        if (this.listUser[i].username === this.username) {
          alert('đúng username !');
          break;
        }
      }
    });
  }

  delete() {
    this.httpClient.delete(`http://localhost:62602/api/Users/4`).subscribe(data => {
      console.log('deleted');


    });
  }

  //phương thức 

  post() {
    this.httpClient.post(`http://localhost:62602/api/Users`, this.user).subscribe(data => {
      alert('Đã post được');
    });
  }

  put(id) {
    this.httpClient.put(`http://localhost:62602/api/Users/${id}`, this.user).subscribe(data => {
      alert('Đã put được');
    });
  }

}
