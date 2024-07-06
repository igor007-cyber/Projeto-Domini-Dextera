import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Combo } from '../_model/combo-model';

@Injectable({ providedIn: 'root' })
export class ComboService extends GenericHttpService<Combo> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('combo/filter', filter);
    }

    save(entity: FormData) {
      return this.post('combo/save', entity);
   }

    deleteById(id) {
          return this.delete(`combo/${id}`);
    }

    getById(id: any) {
      return this.http.get<Combo>(`${this.getUrlApi()}combo/${id}`);
  }


  getAll() {
    return this.http.get<Combo[]>(`${this.getUrlApi()}combo/getAll`);
}
active(entity) {
  return this.post('Combo/active', entity);
}

}
