import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  cache = [];
  public base_url = 'https://eyemarket.herokuapp.com/BDR'; data;
  
  saveData(data) {
    this.cache.push(data.pocs);
  }

  getSavedData() {console.log(this.cache)
    return this.cache
  }
  constructor(public http: HttpClient) { }

  logMeInMyDear(data) {
      return this.http.post<any>(`${this.base_url}/login`, { email: data.userId, password: data.password });
  }

  getData(email) {
    // return this.http.get<any>(`${this.base_url}user/${email}`);
    return this.data = this.http.get<any>(`${this.base_url}/user/${email}`);
  }


  checkIfIAmOnline() {
    return navigator.onLine;
  }

}
