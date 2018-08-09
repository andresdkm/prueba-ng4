import {Component, OnInit} from '@angular/core';
import {DocumentTypeService} from '../../services/document-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RelationshipService} from '../../services/relationship.service';
import {PatientModel} from '../../models/patient.model';
import {ChildModel} from '../../models/child.model';
import {PatientService} from '../../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FieldModel} from "../../models/field.model";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  documentTypes: any;
  relationships: [];
  submitted = false;
  patientForm: FormGroup;
  companionForm: FormGroup;
  withoutCompanion: false;
  maxDate: { year: number, month: number, day: number };
  patientModel: PatientModel;

  constructor(private documentTypeService: DocumentTypeService,
              private relationshipService: RelationshipService,
              private patientService: PatientService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    const now = new Date();
    this.maxDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
    this.patientForm = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.email])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,10}')])],
      'without_phone': null,
      'birthdate': ['', Validators.compose([Validators.required])],
      'documentType': null,
      'nid': null,
    });
    this.documentTypes = this.documentTypeService.index();
    this.relationships = this.relationshipService.index();
    this.onWithoutCompanionValueChanged()
    this.personFields = [
      {
        label: 'Tipo de documento',
        field: 'documentType',
        values: this.documentTypeService.index(),
        type: 'select',
        size: 6
      }
    ];
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params.id) {
        this.loadPatient(params.id);
      }
    });
  }


  private makePatient() {
    Object.keys(this.patientModel)
      .forEach(key => {
        if (this.patientForm.get(key)) {
          this.patientForm.get(key).setValue(this.patientModel[key]);
        }
      });
    if (this.patientModel.without_phone) {
      this.patientForm.get('phone').setValidators([]);
      this.patientForm.get('phone').updateValueAndValidity();
    }
    if (this.patientModel.companion) {
      Object.keys(this.patientModel.companion)
        .forEach(key => {
          if (this.companionForm.get(key)) {
            this.companionForm.get(key).setValue(this.patientModel.companion[key]);
          }
        });
    } else {
      this.withoutCompanion = true;
      this.onWithoutCompanionValueChanged();
    }
  }

  private loadPatient(id: string) {
    this.patientService.show(id)
      .subscribe(response => {
        this.patientModel = response;
        this.makePatient();
      });
  }

  submit() {
    this.submitted = true;
    console.log(this.patientForm, this.companionForm);
    if (this.patientForm.valid && this.companionForm.valid) {
      let patient: PatientModel = new PatientModel();
      patient = <PatientModel> this.patientForm.value;
      patient.companion = <ChildModel> this.companionForm.value;
      this.patientService.store(patient)
        .subscribe((response) => {
          this.router.navigateByUrl('/patients');
        });
    }
  }

  onWithoutCompanionValueChanged() {
    if (!this.withoutCompanion) {
      this.companionForm = this.fb.group({
        'firstName': ['', Validators.compose([Validators.required])],
        'lastName': ['', Validators.compose([Validators.required])],
        'phone': ['', this.phoneValidators],
        'without_phone': null,
        'email': ['', Validators.compose([Validators.email])],
        'relationship': ['', Validators.compose([Validators.required])]
      });
    } else {
      this.companionForm = this.fb.group({
        'firstName': null,
        'lastName': null,
        'relationship': null,
        'phone': null,
        'without_phone': null,
        'email': null
      });
    }
    Object.keys(this.companionForm.controls)
      .forEach(control => {
        this.companionForm.get(control).updateValueAndValidity();
      });
  }

  onWithoutPhoneValueChanged(form: FormGroup) {
    const value = form.get('without_phone').value;
    const phoneNumberControl = form.get('phone');
    if (!value) {
      phoneNumberControl.setValidators(['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,10}')])]);
    } else {
      phoneNumberControl.setValidators([]);
    }
    phoneNumberControl.updateValueAndValidity();
  }

}
