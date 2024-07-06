import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BoardType } from '../_model/board-type-model';

@Injectable({ providedIn: 'root' })
export class BoardTypeService extends GenericHttpService<BoardType> {
    constructor(private http: HttpClient) {
        super(http);
    }


  getAll() {
    return this.http.get<BoardType[]>(`${this.getUrlApi()}BoardType/getAllBoardType`);
}

}
