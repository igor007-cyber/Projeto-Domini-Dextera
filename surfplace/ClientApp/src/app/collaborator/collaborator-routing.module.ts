import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorComponent } from './collaborator.component';
import { CollaboratorFormComponent } from './collaborator-form/collaborator-form.component';
import { CollaboratorFormModule } from './collaborator-form/collaborator-form.module';

const routes: Routes = [
    {
        path: '',
        component: CollaboratorComponent
    },
    {
        path: ':id/:isEdit',
        component: CollaboratorFormComponent,
        children: [
            { path: 'collaborator-form', loadChildren: () => CollaboratorFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
