import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDerComponent } from './agent-der.component';

describe('AgentDerComponent', () => {
  let component: AgentDerComponent;
  let fixture: ComponentFixture<AgentDerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentDerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
