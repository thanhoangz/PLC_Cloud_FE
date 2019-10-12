import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CourseService } from '../course.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './notification.service';
import { ConfirmDialogComponent } from '../../extension-dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private screenHeight;
  private screenWidth;
  private isOpenDialog = false;

  constructor(
    private courseService: CourseService,
    public matDialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }


  public openConfirmDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.5 * this.screenWidth : 0.1 * this.screenWidth;
      this.matDialog.open(ConfirmDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
      });
    }
  }
}
