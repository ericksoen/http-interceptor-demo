import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationInsightsLoggerService } from './application-insights-logger.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('InterceptorService', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // Provide an empty route array since we're using spies to validate behavior
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        ApplicationInsightsLoggerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true
        },
        {
          provide: Router,
          useValue: mockRouter
        },
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('making http calls', () => {
    it('should add an authorization header with the access token', () => {
      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      // Expect a single mock request has been made with the authorization values
      const req = httpMock.expectOne(n => n.headers.has('Authorization'));

      expect(req.request.headers.get('Authorization')).toEqual('Bearer MockJwtToken');
      req.flush({hello: 'world'});
    });

    it('should navigate to unauthorized component', fakeAsync(() => {
      http.get('/data').subscribe(() => {},
      err => {
        expect(err).toBeTruthy();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/unauthorized']);
      });

      // Expect a single mock request to have been made to the appropriate URL
      const req = httpMock.expectOne('/data');

      req.flush({}, {status: 401, statusText: 'Unauthorized'});
    }));
  });
});
