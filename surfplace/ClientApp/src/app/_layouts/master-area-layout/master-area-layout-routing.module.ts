import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guard/auth.guard';
import { MasterAreaLayoutComponent } from './master-area-layout.component';

const routes: Routes = [

	{
		path: '',
		component: MasterAreaLayoutComponent,
		data: { breadcrumb: null },
		children: [
			{ path: '', redirectTo: 'master-area' },
			{
				path: 'master-area',
				loadChildren: () => import('../../master-area/master-area.module').then(m => m.MasterAreaModule),
                data: { expectedRole: ['Master'], breadcrumb: '' }
			},
			{
				path: 'company',
				loadChildren: () => import('../../company-management/company-management.module').then(m => m.CompanyManagementModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Master'], breadcrumb: 'Empresas' }
			},
			{
				path: 'user-client',
				loadChildren: () => import('../../user-client-management/user-client-management.module').then(m => m.UserClientManagementModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Master'], breadcrumb: 'Usuários' }
			},





		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasterAreaLayoutRoutingModule { }
