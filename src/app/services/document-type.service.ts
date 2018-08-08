import { Injectable } from '@angular/core';
import {DocumentEnum} from '../models/document.enum';

const StringIsNumber = value => isNaN(Number(value)) === false;

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor() { }
  index() {
    return Object.keys(DocumentEnum)
      .filter(StringIsNumber)
      .map(key => ({ id: key , name: DocumentEnum[key] }));
  }
}
