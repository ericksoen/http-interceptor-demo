import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { ApplicationInsightsLoggerService } from './application-insights-logger.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private logger: ApplicationInsightsLoggerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer MockJwtToken`
      }
    });

    return next.handle(authRequest).do(
      // No custom behavior for successful request
      // for now
      (event: HttpEvent<any>) => {},
      (err: any) => {

        this.logger.Error(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/unauthorized']);
          }
        }
      }
    );
  }


}
