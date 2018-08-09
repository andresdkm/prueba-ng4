import { TestBed, inject } from '@angular/core/testing';

import { PatientService } from './patient.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";

describe('PatientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [PatientService]
    });
  });

  it('should be created', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));
});
