import { NgModule } from '@angular/core';
import { UserClientManagementComponent } from './user-client-management.component';
import { SharedModule } from '../share.module';
import { UserClientManagementRoutingModule} from './user-client-management-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserClientManagementRoutingModule,
        NgbModule,

      ],
    declarations: [
        UserClientManagementComponent
    ],
    exports: [ UserClientManagementComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class UserClientManagementModule { }
