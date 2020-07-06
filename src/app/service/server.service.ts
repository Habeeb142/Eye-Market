import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  data; keeper;
  private cache: any;

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

  setData(data) {
    this.keeper = data;
    return this.keeper;
  }

  getSavedData() {
    return this.keeper;
  }

  getPocValidation(pocId) {
      // const lat =  localStorage.getItem('lat');
      // const long = localStorage.getItem('long');
      const long = '3.20025';
      const lat = '6.50668'; 
      return this.http.get<any>(`${new Env().fakePocUrl}/getPocValidation/${pocId}/${lat}/${long}`);
  }

  supplyPocs() {
    return this.data
  }

  storeForSupplyPocs(data) {
    this.data = data;
    return this.data
  }

}
