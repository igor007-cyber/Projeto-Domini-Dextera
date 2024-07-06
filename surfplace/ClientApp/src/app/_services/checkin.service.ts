import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
// import { CheckIn } from '../_model/Checkin-model';

@Injectable({ providedIn: 'root' })
export class CheckInService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('CheckIn/filter', filter);
    }

    save(entity) {
      return this.post('CheckIn/save', entity);
   }

    deleteById(id) {
          return this.delete(`CheckIn/${id}`);
    }

    getById(id: any) {
      return this.http.get<any>(`${this.getUrlApi()}CheckIn/${id}`);
  }


}
