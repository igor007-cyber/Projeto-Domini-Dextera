import { NgModule } from '@angular/core';
import { SharedModule } from '../../share.module';
import { ClientAreaLayoutRoutingModule } from './client-area-layout-routing.module';
import { ClientAreaLayoutComponent } from './client-area-layout.component';

@NgModule({
	imports: [
		ClientAreaLayoutRoutingModule,
		SharedModule
	],
	declarations: [
		ClientAreaLayoutComponent
	],
})
export class ClientAreaLayoutModule {}
