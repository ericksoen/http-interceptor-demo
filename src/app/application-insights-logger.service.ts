import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationInsightsLoggerService {

  constructor() { }

  public Log(eventInformation: any): void {
    console.info(eventInformation);
  }

  public Error(eventInformation: any): void {
    console.error(eventInformation);
  }

}
