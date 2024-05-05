import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAnnexeComponent } from './agent-annexe.component';

describe('AgentAnnexeComponent', () => {
  let component: AgentAnnexeComponent;
  let fixture: ComponentFixture<AgentAnnexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentAnnexeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
