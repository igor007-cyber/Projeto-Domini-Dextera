import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
// import { CheckOut } from '../_model/Checkout-model';

@Injectable({ providedIn: 'root' })
export class CheckOutService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('CheckOut/filter', filter);
    }

    save(entity) {
      return this.post('CheckOut/save', entity);
   }

    deleteById(id) {
          return this.delete(`CheckOut/${id}`);
    }

    getById(id: any) {
      return this.http.get<any>(`${this.getUrlApi()}CheckOut/${id}`);
  }


}
