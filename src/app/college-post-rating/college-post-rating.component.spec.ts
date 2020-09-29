import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePostRatingComponent } from './college-post-rating.component';

describe('CollegePostRatingComponent', () => {
  let component: CollegePostRatingComponent;
  let fixture: ComponentFixture<CollegePostRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePostRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePostRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
