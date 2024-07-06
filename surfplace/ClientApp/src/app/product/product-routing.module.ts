import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductFormModule } from './product-form/product-form.module';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    },
    {
        path: ':id/:isEdit',
        component: ProductFormComponent,
        children: [
            { path: 'product-form', loadChildren: () => ProductFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
