import {Component, OnInit} from '@angular/core';
import {DocumentTypeService} from '../../services/document-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  documentTypes: [];
  submitted = false;
  patientForm: FormGroup;
  companionForm: FormGroup;
  phoneValidators: any;
  withoutCompanion: false;
  maxDate: { year: number, month: number, day: number };

  constructor(private documentTypeService: DocumentTypeService,
              private fb: FormBuilder) {
    let now = new Date();
    this.maxDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
    this.phoneValidators = Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]{7,10}',
      )
    ]);
    this.companionForm = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'relationship': ['', Validators.compose([Validators.required])],
      'phone': ['', this.phoneValidators],
      'email': ['', Validators.compose([Validators.email])],
    });
    this.patientForm = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.email])],
      'phone': ['', this.phoneValidators],
      'without_phone': null,
      'birthdate': null,
      'documentType': null,
      'nid': null,
      'without_companion': null,
    });
    console.log(this.patientForm);
  }

  ngOnInit() {
    this.documentTypes = this.documentTypeService.index();
  }

  submit() {
    this.submitted = true;
    console.log(this.patientForm);
    console.log(this.companionForm);
  }

  onWithoutCompanionValueChanged() {
    if (!this.withoutCompanion) {
      this.companionForm = this.fb.group({
        'firstName': ['', Validators.compose([Validators.required])],
        'lastName': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],
        'phone': ['', this.phoneValidators],
        'email': ['', Validators.compose([Validators.email])],
      });
    } else {
      this.companionForm = this.fb.group({
        'firstName': null,
        'lastName': null,
        'relationship': null,
        'phone': null,
        'email': null
      });
    }
    Object.keys(this.companionForm.controls)
      .forEach(control => {
        this.companionForm.get(control).updateValueAndValidity();
    });
  }

  onWithoutPhoneValueChanged() {
    let value = this.patientForm.get('without_phone').value;
    let phoneNumberControl = this.patientForm.get('phone');
    if (!value) {
      phoneNumberControl.setValidators(this.phoneValidators);
    } else {
      phoneNumberControl.setValidators([]);
    }
    phoneNumberControl.updateValueAndValidity();
  }

}
