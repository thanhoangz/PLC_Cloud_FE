import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPayslipDialogComponent } from './detail-payslip-dialog.component';

describe('DetailPayslipDialogComponent', () => {
  let component: DetailPayslipDialogComponent;
  let fixture: ComponentFixture<DetailPayslipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPayslipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPayslipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
