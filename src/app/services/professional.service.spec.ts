import {TestBed, inject} from '@angular/core/testing';

import {ProfessionalService} from './professional.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('ProfessionalService', () => {
  let service: ProfessionalService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ProfessionalService,HttpClient]
    });
    service = TestBed.get(ProfessionalService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProfessionalService], (service: ProfessionalService) => {
    expect(service).toBeTruthy();
  }));

  it('should return professionals', () => {
    // Arrange
    const mockResponse = [{
      '-LJRC8NdpCTxPIlyvsXm': {
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
    const req = httpMock.expectOne(`https://arenasapp-1198.firebaseio.com/professionals.json`);
    req.flush(mockResponse);
    // Assert
    expect(dataResponse.length).toEqual(1);
    expect(req.request.url).toEqual(`https://arenasapp-1198.firebaseio.com/professionals.json`);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  });

})
