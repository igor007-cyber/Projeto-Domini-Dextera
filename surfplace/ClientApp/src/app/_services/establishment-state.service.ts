import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { EstablishmentState } from '../_model/establishment-state-model';

@Injectable({ providedIn: 'root' })
export class EstablishmentStateService extends GenericHttpService<EstablishmentState> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('EstablishmentState/filter', filter);
    }

    getByCep(filter: any) {
      return this.postAll('establishmentState/getByCep', filter);
    }

    save(entity) {
      return this.post('EstablishmentState/save', entity);
   }

    deleteById(id) {
          return this.delete(`EstablishmentState/${id}`);
    }

    getById(id: any) {
      return this.http.get<EstablishmentState>(`${this.getUrlApi()}EstablishmentState/${id}`);
  }

  active(entity) {
    return this.post('EstablishmentState/active', entity);
}
}
