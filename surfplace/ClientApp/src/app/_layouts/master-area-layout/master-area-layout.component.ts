import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'master-area-layout',
  templateUrl: './master-area-layout.component.html'
})
export class MasterAreaLayoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
