import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import {PatientModel} from '../models/patient.model';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';

@Injectable()
export class PatientService {
  constructor(private httpClient: HttpClient) {
  }

   index(): Observable<PatientModel[]> {
    const url = `${environment.url}/${Constants.PATIENT_ENDPOINT}`;
    return this.httpClient.get <PatientModel[]>(url);
  }
}
