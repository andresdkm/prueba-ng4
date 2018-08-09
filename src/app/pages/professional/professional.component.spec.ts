import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalComponent } from './professional.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {GridComponent} from '../../components/grid/grid.component';
import {ProfessionalService} from '../../services/professional.service';

describe('ProfessionalComponent', () => {
  let component: ProfessionalComponent;
  let fixture: ComponentFixture<ProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ ProfessionalComponent , GridComponent],
      providers: [ProfessionalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
