import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Establishment } from 'src/app/_model/establishment-model';

@Injectable({ providedIn: 'root' })

export class EstablishmentService extends GenericHttpService<Establishment> {
    protected baseUrl = `${environment.urlApi}`;
    constructor(private http: HttpClient) {
        super(http);
    }

    getById(id: any) {
      return this.http.get<Establishment>(`${this.getUrlApi()}establishment/${id}`);
  }

  getAll() {
    return this.http.get<Establishment[]>(`${this.getUrlApi()}Establishment/getAll`);
}

getPartners() {
  return this.http.get<Establishment[]>(`${this.getUrlApi()}Establishment/getPartners`);
}

    save(entity) {
        return this.post('establishment/save', entity);
     }

     getByFilter(filter: any) {
      return this.postAll('establishment/filter', filter);
    }

  deleteById(entity) {
          return this.post('establishment/delete', entity);
    }


  active(entity) {
    return this.post('establishment/active', entity);
 }

getPagination(filter: any) {
  return this.postAll('establishment/getPagination', filter);
}

filterByState(filter: any) {
  return this.postAll('establishment/filterByState', filter);
}

filterByDescription(filter: any) {
  return this.postAll('establishment/filterByDescription', filter);
}

}
