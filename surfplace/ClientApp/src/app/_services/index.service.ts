import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndexDTO } from '../_model/indexDTO-model';

@Injectable({ providedIn: 'root' })

export class IndexService extends GenericHttpService<IndexDTO> {
    protected baseUrl = `${environment.urlApi}`;
    constructor(private http: HttpClient) {
        super(http);
    }

  getIndex() {
    return this.http.get<IndexDTO>(`${this.getUrlApi()}main/getAll`);
}

}
