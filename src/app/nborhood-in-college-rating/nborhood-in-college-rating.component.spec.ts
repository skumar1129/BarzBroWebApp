import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NborhoodInCollegeRatingComponent } from './nborhood-in-college-rating.component';

describe('NborhoodInCollegeRatingComponent', () => {
  let component: NborhoodInCollegeRatingComponent;
  let fixture: ComponentFixture<NborhoodInCollegeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NborhoodInCollegeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NborhoodInCollegeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
