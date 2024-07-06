import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCategoryProductComponent } from './store-category-product.component';

const routes: Routes = [
    {
        path: '',
        component: StoreCategoryProductComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreCategoryProductRoutingModule { }


