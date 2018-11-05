import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Explain how this interceptor is provided.
// Why is it provided that way?
// Can you see how this interceptor follows the "Russian Doll" pattern?
@Injectable()
export class BusyHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // turn busy on when the request comes in
    // turn it off when the response goes out ... even a failed response.
    return next.handle(request);
  }
}
