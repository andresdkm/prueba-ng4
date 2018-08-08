import {ChildModel} from './child.model';
import {PersonModel} from './person.model';

export class PatientModel extends PersonModel {
  companion: ChildModel;
}
