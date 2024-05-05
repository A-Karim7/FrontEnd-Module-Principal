/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnnexeService } from './annexe.service';

describe('Service: Annexe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnexeService]
    });
  });

  it('should ...', inject([AnnexeService], (service: AnnexeService) => {
    expect(service).toBeTruthy();
  }));
});
