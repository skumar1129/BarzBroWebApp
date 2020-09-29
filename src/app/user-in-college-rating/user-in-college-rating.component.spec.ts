import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInCollegeRatingComponent } from './user-in-college-rating.component';

describe('UserInCollegeRatingComponent', () => {
  let component: UserInCollegeRatingComponent;
  let fixture: ComponentFixture<UserInCollegeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInCollegeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInCollegeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
