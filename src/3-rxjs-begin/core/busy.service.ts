import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusyService {

  private busySubject = new ReplaySubject<boolean>(1);
  busy$ = this.busySubject.asObservable();

  setBusy(isBusy = true) {
    this.busySubject.next(isBusy);
  }

}
