import {Component, Input, OnInit} from '@angular/core';
import {FieldModel} from '../../models/field.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {

  submitted = true;
  myForm: FormGroup;
  maxDate: { year: number, month: number, day: number };


  @Input('fields') fields: FieldModel[];

  constructor(private fb: FormBuilder) {
    const now = new Date();
    this.maxDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
  }

  ngOnInit() {
    let controls = {};
    console.log(this.fields);
    if (this.fields) {
      this.fields.forEach(field => {
        if (field.type === 'email') {
          controls[field.field] = ['', Validators.compose([Validators.email])];
        }
        if (field.type === 'select') {
          controls[field.field] = ['', Validators.compose([Validators.required])];
        }

        if (field.type === 'date') {
          controls[field.field] = ['', Validators.compose([Validators.required])];
        }

        if (field.type === 'text') {
          controls[field.field] = ['', Validators.compose([Validators.required])];
        }
      });
    }
    console.log(controls);
    this.myForm = this.fb.group(controls);
  }

}
