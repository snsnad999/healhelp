import { AllapisService } from './../allapis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: AllapisService) {

  }

  ngOnInit(): void {
    this.getPetientsList();
  }
  searchStr = "";
  searchList: any[] = [];
  patientList: any[] = [];

  gotoPRegister(){
    this.router.navigate(['/addpatient'],{relativeTo:this.route});  // define your component where you want to go
  }
  signOut(){
    this.router.navigate(['/login'],{relativeTo:this.route});  // define your component where you want to go
  }

  searchPatient(){
    var pList: any[] = [];
    this.searchList = [];
    console.log(this.searchStr,"this.searchStr")
    var string = this.searchStr.toLocaleLowerCase();
    for(var i=0;i<this.patientList.length;i++){
        if (this.patientList[i].name.toLowerCase().includes(string) ||
        this.patientList[i].ref_no.toLowerCase().includes(string) ||
            this.patientList[i].address.toLowerCase().includes(string) ||
           this.patientList[i].mobileno.toLowerCase().includes(string) ){
              pList.push(this.patientList[i])
        }
    }
    this.searchList = pList;
    console.log(pList)
  }

  getPetientsList(){
    this.patientList = [];
    this.api.getPatientList("dbee6fd8-6af2-4e5a-bf90-a76205b0a3f5").subscribe(
      (apiResponse: any) => {
        console.log(apiResponse);
        var patientArr = apiResponse;
        var allPatients: any[] = [];
        for(var i = 0; i < patientArr.length; i++){
            allPatients.push(patientArr[i]);
        }
        this.patientList = allPatients;
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  updatePatient(obj: any,index:any){
    console.log(obj,index);
    this.router.navigate(['/patient-registration/'+obj.id],{relativeTo:this.route});
  }

  deletePatients(obj: any){
    console.log(obj);
    this.api.deletePatient(obj.id).subscribe(
      (apiResponse: any) => {
          this.getPetientsList();
      },
      error => {
        console.error('Error', error);
      }
    );
  }

  clear(){
    this.searchStr = "";
  }

  naviateToDetails(patient: any){
    this.router.navigate(['/patientdetails/'+patient.id],{relativeTo:this.route});
  }
}
