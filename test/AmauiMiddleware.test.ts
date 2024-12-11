/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import { OnesyMiddleware, OnesyGroup } from '../src';

describe('OnesyMiddleware', () => {

  it('OnesyMiddleware', async () => {
    const onesyMiddleware = new OnesyMiddleware('a', () => 4);

    onesyMiddleware.parent = new OnesyGroup('a4');
    onesyMiddleware.file = '/a';
    onesyMiddleware.responses = [{
      for: onesyMiddleware,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    }];

    const values_ = [];

    values_.push(
      onesyMiddleware.parent instanceof OnesyGroup,
      onesyMiddleware.responses[0].for === onesyMiddleware,
      OnesyUtils.is('function', onesyMiddleware.method),
    );

    delete onesyMiddleware.parent;
    delete onesyMiddleware.method;
    delete onesyMiddleware.responses[0].for;

    values_.push(onesyMiddleware);

    const valueBrowsers = await evaluate((window: any) => {
      const onesyMiddleware = new window.OnesyTest.OnesyMiddleware('a', () => 4);

      onesyMiddleware.parent = new window.OnesyTest.OnesyGroup('a');
      onesyMiddleware.file = '/a';
      onesyMiddleware.responses = [{
        for: onesyMiddleware,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      }];

      const values_ = [];

      values_.push(
        onesyMiddleware.parent instanceof window.OnesyTest.OnesyGroup,
        onesyMiddleware.responses[0].for === onesyMiddleware,
        OnesyUtils.is('function', onesyMiddleware.method),
      );

      delete onesyMiddleware.parent;
      delete onesyMiddleware.method;
      delete onesyMiddleware.responses[0].for;

      values_.push(onesyMiddleware);

      return values_;
    });

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(3).fill(true),
      {
        name: 'a',
        file: '/a',
        responses: [
          {
            start: 14,
            end: 41,
            duration: 27,
            response: 4,
            type: 'error',
            index: 1
          }
        ]
      }
    ]));
  });

});
