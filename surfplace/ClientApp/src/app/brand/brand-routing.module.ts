import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandFormModule } from './brand-form/brand-form.module';

const routes: Routes = [
    {
        path: '',
        component: BrandComponent
    },
    {
        path: ':id/:isEdit',
        component: BrandFormComponent,
        children: [
            { path: 'brand-form', loadChildren: () => BrandFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule { }
