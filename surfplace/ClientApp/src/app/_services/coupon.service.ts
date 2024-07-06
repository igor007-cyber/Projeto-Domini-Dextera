import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Coupon } from '../_model/coupon-model';

@Injectable({ providedIn: 'root' })

export class CouponService extends GenericHttpService<Coupon> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('coupon/filter', filter);
      }

      getByCodigo(filter: any) {
        return this.post('coupon/getByCodigo', filter);
      }

    get(id: any) {
        return this.http.get<Coupon>(`${this.getUrlApi()}coupon/${id}`);
    }

    deleteById(id) {
        return this.delete(`coupon/${id}`);
  }

  active(entity) {
    return this.post('coupon/active', entity);
 }

 save(entity) {
    return this.post('coupon/save', entity);
 }

}
