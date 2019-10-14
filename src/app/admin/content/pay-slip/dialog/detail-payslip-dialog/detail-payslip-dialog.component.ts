import { PaySlipService } from './../../../../services/pay-slip.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-payslip-dialog',
  templateUrl: './detail-payslip-dialog.component.html',
  styleUrls: ['./detail-payslip-dialog.component.css']
})
export class DetailPayslipDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

}
