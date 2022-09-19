import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AllapisService {

  constructor(
    private http: HttpClient
  ) { }

  getCountryAndStatesDetails(): Observable<any> {
    return this.http.get('https://countriesnow.space/api/v0.1/countries/states');
  }

  getAddress(place:any): Observable<any> {
    return this.http.get('https://api.geoapify.com/v1/geocode/autocomplete?text='+place+'&apiKey=2f754bd1bcc546198c9f0ccb98f7c0ec');
  }

  getCities(data: any) {
    return this.http.post('https://countriesnow.space/api/v0.1/countries/state/cities', data);
  }

  sendPatientDetails(data:any) {
    return this.http.post('https://healandhelp.herokuapp.com/registration_api/registration/add_registration_form/', data);
  }

  updatePatientDetails(id:any,data:any) {
    return this.http.post('https://healandhelp.herokuapp.com/registration_api/registration/'+id+'/update_registration_form/', data);
  }

  getPatientDetails(id:any) {
    return this.http.get('http://healandhelp.herokuapp.com/registration_api/registration/'+id+'/get_registration_details/');
  }

  getPatientList(data: any) {
    return this.http.get('https://healandhelp.herokuapp.com/registration_api/list?branch_id='+data);
  }

  deletePatient(id: any) {
    return this.http.delete(' https://healandhelp.herokuapp.com/registration_api/registration/'+id+'/delete_registration/');
  }


}
