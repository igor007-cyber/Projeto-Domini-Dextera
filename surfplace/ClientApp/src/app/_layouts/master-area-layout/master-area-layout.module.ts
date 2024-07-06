import { NgModule } from '@angular/core';
import { SharedModule } from '../../share.module';
import { MasterAreaLayoutRoutingModule } from './master-area-layout-routing.module';
import { MasterAreaLayoutComponent } from './master-area-layout.component';

@NgModule({
	imports: [
		MasterAreaLayoutRoutingModule,
		SharedModule
	],
	declarations: [
		MasterAreaLayoutComponent
	],
})
export class MasterAreaLayoutModule {}
