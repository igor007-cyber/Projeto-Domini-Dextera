import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserConfirmManagementComponent } from './user-confirm-management.component';

const routes: Routes = [
    {
        path: '',
        component: UserConfirmManagementComponent
    },
    {
        path: ':userid/:code',
        component: UserConfirmManagementComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserConfirmManagementRoutingModule { }
