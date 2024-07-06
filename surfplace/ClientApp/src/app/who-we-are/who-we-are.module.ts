import { NgModule } from '@angular/core';
import { WhoWeAreRoutingModule} from './who-we-are-routing.module';
import { CommonModule } from '@angular/common';
import { WhoWeAreComponent } from './who-we-are.component';

@NgModule({
    imports: [
        CommonModule,
        WhoWeAreRoutingModule
      ],
    declarations: [ WhoWeAreComponent,  ],
    exports: [ WhoWeAreComponent, ]
})
export class WhoWeAreModule { }
