import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInCollegeComponent } from './user-in-college.component';

describe('UserInCollegeComponent', () => {
  let component: UserInCollegeComponent;
  let fixture: ComponentFixture<UserInCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
