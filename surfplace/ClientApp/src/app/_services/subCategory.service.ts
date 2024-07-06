import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { SubCategory } from '../_model/subcategory-model';

@Injectable({ providedIn: 'root' })

export class SubCategoriaService extends GenericHttpService<SubCategory> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('subCategory/filter', filter);
      }

    get(id: any) {
        return this.http.get<SubCategory>(`${this.getUrlApi()}subCategory/${id}`);
    }

    deleteById(entity) {
        return this.post('subCategory/delete', entity);
  }

  active(entity) {
    return this.post('subCategory/active', entity);
 }

 save(entity) {
    return this.post('subCategory/save', entity);
 }

}
