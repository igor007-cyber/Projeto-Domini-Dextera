import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import { CommonModule, CurrencyPipe } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MasterAreaHeaderComponent } from './_layouts/master-area-header/master-area-header.component';
import { ClientAreaHeaderComponent } from './_layouts/client-area-header/client-area-header.component';

import { SafePipe } from '../app/_services/safepipe.pipe';
registerLocaleData(ptBr);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    MasterAreaHeaderComponent, ClientAreaHeaderComponent, SafePipe
  ],
  providers: [
    CurrencyPipe,
    BsModalService,
    BsModalRef,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  entryComponents: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule, MasterAreaHeaderComponent, ClientAreaHeaderComponent, SafePipe
  ]
})
export class SharedModule { }
