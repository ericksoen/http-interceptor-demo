import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { DataService } from './data.service';
import { InterceptorService } from './interceptor.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { UnauthorizeComponent } from './unauthorize.component';
import { ApplicationInsightsLoggerService } from './application-insights-logger.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizeComponent,
  },
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UnauthorizeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    DataService,
    ApplicationInsightsLoggerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
