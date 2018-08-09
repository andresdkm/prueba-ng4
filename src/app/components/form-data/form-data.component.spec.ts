import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataComponent } from './form-data.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('FormDataComponent', () => {
  let component: FormDataComponent;
  let fixture: ComponentFixture<FormDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
      declarations: [ FormDataComponent ],
      providers: [
        FormBuilder
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
