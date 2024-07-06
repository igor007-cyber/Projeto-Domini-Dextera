import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserClientManagementComponent } from './user-client-management.component';
import { UserClientFormComponent } from './user-client-form/user-client-form.component';
import { UserClientFormModule } from './user-client-form/user-client-form.module';

const routes: Routes = [
    {
        path: '',
        component: UserClientManagementComponent
    },
    {
        path: ':id/:isEdit',
        component: UserClientFormComponent,
        children: [
            { path: 'user-client-form', loadChildren: () => UserClientFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserClientManagementRoutingModule { }
