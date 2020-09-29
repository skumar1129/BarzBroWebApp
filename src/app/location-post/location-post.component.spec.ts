import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPostComponent } from './location-post.component';

describe('LocationPostComponent', () => {
  let component: LocationPostComponent;
  let fixture: ComponentFixture<LocationPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
