import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInLocationRatingComponent } from './user-in-location-rating.component';

describe('UserInLocationRatingComponent', () => {
  let component: UserInLocationRatingComponent;
  let fixture: ComponentFixture<UserInLocationRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInLocationRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInLocationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
