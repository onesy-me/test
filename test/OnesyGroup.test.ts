/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';

import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import { OnesyTo, OnesyMiddleware, OnesyGroup } from '../src';

describe('OnesyGroup', () => {

  it('OnesyGroup', async () => {
    const onesyGroup = new OnesyGroup('a', () => 4);

    onesyGroup.parent = new OnesyGroup('a');
    onesyGroup.file = '/a';
    onesyGroup.level = 1;
    onesyGroup.levels = 4;
    onesyGroup.index = 14;
    onesyGroup.mainIndex = 41;
    onesyGroup.latestIndex = 40;

    onesyGroup.groups = [new OnesyGroup('a')];
    onesyGroup.tos = [new OnesyTo('a', () => 4)];

    onesyGroup.preAll = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.preEveryGroup = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.preEveryTo = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.pre = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.preEveryGroupGroup = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.preTo = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.preEveryGroupTo = [new OnesyMiddleware('a', () => 4)];

    onesyGroup.postAll = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.postEveryGroup = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.postEveryTo = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.post = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.postEveryGroupGroup = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.postTo = [new OnesyMiddleware('a', () => 4)];
    onesyGroup.postEveryGroupTo = [new OnesyMiddleware('a', () => 4)];

    onesyGroup.summary = {
      amount: {
        tos: 15,
        groups: 4,
      },
      tos: {
        success: 14,
        fail: 1,
      },
    };

    onesyGroup.response = {
      for: onesyGroup,
      start: 14,
      end: 41,
      duration: 41 - 14,
      response: 4,
      type: 'error',
      index: 1,
    };

    const values_ = [];

    values_.push(
      onesyGroup.parent instanceof OnesyGroup,
      onesyGroup.response.for === onesyGroup,
      OnesyUtils.is('function', onesyGroup.method),

      onesyGroup.groups[0] instanceof OnesyGroup,
      onesyGroup.tos[0] instanceof OnesyTo,

      onesyGroup.preAll[0] instanceof OnesyMiddleware,
      onesyGroup.preEveryGroup[0] instanceof OnesyMiddleware,
      onesyGroup.preEveryTo[0] instanceof OnesyMiddleware,
      onesyGroup.pre[0] instanceof OnesyMiddleware,
      onesyGroup.preEveryGroupGroup[0] instanceof OnesyMiddleware,
      onesyGroup.preTo[0] instanceof OnesyMiddleware,
      onesyGroup.preEveryGroupTo[0] instanceof OnesyMiddleware,

      onesyGroup.postAll[0] instanceof OnesyMiddleware,
      onesyGroup.postEveryGroup[0] instanceof OnesyMiddleware,
      onesyGroup.postEveryTo[0] instanceof OnesyMiddleware,
      onesyGroup.post[0] instanceof OnesyMiddleware,
      onesyGroup.postEveryGroupGroup[0] instanceof OnesyMiddleware,
      onesyGroup.postTo[0] instanceof OnesyMiddleware,
      onesyGroup.postEveryGroupTo[0] instanceof OnesyMiddleware,
    );

    delete onesyGroup.parent;
    delete onesyGroup.method;
    delete onesyGroup.response.for;

    delete onesyGroup.groups;
    delete onesyGroup.tos;

    delete onesyGroup.preAll;
    delete onesyGroup.preEveryGroup;
    delete onesyGroup.preEveryTo;
    delete onesyGroup.pre;
    delete onesyGroup.preEveryGroupGroup;
    delete onesyGroup.preTo;
    delete onesyGroup.preEveryGroupTo;

    delete onesyGroup.postAll;
    delete onesyGroup.postEveryGroup;
    delete onesyGroup.postEveryTo;
    delete onesyGroup.post;
    delete onesyGroup.postEveryGroupGroup;
    delete onesyGroup.postTo;
    delete onesyGroup.postEveryGroupTo;

    values_.push(onesyGroup);

    const valueBrowsers = await evaluate((window: any) => {
      const onesyGroup = new window.OnesyTest.OnesyGroup('a', () => 4);

      onesyGroup.parent = new window.OnesyTest.OnesyGroup('a');
      onesyGroup.file = '/a';
      onesyGroup.level = 1;
      onesyGroup.levels = 4;
      onesyGroup.index = 14;
      onesyGroup.mainIndex = 41;
      onesyGroup.latestIndex = 40;

      onesyGroup.groups = [new window.OnesyTest.OnesyGroup('a')];
      onesyGroup.tos = [new window.OnesyTest.OnesyTo('a', () => 4)];

      onesyGroup.preAll = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.preEveryGroup = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.preEveryTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.pre = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.preEveryGroupGroup = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.preTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.preEveryGroupTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];

      onesyGroup.postAll = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.postEveryGroup = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.postEveryTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.post = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.postEveryGroupGroup = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.postTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];
      onesyGroup.postEveryGroupTo = [new window.OnesyTest.OnesyMiddleware('a', () => 4)];

      onesyGroup.summary = {
        amount: {
          tos: 15,
          groups: 4,
        },
        tos: {
          success: 14,
          fail: 1,
        },
      };

      onesyGroup.response = {
        for: onesyGroup,
        start: 14,
        end: 41,
        duration: 41 - 14,
        response: 4,
        type: 'error',
        index: 1,
      };

      const values_ = [];

      values_.push(
        onesyGroup.parent instanceof window.OnesyTest.OnesyGroup,
        onesyGroup.response.for === onesyGroup,
        OnesyUtils.is('function', onesyGroup.method),

        onesyGroup.groups[0] instanceof window.OnesyTest.OnesyGroup,
        onesyGroup.tos[0] instanceof window.OnesyTest.OnesyTo,

        onesyGroup.preAll[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.preEveryGroup[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.preEveryTo[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.pre[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.preEveryGroupGroup[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.preTo[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.preEveryGroupTo[0] instanceof window.OnesyTest.OnesyMiddleware,

        onesyGroup.postAll[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.postEveryGroup[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.postEveryTo[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.post[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.postEveryGroupGroup[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.postTo[0] instanceof window.OnesyTest.OnesyMiddleware,
        onesyGroup.postEveryGroupTo[0] instanceof window.OnesyTest.OnesyMiddleware,
      );

      delete onesyGroup.parent;
      delete onesyGroup.method;
      delete onesyGroup.response.for;

      delete onesyGroup.groups;
      delete onesyGroup.tos;

      delete onesyGroup.preAll;
      delete onesyGroup.preEveryGroup;
      delete onesyGroup.preEveryTo;
      delete onesyGroup.pre;
      delete onesyGroup.preEveryGroupGroup;
      delete onesyGroup.preTo;
      delete onesyGroup.preEveryGroupTo;

      delete onesyGroup.postAll;
      delete onesyGroup.postEveryGroup;
      delete onesyGroup.postEveryTo;
      delete onesyGroup.post;
      delete onesyGroup.postEveryGroupGroup;
      delete onesyGroup.postTo;
      delete onesyGroup.postEveryGroupTo;

      values_.push(onesyGroup);

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
