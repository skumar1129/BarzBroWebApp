import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePostComponent } from './college-post.component';

describe('CollegePostComponent', () => {
  let component: CollegePostComponent;
  let fixture: ComponentFixture<CollegePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
