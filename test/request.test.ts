/* tslint:disable: no-shadowed-variable */
import express from 'express';

import { expect } from 'chai';

import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import { request } from '../src';

describe('@onesy/test/request', () => {
  const app = express();

  app.set('view engine', 'html');
  app.set('json spaces', 2);
  app.set('subdomain offset', 1);

  // All the body parsers
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get('/success', async (req, res) => {
    return res.status(201).json({
      response: ['a'],
      pagination: {
        total: 4,
        next: 'a',
        previous: 'a1'
      },
      meta: {
        status: 201
      }
    });
  });

  app.get('/error', async (req, res) => {
    return res.status(400).json({
      meta: {
        status: 400,
        message: 'a'
      }
    });
  });

  app.all('*', async (req, res) => {
    const response = {
      method: req.method,
      url: req.url,
      body: req.body,
    };

    if (['HEAD', 'OPTIONS'].indexOf(response.method) === -1) return res.status(200).json(response);

    res.set('onesy-method', response.method);
    res.set('onesy-url', response.url);

    return res.send();
  });

  const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const METHODS1 = ['HEAD', 'OPTIONS'];

  it('request', async () => {
    const onesyTestRequest = await request();

    const values_ = [
      ['request', 'get', 'post', 'put', 'delete', 'head', 'options', 'patch'].every(method => onesyTestRequest[method]),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const onesyTestRequest = await window.OnesyTest.request();

      const values_ = [
        ['request', 'get', 'post', 'put', 'delete', 'head', 'options', 'patch'].every(method => onesyTestRequest[method]),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([true]));
  });

  describe('response', () => {

    it('response', async () => {
      const onesyTestRequest = await request();

      const values_ = [
        await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' }),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const onesyTestRequest = await window.OnesyTest.request();

        const values_ = [
          await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' }),
        ];

        return values_.map(item => [
          typeof item.value === 'object' &&
          typeof item.response === 'function' &&
          typeof item.options === 'function' &&
          typeof item.headers === 'function' &&
          typeof item.request === 'function' &&
          typeof item.meta === 'function' &&
          typeof item.pagination === 'function' &&
          typeof item.status === 'function',
          item.value
        ]);
      });
      const valueNode = values_.map(item => [
        typeof item.value === 'object' &&
        typeof item.response === 'function' &&
        typeof item.options === 'function' &&
        typeof item.headers === 'function' &&
        typeof item.request === 'function' &&
        typeof item.meta === 'function' &&
        typeof item.pagination === 'function' &&
        typeof item.status === 'function',
        item.value
      ]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => {
        value.forEach(value_ => {
          delete value_[1].headers.connection;
          delete value_[1].headers.date;
          delete value_[1].headers['keep-alive'];
          delete value_[1].headers['content-length'];

          delete value_[1].request;
          delete value_[1].options.request.headers['user-agent'];

          expect(value_[0]).eq(true);

          expect(value_[1]).eql({
            response: {
              method: 'GET',
              url: '/a',
              body: {}
            },
            status: 200,
            headers: {
              'content-type': 'application/json; charset=utf-8',
              etag: 'W/\"32-hI2m84TuUvARxOlPJ2KAmtQwB2U\"',
              'x-powered-by': 'Express'
            },
            options: {
              method: 'GET',
              request: {
                headers: {
                  accept: 'application/json, text/plain, */*'
                },
                zip: {
                  onesy: {
                    zip: false,
                    unzip: true,
                    only_positive: true
                  }
                },
                csrf: {
                  cookie: 'CSRF-TOKEN',
                  headers: 'X-CSRF-TOKEN'
                }
              },
              url: 'http://localhost:4000/a',
              response: {
                resolveOnError: true,
                type: 'json',
                parse: {
                  json: true
                }
              }
            }
          });
        });
      });
    });

    it('value', async () => {
      const onesyTestRequest = await request();

      const values_ = [
        (await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).value,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const onesyTestRequest = await window.OnesyTest.request();

        const values_ = [
          (await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).value,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => {
        value.forEach(value_ => {
          delete value_.headers.connection;
          delete value_.headers.date;
          delete value_.headers['keep-alive'];
          delete value_.headers['content-length'];

          delete value_.request;
          delete value_.options.request.headers['user-agent'];

          expect(value_).eql({
            response: {
              method: 'GET',
              url: '/a',
              body: {}
            },
            status: 200,
            headers: {
              'content-type': 'application/json; charset=utf-8',
              etag: 'W/\"32-hI2m84TuUvARxOlPJ2KAmtQwB2U\"',
              'x-powered-by': 'Express'
            },
            options: {
              method: 'GET',
              request: {
                headers: {
                  accept: 'application/json, text/plain, */*'
                },
                zip: {
                  onesy: {
                    zip: false,
                    unzip: true,
                    only_positive: true
                  }
                },
                csrf: {
                  cookie: 'CSRF-TOKEN',
                  headers: 'X-CSRF-TOKEN'
                }
              },
              url: 'http://localhost:4000/a',
              response: {
                resolveOnError: true,
                type: 'json',
                parse: {
                  json: true
                }
              }
            }
          });
        });
      });
    });

    describe('methods', () => {

      it('response', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).response({
            method: 'GET',
            url: '/a',
            body: {}
          }),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).response({
            response: [
              'a'
            ],
            pagination: {
              total: 4,
              next: 'a',
              previous: 'a1'
            },
            meta: {
              status: 201
            }
          }),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).response({
            meta: {
              status: 400,
              message: 'a'
            }
          }),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).response(4, { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).response({
              method: 'GET',
              url: '/a',
              body: {}
            }),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).response({
              response: [
                'a'
              ],
              pagination: {
                total: 4,
                next: 'a',
                previous: 'a1'
              },
              meta: {
                status: 201
              }
            }),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).response({
              meta: {
                status: 400,
                message: 'a'
              }
            }),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).response(4, { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('meta', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).meta(undefined),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).meta({
            status: 201
          }),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).meta({
            status: 400,
            message: 'a'
          }),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).meta(4, { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).meta(undefined),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).meta({
              status: 201
            }),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).meta({
              status: 400,
              message: 'a'
            }),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).meta(4, { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('pagination', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).pagination(undefined),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).pagination({
            total: 4,
            next: 'a',
            previous: 'a1'
          }),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).pagination(undefined),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).pagination(4, { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).pagination(undefined),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).pagination({
              total: 4,
              next: 'a',
              previous: 'a1'
            }),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).pagination(undefined),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).pagination(4, { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('property', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).property('meta', undefined),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).property('meta', {
            status: 201
          }),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).property('meta', {
            status: 400,
            message: 'a'
          }),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).property('meta', 4, { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).property('meta', undefined),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).property('meta', {
              status: 201
            }),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).property('meta', {
              status: 400,
              message: 'a'
            }),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).property('meta', 4, { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('options', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).options('method', 'GET'),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).options('method', 'GET'),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).options('method', 'GET'),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).options('a', 'Express', { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).options('method', 'GET'),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).options('method', 'GET'),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).options('method', 'GET'),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).options('method', 'PUT', { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('headers', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).headers('x-powered-by', 'Express'),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).headers('x-powered-by', 'Express'),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).headers('x-powered-by', 'Express'),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).headers('a', 'Express', { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).headers('x-powered-by', 'Express'),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).headers('x-powered-by', 'Express'),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).headers('x-powered-by', 'Express'),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).headers('a', 'Express', { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('request', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).request('writable', true),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).request('writable', true),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).request('writable', true),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).request('a', 'a', { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).request('status', 200),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).request('status', 201),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).request('status', 400),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).request('a', 'a', { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(4).fill(true)));
      });

      it('status', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(200),
          !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(200, 'eq'),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).status(201, 'lte'),
          !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).status(204, 'lt'),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(400),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(400, 'gte'),
          !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(201, 'gt'),
          !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(204, 'eq', { noError: true })
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(200),
            !!(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(200, 'eq'),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).status(201, 'lte'),
            !!(await onesyTestRequest.request('http://localhost:4000/success', { method: 'GET' })).status(204, 'lt'),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(400),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(400, 'gte'),
            !!(await onesyTestRequest.request('http://localhost:4000/error', { method: 'GET' })).status(201, 'gt'),
            !(await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).status(204, 'eq', { noError: true })
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql(new Array(8).fill(true)));
      });

    });

  });

  describe('options', () => {

    describe('keepOpen', () => {

      it('true', async () => {
        const values = [];

        const eventListenerAppStart = () => values.push(true);
        const eventListenerAppEnd = () => values.push(false);

        global.onesyEvents.on('onesy-test-app-start', eventListenerAppStart);

        global.onesyEvents.on('onesy-test-app-end', eventListenerAppEnd);

        const onesyTestRequest = await request(app, { keepOpen: true });

        values.push(
          (await onesyTestRequest.request('/a', { method: 'GET' })).value.response,
          (await onesyTestRequest.request('/a', { method: 'PUT' })).value.response,
          (await onesyTestRequest.request('/a', { method: 'PATCH' })).value.response,
        );

        global.onesyEvents.emit('onesy-test-clear');

        await OnesyUtils.wait(440);

        expect(values).eql([
          true,
          { method: 'GET', url: '/a', body: {} },
          { method: 'PUT', url: '/a', body: {} },
          { method: 'PATCH', url: '/a', body: {} },
          false,
        ]);

        expect(global.onesyEvents.listenerCount('onesy-test-clear')).eq(0);

        global.onesyEvents.off('onesy-test-app-start', eventListenerAppStart);
        global.onesyEvents.off('onesy-test-app-end', eventListenerAppEnd);
      });

      it('false', async () => {
        const values = [];

        const eventListenerAppStart = () => values.push(true);
        const eventListenerAppEnd = () => values.push(false);

        global.onesyEvents.on('onesy-test-app-start', eventListenerAppStart);

        global.onesyEvents.on('onesy-test-app-end', eventListenerAppEnd);

        const onesyTestRequest = await request(app, { keepOpen: false });

        values.push(
          (await onesyTestRequest.request('/a', { method: 'GET' })).value.response,
        );

        values.push(
          (await onesyTestRequest.request('/a', { method: 'PUT' })).value.response,
        );

        values.push(
          (await onesyTestRequest.request('/a', { method: 'PATCH' })).value.response,
        );

        expect(values).eql([
          true,
          false,
          { method: 'GET', url: '/a', body: {} },
          true,
          false,
          { method: 'PUT', url: '/a', body: {} },
          true,
          false,
          { method: 'PATCH', url: '/a', body: {} },
        ]);

        expect(global.onesyEvents.listenerCount('onesy-test-clear')).eq(0);

        global.onesyEvents.off('onesy-test-app-start', eventListenerAppStart);
        global.onesyEvents.off('onesy-test-app-end', eventListenerAppEnd);
      });

    });

  });

  describe('variant', () => {

    describe('url', () => {

      it('request', async () => {
        const onesyTestRequest = await request();

        const values_ = [
          (await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).value.response,
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const onesyTestRequest = await window.OnesyTest.request();

          const values_ = [
            (await onesyTestRequest.request('http://localhost:4000/a', { method: 'GET' })).value.response,
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql([
          {
            method: 'GET',
            url: '/a',
            body: {}
          }
        ]));
      });

      METHODS.forEach(method => {
        const methodLower = method.toLowerCase();

        it(methodLower, async () => {
          const onesyTestRequest = await request();

          const values_ = [
            (await onesyTestRequest[methodLower]('http://localhost:4000/a')).value.response,
          ];

          const valueBrowsers = await evaluate(async (args: any) => {
            const [window, method] = args;

            const onesyTestRequest = await window.OnesyTest.request();

            const values_ = [
              (await onesyTestRequest[method]('http://localhost:4000/a')).value.response,
            ];

            return values_;
          }, { arguments: [methodLower] });
          const valueNode = values_;
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => expect(value).eql([
            {
              method,
              url: '/a',
              body: {}
            }
          ]));
        });
      });

      METHODS1.forEach(method => {
        const methodLower = method.toLowerCase();

        it(methodLower, async () => {
          const onesyTestRequest = await request();

          const values_ = [
            (await onesyTestRequest[methodLower]('http://localhost:4000/a')).value.headers,
          ];

          const valueBrowsers = await evaluate(async (args: any) => {
            const [window, method] = args;

            const onesyTestRequest = await window.OnesyTest.request();

            const values_ = [
              (await onesyTestRequest[method]('http://localhost:4000/a')).value.headers,
            ];

            return values_;
          }, { arguments: [methodLower] });
          const valueNode = values_;
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => {
            expect(value[0]['onesy-method']).eq(method);
            expect(value[0]['onesy-url']).eq('/a');
          });
        });
      });
    });

    describe('app', () => {

      it('request', async () => {
        const onesyTestRequest = await request(app);

        const values_ = [
          (await onesyTestRequest.request('/a', { method: 'GET' })).value.response,
        ];

        const valueNode = values_;
        const values = [valueNode];

        values.forEach(value => expect(value).eql([
          {
            method: 'GET',
            url: '/a',
            body: {}
          }
        ]));
      });

      METHODS.forEach(method => {
        const methodLower = method.toLowerCase();

        it(methodLower, async () => {
          const onesyTestRequest = await request(app);

          const values_ = [
            (await onesyTestRequest[methodLower]('/a')).value.response,
          ];

          const valueNode = values_;
          const values = [valueNode];

          values.forEach(value => expect(value).eql([
            {
              method,
              url: '/a',
              body: {}
            }
          ]));
        });
      });

      METHODS1.forEach(method => {
        const methodLower = method.toLowerCase();

        it(methodLower, async () => {
          const onesyTestRequest = await request(app);

          const values_ = [
            (await onesyTestRequest[methodLower]('/a')).value.headers,
          ];

          const valueNode = values_;
          const values = [valueNode];

          values.forEach(value => {
            expect(value[0]['onesy-method']).eq(method);
            expect(value[0]['onesy-url']).eq('/a');
          });
        });
      });
    });

  });

});
