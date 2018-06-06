import { Injectable, OnDestroy } from '@angular/core';
import { Actions } from '@ngrx/effects';
import {  EntityAction, OP_ERROR, OP_SUCCESS } from 'ngrx-data';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '../core';




/** Report success/error ngrx-data EntityActions as toast messages **/
@Injectable()
export class NgrxDataToastService implements OnDestroy {
  private onDestroy = new Subject();

  constructor(actions$: Actions, toast: ToastService) {
    actions$
      .pipe(
        filter(
          (ea: EntityAction) =>
            ea.op &&
            (ea.op.includes(OP_SUCCESS) || ea.op.includes(OP_ERROR))
        ),
        takeUntil(this.onDestroy)
      )
      .subscribe(action => toast.openSnackBar(`${action.entityName} action`, action.op));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
