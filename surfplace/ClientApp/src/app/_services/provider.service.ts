import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Provider } from '../_model/provider-model';

@Injectable({ providedIn: 'root' })
export class ProviderService extends GenericHttpService<Provider> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Provider/filter', filter);
    }

    save(entity) {
      return this.post('Provider/save', entity);
   }

    deleteById(id) {
          return this.delete(`Provider/${id}`);
    }

    getById(id: any) {
      return this.http.get<Provider>(`${this.getUrlApi()}Provider/${id}`);
  }
  active(entity) {
    return this.post('Provider/active', entity);
  }


}
