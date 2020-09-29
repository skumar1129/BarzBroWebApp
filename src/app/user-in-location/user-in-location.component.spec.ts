import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInLocationComponent } from './user-in-location.component';

describe('UserInLocationComponent', () => {
  let component: UserInLocationComponent;
  let fixture: ComponentFixture<UserInLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
