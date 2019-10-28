import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
@Component({
  selector: 'app-search-studyprocess',
  templateUrl: './search-studyprocess.component.html',
  styleUrls: ['./search-studyprocess.component.css']
})
export class SearchStudyprocessComponent implements OnInit {
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public logStudyProcess;
  public keyWord;

   // tslint:disable-next-line: member-ordering
   public displayedColumns: string[] = ['index', 'date', 'classId', 'courseId', 'className', 'manipulation', 'note'];
   // tslint:disable-next-line: member-ordering
   public dataSource = new MatTableDataSource(this.logStudyProcess);
   // tslint:disable-next-line: member-ordering
   public selection = new SelectionModel(true, []);
  constructor(
    private notificationService: NotificationService,

  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {
  }

}
