import express from 'express';
import http from 'http';
import https from 'https';
import net from 'net';
import events from 'events';

import merge from '@amaui/utils/merge';
import promisify from '@amaui/utils/promisify';
import isValid from '@amaui/utils/isValid';
import isEnvironment from '@amaui/utils/isEnvironment';
import AmauiRequest from '@amaui/request';
import { IAmauiRequestResponse, IOptionsRequest, TMethodType } from '@amaui/request/AmauiRequest';

import assert, { IAssertObject, IAssertOptions } from './assert';

if (isEnvironment('nodejs') && !global.amauiEvents) global.amauiEvents = new events.EventEmitter();

interface IOptions {
  keepOpen?: boolean;
}

export type IAmauiTestRequestStatusOperator = 'eq' | 'equal' | 'lt' | 'less-than' | 'lte' | 'less-than-equal' | 'gt' | 'greater-than' | 'gte' | 'greater-than-equal';

export interface IAmauiTestRequestResponse {
  value?: IAmauiRequestResponse;

  response?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  meta?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  pagination?: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  property?: (property: string, value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  options?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;
  request?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;
  headers?: (value: string, value1: any, options?: IAssertOptions) => IAssertObject;

  status?: (value: Array<number> | number, operator?: IAmauiTestRequestStatusOperator, options?: IAssertOptions) => IAssertObject;
}

export interface IAmauiTestRequest {
  request: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  get: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  post: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  put: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  delete: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  head: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  options: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
  patch: (url: string, options?: IOptionsRequest) => Promise<IAmauiTestRequestResponse>;
}

const optionsDefault: IOptions = {
  keepOpen: true,
};

export async function request(app?: express.Application | http.Server | https.Server | string, options_: IOptions = optionsDefault): Promise<IAmauiTestRequest> {
  const options = merge(options_, optionsDefault);
  let server: http.Server | https.Server;
  let port: number;

  const appClose = async () => {
    if (isEnvironment('nodejs') && server?.address()) {
      await promisify(server.close.bind(server))();

      // For testing purposes
      global.amauiEvents.emit('amaui-test-app-end');

      global.amauiEvents.off('amaui-test-clear', appClose);
    }
  };

  const appStart = async () => {
    if (isEnvironment('nodejs') && (app as express.Application | http.Server | https.Server)?.listen) {
      try {
        server = http.createServer(app as any);

        await promisify(server.listen.bind(server))(0);

        port = (server.address() as net.AddressInfo).port;

        // For testing purposes
        global.amauiEvents.emit('amaui-test-app-start');

        global.amauiEvents.on('amaui-test-clear', appClose);
      }
      catch (error) { }
    }
  };

  // Either way close the app on process exit
  if (isEnvironment('nodejs')) process.on('exit', appClose);

  if (options.keepOpen) await appStart();

  // Methods
  const requestObject = {
    request: async (url: string, amauiRequestOptions: IOptionsRequest = {}): Promise<IAmauiTestRequestResponse> => {
      if (!options.keepOpen) {
        await appStart();

        AmauiRequest.interceptors.request.post.subscribe(appClose);
      }

      if (!amauiRequestOptions.request) amauiRequestOptions.request = {};

      const url_ = url || amauiRequestOptions.url;

      amauiRequestOptions.url = (app && isValid('url-path', url_)) ? `http://localhost:${port}${url_}` : url_;

      let response: IAmauiRequestResponse;

      try {
        response = await AmauiRequest.request(amauiRequestOptions);
      }
      catch (error) {
        response = error;
      }

      const assertResponse: IAmauiTestRequestResponse = {
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

  METHODS.forEach(method => requestObject[method.toLowerCase()] = (url: string, amauiRequestOptions: IOptionsRequest = {}): Promise<IAmauiTestRequestResponse> => {
    amauiRequestOptions.method = method;

    return requestObject.request(url, amauiRequestOptions);
  });

  return requestObject as IAmauiTestRequest;
}

export default request;
