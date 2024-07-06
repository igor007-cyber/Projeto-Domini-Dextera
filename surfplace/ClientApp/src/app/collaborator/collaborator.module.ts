import { NgModule } from '@angular/core';
import { CollaboratorComponent } from './collaborator.component';
import { SharedModule } from '../share.module';
import { CollaboratorRoutingModule} from './collaborator-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CollaboratorRoutingModule,
        NgbModule,

      ],
    declarations: [
        CollaboratorComponent
    ],
    exports: [ CollaboratorComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class CollaboratorModule { }
