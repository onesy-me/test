/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as AmauiUtils from '@amaui/utils';

import { evaluate } from '../utils/js/test/utils';

import { AmauiTo, AmauiMiddleware, AmauiGroup } from '../src';

describe('@amaui/test/amaui-group', () => {
  it('AmauiGroup', async () => {
    const amauiGroup = new AmauiGroup('a', () => 4);

    amauiGroup.parent = new AmauiGroup('a');
    amauiGroup.file = '/a';
    amauiGroup.level = 1;
    amauiGroup.levels = 4;
    amauiGroup.index = 14;
    amauiGroup.mainIndex = 41;
    amauiGroup.latestIndex = 40;

    amauiGroup.groups = [new AmauiGroup('a')];
    amauiGroup.tos = [new AmauiTo('a', () => 4)];

    amauiGroup.preAll = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.preEveryGroup = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.preEveryTo = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.pre = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.preEveryGroupGroup = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.preTo = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.preEveryGroupTo = [new AmauiMiddleware('a', () => 4)];

    amauiGroup.postAll = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.postEveryGroup = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.postEveryTo = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.post = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.postEveryGroupGroup = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.postTo = [new AmauiMiddleware('a', () => 4)];
    amauiGroup.postEveryGroupTo = [new AmauiMiddleware('a', () => 4)];

    amauiGroup.summary = {
      amount: {
        tos: 15,
        groups: 4,
      },
      tos: {
        success: 14,
        fail: 1,
      },
    };

    amauiGroup.response = {
      for: amauiGroup,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    };

    const values_ = [];

    values_.push(
      amauiGroup.parent instanceof AmauiGroup,
      amauiGroup.response.for === amauiGroup,
      AmauiUtils.is('function', amauiGroup.method),

      amauiGroup.groups[0] instanceof AmauiGroup,
      amauiGroup.tos[0] instanceof AmauiTo,

      amauiGroup.preAll[0] instanceof AmauiMiddleware,
      amauiGroup.preEveryGroup[0] instanceof AmauiMiddleware,
      amauiGroup.preEveryTo[0] instanceof AmauiMiddleware,
      amauiGroup.pre[0] instanceof AmauiMiddleware,
      amauiGroup.preEveryGroupGroup[0] instanceof AmauiMiddleware,
      amauiGroup.preTo[0] instanceof AmauiMiddleware,
      amauiGroup.preEveryGroupTo[0] instanceof AmauiMiddleware,

      amauiGroup.postAll[0] instanceof AmauiMiddleware,
      amauiGroup.postEveryGroup[0] instanceof AmauiMiddleware,
      amauiGroup.postEveryTo[0] instanceof AmauiMiddleware,
      amauiGroup.post[0] instanceof AmauiMiddleware,
      amauiGroup.postEveryGroupGroup[0] instanceof AmauiMiddleware,
      amauiGroup.postTo[0] instanceof AmauiMiddleware,
      amauiGroup.postEveryGroupTo[0] instanceof AmauiMiddleware,
    );

    delete amauiGroup.parent;
    delete amauiGroup.method;
    delete amauiGroup.response.for;

    delete amauiGroup.groups;
    delete amauiGroup.tos;

    delete amauiGroup.preAll;
    delete amauiGroup.preEveryGroup;
    delete amauiGroup.preEveryTo;
    delete amauiGroup.pre;
    delete amauiGroup.preEveryGroupGroup;
    delete amauiGroup.preTo;
    delete amauiGroup.preEveryGroupTo;

    delete amauiGroup.postAll;
    delete amauiGroup.postEveryGroup;
    delete amauiGroup.postEveryTo;
    delete amauiGroup.post;
    delete amauiGroup.postEveryGroupGroup;
    delete amauiGroup.postTo;
    delete amauiGroup.postEveryGroupTo;

    values_.push(amauiGroup);

    const valueBrowsers = await evaluate((window: any) => {
      const amauiGroup = new window.AmauiTest.AmauiGroup('a', () => 4);

      amauiGroup.parent = new window.AmauiTest.AmauiGroup('a');
      amauiGroup.file = '/a';
      amauiGroup.level = 1;
      amauiGroup.levels = 4;
      amauiGroup.index = 14;
      amauiGroup.mainIndex = 41;
      amauiGroup.latestIndex = 40;

      amauiGroup.groups = [new window.AmauiTest.AmauiGroup('a')];
      amauiGroup.tos = [new window.AmauiTest.AmauiTo('a', () => 4)];

      amauiGroup.preAll = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.preEveryGroup = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.preEveryTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.pre = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.preEveryGroupGroup = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.preTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.preEveryGroupTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];

      amauiGroup.postAll = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.postEveryGroup = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.postEveryTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.post = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.postEveryGroupGroup = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.postTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];
      amauiGroup.postEveryGroupTo = [new window.AmauiTest.AmauiMiddleware('a', () => 4)];

      amauiGroup.summary = {
        amount: {
          tos: 15,
          groups: 4,
        },
        tos: {
          success: 14,
          fail: 1,
        },
      };

      amauiGroup.response = {
        for: amauiGroup,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      };

      const values_ = [];

      values_.push(
        amauiGroup.parent instanceof window.AmauiTest.AmauiGroup,
        amauiGroup.response.for === amauiGroup,
        AmauiUtils.is('function', amauiGroup.method),

        amauiGroup.groups[0] instanceof window.AmauiTest.AmauiGroup,
        amauiGroup.tos[0] instanceof window.AmauiTest.AmauiTo,

        amauiGroup.preAll[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.preEveryGroup[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.preEveryTo[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.pre[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.preEveryGroupGroup[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.preTo[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.preEveryGroupTo[0] instanceof window.AmauiTest.AmauiMiddleware,

        amauiGroup.postAll[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.postEveryGroup[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.postEveryTo[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.post[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.postEveryGroupGroup[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.postTo[0] instanceof window.AmauiTest.AmauiMiddleware,
        amauiGroup.postEveryGroupTo[0] instanceof window.AmauiTest.AmauiMiddleware,
      );

      delete amauiGroup.parent;
      delete amauiGroup.method;
      delete amauiGroup.response.for;

      delete amauiGroup.groups;
      delete amauiGroup.tos;

      delete amauiGroup.preAll;
      delete amauiGroup.preEveryGroup;
      delete amauiGroup.preEveryTo;
      delete amauiGroup.pre;
      delete amauiGroup.preEveryGroupGroup;
      delete amauiGroup.preTo;
      delete amauiGroup.preEveryGroupTo;

      delete amauiGroup.postAll;
      delete amauiGroup.postEveryGroup;
      delete amauiGroup.postEveryTo;
      delete amauiGroup.post;
      delete amauiGroup.postEveryGroupGroup;
      delete amauiGroup.postTo;
      delete amauiGroup.postEveryGroupTo;

      values_.push(amauiGroup);

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(19).fill(true),
      {
        name: 'a',
        file: '/a',
        level: 1,
        levels: 4,
        index: 14,
        mainIndex: 41,
        latestIndex: 40,
        summary: {
          amount: {
            tos: 15,
            groups: 4
          },
          tos: {
            success: 14,
            fail: 1
          }
        },
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
