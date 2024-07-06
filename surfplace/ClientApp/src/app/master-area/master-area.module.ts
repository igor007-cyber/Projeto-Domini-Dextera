import { NgModule } from '@angular/core';
import { MasterAreaComponent } from './master-area.component';
import { SharedModule } from '../share.module';
import { MasterAreaRoutingModule} from './master-area-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MasterAreaRoutingModule,
        NgbModule
      ],
    declarations: [
        MasterAreaComponent
    ],
    exports: [ MasterAreaComponent ]
})
export class MasterAreaModule { }
