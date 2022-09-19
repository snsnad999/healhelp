import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpatientComponent } from './addpatient/addpatient.component';
// import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'addpatient', component: AddpatientComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'patientdetails/:id', component:PatientdetailsComponent },
];
// { path: 'patient-registration', component:PatientRegistrationComponent },
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }

export const RoutingComponents = [LoginComponent]
