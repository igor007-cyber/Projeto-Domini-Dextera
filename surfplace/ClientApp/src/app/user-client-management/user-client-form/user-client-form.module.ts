import { NgModule } from '@angular/core';
import { UserClientFormComponent } from './user-client-form.component';
import { SharedModule } from 'src/app/share.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        NgxMaskModule.forRoot(),
        NgbModule
      ],
    declarations: [
        UserClientFormComponent
    ],
    exports: [ UserClientFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class UserClientFormModule { }
