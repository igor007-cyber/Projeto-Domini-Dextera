import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../share.module';
import { UserConfirmManagementRoutingModule } from './user-confirm-management-routing.module';
import { UserConfirmManagementComponent } from './user-confirm-management.component';

@NgModule({
    imports: [
        CommonModule,
        UserConfirmManagementRoutingModule,
        SharedModule
    ],
    declarations: [UserConfirmManagementComponent],
    entryComponents: []
})
export class UserConfirmManagementModule {}
