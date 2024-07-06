import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginUser } from '../_model/login-user-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-master-area-login',
    templateUrl: './master-area-login.component.html'
})

export class MasterAreaLoginComponent implements OnInit {
    form: FormGroup;
    formRegister: FormGroup;
    public submitted = false;
    public parent;
    public login: any;
    public loja: any;
    logo: any;
    public loginUser: LoginUser = new LoginUser();
    modalRef: BsModalRef;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
      let user = this.authenticationService.getCurrentUser();
        if (user) {
            return this.router.navigate(['master-area']);
        }
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });

        this.formRegister = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });

    }

    get f() { return this.form.controls; }
    get fr() { return this.formRegister.controls; }

    onLogin() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loginUser.email = this.form.controls.email.value;
        this.loginUser.secret = this.form.controls.secret.value;
        this.authenticationService.login(this.loginUser)
        .subscribe(result => {
            this.authenticationService.clearUser();
            this.authenticationService.addCurrentUser(result);
            return this.router.navigate(['/master-area']);
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

  close() {
      this.modalRef.hide();
      }

      onRegister() {
          this.submitted = true;
          if (this.formRegister.invalid) {
              return;
          }
          this.loginUser.email = this.formRegister.controls.email.value;
          this.loginUser.secret = this.formRegister.controls.secret.value;
          this.authenticationService.registerMaster(this.loginUser)
          .subscribe(result => {
              this.close();
              return this.toastr.success('Usuário registrado com sucesso');
          });
      }
}

