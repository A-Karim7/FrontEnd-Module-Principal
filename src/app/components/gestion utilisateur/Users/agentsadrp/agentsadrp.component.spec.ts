import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsadrpComponent } from './agentsadrp.component';

describe('AgentsadrpComponent', () => {
  let component: AgentsadrpComponent;
  let fixture: ComponentFixture<AgentsadrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsadrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsadrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
