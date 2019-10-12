import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

constructor( private toastrService: ToastrService) { }

public showNotification(isSuccess, title, content) {
  if (isSuccess === 1) {
    this.toastrService.success(content, title);
    return;
  }
  if (isSuccess === 2) {
    this.toastrService.warning(content, title);
    return;
  }
  this.toastrService.error(content, title);
}
}
