import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginUser } from 'src/app/_model/login-user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
    form: FormGroup;
    public submitted = false;
    public loginUser: LoginUser = new LoginUser();
    public currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });
        this.currentUser = this.authenticationService.getCurrentUser();
            if (this.currentUser) {
                this.form.controls.email.setValue(this.currentUser.email);
                this.form.controls.email.disable();
            } else {
                this.authenticationService.logout();
                this.router.navigate(['client-area/change-password']);
            }
    }

    get f() { return this.form.controls; }

    onConfirm() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loginUser.email = this.form.controls.email.value;
        this.loginUser.secret = this.form.controls.secret.value;
        this.authenticationService.changePassword(this.loginUser)
        .subscribe(result => {
            this.authenticationService.clearUser();
            this.toastr.success("Senha alterada com sucesso.")
            return this.router.navigate(['client-area-login']);

        });
    }

}

