import {TestBed, inject} from '@angular/core/testing';

import {ProfessionalService} from './professional.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ProfessionalModel} from '../models/professional.model';
import {environment} from '../../environments/environment';

describe('ProfessionalService', () => {
  let service: ProfessionalService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ProfessionalService]
    });
    service = TestBed.get(ProfessionalService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProfessionalService], (service: ProfessionalService) => {
    expect(service).toBeTruthy();
  }));


  it('should return professionals', inject([ProfessionalService], (service: ProfessionalService) => {
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
    const req = httpMock.expectOne(`${environment.url}professionals.json`);
    req.flush(mockResponse);
    // Assert
    expect(dataResponse.length).toEqual(1);
    expect(req.request.url).toEqual(`${environment.url}professionals.json`);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  }));


  it('should return a professional', inject([ProfessionalService], (service: ProfessionalService) => {
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
    const req = httpMock.expectOne(`${environment.url}professionals/LJRC8NdpCTxPIlyvsXm.json`);
    req.flush(mockResponse);
    // Assert
    expect(dataResponse.length).toEqual(1);
    expect(req.request.url).toEqual(`${environment.url}professionals/LJRC8NdpCTxPIlyvsXm.json`);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  }));

  it('should create professional', inject([ProfessionalService], (service: ProfessionalService) => {
    const mockRequest: ProfessionalModel = new ProfessionalModel();
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
    const req = httpMock.expectOne(`${environment.url}professionals.json`);
    req.flush(mockRequest);
    // Assert
    expect(req.request.responseType).toEqual('json');
    expect(req.request.url).toEqual(`${environment.url}professionals.json`);
    expect(req.request.method).toEqual('POST');
    expect(dataError).toBeUndefined();
  }));
