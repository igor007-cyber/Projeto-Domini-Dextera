import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from 'src/app/_model/plan-model';

@Injectable({ providedIn: 'root' })

export class PlanService extends GenericHttpService<Plan> {
    protected baseUrl = `${environment.urlApi}`;
    constructor(private http: HttpClient) {
        super(http);
    }

    get(id: any) {
      return this.http.get<Plan>(`${this.getUrlApi()}plan/${id}`);
  }

    save(entity) {
        return this.post('plan/save', entity);
     }

     getByFilter(filter: any) {
      return this.postAll('plan/filter', filter);
    }

    getAllByFilter(filter: any) {
      return this.postAll('plan/getAllByFilter', filter);
    }

  deleteById(entity) {
          return this.post('plan/delete', entity);
    }


  active(entity) {
    return this.post('plan/active', entity);
 }

}
