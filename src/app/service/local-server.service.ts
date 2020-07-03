import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalServerService {
  diskChecker: boolean;
  constructor(public http: HttpClient) { }

  checkDisk() {
 
    // return data
    // check if disk is empty
    
    // return this.isDiskEmpty() ? this.updateLocalDisk() : this.updateRemote() .st
  }

  isDiskEmpty() {
    return false
  }

  updateLocalDisk() {
    // go to remote and update
  }

  updateRemote()  {

  }

}
