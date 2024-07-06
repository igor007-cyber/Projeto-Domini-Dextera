import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAreaLoginComponent } from './client-area-login.component';

const routes: Routes = [
    {
        path: '',
        component: ClientAreaLoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientAreaLoginRoutingModule { }
