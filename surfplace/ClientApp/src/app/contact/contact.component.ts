import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { ContactService } from '../_services/contact.service';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    constructor(private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private _location: Location,
        private contactService: ContactService,
        private router: Router) {
    }
    get f() { return this.form.controls; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            completeName: ['', Validators.required],
            email: ['', Validators.required],
            establishmentName: ['', Validators.required],
            telephone: ['', Validators.required],
        });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let msg: any = {};
    msg.establishmentName = this.form.controls.establishmentName.value;
    msg.completeName = this.form.controls.completeName.value;
    msg.email = this.form.controls.email.value;
    msg.telephone = this.form.controls.telephone.value;

    this.contactService.sendMessage(msg).subscribe(result => {
      this.toastr.success('Mensagem enviada com sucesso!');
      this.router.navigate(['index']);
    });

  }

  onBack() {
    this._location.back();
  }

}

