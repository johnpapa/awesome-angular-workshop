import { RequestData } from './index';

export class DataServiceError {
  readonly message: string;
  constructor(public error: any, public requestData: RequestData) {
    // TODO:  Log properly, not to console
    console.error(error, requestData);
    this.message =
      (error.error && error.error.message) ||
      (error.message ||
      (error.body && error.body.error) ||
       error).toString();
  }
}
