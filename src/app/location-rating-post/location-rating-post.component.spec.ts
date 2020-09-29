import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRatingPostComponent } from './location-rating-post.component';

describe('LocationRatingPostComponent', () => {
  let component: LocationRatingPostComponent;
  let fixture: ComponentFixture<LocationRatingPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationRatingPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationRatingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
