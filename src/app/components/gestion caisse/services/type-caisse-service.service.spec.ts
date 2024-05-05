import { TestBed } from '@angular/core/testing';

import { TypeCaisseService } from './type-caisse-service.service';

describe('TypeCaisseServiceService', () => {
  let service: TypeCaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
