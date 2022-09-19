import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapisService } from '../allapis.service';
declare let $: any;
@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  private geoCoder:any;
  // private mapsAPILoader: MapsAPILoader
  @ViewChild('search', { static: true })
  // public searchElementRef: ElementRef;
  form: FormGroup = new FormGroup({});
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: AllapisService,

    private ngZone: NgZone
    ) {
    // this.form = fb.group({
    //   mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    // })
  }

  ngOnInit(): void {
    this.getAllCountriesAndStates();
    this.patientID = this.route.snapshot.params['id']
    if(this.patientID){
      this.getPatientDetail()
    }
  }

  searchLocation(){
    // this.mapsAPILoader.load().then(() => {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.latitude = position.coords.latitude;
    //       this.longitude = position.coords.longitude;
    //       this.zoom = 15;
    //     });
    //   }
    //   this.geoCoder = new google.maps.Geocoder;

    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }

  latitude: any;
  longitude: any;
  zoom:any;
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
  addressList: any[] = [];
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
  gotodashboard(){
    this.router.navigate(['/dashboard'],{relativeTo:this.route});  // define your component where you want to go
  }
  signOut(){
    this.router.navigate(['/login'],{relativeTo:this.route});  // define your component where you want to go
  }

  searchPlace(){
    var address = $('#address').val();
    this.api.getAddress(address).subscribe(
      result => {
        console.log(result);
        this.addressList = [];
        var tempAddress = [];
        var features = result['features'];
        for (var i = 0; i < features.length; i++){
          tempAddress.push(features[i]['properties']['name']);
        }
        this.addressList = tempAddress;
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  getAllCountriesAndStates(){
    this.api.getCountryAndStatesDetails().subscribe(
      result => {
        console.log(result);
        var iso2 = [];
        this.AllCountriesAndStates = result['data'];
        var data = result['data'];
        for(var i = 0; i < data.length; i++){
          this.countryList.push(data[i]['name']);
        }
        this.setDefaultCountry();
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  setDefaultCountry(){
    var states = [];
    for(var j = 0; j < this.countryList.length; j++){
      if(this.countryList[j] == this.defaultCountryName){
        this.selectedCountry = this.countryList[j];
        break;
      }
    }
    console.log(this.selectedCountry);
    for(var j = 0; j < this.AllCountriesAndStates.length; j++){
          if(this.AllCountriesAndStates[j]['name']==this.selectedCountry){
              states = this.AllCountriesAndStates[j]['states'];
              break;
          }
    }
    for(var j = 0; j < states.length; j++){
        this.statesList.push(states[j]['name']);
    }
    this.setDefaultStates();
  }

  setDefaultStates(){
    for(var j = 0; j < this.statesList.length; j++){
      if(this.statesList[j] == this.defaultStateName){
        this.selectedState = this.statesList[j];
        break;
      }
    }
    this.getCitiesList();

  }

  getCitiesList(){
    var data = {
        country: this.selectedCountry,
        state: this.selectedState
    };
    this.api.getCities(data).subscribe(
      (apiResponse: any) => {
        console.log(apiResponse.data);
        this.citiesList = apiResponse.data;
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  onStateChange(){
    this.citiesList = [];
        var data = {
          country: this.selectedCountry,
          state: this.selectedState
      };
      this.api.getCities(data).subscribe(
        (apiResponse: any) => {
          console.log(apiResponse.data);
          this.citiesList = apiResponse.data;
        },
        error => {
          console.error('Error', error);
        }
      );
  }

  onCountryChange(){
      var states = [];
      this.statesList = [];
      for(var j = 0; j < this.AllCountriesAndStates.length; j++){
            if(this.AllCountriesAndStates[j]['name']==this.selectedCountry){
                states = this.AllCountriesAndStates[j]['states'];
                break;
            }
      }
      for(var j = 0; j < states.length; j++){
          this.statesList.push(states[j]['name']);
      }
      if(this.statesList.length!=0){
        this.selectedState = this.statesList[0];
        this.onStateChange();
      }
  }

  submitForm(){
    var regExp = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    var mobileNumber =  $("#mobileNumber").val();


      if(this.firstName==""){
        this.isFirstName = true;
        this.isGender = false;
        this.isEmailAddress = false;
        this.isEmailAddressValid = false;
        this.isContactNumber = false;
      }else if(this.gender==""){
        this.isFirstName = false;
        this.isGender = true;
        this.isEmailAddress = false;
        this.isEmailAddressValid = false;
        this.isContactNumber = false;
      }else if(this.emailAddress==""){
        this.isFirstName = false;
        this.isGender = false;
        this.isEmailAddress = true;
        this.isEmailAddressValid = false;
        this.isContactNumber = false;
      }else if(!this.emailAddress.match(regExp)){
        this.isFirstName = false;
        this.isGender = false;
        this.isEmailAddress = false;
        this.isEmailAddressValid = true;
        this.isContactNumber = false;
      }else if(mobileNumber.length < 10 || mobileNumber.length>10){
        this.isFirstName = false;
        this.isGender = false;
        this.isEmailAddress = false;
        this.isEmailAddressValid = false;
        this.isContactNumber = true;
      }else{
        this.isFirstName = false;
        this.isGender = false;
        this.isEmailAddress = false;
        this.isEmailAddressValid = false;
        this.isContactNumber = false;
        this.isLoader = true;
        this.passFormData();

      }
  }

  closeAlert(){
    this.alertFlag = false;
  }

  alertFlag = false;
  errorMessage = "";
    passFormData(){

      var data : any = {
          "name": this.firstName,
          "branch":"dbee6fd8-6af2-4e5a-bf90-a76205b0a3f5",
          "ref_no":"name_9088",
          "address":this.streetAddress,
          "locality":this.locality,
          "city":this.selectedCity,
          "state":this.selectedState,
          "postalcode":this.zipCode,
          "country":this.selectedCountry,
          "mobileno":this.contactNumber,
          "refrenced_by":this.streetAddress,
          "email":this.emailAddress,
          "age":"12",
          "gender":this.gender,
          "dateofbirth":this.date,
          "maritialstatus":this.martialStatus,
          "medication":this.anyMedications,
          "allergies":this.anyAllergies,
          "height":this.height,
          "weight":this.weight,
          "emergency_name":this.eFirstName + " " + this.eLastName,
          "emergency_contact_no":this.eContactNumber,
          "emergency_relationship":this.eRelationship,
    };
    if(this.patientID=="ddd"){
      this.api.sendPatientDetails(data).subscribe(
        (apiResponse: any) => {
          console.log(apiResponse);
          // this.citiesList = apiResponse.data;
          this.isLoader=false;
          this.gotodashboard();
        },
        error => {
          console.log('Error',error.error.message);
          this.errorMessage = error.error.message;
          this.isLoader=false;
          this.alertFlag = true;
          // alert(error);

        }
      );
    }else{
      this.api.updatePatientDetails(this.patientID,data).subscribe(
        (apiResponse: any) => {
          console.log(apiResponse);
          // this.citiesList = apiResponse.data;
          this.isLoader=false;
          this.gotodashboard();
        },
        error => {
          console.log('Error',error.error.message);
          this.errorMessage = error.error.message;
          this.isLoader=false;
          this.alertFlag = true;
          // alert(error);

        }
      );
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
          this.anyAllergies = registrationDetails['allergies'];
          this.streetAddress = registrationDetails['address'];
          this.locality = registrationDetails['locality'];
          this.gender = registrationDetails['gender'];
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
