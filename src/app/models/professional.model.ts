import {ChildModel} from './child.model';
import {PersonModel} from './person.model';

export class ProfessionalModel extends PersonModel {
  reference: ChildModel;
}
