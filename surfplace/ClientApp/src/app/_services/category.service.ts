import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Category } from '../_model/category-model';

@Injectable({ providedIn: 'root' })
export class CategoryService extends GenericHttpService<Category> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Category/filter', filter);
    }

    save(entity) {
      return this.post('Category/save', entity);
   }

    deleteById(id) {
          return this.delete(`Category/${id}`);
    }

    getById(id: any) {
      return this.http.get<Category>(`${this.getUrlApi()}Category/${id}`);
  }
  active(entity) {
    return this.post('Category/active', entity);
  }


}
