import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Company } from '../_model/company-model';

@Injectable({ providedIn: 'root' })
export class CompanyService extends GenericHttpService<Company> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('Company/filter', filter);
    }

    save(entity) {
      return this.post('Company/save', entity);
   }

    deleteById(id) {
          return this.delete(`Company/${id}`);
    }

    getById(id: any) {
      return this.http.get<Company>(`${this.getUrlApi()}Company/${id}`);
  }
  active(entity) {
    return this.post('Company/active', entity);
  }


}
