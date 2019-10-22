import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-change-class',
  templateUrl: './change-class.component.html',
  styleUrls: ['./change-class.component.css']
})
export class ChangeClassComponent implements OnInit {

  public format = {
    ngaysinh: null,
    ngayvao: null,
    ngayra: null,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.Date();
  }

  public Date() {
    const ngaysinh = this.datePipe.transform(this.data._learnerInClass.learner.birthday, 'dd-MM-yyyy');
    const ngayra = this.datePipe.transform(this.data._learnerInClass.outDate, 'dd-MM-yyyy');
    const ngayvao = this.datePipe.transform(this.data._learnerInClass.inDate, 'dd-MM-yyyy');
    this.format.ngaysinh = ngaysinh;
    this.format.ngayra = ngayra;
    this.format.ngayvao = ngayvao;
}
}
