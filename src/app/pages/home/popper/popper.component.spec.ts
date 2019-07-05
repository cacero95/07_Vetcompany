import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperComponent } from './popper.component';

describe('PopperComponent', () => {
  let component: PopperComponent;
  let fixture: ComponentFixture<PopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopperComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
