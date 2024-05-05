import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureUsersComponent } from './structure-users.component';

describe('StructureUsersComponent', () => {
  let component: StructureUsersComponent;
  let fixture: ComponentFixture<StructureUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
