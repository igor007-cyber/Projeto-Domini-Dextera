import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarUsuarioComponent } from './alterar-usuario.component';

const routes: Routes = [
    {
        path: '',
        component: AlterarUsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlterarUsuarioRoutingModule { }
