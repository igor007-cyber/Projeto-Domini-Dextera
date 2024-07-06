import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Finishing } from '../_model/finishing-model';

@Injectable({ providedIn: 'root' })
export class FinishingService extends GenericHttpService<Finishing> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Finishing/filter', filter);
    }

    save(entity) {
      return this.post('Finishing/save', entity);
   }

    deleteById(id) {
          return this.delete(`Finishing/${id}`);
    }

    getById(id: any) {
      return this.http.get<Finishing>(`${this.getUrlApi()}Finishing/${id}`);
  }
  active(entity) {
    return this.post('Finishing/active', entity);
  }


}
