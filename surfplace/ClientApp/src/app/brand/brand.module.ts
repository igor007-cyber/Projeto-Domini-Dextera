import { NgModule } from '@angular/core';
import { BrandComponent } from './brand.component';
import { SharedModule } from '../share.module';
import { BrandRoutingModule} from './brand-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrandRoutingModule,
        NgbModule,

      ],
    declarations: [
        BrandComponent
    ],
    exports: [ BrandComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class BrandModule { }
