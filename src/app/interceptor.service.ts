import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  private mockAuthToken = 'MockJwtToken';
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.mockAuthToken}`
      }
    });

    return next.handle(authRequest);
  }
  constructor() { }

}
