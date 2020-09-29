import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NborhoodInCollegeComponent } from './nborhood-in-college.component';

describe('NborhoodInCollegeComponent', () => {
  let component: NborhoodInCollegeComponent;
  let fixture: ComponentFixture<NborhoodInCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NborhoodInCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NborhoodInCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
