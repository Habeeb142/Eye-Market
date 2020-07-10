import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  data; keeper; 
  private cache: any; keepPocId; newDataLog = [];
  public poc = {lat: null, long:null}

  constructor(public http: HttpClient) { }

  logMeInMyDear(data) {
    return this.http.post<any>(`${new Env().fakeUrl}/login`, data);
  }

  getData(email) {
    // return this.http.get<any>(`${this.base_url}user/${email}`);
    return this.http.get<any>(`${new Env().fakeUrl}/user/${email}`);
  }

  checkIfIAmOnline() {
    return navigator.onLine;
  }

  setPassword(data) {
    return this.http.patch<any>(`${new Env().fakeUrl}/user/${data.email}`, data);
  }

  uploadDataFrmLocalServer(data) {
    this.newDataLog = [];
    for (let i = 0; i < data.length; i++) {
      if(data[i].altered && data[i].dayOfAltered == new Date().getDay()) {
        this.newDataLog.push(data[i]);
      }
    }
    return this.http.patch<any>(`${new Env().fakePocUrl}/updateData`, this.newDataLog);

  }

  setData(data) {
    this.keeper = data;
    return this.keeper;
  }

  getSavedData() {
    return this.keeper;
  }

  getPocValidation(pocCoord) {
      // let data = JSON.parse(localStorage.getItem('data'));
      let userLat = 6.57844;
      let userLong  = 3.30546;

      // data.forEach(element => {
        // if(element.id==pocId){
          // this.poc.lat = element.latitude;
          // this.poc.long = element.longitude;
      //   }
      // });

      let distance = this.doCalc(userLat, userLong, pocCoord);
      // convert to metters
      return distance*1000; 
       
  }

  supplyPocs() {
    return this.data
  }

  storeForSupplyPocs(data) {
    this.data = data;
    return this.data
  }

  doCalc(userLat, userLong, poc) {
    const R = 6371.071; // Radius of the Earth in kilometers
    const rlat1 = poc.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = userLat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (userLong - poc.long) * (Math.PI / 180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2))); 
    return d;
  }

  tempStoreDataForCamera(pocId) {
    this.keepPocId = pocId;
    return this.keepPocId;
  }

  getPocIdBack() {
    return this.keepPocId;
  }

}
