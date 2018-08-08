import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import { PatientComponent } from './pages/patient/patient.component';
import {PatientService} from './services/patient.service';
import {HttpClientModule} from '@angular/common/http';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    PatientFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
