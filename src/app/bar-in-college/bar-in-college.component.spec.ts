import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarInCollegeComponent } from './bar-in-college.component';

describe('BarInCollegeComponent', () => {
  let component: BarInCollegeComponent;
  let fixture: ComponentFixture<BarInCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarInCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarInCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
