import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,FormGroup } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { AgmCoreModule } from '@agm/core';
// import { GooglePlaceModule } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.module';
import '@angular/compiler';
// import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { AddpatientComponent } from './addpatient/addpatient.component';

// {path: '',redirectTo: 'login', pathMatch: 'full'},
// { path: 'login', component: LoginComponent },
// { path: 'patient-registration', component: PatientRegistrationComponent },

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    DashboardComponent,
    PatientdetailsComponent,

    AddpatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA18odJnD-pDsu7EVJ7WiXVM5sVvpjAQxw',
      libraries: ['geometry', 'places', 'visualization', 'drawing']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
