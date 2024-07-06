import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaLoginComponent } from './master-area-login.component';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaLoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaLoginRoutingModule { }
