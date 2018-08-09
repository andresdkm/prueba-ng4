import {DocumentEnum} from './document.enum';

export class PersonModel {
  key: string;
  documentType: string;
  nid: string;
  firstName: string;
  lastName: string;
  birthdate: any;
  email: string;
  phone: string;
  without_phone: boolean;
}
