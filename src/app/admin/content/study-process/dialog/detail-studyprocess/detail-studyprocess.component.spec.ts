import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStudyprocessComponent } from './detail-studyprocess.component';

describe('DetailStudyprocessComponent', () => {
  let component: DetailStudyprocessComponent;
  let fixture: ComponentFixture<DetailStudyprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStudyprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStudyprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
