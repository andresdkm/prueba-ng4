import { Pipe, PipeTransform } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: NgbDateStruct, args?: any): any {
    return `${value.year}-${value.month}-${value.day}`;
  }

}
