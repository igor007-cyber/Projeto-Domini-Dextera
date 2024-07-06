import { NgModule } from '@angular/core';
import { StoreCategoryProductComponent } from './store-category-product.component';
import { SharedModule } from '../share.module';
import { StoreCategoryProductRoutingModule} from './store-category-product-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
// import { NavbarDefaultComponent } from '../_layouts/navbar-default/navbar-default.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        CommonModule,
        StoreCategoryProductRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(options),
        SharedModule
      ],
    declarations: [
        StoreCategoryProductComponent
    ],
    exports: [ StoreCategoryProductComponent ]
})
export class StoreCategoryProductModule { }
