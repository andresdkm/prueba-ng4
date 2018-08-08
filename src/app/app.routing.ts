import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PatientComponent} from './pages/patient/patient.component';
import {PatientFormComponent} from "./pages/patient-form/patient-form.component";

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
    path: 'patient-create',
    component: PatientFormComponent
  },
  {
    path: '',
    redirectTo: 'patients',
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

