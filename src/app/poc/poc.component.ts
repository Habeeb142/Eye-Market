import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {

  public pocId;

  constructor(public actRoute: ActivatedRoute, private server: ServerService) { }

  ngOnInit(): void {
    this.getPocId();
    // call function todo what needs to be done
    this.getPocValidation(this.pocId);
  }

  getPocId() {
    this.actRoute.paramMap.subscribe((param => {
        this.pocId = param.get('pocId');
    }))
  }

  getPocValidation(pocId) {
    this.server.getPocValidation(pocId).subscribe(data=>{
      console.log(data.data)
    })
  }

}
