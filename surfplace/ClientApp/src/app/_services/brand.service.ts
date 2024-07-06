import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Brand } from '../_model/brand-model';

@Injectable({ providedIn: 'root' })
export class BrandService extends GenericHttpService<Brand> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Brand/filter', filter);
    }

    save(entity) {
      return this.post('Brand/save', entity);
   }

    deleteById(id) {
          return this.delete(`Brand/${id}`);
    }

    getById(id: any) {
      return this.http.get<Brand>(`${this.getUrlApi()}Brand/${id}`);
  }
  active(entity) {
    return this.post('Brand/active', entity);
  }


}
