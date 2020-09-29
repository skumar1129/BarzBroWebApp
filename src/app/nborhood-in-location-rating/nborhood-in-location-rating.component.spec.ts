import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NborhoodInLocationRatingComponent } from './nborhood-in-location-rating.component';

describe('NborhoodInLocationRatingComponent', () => {
  let component: NborhoodInLocationRatingComponent;
  let fixture: ComponentFixture<NborhoodInLocationRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NborhoodInLocationRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NborhoodInLocationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
