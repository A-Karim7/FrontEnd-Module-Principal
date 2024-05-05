import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionCaisseComponent } from './attribution-caisse.component';

describe('AttributionCaisseComponent', () => {
  let component: AttributionCaisseComponent;
  let fixture: ComponentFixture<AttributionCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionCaisseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
