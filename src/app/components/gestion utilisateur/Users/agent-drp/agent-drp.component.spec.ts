import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDrpComponent } from './agent-drp.component';

describe('AgentDrpComponent', () => {
  let component: AgentDrpComponent;
  let fixture: ComponentFixture<AgentDrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentDrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
