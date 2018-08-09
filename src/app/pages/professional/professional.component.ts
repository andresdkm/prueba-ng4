import {Component, OnInit} from '@angular/core';
import {FieldModel} from '../../models/field.model';
import {ProfessionalService} from '../../services/professional.service';
import {Router} from '@angular/router';
import {ProfessionalModel} from '../../models/professional.model';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

  professionals: Array<ProfessionalModel>;
  fields: FieldModel[];

  constructor(private professionalService: ProfessionalService,
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
    this.professionalService.index()
      .subscribe((response) => {
        this.professionals = response;
      });
  }

  updateProfessional(item) {
    this.router.navigateByUrl('/professional-edit/' + item.key);
  }

  createProfessional() {
    this.router.navigateByUrl('/professional-create');
  }

}
