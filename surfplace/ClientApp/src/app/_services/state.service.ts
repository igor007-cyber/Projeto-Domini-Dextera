import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../_model/state-model';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })

export class StateService extends GenericHttpService<State> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getAllState(filter: any) {
      return this.postAll('state/getAllState', filter);
    }

    getCityByState(filter: any) {
      return this.postAll('city/filter', filter);
    }



}
