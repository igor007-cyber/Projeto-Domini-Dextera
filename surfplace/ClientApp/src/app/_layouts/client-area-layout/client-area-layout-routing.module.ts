import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guard/auth.guard';
import { ClientAreaLayoutComponent } from './client-area-layout.component';

const routes: Routes = [

	{
		path: '',
		component: ClientAreaLayoutComponent,
		data: { breadcrumb: null },
		children: [
			{ path: '', redirectTo: 'client-area' },
			{
				path: 'client-area',
				loadChildren: () => import('../../client-area/client-area.module').then(m => m.ClientAreaModule),
                canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: '' }
			},
			{
				path: 'brand',
				loadChildren: () => import('../../brand/brand.module').then(m => m.BrandModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Marcas' }
			},
			{
				path: 'provider',
				loadChildren: () => import('../../provider/provider.module').then(m => m.ProviderModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Fornecedores' }
			},
			{
				path: 'category',
				loadChildren: () => import('../../category/category.module').then(m => m.CategoryModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Categorias' }
			},
			{
				path: 'product',
				loadChildren: () => import('../../product/product.module').then(m => m.ProductModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Produtos' }
			},
			{
				path: 'inventory',
				loadChildren: () => import('../../inventory/inventory.module').then(m => m.InventoryModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Estoques' }
			},
			{
				path: 'collaborator',
				loadChildren: () => import('../../collaborator/collaborator.module').then(m => m.CollaboratorModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Colaboradores' }
			},
			{
				path: 'change-password',
				loadChildren: () => import('../../change-password/change-password.module').then(m => m.ChangePasswordModule),
				canActivate: [AuthGuard],
				data: { expectedRole: ['Gerente','Colaborador'], breadcrumb: 'Alterar Senha' }
			},



		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientAreaLayoutRoutingModule { }
