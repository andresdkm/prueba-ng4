import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';
import {PatientModel} from '../models/patient.model';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';
import {map} from "rxjs/internal/operators";

@Injectable()
export class PatientService {
  constructor(private httpClient: HttpClient) {
  }

  index(): Observable<PatientModel[]> {
    const url = `${environment.url}${Constants.PATIENT_ENDPOINT}.json`;
    return this.httpClient.get <PatientModel[]>(url)
      .pipe(
        map(this.extractData)
      );
  }

  show(id: string): Observable<PatientModel> {
    const url = `${environment.url}${Constants.PATIENT_ENDPOINT}/${id}.json`;
    return this.httpClient.get <PatientModel>(url);
  }

  private extractData(response: Response) {
    if (response) {
      let data = Object.keys(response)
        .map(key => {
          let item: PatientModel = <PatientModel>response[key];
          item.key = key;
          return item;
        })
      return data;
    }
    return null;
  }


  store(patient: PatientModel): Observable<any> {
    const url = `${environment.url}${Constants.PATIENT_ENDPOINT}.json`;
    return this.httpClient.post(url, patient);
  }
}
