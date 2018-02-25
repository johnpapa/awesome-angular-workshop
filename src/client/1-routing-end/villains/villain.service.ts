import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Villain, ToastService } from '../core';

const api = '/api';

@Injectable()
export class VillainService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  logout() {
    return this.http.get(`${api}/logout`);
  }

  getProfile() {
    return this.http.get<any>(`${api}/profile`);
  }

  getVillains() {
    return this.http
      .get<Array<Villain>>(`${api}/villains`)
      .pipe(
        map(villains => villains),
        tap(() => this.toastService.openSnackBar('Villains retrieved successfully!', 'GET')),
        catchError(this.handleError)
      );
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return Observable.throw(res.error || 'Server error');
  }

  deleteVillain(villain: Villain) {
    return this.http
      .delete(`${api}/villain/${villain.id}`)
      .pipe(tap(() => this.toastService.openSnackBar(`Villain ${villain.name} deleted`, 'DELETE')));
  }

  addVillain(villain: Villain) {
    return this.http
      .post<Villain>(`${api}/villain/`, villain)
      .pipe(tap(() => this.toastService.openSnackBar(`Villain ${villain.name} added`, 'POST')));
  }

  updateVillain(villain: Villain) {
    return this.http
      .put<Villain>(`${api}/villain/${villain.id}`, villain)
      .pipe(tap(() => this.toastService.openSnackBar(`Villain ${villain.name} updated`, 'PUT')));
  }
}
