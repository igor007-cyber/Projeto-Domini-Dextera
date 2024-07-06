import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-who-we-are',
    templateUrl: './who-we-are.component.html'
})

export class WhoWeAreComponent implements OnInit {

    constructor(private _location: Location) {
    }

    ngOnInit() {
  }

  onBack() {
    this._location.back();
  }


}

