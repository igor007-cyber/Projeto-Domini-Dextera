import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhoWeAreComponent } from './who-we-are.component';

const routes: Routes = [
    {
        path: '',
        component: WhoWeAreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WhoWeAreRoutingModule { }
