import { Injectable } from '@angular/core';
import {RelationshipEnum} from '../models/relationship.enum';
const StringIsNumber = value => isNaN(Number(value)) === false;

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  constructor() { }

  index() {
    return Object.keys(RelationshipEnum)
      .filter(StringIsNumber)
      .map(key => ({ id: key , name: RelationshipEnum[key] }));
  }
}
