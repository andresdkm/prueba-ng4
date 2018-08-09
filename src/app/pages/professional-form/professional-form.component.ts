import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalModel} from '../../models/professional.model';
import {DocumentTypeService} from '../../services/document-type.service';
import {RelationshipService} from '../../services/relationship.service';
import {ProfessionalService} from '../../services/professional.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildModel} from '../../models/child.model';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnInit {

  documentTypes: any;
  relationships: [];
  submitted = false;
  professionalForm: FormGroup;
  referenceForm: FormGroup;
  withoutCompanion: false;
  maxDate: { year: number, month: number, day: number };
  professionalModel: ProfessionalModel;

  constructor(private documentTypeService: DocumentTypeService,
              private relationshipService: RelationshipService,
              private professionalService: ProfessionalService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    const now = new Date();
    this.maxDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
    this.professionalForm = this.fb.group({
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
    this.onWithoutCompanionValueChanged();
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
    Object.keys(this.professionalModel)
      .forEach(key => {
        if (this.professionalForm.get(key)) {
          this.professionalForm.get(key).setValue(this.professionalModel[key]);
        }
      });
    if (this.professionalModel.without_phone) {
      this.professionalForm.get('phone').setValidators([]);
      this.professionalForm.get('phone').updateValueAndValidity();
    }
    if (this.professionalModel.companion) {
      Object.keys(this.professionalModel.companion)
        .forEach(key => {
          if (this.referenceForm.get(key)) {
            this.referenceForm.get(key).setValue(this.professionalModel.companion[key]);
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
        this.professionalModel = response;
        this.makePatient();
      });
  }

  submit() {
    this.submitted = true;
    console.log(this.professionalForm, this.referenceForm);
    if (this.professionalForm.valid && this.referenceForm.valid) {
      let professional: ProfessionalModel = new ProfessionalModel();
      professional = <ProfessionalModel> this.professionalForm.value;
      professional.companion = <ChildModel> this.referenceForm.value;
      this.professionalService.store(professional)
        .subscribe((response) => {
          this.router.navigateByUrl('/professional');
        });
    }
  }

  onWithoutCompanionValueChanged() {
    if (!this.withoutCompanion) {
      this.referenceForm = this.fb.group({
        'firstName': ['', Validators.compose([Validators.required])],
        'lastName': ['', Validators.compose([Validators.required])],
        'phone': ['', this.phoneValidators],
        'without_phone': null,
        'email': ['', Validators.compose([Validators.email])],
        'relationship': ['', Validators.compose([Validators.required])]
      });
    } else {
      this.referenceForm = this.fb.group({
        'firstName': null,
        'lastName': null,
        'relationship': null,
        'phone': null,
        'without_phone': null,
        'email': null
      });
    }
    Object.keys(this.referenceForm.controls)
      .forEach(control => {
        this.referenceForm.get(control).updateValueAndValidity();
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
