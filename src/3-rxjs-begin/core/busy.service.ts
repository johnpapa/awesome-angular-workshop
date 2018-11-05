import { Injectable } from '@angular/core';

// Import a Subject of some kind from rxjs
// Be ready to justify your choice
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusyService {

  // private busySubject = ... created subject

  // initialize this observable properly
  busy$: Observable<boolean> = of(false);

  setBusy(isBusy: boolean) {
    // should signal whether is or is not busy
  }

}
