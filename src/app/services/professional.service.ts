import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {Constants} from '../constants';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/index';
import {ProfessionalModel} from '../models/professional.model';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  constructor(private httpClient: HttpClient) {
  }

  index(): Observable<ProfessionalModel[]> {
    const url = `${environment.url}${Constants.PROFESSIONAL_ENDPOINT}.json`;
    return this.httpClient.get <ProfessionalModel[]>(url)
      .pipe(
        map(this.extractData)
      );
  }

  show(id: string): Observable<ProfessionalModel> {
    const url = `${environment.url}${Constants.PROFESSIONAL_ENDPOINT}/${id}.json`;
    return this.httpClient.get <ProfessionalModel>(url);
  }

  private extractData(response: Response) {
    if (response) {
      const data = Object.keys(response)
        .map(key => {
          const item: ProfessionalModel = <ProfessionalModel>response[key];
          item.key = key;
          return item;
        });
      return data;
    }
    return [];
  }

  store(professional: ProfessionalModel): Observable<any> {
    const url = `${environment.url}${Constants.PROFESSIONAL_ENDPOINT}.json`;
    return this.httpClient.post(url, professional);
  }

}
