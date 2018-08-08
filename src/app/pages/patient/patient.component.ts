import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../services/patient.service';
import {PatientModel} from '../../models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Array<PatientModel>;
  constructor(private patientService: PatientService) {
    this.patientService.index()
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnInit() {
    this.patientService.index()
      .subscribe((response) => {
        this.patients = response;
      });
  }

}
