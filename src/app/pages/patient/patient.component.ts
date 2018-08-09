import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {PatientModel} from '../../models/patient.model';
import {FieldModel} from '../../models/field.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Array<PatientModel>;
  fields: FieldModel[];

  constructor(private patientService: PatientService,
              private router: Router) {
    this.fields = [
      {
        label: 'Nombre',
        field: 'firstName'
      }, {
        label: 'Apellidos',
        field: 'lastName'
      },
      {
        label: 'Teléfono',
        field: 'phone'
      },
      {
        label: 'Correo',
        field: 'email'
      }
    ];
  }

  ngOnInit() {
    this.patientService.index()
      .subscribe((response) => {
        this.patients = response;
      });
  }

  updatePatient(item) {
    this.router.navigateByUrl('/patient-edit/' + item.key);
  }

  createPatient() {
    this.router.navigateByUrl('/patient-create');
  }
}
