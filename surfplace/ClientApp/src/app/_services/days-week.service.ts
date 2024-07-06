import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DaysWeekService {
private daysWeek: any[] = [];
    constructor() {
        this.loadDaysWeek();
    }

    loadDaysWeek() {
        this.daysWeek.push({dia: 1, name: 'Segunda-feira'});
        this.daysWeek.push({dia: 2, name: 'Terça-feira'});
        this.daysWeek.push({dia: 3, name: 'Quarta-feira'});
        this.daysWeek.push({dia: 4, name: 'Quinta-feira'});
        this.daysWeek.push({dia: 5, name: 'Sexta-feira'});
        this.daysWeek.push({dia: 6, name: 'Sábado'});
        this.daysWeek.push({dia: 7, name: 'Domingo'});
      }

      getNameDayWeek(dia) {
        return this.daysWeek.find(x => x.dia === dia).name;
      }

      get() {
          return this.daysWeek;
      }

}
