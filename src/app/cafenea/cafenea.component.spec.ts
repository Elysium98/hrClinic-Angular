/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CafeneaComponent } from './cafenea.component';

describe('CafeneaComponent', () => {
  let component: CafeneaComponent;
  let fixture: ComponentFixture<CafeneaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeneaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
