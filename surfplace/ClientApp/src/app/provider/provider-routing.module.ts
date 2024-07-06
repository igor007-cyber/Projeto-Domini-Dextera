import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderComponent } from './provider.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ProviderFormModule } from './provider-form/provider-form.module';

const routes: Routes = [
    {
        path: '',
        component: ProviderComponent
    },
    {
        path: ':id/:isEdit',
        component: ProviderFormComponent,
        children: [
            { path: 'provider-form', loadChildren: () => ProviderFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProviderRoutingModule { }
