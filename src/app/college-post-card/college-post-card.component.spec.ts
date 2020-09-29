import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePostCardComponent } from './college-post-card.component';

describe('CollegePostCardComponent', () => {
  let component: CollegePostCardComponent;
  let fixture: ComponentFixture<CollegePostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
