/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaissesComponent } from './caisses.component';

describe('CaissesComponent', () => {
  let component: CaissesComponent;
  let fixture: ComponentFixture<CaissesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaissesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaissesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
