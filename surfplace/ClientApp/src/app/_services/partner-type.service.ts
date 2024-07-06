import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartnerType } from '../_model/partner-type-model';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PartnerTypeService extends GenericHttpService<PartnerType> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('partnerType/filter', filter);
    }

}
