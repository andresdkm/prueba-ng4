import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFormComponent } from './professional-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ProfessionalService} from '../../services/professional.service';

describe('ProfessionalFormComponent', () => {
  let component: ProfessionalFormComponent;
  let fixture: ComponentFixture<ProfessionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ ProfessionalFormComponent ],
      providers: [ProfessionalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
