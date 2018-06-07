export * from './cqrs-data.service';
export * from './data-service-error';
export * from './data-services.module';
export * from './data.service';
export * from './heroes-data.service';
export * from './http-url-generator';
export * from './pluralizer';

export type HttpMethods = 'DELETE' | 'GET' | 'POST' | 'PUT';

export interface RequestData {
  method: HttpMethods;
  url: string;
  options: any;
}
