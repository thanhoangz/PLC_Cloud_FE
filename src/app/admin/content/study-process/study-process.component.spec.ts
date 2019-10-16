import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyProcessComponent } from './study-process.component';

describe('StudyProcessComponent', () => {
  let component: StudyProcessComponent;
  let fixture: ComponentFixture<StudyProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
