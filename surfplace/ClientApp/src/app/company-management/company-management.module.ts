import { NgModule } from '@angular/core';
import { CompanyManagementComponent } from './company-management.component';
import { SharedModule } from '../share.module';
import { CompanyManagementRoutingModule} from './company-management-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompanyManagementRoutingModule,
        NgbModule,

      ],
    declarations: [
        CompanyManagementComponent
    ],
    exports: [ CompanyManagementComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class CompanyManagementModule { }
