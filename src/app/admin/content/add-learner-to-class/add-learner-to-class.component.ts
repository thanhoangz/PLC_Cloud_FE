import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudyProcessService } from '../../services/study-process.service';
import { LearnerService } from '../../services/learner.service';
import { LanguageClassesService } from '../../services/language-classes.service';
@Component({
  selector: 'app-add-learner-to-class',
  templateUrl: './add-learner-to-class.component.html',
  styleUrls: ['./add-learner-to-class.component.css']
})
export class AddLearnerToClassComponent implements OnInit {
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 10;
  public pageIndex = 1;
  public pageSizeOptions = [10, 15, 20];

  public learner;
  public LearnerId;
  public class;
  public classId;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  // tslint:disable-next-line: member-ordering
  public tableLearnerOutClass: string[] = ['index', 'name', 'birthday', 'sex', 'controls'];
  public tableClassInClass: string[] = ['index', 'name', 'birthday', 'sex'];
  // tslint:disable-next-line: member-ordering
  public dataSourceOutClass = new MatTableDataSource(this.learner);
  public dataSourceClass = new MatTableDataSource(this.class);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private studyProcessService: StudyProcessService,
    private learnerService: LearnerService,
    private languageClassesService: LanguageClassesService,

    private toastr: ToastrService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  ngOnInit() {

    this.getLearnerOutClass();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';

  }

  public getLearnerOutClass() {
    this.startProgressBar();
    // tslint:disable-next-line: variable-name
    this.learnerService.getOutClass('LC1').subscribe((result: any) => {
      this.learner = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTables(data: any) {
    this.dataSourceOutClass = new MatTableDataSource(data);
    this.dataSourceOutClass.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.learner.filter(option => option.toLowerCase().includes(filterValue));
  }


  



  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
