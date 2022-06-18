/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as AmauiUtils from '@amaui/utils';

import { evaluate } from '../utils/js/test/utils';

import { AmauiMiddleware, AmauiGroup } from '../src';

describe('@amaui/test/amaui-middleware', () => {

  it('AmauiMiddleware', async () => {
    const amauiMiddleware = new AmauiMiddleware('a', () => 4);

    amauiMiddleware.parent = new AmauiGroup('a4');
    amauiMiddleware.file = '/a';
    amauiMiddleware.responses = [{
      for: amauiMiddleware,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    }];

    const values_ = [];

    values_.push(
      amauiMiddleware.parent instanceof AmauiGroup,
      amauiMiddleware.responses[0].for === amauiMiddleware,
      AmauiUtils.is('function', amauiMiddleware.method),
    );

    delete amauiMiddleware.parent;
    delete amauiMiddleware.method;
    delete amauiMiddleware.responses[0].for;

    values_.push(amauiMiddleware);

    const valueBrowsers = await evaluate((window: any) => {
      const amauiMiddleware = new window.AmauiTest.AmauiMiddleware('a', () => 4);

      amauiMiddleware.parent = new window.AmauiTest.AmauiGroup('a');
      amauiMiddleware.file = '/a';
      amauiMiddleware.responses = [{
        for: amauiMiddleware,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      }];

      const values_ = [];

      values_.push(
        amauiMiddleware.parent instanceof window.AmauiTest.AmauiGroup,
        amauiMiddleware.responses[0].for === amauiMiddleware,
        AmauiUtils.is('function', amauiMiddleware.method),
      );

      delete amauiMiddleware.parent;
      delete amauiMiddleware.method;
      delete amauiMiddleware.responses[0].for;

      values_.push(amauiMiddleware);

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
