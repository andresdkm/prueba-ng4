import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PatientComponent} from './pages/patient/patient.component';
import {PatientFormComponent} from "./pages/patient-form/patient-form.component";
import {ProfessionalComponent} from "./pages/professional/professional.component";
import {ProfessionalFormComponent} from "./pages/professional-form/professional-form.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'patients',
    component: PatientComponent
  },
  {
    path: 'professionals',
    component: ProfessionalComponent
  },
  {
    path: 'patient-create',
    component: PatientFormComponent
  },
  {
    path: 'patient-edit/:id',
    component: PatientFormComponent
  },
  {
    path: 'professional-create',
    component: ProfessionalFormComponent
  },
  {
    path: 'professional-edit/:id',
    component: ProfessionalFormComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}

