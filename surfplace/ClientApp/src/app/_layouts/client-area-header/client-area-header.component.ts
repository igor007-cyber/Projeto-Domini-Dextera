import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-area-header.component.html'
})
export class ClientAreaHeaderComponent implements OnInit {

  public menus: any[];
  public currentUser;
  public lojaCep: any;
  public shoppingCart: any[] = [];
  logo: any;
  public itemCart;
  public storeSelected;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router,
                private _location: Location) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().role === 'Gerente' || this.authenticationService.getCurrentUser().role === 'Colaborador' ? this.currentUser = this.authenticationService.getCurrentUser() : null;
    if (!this.currentUser) {
      this.logout();
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
  }

  logged() {
    if (this.currentUser === null) {
        return false;
    } else {
        return true;
    }
   }

   onLogin() {
       return this.router.navigate(['/login/0']);
   }


onBack() {
  this._location.back();
}

changePassword() {
  this.router.navigate(['client-area/change-password']);
}


}
