import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionCaisseannexeComponent } from './attribution-caisseannexe.component';

describe('AttributionCaisseannexeComponent', () => {
  let component: AttributionCaisseannexeComponent;
  let fixture: ComponentFixture<AttributionCaisseannexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionCaisseannexeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionCaisseannexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
