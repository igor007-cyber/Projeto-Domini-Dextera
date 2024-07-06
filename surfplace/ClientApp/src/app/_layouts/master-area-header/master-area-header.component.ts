import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'master-area-header',
  templateUrl: './master-area-header.component.html'
})
export class MasterAreaHeaderComponent implements OnInit {

  public currentUser;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (!this.currentUser) {
      this.logout();
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
  }

}
