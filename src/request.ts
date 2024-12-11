import express from 'express';
import http from 'http';
import https from 'https';
import net from 'net';
import events from 'events';

import merge from '@onesy/utils/merge';
import promisify from '@onesy/utils/promisify';
import isValid from '@onesy/utils/isValid';
import isEnvironment from '@onesy/utils/isEnvironment';
import OnesyRequest from '@onesy/request';
import { IOnesyRequestResponse, IOptionsRequest, TMethodType } from '@onesy/request/OnesyRequest';

import assert, { IAssertObject, IAssertOptions } from './assert';

if (isEnvironment('nodejs') && !global.onesyEvents) global.onesyEvents = new events.EventEmitter();

interface IOptions {
  keepOpen?: boolean;
}

export type IOnesyTestRequestStatusOperator = 'eq' | 'equal' | 'lt' | 'less-than' | 'lte' | 'less-than-equal' | 'gt' | 'greater-than' | 'gte' | 'greater-than-equal';

export interface IOnesyTestRequestResponse {
  value?: IOnesyRequestResponse;

  response?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  meta?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  pagination?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  property?: (property: string, value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  options?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;
  request?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;
  headers?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;

  status?: (value: Array<number> | number, operator?: IOnesyTestRequestStatusOperator, options?: IAssertOptions) => IAssertObject;
}

export interface IOnesyTestRequest {
  request: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  get: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  post: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  put: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  delete: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  head: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  options: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
  patch: (url: string, options?: IOptionsRequest) => Promise<IOnesyTestRequestResponse>;
}

const optionsDefault: IOptions = {
  keepOpen: true,
};

export async function request(app?: express.Application | http.Server | https.Server | string, options_: IOptions = optionsDefault): Promise<IOnesyTestRequest> {
  const options = merge(options_, optionsDefault);
  let server: http.Server | https.Server;
  let port: number;

  const appClose = async () => {
    if (isEnvironment('nodejs') && server?.address()) {
      await promisify(server.close.bind(server))();

      // For testing purposes
      global.onesyEvents.emit('onesy-test-app-end');

      global.onesyEvents.off('onesy-test-clear', appClose);
    }
  };

  const appStart = async () => {
    if (isEnvironment('nodejs') && (app as express.Application | http.Server | https.Server)?.listen) {
      try {
        server = http.createServer(app as any);

        await promisify(server.listen.bind(server))(0);

        port = (server.address() as net.AddressInfo).port;

        // For testing purposes
        global.onesyEvents.emit('onesy-test-app-start');

        global.onesyEvents.on('onesy-test-clear', appClose);
      }
      catch (error) { }
    }
  };

  // Either way close the app on process exit
  if (isEnvironment('nodejs')) process.on('exit', appClose);

  if (options.keepOpen) await appStart();

  // Methods
  const requestObject = {
    request: async (url: string, onesyRequestOptions: IOptionsRequest = {}): Promise<IOnesyTestRequestResponse> => {
      if (!options.keepOpen) {
        await appStart();

        OnesyRequest.interceptors.request.post.subscribe(appClose);
      }

      if (!onesyRequestOptions.request) onesyRequestOptions.request = {};

      const url_ = url || onesyRequestOptions.url;

      onesyRequestOptions.url = (app && isValid('url-path', url_)) ? `http://localhost:${port}${url_}` : url_;

      let response: IOnesyRequestResponse;

      try {
        response = await OnesyRequest.request(onesyRequestOptions);
      }
      catch (error) {
        response = error;
      }

      const assertResponse: IOnesyTestRequestResponse = {
        value: response,

        response: (...args: [Array<any> | any, IAssertOptions]) => assert(response.response).eql(...args),
        meta: (...args: [Array<any> | any, IAssertOptions]) => assert(response.response?.meta).eql(...args),
        pagination: (...args: [Array<any> | any, IAssertOptions]) => assert(response.response?.pagination).eql(...args),
        property: (property: string, value: Array<any> | any, assertOptions: IAssertOptions) => assert(response.response && response.response[property]).eql(value, assertOptions),

        options: (...args: [string, any, IAssertOptions]) => assert(response.options).prop(...args),
        headers: (...args: [string, any, IAssertOptions]) => assert(response.headers).prop(...args),
        request: (...args: [string, any, IAssertOptions]) => assert(response.request).prop(...args),

        status: (value: number, operator = 'eq', assertOptions: IAssertOptions) => assert(response.status)[operator](value, assertOptions),
      };

      return assertResponse;
    },
  };

  const METHODS: Array<TMethodType> = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

  METHODS.forEach(method => requestObject[method.toLowerCase()] = (url: string, onesyRequestOptions: IOptionsRequest = {}): Promise<IOnesyTestRequestResponse> => {
    onesyRequestOptions.method = method;

    return requestObject.request(url, onesyRequestOptions);
  });

  return requestObject as IOnesyTestRequest;
}

export default request;
