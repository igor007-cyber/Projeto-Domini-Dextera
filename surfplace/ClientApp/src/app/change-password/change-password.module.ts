import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from 'src/app/share.module';
import { ChangePasswordRoutingModule} from './change-password-routing.module';

@NgModule({
    imports: [
        SharedModule,
        ChangePasswordRoutingModule
      ],
    declarations: [
        ChangePasswordComponent
    ],
    exports: [ ChangePasswordComponent,
     ]
})
export class ChangePasswordModule { }
