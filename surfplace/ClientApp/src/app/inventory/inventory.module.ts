import { NgModule } from '@angular/core';
import { InventoryComponent } from './inventory.component';
import { SharedModule } from '../share.module';
import { InventoryRoutingModule} from './inventory-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InventoryRoutingModule,
        NgbModule,

      ],
    declarations: [
        InventoryComponent
    ],
    exports: [ InventoryComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class InventoryModule { }
