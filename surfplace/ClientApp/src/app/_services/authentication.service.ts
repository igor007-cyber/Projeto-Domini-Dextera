import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericHttpService } from './genericHttpService';
import { ApplicationUser } from 'src/app/_model/application-user';
import { LoginUser } from '../_model/login-user-model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends GenericHttpService<any>{
    protected baseUrl = `${environment.urlApi}`;
    protected baseSite = `${environment.urlApi}`;
    // private currentUserSubject: BehaviorSubject<any>;
    public currentUser: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        super(http);
        this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('oxidu_user')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    registerCollaborator(user: LoginUser) {
        return this.postAll('account/registerCollaborator', user);
    }

    registerMaster(user: LoginUser) {
        return this.postAll('account/registerMaster', user);
    }

    registerClient(user: LoginUser) {
        return this.postAll('account/registerClient', user);
    }

    logout() {
      localStorage.removeItem('oxidu_user');
      this.currentUser.next(null);
  }

  addCurrentUser(user) {
      localStorage.setItem('oxidu_user', JSON.stringify(user));
  }

  clearUser() {
      localStorage.removeItem('oxidu_user');
  }

  getCurrentUser() {
      return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('oxidu_user'))).getValue();
  }

    save(store: FormData) {
        return this.post('account/save', store);
    }

    login(user) {
        return this.postAll('account/loginMaster', user);
    }

    loginPartner(user) {
        return this.postAll('account/loginPartner', user);
    }

    loginClient(user) {
      return this.postAll('account/loginClient', user);
  }

    getByFilter(filter: any) {
        return this.postAll('account/filter', filter);
      }

      getByFilterMaster(filter: any) {
        return this.postAll('account/filterMaster', filter);
      }

      register(user) {
        return this.postAll('account/register', user);
    }

    recoverPassword(user) {
        return this.postAll('account/recoverPassword', user);
    }

    deleteById(id) {
        return this.delete(`account/${id}`);
  }

  disableUser(user) {
    return this.postAll('account/disable', user);
}

enableUser(user) {
    return this.postAll('account/enable', user);
}

getClients() {
    return this.http.get<any>(`${this.getUrlApi()}account/getClients`);
}

changePassword(user) {
    return this.postAll('account/changePassword', user);
}

confirmUser(user) {
  return this.postAll('account/confirm', user);
}

// loadFilter() {
//   return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('oxidu_filter'))).getValue();
// }

// removeFilter() {
//   localStorage.removeItem('oxidu_filter');
// }

// saveFilter(filter: any) {
//   localStorage.setItem('oxidu_filter', JSON.stringify(filter));
// }

}
