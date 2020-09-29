import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollegePostCardComponent } from './my-college-post-card.component';

describe('MyCollegePostCardComponent', () => {
  let component: MyCollegePostCardComponent;
  let fixture: ComponentFixture<MyCollegePostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollegePostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollegePostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
