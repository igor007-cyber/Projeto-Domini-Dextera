import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAreaComponent } from './client-area.component';

const routes: Routes = [
    {
        path: '',
        component: ClientAreaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientAreaRoutingModule { }
