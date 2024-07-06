import { NgModule } from '@angular/core';
import { ProviderComponent } from './provider.component';
import { SharedModule } from '../share.module';
import { ProviderRoutingModule} from './provider-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProviderRoutingModule,
        NgbModule,

      ],
    declarations: [
        ProviderComponent
    ],
    exports: [ ProviderComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class ProviderModule { }
