import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../share.module';
import { ContactRoutingModule} from './contact-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  imports: [
      SharedModule,
      CommonModule,
      ContactRoutingModule,
      NgbModule,
      NgxMaskModule.forRoot()
    ],
  declarations: [
    ContactComponent
  ],
  exports: [ ContactComponent ]
})
export class ContatoModule { }
