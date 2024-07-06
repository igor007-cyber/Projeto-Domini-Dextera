import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-area-layout',
  templateUrl: './client-area-layout.component.html'
})
export class ClientAreaLayoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
