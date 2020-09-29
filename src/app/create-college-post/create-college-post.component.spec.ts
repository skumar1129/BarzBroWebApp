import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollegePostComponent } from './create-college-post.component';

describe('CreateCollegePostComponent', () => {
  let component: CreateCollegePostComponent;
  let fixture: ComponentFixture<CreateCollegePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollegePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollegePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
