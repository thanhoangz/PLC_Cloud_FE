import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayslipDialogComponent } from './edit-payslip-dialog.component';

describe('EditPayslipDialogComponent', () => {
  let component: EditPayslipDialogComponent;
  let fixture: ComponentFixture<EditPayslipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPayslipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayslipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
