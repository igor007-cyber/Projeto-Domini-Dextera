import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { ShoppingCartService } from './_services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(

   ) {}

    ngOnInit() {

    }

    

    ngOnDestroy() {
    }
}
