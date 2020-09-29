import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarInCollegeRatingComponent } from './bar-in-college-rating.component';

describe('BarInCollegeRatingComponent', () => {
  let component: BarInCollegeRatingComponent;
  let fixture: ComponentFixture<BarInCollegeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarInCollegeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarInCollegeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
