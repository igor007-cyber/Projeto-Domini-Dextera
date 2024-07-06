import { NgModule } from '@angular/core';
import { ClientAreaLoginComponent } from './client-area-login.component';
import { SharedModule } from '../share.module';
import { ClientAreaLoginRoutingModule} from '../client-area-login/client-area-login-routing.module';
import { CommonModule } from '@angular/common';
// import { NavbarDefaultComponent } from '../_layouts/navbar_default/navbar-default.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ClientAreaLoginRoutingModule
      ],
    declarations: [
        ClientAreaLoginComponent    ],
    exports: [ ClientAreaLoginComponent ]
})
export class ClientAreaLoginModule { }
