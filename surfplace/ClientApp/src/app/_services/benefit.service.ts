import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Benefit } from 'src/app/_model/benefit-model';

@Injectable({ providedIn: 'root' })

export class BenefitService extends GenericHttpService<Benefit> {
    protected baseUrl = `${environment.urlApi}`;
    constructor(private http: HttpClient) {
        super(http);
    }

     getByFilter(filter: any) {
      return this.postAll('benefit/filter', filter);
    }


}
