import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Villain } from '../core';

const api = '/api';

@Injectable()
export class VillainService {
  constructor(private http: HttpClient) {}

  logout() {
    return this.http.get(`${api}/logout`);
  }

  getProfile() {
    return this.http.get<any>(`${api}/profile`);
  }

  getVillains() {
    return this.http
      .get<Array<Villain>>(`${api}/villains`)
      .pipe(map(villains => villains), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return Observable.throw(res.error || 'Server error');
  }

  deleteVillain(villain: Villain) {
    return this.http.delete(`${api}/villain/${villain.id}`);
  }

  addVillain(villain: Villain) {
    return this.http.post<Villain>(`${api}/villain/`, villain);
  }

  updateVillain(villain: Villain) {
    return this.http.put<Villain>(`${api}/villain/${villain.id}`, villain);
  }
}
