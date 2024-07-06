import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { SharedModule } from '../share.module';
import { ProductRoutingModule} from './product-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../_adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../_adapters/custom-date-parser-formatter-adapter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
      ],
    declarations: [
        ProductComponent
    ],
    exports: [ ProductComponent,
        FormsModule,
        ReactiveFormsModule ],

        providers: [
            [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
            {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
          ]
})
export class ProductModule { }
