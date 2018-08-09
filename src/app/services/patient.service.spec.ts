import {TestBed, inject} from '@angular/core/testing';

import {PatientService} from './patient.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PatientModel} from '../models/patient.model';

describe('PatientService', () => {

  let service: PatientService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [PatientService]
    });
    service = TestBed.get(PatientService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));

  it('should return patients', inject([PatientService], (service: PatientService) => {
    const mockResponse = [{
      'LJRC8NdpCTxPIlyvsXm': {
        'birthdate': {
          'day': 8,
          'month': 7,
          'year': 2018
        },
        'documentType': '1',
        'email': 'andresdkm@xn--mail-92a.com',
        'firstName': 'asdasd',
        'lastName': 'asdsad',
        'nid': '4234',
        'phone': '',
        'without_phone': true
      }
    }];
    let dataError, dataResponse;
    // Act
    service.index()
      .subscribe((response) => {
        dataResponse = response;
      }, (error) => {
        dataError = error;
      });
    const req = httpMock.expectOne(`${environment.url}patients.json`);
    req.flush(mockResponse);
    // Assert
    expect(dataResponse.length).toEqual(1);
    expect(req.request.url).toEqual(`${environment.url}patients.json`);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  }));


  it('should return a patient', inject([PatientService], (service: PatientService) => {
    const mockResponse = [{
      'birthdate': {
        'day': 8,
        'month': 7,
        'year': 2018
      },
      'documentType': '1',
      'email': 'andresdkm@xn--mail-92a.com',
      'firstName': 'asdasd',
      'lastName': 'asdsad',
      'nid': '4234',
      'phone': '',
      'without_phone': true
    }];
    let dataError, dataResponse;
    // Act
    service.show('LJRC8NdpCTxPIlyvsXm')
      .subscribe((response) => {
        dataResponse = response;
      }, (error) => {
        dataError = error;
      });
    const req = httpMock.expectOne(`${environment.url}patients/LJRC8NdpCTxPIlyvsXm.json`);
    req.flush(mockResponse);
    // Assert
    expect(dataResponse.length).toEqual(1);
    expect(req.request.url).toEqual(`${environment.url}patients/LJRC8NdpCTxPIlyvsXm.json`);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  }));

  it('should create patients', inject([PatientService], (service: PatientService) => {
    const mockRequest: PatientModel = new PatientModel();
    mockRequest.email = 'andresdkm@xn--mail-92a.com';
    mockRequest.documentType = '1';
    mockRequest.firstName = 'asdasd';
    mockRequest.lastName = 'asdsad';
    mockRequest.nid = '4234';
    mockRequest.phone = '';
    mockRequest.without_phone = true;
    mockRequest.birthdate = {
      'day': 8,
      'month': 7,
      'year': 2018
    };
    let dataError, dataResponse;
    // Act
    service.store(mockRequest)
      .subscribe((response) => {
        dataResponse = response;
      }, (error) => {
        dataError = error;
      });
    const req = httpMock.expectOne(`${environment.url}patients.json`);
    req.flush(mockRequest);
    // Assert
    expect(req.request.responseType).toEqual('json');
    expect(req.request.url).toEqual(`${environment.url}patients.json`);
    expect(req.request.method).toEqual('POST');
    expect(dataError).toBeUndefined();
  }));

});
