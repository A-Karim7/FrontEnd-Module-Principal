import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentReceveurComponent } from './agent-receveur.component';

describe('AgentReceveurComponent', () => {
  let component: AgentReceveurComponent;
  let fixture: ComponentFixture<AgentReceveurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentReceveurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentReceveurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
