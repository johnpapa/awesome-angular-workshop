import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BusyService } from './busy.service';

@Injectable() // no providedIn because multi-provided
export class BusyHttpInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.setBusy(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.setBusy(false);
      })
    );
  }
}
