import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarInLocationRatingComponent } from './bar-in-location-rating.component';

describe('BarInLocationRatingComponent', () => {
  let component: BarInLocationRatingComponent;
  let fixture: ComponentFixture<BarInLocationRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarInLocationRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarInLocationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
