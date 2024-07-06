import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCategoryProductModule } from './store-category-product/store-category-product.module';
import { AccessDeniedComponent } from 'src/app/access-denied/access-denied.component';
import { ContatoModule } from './contact/contact.module';
import { AuthGuard } from './_guard/auth.guard';
import { MasterAreaLoginModule } from './master-area-login/master-area-login.module';
import { UserConfirmManagementModule } from './user-confirm-management/user-confirm-management.module';
import { ClientAreaLoginModule } from './client-area-login/client-area-login.module';
import { DefaultLayoutComponent } from './_layouts/default-layout/default-layout.component';
import { WhoWeAreModule } from './who-we-are/who-we-are.module';
import { ClientAreaLayoutComponent } from './_layouts/client-area-layout/client-area-layout.component';
import { ClientAreaModule } from './client-area/client-area.module';
import { ProductModule } from './product/product.module';

const routes: Routes = [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: '', component: DefaultLayoutComponent,
      children: [
        { path: 'index', loadChildren: () => StoreCategoryProductModule },
        { path: 'who-we-are', loadChildren: () => WhoWeAreModule },
        { path: 'contact', loadChildren: () => ContatoModule },
        { path: 'master-area-login', loadChildren: () => MasterAreaLoginModule },
        { path: 'client-area-login', loadChildren: () => ClientAreaLoginModule },
        { path: 'user', loadChildren: () => UserConfirmManagementModule },
      ]
      },
  {
    path: 'master-area',
    loadChildren: () => import('./_layouts/master-area-layout/master-area-layout.module').then(m => m.MasterAreaLayoutModule),
    canActivate: [AuthGuard],
     data: { expectedRole: ['Master'] }
  },
  {
    path: 'client-area',
    loadChildren: () => import('./_layouts/client-area-layout/client-area-layout.module').then(m => m.ClientAreaLayoutModule),
    canActivate: [AuthGuard],
     data: { expectedRole: ['Gerente','Colaborador'] }
  },

  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
  ];

@NgModule({
  imports: [
RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
