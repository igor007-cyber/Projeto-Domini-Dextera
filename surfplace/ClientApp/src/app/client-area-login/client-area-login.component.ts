import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginUser } from '../_model/login-user-model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-client-area-login',
    templateUrl: './client-area-login.component.html'
})

export class ClientAreaLoginComponent implements OnInit {
    public hasLogin: boolean = false;
    public parent: boolean = false;
    public currentUser;
    formLogin: FormGroup;
    formRegister: FormGroup;
    public submitted = false;
    public submittedLogin = false;
    public submittedRegister = false;
    public isCorreios = false;
    public loginClient: LoginUser = new LoginUser();
    public recoverPassword: boolean = false;
    constructor(
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private location: Location,
        private router: Router,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
         this.formLogin = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });

        this.formRegister = this.formBuilder.group({
            userName: ['', Validators.required],
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });

    }

    get fl() { return this.formLogin.controls; }
    get fr() { return this.formRegister.controls; }

    onLoginClient() {
        this.submittedLogin = true;
        if (this.formLogin.invalid) {
            return;
        }
        this.loginClient.email = this.formLogin.controls.email.value;
        this.loginClient.secret = this.formLogin.controls.secret.value;
        this.authenticationService.loginClient(this.loginClient)
            .subscribe(result => {
                this.authenticationService.clearUser();
                this.authenticationService.addCurrentUser(result);
                return this.router.navigate(['/client-area/']);
            });
    }

    onRegisterClient() {
        this.submittedRegister = true;
        if (this.formRegister.invalid) {
            return;
        }
        this.loginClient.email = this.formRegister.controls.email.value;
        this.loginClient.userName = this.formRegister.controls.userName.value;
        this.loginClient.secret = this.formRegister.controls.secret.value;
        this.authenticationService.register(this.loginClient)
            .subscribe(result => {
                this.authenticationService.clearUser();
                return this.toastr.success('Verifique sua caixa de email para acessar sua conta')
            });
    }

    newClient() {
        this.hasLogin = true;
    }

    hasLoginClient() {
        this.hasLogin = false;
    }

    onRecoverPassword() {
        this.submittedRegister = true;
        if (this.formRegister.invalid) {
            return;
        }
        this.loginClient.email = this.formRegister.controls.email.value;
        this.authenticationService.recoverPassword(this.loginClient)
            .subscribe(result => {
                this.authenticationService.clearUser();
                this.toastr.success('Verifique sua caixa de email para recuperar a senha.')
            });
    }

    showRecoverPassword() {
        this.hasLogin = true;
        this.recoverPassword = true;
    }
}

