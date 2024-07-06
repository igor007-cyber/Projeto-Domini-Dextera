import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../share.module';
import { CategoryRoutingModule} from './category-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        NgbModule,

      ],
    declarations: [
        CategoryComponent
    ],
    exports: [ CategoryComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class CategoryModule { }
