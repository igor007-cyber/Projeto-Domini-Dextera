import { NgModule } from '@angular/core';
import { MasterAreaLoginComponent } from './master-area-login.component';
import { SharedModule } from '../share.module';
import { MasterAreaLoginRoutingModule} from '../master-area-login/master-area-login-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MasterAreaLoginRoutingModule
      ],
    declarations: [
        MasterAreaLoginComponent    ],
    exports: [ MasterAreaLoginComponent ]
})
export class MasterAreaLoginModule { }
