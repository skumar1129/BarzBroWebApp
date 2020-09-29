import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollegePostComponent } from './edit-college-post.component';

describe('EditCollegePostComponent', () => {
  let component: EditCollegePostComponent;
  let fixture: ComponentFixture<EditCollegePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCollegePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollegePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
