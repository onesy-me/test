/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import { AmauiTo, AmauiGroup } from '../src';

describe('@amaui/test/amaui-to', () => {
  let browsers: IBrowsers;

  before(async () => browsers = await startBrowsers());

  after(async () => {
    await closeBrowsers(browsers);
  });

  it('AmauiTo', async () => {
    const amauiTo = new AmauiTo('a', () => 4);

    amauiTo.parent = new AmauiGroup('a4');
    amauiTo.index = 1;
    amauiTo.mainIndex = 41;
    amauiTo.level = 41;
    amauiTo.file = '/a';
    amauiTo.response = {
      for: amauiTo,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    };

    const values_ = [];

    values_.push(
      amauiTo.parent instanceof AmauiGroup,
      amauiTo.response.for === amauiTo,
      AmauiUtils.is('function', amauiTo.method),
    );

    delete amauiTo.parent;
    delete amauiTo.method;
    delete amauiTo.response.for;

    values_.push(amauiTo);

    const valueBrowsers = await evaluate((window: any) => {
      const amauiTo = new window.AmauiTest.AmauiTo('a', () => 4);

      amauiTo.parent = new window.AmauiTest.AmauiGroup('a');
      amauiTo.index = 1;
      amauiTo.mainIndex = 41;
      amauiTo.level = 41;
      amauiTo.file = '/a';
      amauiTo.response = {
        for: amauiTo,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      };

      const values_ = [];

      values_.push(
        amauiTo.parent instanceof window.AmauiTest.AmauiGroup,
        amauiTo.response.for === amauiTo,
        window.AmauiUtils.is('function', amauiTo.method),
      );

      delete amauiTo.parent;
      delete amauiTo.method;
      delete amauiTo.response.for;

      values_.push(amauiTo);

      return values_;
    }, { browsers });
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
