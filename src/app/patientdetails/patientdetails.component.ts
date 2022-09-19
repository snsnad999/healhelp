import { AllapisService } from './../allapis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})

export class PatientdetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: AllapisService) {}

  ngOnInit(): void {
    this.patientID = this.route.snapshot.params['id']
    console.log(" this.patientID", this.patientID);
    this.getPatientDetail();
  }
  patientID : any;
  defaultStateName = 'Maharashtra';
  defaultCountryName = 'India';
  selectedCountry = '';
  selectedState = '';
  selectedCity = '';
  AllCountriesAndStates: any[] = [];
  countryList: any[] = [];
  statesList: any[] = [];
  citiesList: any[] = [];
  isGender = false;
  isContactNumber = false;
  isFirstName = false;
  isEmailAddress = false;
  isEmailAddressValid = false;
  firstName = "";
  middleName = "";
  lastName = "";
  emailAddress = "";
  contactNumber = 0;
  day = "";
  month = "";
  year = "";
  height = "";
  weight = "";
  date = "";
  martialStatus = "";
  anyMedications = "";
  anyAllergies = "";
  streetAddress = "";
  locality = ""
  gender = "";
  eFirstName = "";
  eLastName = "";
  eRelationship = "";
  eContactNumber = "";
  zipCode = "";
  isLoader = false;
  tabGeneral = true;
  tabFamily = false;

  gotoAddPatient(){
    this.router.navigate(['/patient-registration'],{relativeTo:this.route});  // define your component where you want to go
  }
  gotodashboard(){
    this.router.navigate(['/dashboard'],{relativeTo:this.route});  // define your component where you want to go
  }
  signOut(){
    this.router.navigate(['/login'],{relativeTo:this.route});  // define your component where you want to go
  }

  changeTab(tabName: string){
    if (tabName=='General'){
      this.tabGeneral = true;
      this.tabFamily = false;
      $("#general").addClass('active')
      $("#family").removeClass('active')
    }else{
      this.tabGeneral = false;
      this.tabFamily = true;
      $("#family").addClass('active')
      $("#general").removeClass('active')
    }
  }

  getPatientDetail(){
    this.api.getPatientDetails(this.patientID).subscribe(
      (result: any) => {
        console.log(result);
        var registrationDetails  = result["registration_details"];
        this.selectedCountry = registrationDetails['country'];
        // this.selectedState = registrationDetails[''];
        this.selectedCity = registrationDetails['city'];
        this.firstName = registrationDetails['name'];
        this.middleName = registrationDetails['name'];
        this.lastName = registrationDetails['name'];
        this.emailAddress = registrationDetails['email'];
        this.contactNumber = Number(registrationDetails['mobileno']);
        this.height = registrationDetails['height'];
        this.weight = registrationDetails['weight'];
        this.date = registrationDetails['dateofbirth'];
        this.martialStatus = registrationDetails['maritialstatus'];
        this.anyMedications = registrationDetails['medication'];
        if (this.anyMedications == "NoForMedication"){
          this.anyMedications = "No"
        }else{
          this.anyMedications = "Yes"
        }
        this.anyAllergies = registrationDetails['allergies'];
        if (this.anyAllergies == "NoForAllergies"){
          this.anyAllergies = "No"
        }else{
          this.anyAllergies = "Yes"
        }
        this.streetAddress = registrationDetails['address'];
        this.locality = registrationDetails['locality'];
        this.gender = registrationDetails['postalcode'];
        this.eFirstName = registrationDetails['emergency_name'];
        this.eLastName = registrationDetails['emergency_name'];
        this.eRelationship = registrationDetails['emergency_relationship'];
        this.eContactNumber = registrationDetails['emergency_contact_no'];
        this.zipCode = registrationDetails['postalcode'];
      },
      error => {
        console.error('Error', error);
      }
    );
  }

}

