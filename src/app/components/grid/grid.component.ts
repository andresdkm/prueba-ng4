import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldModel} from '../../models/field.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {


  @Input('fields') fields: FieldModel[];
  @Input('data') data: any[];

  @Output('create') public createEvent = new EventEmitter<boolean>();
  @Output('update') public updateEvent = new EventEmitter<any>();
  @Output('remove') public onDelete = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  create() {
    this.createEvent.emit(true);
  }
  update(item) {
    this.updateEvent.emit(item);
  }
}
