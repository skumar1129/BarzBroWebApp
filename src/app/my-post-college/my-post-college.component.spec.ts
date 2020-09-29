import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostCollegeComponent } from './my-post-college.component';

describe('MyPostCollegeComponent', () => {
  let component: MyPostCollegeComponent;
  let fixture: ComponentFixture<MyPostCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
