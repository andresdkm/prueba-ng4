import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormComponent } from './patient-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PatientService} from '../../services/patient.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ PatientFormComponent ],
      providers: [PatientService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
