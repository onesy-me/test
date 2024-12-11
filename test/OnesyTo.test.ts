/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import { OnesyTo, OnesyGroup } from '../src';

describe('OnesyTo', () => {

  it('OnesyTo', async () => {
    const onesyTo = new OnesyTo('a', () => 4);

    onesyTo.parent = new OnesyGroup('a4');
    onesyTo.index = 1;
    onesyTo.mainIndex = 41;
    onesyTo.level = 41;
    onesyTo.file = '/a';
    onesyTo.response = {
      for: onesyTo,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    };

    const values_ = [];

    values_.push(
      onesyTo.parent instanceof OnesyGroup,
      onesyTo.response.for === onesyTo,
      OnesyUtils.is('function', onesyTo.method),
    );

    delete onesyTo.parent;
    delete onesyTo.method;
    delete onesyTo.response.for;

    values_.push(onesyTo);

    const valueBrowsers = await evaluate((window: any) => {
      const onesyTo = new window.OnesyTest.OnesyTo('a', () => 4);

      onesyTo.parent = new window.OnesyTest.OnesyGroup('a');
      onesyTo.index = 1;
      onesyTo.mainIndex = 41;
      onesyTo.level = 41;
      onesyTo.file = '/a';
      onesyTo.response = {
        for: onesyTo,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      };

      const values_ = [];

      values_.push(
        onesyTo.parent instanceof window.OnesyTest.OnesyGroup,
        onesyTo.response.for === onesyTo,
        window.OnesyUtils.is('function', onesyTo.method),
      );

      delete onesyTo.parent;
      delete onesyTo.method;
      delete onesyTo.response.for;

      values_.push(onesyTo);

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(3).fill(true),
      {
        name: 'a',
        index: 1,
        mainIndex: 41,
        level: 41,
        file: '/a',
        response: {
          start: 14,
          end: 41,
          duration: 27,
          response: 4,
          type: 'error',
          index: 1
        }
      }
    ]));
  });

});
