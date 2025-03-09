import { TestBed } from '@angular/core/testing';

import { SolicitudAlquilerService } from './solicitud-alquiler.service';

describe('SolicitudAlquilerService', () => {
  let service: SolicitudAlquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudAlquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
