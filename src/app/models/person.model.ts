import {DocumentEnum} from './document.enum';

export class PersonModel {
  key: string;
  documentType: number;
  nid: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phone: string;
  without_phone: boolean;
}
