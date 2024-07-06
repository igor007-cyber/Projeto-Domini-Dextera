import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyManagementComponent } from './company-management.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyFormModule } from './company-form/company-form.module';

const routes: Routes = [
    {
        path: '',
        component: CompanyManagementComponent
    },
    {
        path: ':id/:isEdit',
        component: CompanyFormComponent,
        children: [
            { path: 'company-form', loadChildren: () => CompanyFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyManagementRoutingModule { }
