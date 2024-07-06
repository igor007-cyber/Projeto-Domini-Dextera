import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAreaComponent } from './master-area.component';

const routes: Routes = [
    {
        path: '',
        component: MasterAreaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterAreaRoutingModule { }
