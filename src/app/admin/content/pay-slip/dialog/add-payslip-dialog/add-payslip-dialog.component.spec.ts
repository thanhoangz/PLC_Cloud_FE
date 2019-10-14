import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayslipDialogComponent } from './add-payslip-dialog.component';

describe('AddPayslipDialogComponent', () => {
  let component: AddPayslipDialogComponent;
  let fixture: ComponentFixture<AddPayslipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayslipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayslipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
