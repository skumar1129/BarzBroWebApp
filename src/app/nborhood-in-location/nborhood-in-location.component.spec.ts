import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NborhoodInLocationComponent } from './nborhood-in-location.component';

describe('NborhoodInLocationComponent', () => {
  let component: NborhoodInLocationComponent;
  let fixture: ComponentFixture<NborhoodInLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NborhoodInLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NborhoodInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
