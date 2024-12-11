/* tslint:disable: no-shadowed-variable */
import { expect } from 'chai';
import React from 'react';

import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import { assert } from '../src';

describe('@onesy/test/assert', () => {

  it('aliases', async () => {
    const assertMethod = assert('a');

    const aliases = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have', 'with', 'at', 'of', 'same', 'but', 'does', 'still', 'also'];

    let value = assertMethod;

    for (const alias of aliases) value = value[alias];

    const values_ = [
      value === assertMethod,
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const assertMethod = window.OnesyTest.assert('a');

      const aliases = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have', 'with', 'at', 'of', 'same', 'but', 'does', 'still', 'also'];

      let value = assertMethod;

      for (const alias of aliases) value = value[alias];

      const values_ = [
        value === assertMethod,
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([true]));
  });

  it('AssertError', async () => {
    function a() { }

    const values_ = [];
    const valueArgs: any = [
      [{ a: 4 }, ['own', 'prop'], ['ab']],
      ['a', ['not', 'eq'], ['a']],

      ['a', ['one', 'eq'], [[4, 1]]],
      ['a', ['any', 'eq'], [[4, 1]]],
      ['a', ['all', 'eq'], [[4, 1]]],

      ['a', ['any', 'not', 'eq'], [['a']]],
      [{ a: 4 }, ['any', 'own', 'prop'], [['ab']]],
      [{ a: 4 }, ['any', 'not', 'own', 'prop'], [['a']]],

      ['a', ['true'], []],
      ['a', ['false'], []],
      ['a', ['undefined'], []],
      ['a', ['null'], []],
      ['a', ['NaN'], []],
      ['a', ['empty'], []],
      [undefined, ['exist'], []],
      [0, ['truthy'], []],
      ['a', ['falsy'], []],

      ['a', ['va'], ['email']],
      ['a', ['a'], ['array']],
      ['a', ['eq'], [4]],
      ['a', ['eql'], [4]],
      ['a', ['lt'], [4]],
      ['a', ['lte'], [4]],
      ['a', ['gt'], [4]],
      ['a', ['gte'], [4]],
      ['a', ['in'], [4]],
      [{ a: 'a' }, ['prop'], ['a', 4]],
      [{ a: 4 }, ['props'], [{ a: 'a' }]],
      [a, ['th'], [4]],
      [a, ['tha'], [4]]
    ];

    for (const item of valueArgs) {
      const args = item[2];
      let resolve: any;

      try {
        let assert_ = assert(item[0]);

        for (const [index, item__] of item[1].entries()) {
          assert_ = assert_[item__];

          if (index === item[1].length - 1 && args.length) await (assert_ as any)(...args);
        }
      }
      catch (error) {
        resolve = error;
      }

      delete (resolve as any).added_at;
      delete (resolve as any).stack;

      resolve = { ...resolve };

      resolve.expected = typeof resolve.expected === 'function' ? resolve.expected.toString() : resolve.expected;

      values_.push(resolve);
    }

    const valueBrowsers = await evaluate(async (window: any) => {
      function a() { }

      const values_ = [];
      const valueArgs: any = [
        [{ a: 4 }, ['own', 'prop'], ['ab']],
        ['a', ['not', 'eq'], ['a']],

        ['a', ['one', 'eq'], [[4, 1]]],
        ['a', ['any', 'eq'], [[4, 1]]],
        ['a', ['all', 'eq'], [[4, 1]]],

        ['a', ['any', 'not', 'eq'], [['a']]],
        [{ a: 4 }, ['any', 'own', 'prop'], [['ab']]],
        [{ a: 4 }, ['any', 'not', 'own', 'prop'], [['a']]],

        ['a', ['true'], []],
        ['a', ['false'], []],
        ['a', ['undefined'], []],
        ['a', ['null'], []],
        ['a', ['NaN'], []],
        ['a', ['empty'], []],
        [undefined, ['exist'], []],
        [0, ['truthy'], []],
        ['a', ['falsy'], []],

        ['a', ['va'], ['email']],
        ['a', ['a'], ['array']],
        ['a', ['eq'], [4]],
        ['a', ['eql'], [4]],
        ['a', ['lt'], [4]],
        ['a', ['lte'], [4]],
        ['a', ['gt'], [4]],
        ['a', ['gte'], [4]],
        ['a', ['in'], [4]],
        [{ a: 'a' }, ['prop'], ['a', 4]],
        [{ a: 4 }, ['props'], [{ a: 'a' }]],
        [a, ['th'], [4]],
        [a, ['tha'], [4]]
      ];

      for (const item of valueArgs) {
        const args = item[2];
        let resolve: any;

        try {
          let assert_ = window.OnesyTest.assert(item[0]);

          for (const [index, item__] of item[1].entries()) {
            assert_ = assert_[item__];

            if (index === item[1].length - 1 && args.length) await (assert_ as any)(...args);
          }
        }
        catch (error) {
          resolve = error;
        }

        delete (resolve as any).added_at;
        delete (resolve as any).stack;

        resolve = { ...resolve };

        resolve.expected = typeof resolve.expected === 'function' ? resolve.expected.toString() : resolve.expected;

        values_.push(resolve);
      }

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    const assertOutput = [
      {
        "name": "AssertError",
        "operator": "property",
        "expression": "to have own property",
        "expected": {
          "a": 4
        },
        "actual": "ab",
        "modifier": "own"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "not to equal",
        "expected": "a",
        "actual": "a",
        "modifier": "not"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "to equal one of the values",
        "expected": "a",
        "actual": [
          4,
          1
        ],
        "filter": "one"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "to equal any of the values",
        "expected": "a",
        "actual": [
          4,
          1
        ],
        "filter": "any"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "to equal all of the values",
        "expected": "a",
        "actual": [
          4,
          1
        ],
        "filter": "all"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "not to equal any of the values",
        "expected": "a",
        "actual": [
          "a"
        ],
        "modifier": "not",
        "filter": "any"
      },
      {
        "name": "AssertError",
        "operator": "property",
        "expression": "to have own property for any of the values",
        "expected": {
          "a": 4
        },
        "actual": [
          "ab"
        ],
        "modifier": "own",
        "filter": "any"
      },
      {
        "name": "AssertError",
        "operator": "property",
        "expression": "not to have own property for any of the values",
        "expected": {
          "a": 4
        },
        "actual": [
          "a"
        ],
        "modifier": "own",
        "filter": "any"
      },
      {
        "name": "AssertError",
        "operator": "true",
        "expression": "to be true",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "false",
        "expression": "to be false",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "undefined",
        "expression": "to be undefined",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "null",
        "expression": "to be null",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "NaN",
        "expression": "to be NaN",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "empty",
        "expression": "to be empty",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "exist",
        "expression": "to exist"
      },
      {
        "name": "AssertError",
        "operator": "truthy",
        "expression": "to be truthy",
        "expected": 0
      },
      {
        "name": "AssertError",
        "operator": "falsy",
        "expression": "to be falsy",
        "expected": "a"
      },
      {
        "name": "AssertError",
        "operator": "valid",
        "expression": "to be a valid",
        "expected": "a",
        "actual": "email"
      },
      {
        "name": "AssertError",
        "operator": "a",
        "expression": "to be a",
        "expected": "a",
        "actual": "array"
      },
      {
        "name": "AssertError",
        "operator": "equal",
        "expression": "to equal",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "equal-deep",
        "expression": "to equal deep",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "less-than",
        "expression": "to be less than",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "less-than-equal",
        "expression": "to be less than or equal",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "greater-than",
        "expression": "to be greater than",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "greater-than-equal",
        "expression": "to be greater than or equal",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "include",
        "expression": "to include",
        "expected": "a",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "property",
        "expression": "to have a property",
        "expected": {
          "a": "a"
        },
        "actual": "a"
      },
      {
        "name": "AssertError",
        "operator": "properties",
        "expression": "to have a properties",
        "expected": {
          "a": 4
        },
        "actual": {
          "a": "a"
        }
      },
      {
        "name": "AssertError",
        "operator": "throw",
        "expression": "to throw",
        "expected": "function a() { }",
        "actual": 4
      },
      {
        "name": "AssertError",
        "operator": "throw-async",
        "expression": "to async throw",
        "expected": "function a() { }",
        "actual": 4
      }
    ];

    values.forEach(value => assert(value).eql(assertOutput));
  });

  it('Multi asserts in a same assert', async () => {
    function a() { this.a = 4; }

    a.prototype.aa = { a: 'a' };

    const values_ = [
      !!assert(4).a('number').lt(14).gte(4),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(4).a('number').lt(14).gte(4),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([true]));
  });

  describe('options', () => {

    describe('overrides', () => {

      it('assert', async () => {
        const values_ = [
          !!assert('a', { not: true }).eq(4),
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const values_ = [
            !!window.OnesyTest.assert('a', { not: true }).eq(4),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql([true]));
      });

      it('modifier', async () => {
        const values_ = [
          !!assert('a').not.eq(4),
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const values_ = [
            !!window.OnesyTest.assert('a').not.eq(4),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql([true]));
      });

      it('method', async () => {
        const values_ = [
          !!assert('a').eq(4, { not: true }),
        ];

        const valueBrowsers = await evaluate(async (window: any) => {
          const values_ = [
            !!window.OnesyTest.assert('a').eq(4, { not: true }),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql([true]));
      });

      it('all of em', async () => {
        const valueBrowsers = await evaluate(async (window: any) => {
          const values_ = [
            !!window.OnesyTest.assert('a', { not: true }).not.eq('a'),
            !!window.OnesyTest.assert('a', { not: true }).not.eq(4, { not: true }),
          ];

          return values_;
        });

        const values_ = [
          !!assert('a', { not: true }).not.eq('a'),
          !!assert('a', { not: true }).not.eq(4, { not: true }),
        ];

        const valueNode = values_;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eql([
          true,
          true,
        ]));
      });

    });

    it('message', async () => {
      const values_ = [];

      try {
        assert('a', { message: 'a' }).eq(4);
      }
      catch (error) {
        delete error.added_at;
        delete error.stack;

        values_.push({ ...error });
      }

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [];

        try {
          window.OnesyTest.assert('a', { message: 'a' }).eq(4);
        }
        catch (error) {
          delete error.added_at;
          delete error.stack;

          values_.push({ ...error });
        }

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([
        {
          name: 'AssertError',
          operator: 'equal',
          expression: 'a',
          actual: 4,
          expected: 'a'
        }
      ]));
    });

    it('not', async () => {
      const values_ = [
        !!assert('a', { not: true }).eq(4),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a', { not: true }).eq(4),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('own', async () => {
      function a() { this.a = 4; }

      a.prototype.aa = { a: 'a' };

      const values_ = [
        !!assert(new a(), { own: true }).property('a'),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        function a() { this.a = 4; }

        a.prototype.aa = { a: 'a' };

        const values_ = [
          !!window.OnesyTest.assert(new a(), { own: true }).property('a'),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('any', async () => {
      const values_ = [
        !!assert('a', { any: true }).eq(['a', 4, 'a']),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a', { any: true }).eq(['a', 4, 'a']),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('one', async () => {
      const values_ = [
        !!assert('a', { one: true }).eq(['a', 4]),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a', { one: true }).eq(['a', 4]),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('all', async () => {
      const values_ = [
        !!assert('a', { all: true }).eq(['a', 'a']),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a', { all: true }).eq(['a', 'a']),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('noError', async () => {
      const values_ = [
        assert('a', { noError: true }).eq(4),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          window.OnesyTest.assert('a', { noError: true }).eq(4),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([false]));
    });

  });

  describe('modifiers', () => {

    it('not', async () => {
      const values_ = [
        !!assert('a').not.eq(4),

        assert('a', { noError: true }).not.eq('a'),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a').not.eq(4),

          window.OnesyTest.assert('a', { noError: true }).not.eq('a'),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('own', async () => {
      function a() { this.a = 4; }

      a.prototype.aa = { a: 'a' };

      const values_ = [
        !!assert(new a()).own.property('a'),

        assert(new a(), { noError: true }).own.property('aa.a'),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        function a() { this.a = 4; }

        a.prototype.aa = { a: 'a' };

        const values_ = [
          !!window.OnesyTest.assert(new a()).own.property('a'),

          window.OnesyTest.assert(new a(), { noError: true }).own.property('aa.a'),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

  });

  describe('filters', () => {

    it('any', async () => {
      const values_ = [
        !!assert('a').any.eq(['a', 4, 'a']),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a').any.eq(['a', 4, 'a']),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('one', async () => {
      const values_ = [
        !!assert('a').one.eq(['a', 4]),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a').one.eq(['a', 4]),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

    it('all', async () => {
      const values_ = [
        !!assert('a').all.eq(['a', 'a']),
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a').all.eq(['a', 'a']),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true]));
    });

  });

  describe('props', () => {

    it('true', async () => {
      const values_ = [
        !!assert(true).true,

        assert(4, { noError: true }).true,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert(true).true,

          window.OnesyTest.assert(4, { noError: true }).true,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('false', async () => {
      const values_ = [
        !!assert(false).false,

        assert(4, { noError: true }).false,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert(false).false,

          window.OnesyTest.assert(4, { noError: true }).false,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('undefined', async () => {
      const values_ = [
        !!assert(undefined).undefined,

        assert(4, { noError: true }).undefined,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert(undefined).undefined,

          window.OnesyTest.assert(4, { noError: true }).undefined,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('null', async () => {
      const values_ = [
        !!assert(null).null,

        assert(4, { noError: true }).null,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert(null).null,

          window.OnesyTest.assert(4, { noError: true }).null,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('NaN', async () => {
      const values_ = [
        !!assert(NaN).NaN,

        assert(4, { noError: true }).NaN,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert(NaN).NaN,

          window.OnesyTest.assert(4, { noError: true }).NaN,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([true, false]));
    });

    it('empty', async () => {
      const values_ = [
        !!assert('').empty,
        !!assert([]).empty,
        !!assert(new Map()).empty,
        !!assert(new Set()).empty,

        assert('4', { noError: true }).empty,
        assert([4], { noError: true }).empty,
        assert(new Map([[4, 4]]), { noError: true }).empty,
        assert(new Set([4]), { noError: true }).empty,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('').empty,
          !!window.OnesyTest.assert([]).empty,
          !!window.OnesyTest.assert(new Map()).empty,
          !!window.OnesyTest.assert(new Set()).empty,

          window.OnesyTest.assert('4', { noError: true }).empty,
          window.OnesyTest.assert([4], { noError: true }).empty,
          window.OnesyTest.assert(new Map([[4, 4]]), { noError: true }).empty,
          window.OnesyTest.assert(new Set([4]), { noError: true }).empty,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([
        ...new Array(4).fill(true),
        ...new Array(4).fill(false),
      ]));
    });

    it('exist', async () => {
      const values_ = [
        !!assert('').exist,
        !!assert([]).exist,
        !!assert(0).exist,
        !!assert(new Map()).exist,

        assert(undefined, { noError: true }).exist,
        assert(null, { noError: true }).exist,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('').exist,
          !!window.OnesyTest.assert([]).exist,
          !!window.OnesyTest.assert(0).exist,
          !!window.OnesyTest.assert(new Map()).exist,

          window.OnesyTest.assert(undefined, { noError: true }).exist,
          window.OnesyTest.assert(null, { noError: true }).exist,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([
        ...new Array(4).fill(true),
        ...new Array(2).fill(false),
      ]));
    });

    it('truthy', async () => {
      const values_ = [
        !!assert('a').truthy,
        !!assert(4).truthy,
        !!assert([]).truthy,
        !!assert(new Map()).truthy,

        assert('', { noError: true }).truthy,
        assert(0, { noError: true }).truthy,
        assert(undefined, { noError: true }).truthy,
        assert(null, { noError: true }).truthy,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('a').truthy,
          !!window.OnesyTest.assert(4).truthy,
          !!window.OnesyTest.assert([]).truthy,
          !!window.OnesyTest.assert(new Map()).truthy,

          window.OnesyTest.assert('', { noError: true }).truthy,
          window.OnesyTest.assert(0, { noError: true }).truthy,
          window.OnesyTest.assert(undefined, { noError: true }).truthy,
          window.OnesyTest.assert(null, { noError: true }).truthy,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([
        ...new Array(4).fill(true),
        ...new Array(4).fill(false),
      ]));
    });

    it('falsy', async () => {
      const values_ = [
        !!assert('').falsy,
        !!assert(0).falsy,
        !!assert(undefined).falsy,
        !!assert(null).falsy,

        assert('a', { noError: true }).falsy,
        assert(4, { noError: true }).falsy,
        assert([], { noError: true }).falsy,
        assert(new Map(), { noError: true }).falsy,
      ];

      const valueBrowsers = await evaluate(async (window: any) => {
        const values_ = [
          !!window.OnesyTest.assert('').falsy,
          !!window.OnesyTest.assert(0).falsy,
          !!window.OnesyTest.assert(undefined).falsy,
          !!window.OnesyTest.assert(null).falsy,

          window.OnesyTest.assert('a', { noError: true }).falsy,
          window.OnesyTest.assert(4, { noError: true }).falsy,
          window.OnesyTest.assert([], { noError: true }).falsy,
          window.OnesyTest.assert(new Map(), { noError: true }).falsy,
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql([
        ...new Array(4).fill(true),
        ...new Array(4).fill(false),
      ]));
    });

  });

  it('valid', async () => {
    const valueNode = [
      !!assert(new Date()).va('date'),
      !!assert(new Date()).valid('date'),
      !!assert(OnesyUtils.getID()).va('uuid'),
      !!assert('110101').va('binary-string'),
      !!assert('abcdef').va('hexadecimal-string'),
      !!assert('https://a.com/a').va('url'),
      !!assert('/a').va('url-path'),
      !!assert().va('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
      !!assert().valid('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
      !!assert.va('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
      !!assert.valid('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
      !!assert('1.4.1-a').va('semver'),
      !!assert.va('semver-compare', { valueA: '1.4.3', valueB: '1.4.4', operator: 'less-than' }),
      !!assert(1638223021).va('timestamp'),
      !!assert('+381611234123').va('mobile'),
      !!assert('a@a.com').va('email'),
      !!assert('0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad').va('hash'),
      !!assert('rgb(1, 144, 144)').va('color-rgb'),
      !!assert('#ff44ff').va('color-hex'),
      !!assert('hsl(1, 40%, 40%)').va('color-hsl'),
      !!assert('{"a":4,"c":4}').va('json'),
      !!assert(4).va('min', { min: 1 }),
      !!assert(4).va('max', { max: 14 }),
      !!assert(4).va('max', { min: 1, max: 14 }),
      !assert(4, { noError: true }).va('same-origin'),
      !!assert({ __esModule: true, default: () => 4, }).va('js-chunk'),
      !!assert('get').va('http-method'),
      !!assert('aGVsbG8sIFdvcmxkIQ==').va('base64'),
      !!assert('data:,A%20brief%20note').va('datauri'),

      assert(4, { noError: true }).va('date'),
      assert(4, { noError: true }).valid('date'),
      assert(4, { noError: true }).va('uuid'),
      assert(4, { noError: true }).va('binary-string'),
      assert(4, { noError: true }).va('hexadecimal-string'),
      assert(4, { noError: true }).va('url'),
      assert(4, { noError: true }).va('url-path'),
      assert(undefined, { noError: true }).va('compare', { valueA: 14, valueB: 4, operator: 'less-than' }),
      assert(undefined, { noError: true }).valid('compare', { valueA: 14, valueB: 4, operator: 'less-than' }),
      assert.va('compare', { valueA: 14, valueB: 4, operator: 'less-than', noError: true }),
      assert.valid('compare', { valueA: 14, valueB: 4, operator: 'less-than', noError: true }),
      assert(4, { noError: true }).va('semver'),
      assert.va('semver-compare', { valueA: '1.4.3', valueB: '1.4.4', operator: 'greater-than', noError: true }),
      assert(4, { noError: true }).va('timestamp'),
      assert(4, { noError: true }).va('mobile'),
      assert(4, { noError: true }).va('email'),
      assert(4, { noError: true }).va('hash'),
      assert(4, { noError: true }).va('color-rgb'),
      assert(4, { noError: true }).va('color-hex'),
      assert(4, { noError: true }).va('color-hsl'),
      assert(4, { noError: true }).va('json'),
      assert(4, { noError: true }).va('min', { min: 14 }),
      assert(4, { noError: true }).va('max', { max: 1 }),
      assert(140, { noError: true }).va('max', { min: 1, max: 14 }),
      assert(4, { noError: true }).va('same-origin'),
      assert(4, { noError: true }).va('js-chunk'),
      assert(4, { noError: true }).va('http-method'),
      assert(4, { noError: true }).va('base64'),
      assert(4, { noError: true }).va('datauri'),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(new Date()).va('date'),
        !!window.OnesyTest.assert(new Date()).valid('date'),
        !!window.OnesyTest.assert(window.OnesyUtils.getID()).va('uuid'),
        !!window.OnesyTest.assert('110101').va('binary-string'),
        !!window.OnesyTest.assert('abcdef').va('hexadecimal-string'),
        !!window.OnesyTest.assert('https://a.com/a').va('url'),
        !!window.OnesyTest.assert('/a').va('url-path'),
        !!window.OnesyTest.assert().va('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
        !!window.OnesyTest.assert().valid('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
        !!window.OnesyTest.assert.va('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
        !!window.OnesyTest.assert.valid('compare', { valueA: 14, valueB: 4, operator: 'greater-than-equal' }),
        !!window.OnesyTest.assert('1.4.1-a').va('semver'),
        !!window.OnesyTest.assert.va('semver-compare', { valueA: '1.4.3', valueB: '1.4.4', operator: 'less-than' }),
        !!window.OnesyTest.assert(1638223021).va('timestamp'),
        !!window.OnesyTest.assert('+381611234123').va('mobile'),
        !!window.OnesyTest.assert('a@a.com').va('email'),
        !!window.OnesyTest.assert('0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad').va('hash'),
        !!window.OnesyTest.assert('rgb(1, 144, 144)').va('color-rgb'),
        !!window.OnesyTest.assert('#ff44ff').va('color-hex'),
        !!window.OnesyTest.assert('hsl(1, 40%, 40%)').va('color-hsl'),
        !!window.OnesyTest.assert('{"a":4,"c":4}').va('json'),
        !!window.OnesyTest.assert(4).va('min', { min: 1 }),
        !!window.OnesyTest.assert(4).va('max', { max: 14 }),
        !!window.OnesyTest.assert(4).va('max', { min: 1, max: 14 }),
        !!window.OnesyTest.assert('https://localhost:4000/a').va('same-origin'),
        !!window.OnesyTest.assert({ __esModule: true, default: () => 4, }).va('js-chunk'),
        !!window.OnesyTest.assert('get').va('http-method'),
        !!window.OnesyTest.assert('aGVsbG8sIFdvcmxkIQ==').va('base64'),
        !!window.OnesyTest.assert('data:,A%20brief%20note').va('datauri'),

        window.OnesyTest.assert(4, { noError: true }).va('date'),
        window.OnesyTest.assert(4, { noError: true }).valid('date'),
        window.OnesyTest.assert(4, { noError: true }).va('uuid'),
        window.OnesyTest.assert(4, { noError: true }).va('binary-string'),
        window.OnesyTest.assert(4, { noError: true }).va('hexadecimal-string'),
        window.OnesyTest.assert(4, { noError: true }).va('url'),
        window.OnesyTest.assert(4, { noError: true }).va('url-path'),
        window.OnesyTest.assert(undefined, { noError: true }).va('compare', { valueA: 14, valueB: 4, operator: 'less-than' }),
        window.OnesyTest.assert(undefined, { noError: true }).valid('compare', { valueA: 14, valueB: 4, operator: 'less-than' }),
        window.OnesyTest.assert.va('compare', { valueA: 14, valueB: 4, operator: 'less-than', noError: true }),
        window.OnesyTest.assert.valid('compare', { valueA: 14, valueB: 4, operator: 'less-than', noError: true }),
        window.OnesyTest.assert(4, { noError: true }).va('semver'),
        window.OnesyTest.assert.va('semver-compare', { valueA: '1.4.3', valueB: '1.4.4', operator: 'greater-than', noError: true }),
        window.OnesyTest.assert(4, { noError: true }).va('timestamp'),
        window.OnesyTest.assert(4, { noError: true }).va('mobile'),
        window.OnesyTest.assert(4, { noError: true }).va('email'),
        window.OnesyTest.assert(4, { noError: true }).va('hash'),
        window.OnesyTest.assert(4, { noError: true }).va('color-rgb'),
        window.OnesyTest.assert(4, { noError: true }).va('color-hex'),
        window.OnesyTest.assert(4, { noError: true }).va('color-hsl'),
        window.OnesyTest.assert(4, { noError: true }).va('json'),
        window.OnesyTest.assert(4, { noError: true }).va('min', { min: 14 }),
        window.OnesyTest.assert(4, { noError: true }).va('max', { max: 1 }),
        window.OnesyTest.assert(140, { noError: true }).va('max', { min: 1, max: 14 }),
        window.OnesyTest.assert(4, { noError: true }).va('same-origin'),
        window.OnesyTest.assert(4, { noError: true }).va('js-chunk'),
        window.OnesyTest.assert(4, { noError: true }).va('http-method'),
        window.OnesyTest.assert(4, { noError: true }).va('base64'),
        window.OnesyTest.assert(4, { noError: true }).va('datauri'),
      ];

      return values_;
    });
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(29).fill(true),
      ...new Array(29).fill(false),
    ]));
  });

  it('a, an', async () => {
    const a = () => { };
    class A { }
    const Aa = React.createElement('a');

    const valueNode = [
      !!assert('').a('string'),
      !!assert(4).a('number'),
      !!assert(true).a('boolean'),
      !!assert([]).an('array'),
      !!assert({}).an('object'),
      !!assert(new Map()).a('object-like'),
      !!assert(new A()).a('class'),
      !!assert(a).a('function'),
      !!assert(async function ay() { }).an('async'),
      !!assert(new Map()).a('map'),
      !!assert(new WeakMap()).a('weakmap'),
      !!assert(new Set()).a('set'),
      !!assert(new WeakSet()).a('weakset'),
      !!assert(new Promise(resolve => resolve(4))).a('promise'),
      !!assert(new Int8Array()).an('int8array'),
      !!assert(new Uint8Array()).an('uint8array'),
      !!assert(new Uint8ClampedArray()).a('uint8clampedarray'),
      !!assert(new Int16Array()).an('int16array'),
      !!assert(new Uint16Array()).an('uint16array'),
      !!assert(new Int32Array()).an('int32array'),
      !!assert(new Uint32Array()).an('uint32array'),
      !!assert(new Float32Array()).a('float32array'),
      !!assert(new Float64Array()).a('float64array'),
      !!assert(new BigInt64Array()).a('bigint64array'),
      !!assert(new BigUint64Array()).a('biguint64array'),
      !!assert(new Int8Array()).a('typedarray'),
      !!assert(new DataView(new ArrayBuffer(4))).a('dataview'),
      !!assert(new ArrayBuffer(4)).an('arraybuffer'),
      !!assert(new SharedArrayBuffer(4)).a('sharedarraybuffer'),
      !!assert(Symbol(4)).a('symbol'),
      !!assert(new Error()).an('error'),
      !!assert(new Date()).a('date'),
      !!assert(/a+/gi).a('regexp'),
      !!assert((function a() { return arguments; })()).an('arguments'),
      !!assert(null).a('null'),
      !!assert(undefined).an('undefined'),
      !!assert(Buffer.from([4, 1])).a('buffer'),
      !!assert(Aa).an('element', { variant: 'react' }),
      !!assert('a').a('simple'),
      !!assert(4).a('not-array-object'),
      !assert().an('online', { noError: true }),
      !assert.an('online', { noError: true }),
      !assert.an('offline', { noError: true }),
      !!assert.a([
        'browser',
        'worker',
        'nodejs',
        'localhost'
      ], { any: true }),
      !assert.a('crypto', { noError: true }),
      !!assert.an('Intl'),
      !assert.a([
        'mac',
        'mobile',
        'android',
        'ios',
        'windows',
        'linux'
      ], { any: true, noError: true }),
      !assert.a([
        'chrome',
        'opera',
        'firefox',
        'safari',
        'edge-chromium',
        'edge',
        'ie'
      ], { any: true, noError: true }),
      !assert.a([
        'mobile',
        'tablet',
        'laptop',
        'desktop',
        'tv'
      ], { any: true, noError: true }),

      assert(4, { noError: true }).a('string'),
      assert('4', { noError: true }).a('number'),
      assert(4, { noError: true }).a('boolean'),
      assert(4, { noError: true }).an('array'),
      assert(4, { noError: true }).an('object'),
      assert(4, { noError: true }).a('object-like'),
      assert(4, { noError: true }).a('class'),
      assert(4, { noError: true }).a('function'),
      assert(4, { noError: true }).an('async'),
      assert(4, { noError: true }).a('map'),
      assert(4, { noError: true }).a('weakmap'),
      assert(4, { noError: true }).a('set'),
      assert(4, { noError: true }).a('weakset'),
      assert(4, { noError: true }).a('promise'),
      assert(4, { noError: true }).an('int8array'),
      assert(4, { noError: true }).an('uint8array'),
      assert(4, { noError: true }).a('uint8clampedarray'),
      assert(4, { noError: true }).an('int16array'),
      assert(4, { noError: true }).an('uint16array'),
      assert(4, { noError: true }).an('int32array'),
      assert(4, { noError: true }).an('uint32array'),
      assert(4, { noError: true }).a('float32array'),
      assert(4, { noError: true }).a('float64array'),
      assert(4, { noError: true }).a('bigint64array'),
      assert(4, { noError: true }).a('biguint64array'),
      assert(4, { noError: true }).a('typedarray'),
      assert(4, { noError: true }).a('dataview'),
      assert(4, { noError: true }).an('arraybuffer'),
      assert(4, { noError: true }).a('sharedarraybuffer'),
      assert(4, { noError: true }).a('symbol'),
      assert(4, { noError: true }).an('error'),
      assert(4, { noError: true }).a('date'),
      assert(4, { noError: true }).a('regexp'),
      assert(4, { noError: true }).an('arguments'),
      assert(4, { noError: true }).a('null'),
      assert(4, { noError: true }).an('undefined'),
      assert(4, { noError: true }).a('buffer'),
      assert([], { noError: true }).an('element'),
      assert([], { noError: true }).a('simple'),
      assert([], { noError: true }).a('not-array-object'),
      assert.an('offline', { noError: true }),
      !assert.a([
        'browser',
        'worker',
        'nodejs',
        'localhost'
      ], { any: true }),
      assert.a('crypto', { noError: true }),
      !assert.an('Intl'),
      assert.a([
        'mac',
        'mobile',
        'android',
        'ios',
        'windows',
        'linux'
      ], { any: true, noError: true }),
      assert.a([
        'chrome',
        'opera',
        'firefox',
        'safari',
        'edge-chromium',
        'edge',
        'ie'
      ], { any: true, noError: true }),
      assert.a([
        'mobile',
        'tablet',
        'laptop',
        'desktop',
        'tv'
      ], { any: true, noError: true }),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const a = () => { };
      class A { }
      const Aa = window.React.createElement('a');

      const values_ = [
        !!window.OnesyTest.assert('').a('string'),
        !!window.OnesyTest.assert(4).a('number'),
        !!window.OnesyTest.assert(true).a('boolean'),
        !!window.OnesyTest.assert([]).an('array'),
        !!window.OnesyTest.assert({}).an('object'),
        !!window.OnesyTest.assert(new Map()).a('object-like'),
        !!window.OnesyTest.assert(new A()).a('class'),
        !!window.OnesyTest.assert(a).a('function'),
        !!window.OnesyTest.assert(async function ay() { }).an('async'),
        !!window.OnesyTest.assert(new Map()).a('map'),
        !!window.OnesyTest.assert(new WeakMap()).a('weakmap'),
        !!window.OnesyTest.assert(new Set()).a('set'),
        !!window.OnesyTest.assert(new WeakSet()).a('weakset'),
        !!window.OnesyTest.assert(new Promise(resolve => resolve(4))).a('promise'),
        !!window.OnesyTest.assert(new Int8Array()).an('int8array'),
        !!window.OnesyTest.assert(new Uint8Array()).an('uint8array'),
        !!window.OnesyTest.assert(new Uint8ClampedArray()).a('uint8clampedarray'),
        !!window.OnesyTest.assert(new Int16Array()).an('int16array'),
        !!window.OnesyTest.assert(new Uint16Array()).an('uint16array'),
        !!window.OnesyTest.assert(new Int32Array()).an('int32array'),
        !!window.OnesyTest.assert(new Uint32Array()).an('uint32array'),
        !!window.OnesyTest.assert(new Float32Array()).a('float32array'),
        !!window.OnesyTest.assert(new Float64Array()).a('float64array'),
        !!window.OnesyTest.assert(new BigInt64Array()).a('bigint64array'),
        !!window.OnesyTest.assert(new BigUint64Array()).a('biguint64array'),
        !!window.OnesyTest.assert(new Int8Array()).a('typedarray'),
        !!window.OnesyTest.assert(new DataView(new ArrayBuffer(4))).a('dataview'),
        !!window.OnesyTest.assert(new ArrayBuffer(4)).an('arraybuffer'),
        !!window.OnesyTest.assert(Symbol(4)).a('symbol'),
        !!window.OnesyTest.assert(new Error()).an('error'),
        !!window.OnesyTest.assert(new Date()).a('date'),
        !!window.OnesyTest.assert(/a+/gi).a('regexp'),
        !!window.OnesyTest.assert((function a() { return arguments; })()).an('arguments'),
        !!window.OnesyTest.assert(null).a('null'),
        !!window.OnesyTest.assert(undefined).an('undefined'),
        !!window.OnesyTest.assert(new Blob()).a('blob'),
        !!window.OnesyTest.assert(window.document.createElement('div')).an('element'),
        !!window.OnesyTest.assert(window.document.createElement('div')).an('element', { variant: 'html' }),
        !!window.OnesyTest.assert(window.document.createElement('div')).an('element', { variant: 'element' }),
        !!window.OnesyTest.assert(window.document.createTextNode('a')).an('element', { variant: 'node' }),
        !!window.OnesyTest.assert(Aa).an('element', { variant: 'react' }),
        !!window.OnesyTest.assert('a').a('simple'),
        !!window.OnesyTest.assert(4).a('simple'),
        !!window.OnesyTest.assert(4).a('not-array-object'),
        !!window.OnesyTest.assert().an('online'),
        !!window.OnesyTest.assert.an('online'),
        !window.OnesyTest.assert.an('offline', { noError: true }),
        !!window.OnesyTest.assert.a([
          'browser',
          'worker',
          'nodejs',
          'localhost'
        ], { any: true }),
        !!window.OnesyTest.assert.an('Intl'),
        !!window.OnesyTest.assert.a([
          'mac',
          'mobile',
          'android',
          'ios',
          'windows',
          'linux'
        ], { any: true }),
        !!window.OnesyTest.assert.a([
          'chrome',
          'opera',
          'firefox',
          'safari',
          'edge-chromium',
          'edge',
          'ie'
        ], { any: true }),
        !!window.OnesyTest.assert.a([
          'mobile',
          'tablet',
          'laptop',
          'desktop',
          'tv'
        ], { any: true }),

        window.OnesyTest.assert(4, { noError: true }).a('string'),
        window.OnesyTest.assert('4', { noError: true }).a('number'),
        window.OnesyTest.assert(4, { noError: true }).a('boolean'),
        window.OnesyTest.assert(4, { noError: true }).an('array'),
        window.OnesyTest.assert(4, { noError: true }).an('object'),
        window.OnesyTest.assert(4, { noError: true }).a('object-like'),
        window.OnesyTest.assert(4, { noError: true }).a('class'),
        window.OnesyTest.assert(4, { noError: true }).a('function'),
        window.OnesyTest.assert(4, { noError: true }).an('async'),
        window.OnesyTest.assert(4, { noError: true }).a('map'),
        window.OnesyTest.assert(4, { noError: true }).a('weakmap'),
        window.OnesyTest.assert(4, { noError: true }).a('set'),
        window.OnesyTest.assert(4, { noError: true }).a('weakset'),
        window.OnesyTest.assert(4, { noError: true }).a('promise'),
        window.OnesyTest.assert(4, { noError: true }).an('int8array'),
        window.OnesyTest.assert(4, { noError: true }).an('uint8array'),
        window.OnesyTest.assert(4, { noError: true }).a('uint8clampedarray'),
        window.OnesyTest.assert(4, { noError: true }).an('int16array'),
        window.OnesyTest.assert(4, { noError: true }).an('uint16array'),
        window.OnesyTest.assert(4, { noError: true }).an('int32array'),
        window.OnesyTest.assert(4, { noError: true }).an('uint32array'),
        window.OnesyTest.assert(4, { noError: true }).a('float32array'),
        window.OnesyTest.assert(4, { noError: true }).a('float64array'),
        window.OnesyTest.assert(4, { noError: true }).a('bigint64array'),
        window.OnesyTest.assert(4, { noError: true }).a('biguint64array'),
        window.OnesyTest.assert(4, { noError: true }).a('typedarray'),
        window.OnesyTest.assert(4, { noError: true }).a('dataview'),
        window.OnesyTest.assert(4, { noError: true }).an('arraybuffer'),
        window.OnesyTest.assert(4, { noError: true }).a('symbol'),
        window.OnesyTest.assert(4, { noError: true }).an('error'),
        window.OnesyTest.assert(4, { noError: true }).a('date'),
        window.OnesyTest.assert(4, { noError: true }).a('regexp'),
        window.OnesyTest.assert(4, { noError: true }).an('arguments'),
        window.OnesyTest.assert(4, { noError: true }).a('null'),
        window.OnesyTest.assert(4, { noError: true }).an('undefined'),
        window.OnesyTest.assert(4, { noError: true }).a('blob'),
        window.OnesyTest.assert(4, { noError: true }).an('element'),
        window.OnesyTest.assert([], { noError: true }).a('simple'),
        window.OnesyTest.assert([], { noError: true }).a('simple'),
        window.OnesyTest.assert([], { noError: true }).a('not-array-object'),
        window.OnesyTest.assert.an('offline', { noError: true }),
        !window.OnesyTest.assert.a([
          'browser',
          'worker',
          'nodejs',
          'localhost'
        ], { any: true }),
        !window.OnesyTest.assert.an('Intl'),
        !window.OnesyTest.assert.a([
          'mac',
          'mobile',
          'android',
          'ios',
          'windows',
          'linux'
        ], { any: true }),
        !window.OnesyTest.assert.a([
          'chrome',
          'opera',
          'firefox',
          'safari',
          'edge-chromium',
          'edge',
          'ie'
        ], { any: true }),
        !window.OnesyTest.assert.a([
          'mobile',
          'tablet',
          'laptop',
          'desktop',
          'tv'
        ], { any: true }),
      ];

      return values_;
    });

    // Value node
    expect(valueNode).eql([
      ...new Array(49).fill(true),
      ...new Array(47).fill(false),
    ]);

    // Values browsers
    valueBrowsers.forEach(value => expect(value).eql([
      ...new Array(52).fill(true),
      ...new Array(46).fill(false),
    ]));
  });

  it('equal', async () => {
    const values_ = [
      !!assert('a').eq('a'),
      !!assert('a').equal('a'),
      !!assert('a').equals('a'),

      assert('a', { noError: true }).eq(4),
      assert('a', { noError: true }).equal(4),
      assert('a', { noError: true }).equals(4),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert('a').eq('a'),
        !!window.OnesyTest.assert('a').equal('a'),
        !!window.OnesyTest.assert('a').equals('a'),

        window.OnesyTest.assert('a', { noError: true }).eq(4),
        window.OnesyTest.assert('a', { noError: true }).equal(4),
        window.OnesyTest.assert('a', { noError: true }).equals(4),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(3).fill(true),
      ...new Array(3).fill(false),
    ]));
  });

  it('equal deep', async () => {
    class A {
      public a = 4;
    }

    const values_ = [
      !!assert({ a: 4, aa: { a: 4 } }).eql({ a: 4, aa: { a: 4 } }),
      !!assert({ a: 4, aa: { a: 4 } }).equalDeep({ a: 4, aa: { a: 4 } }),
      !!assert({ a: 4, aa: { a: 4 } }).equalsDeep({ a: 4, aa: { a: 4 } }),
      !!assert([new A()]).equalsDeep([{ a: 4 }]),

      assert({ a: 4, aa: { a: 4 } }, { noError: true }).eql({ a: 4, aa: { a: '4' } }),
      assert({ a: 4, aa: { a: 4 } }, { noError: true }).equalDeep({ a: 4, aa: { a: '4' } }),
      assert({ a: 4, aa: { a: 4 } }, { noError: true }).equalsDeep({ a: 4, aa: { a: '4' } }),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      class A {
        public a = 4;
      }

      const values_ = [
        !!window.OnesyTest.assert({ a: 4, aa: { a: 4 } }).eql({ a: 4, aa: { a: 4 } }),
        !!window.OnesyTest.assert({ a: 4, aa: { a: 4 } }).equalDeep({ a: 4, aa: { a: 4 } }),
        !!window.OnesyTest.assert({ a: 4, aa: { a: 4 } }).equalsDeep({ a: 4, aa: { a: 4 } }),
        !!window.OnesyTest.assert([new A()]).equalsDeep([{ a: 4 }]),

        window.OnesyTest.assert({ a: 4, aa: { a: 4 } }, { noError: true }).eql({ a: 4, aa: { a: '4' } }),
        window.OnesyTest.assert({ a: 4, aa: { a: 4 } }, { noError: true }).equalDeep({ a: 4, aa: { a: '4' } }),
        window.OnesyTest.assert({ a: 4, aa: { a: 4 } }, { noError: true }).equalsDeep({ a: 4, aa: { a: '4' } }),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(4).fill(true),
      ...new Array(3).fill(false),
    ]));
  });

  it('less than', async () => {
    const values_ = [
      !!assert(4).lt(14),
      !!assert(4).lessThan(14),

      assert(4, { noError: true }).lt(1),
      assert(4, { noError: true }).lessThan(1),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(4).lt(14),
        !!window.OnesyTest.assert(4).lessThan(14),

        window.OnesyTest.assert(4, { noError: true }).lt(1),
        window.OnesyTest.assert(4, { noError: true }).lessThan(1),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

  it('less than or equal', async () => {
    const values_ = [
      !!assert(4).lte(14),
      !!assert(4).lessThanEqual(4),

      assert(4, { noError: true }).lte(1),
      assert(4, { noError: true }).lessThanEqual(1),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(4).lte(14),
        !!window.OnesyTest.assert(4).lessThanEqual(4),

        window.OnesyTest.assert(4, { noError: true }).lte(1),
        window.OnesyTest.assert(4, { noError: true }).lessThanEqual(1),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

  it('greater than', async () => {
    const values_ = [
      !!assert(14).gt(4),
      !!assert(14).greaterThan(1),

      assert(14, { noError: true }).gt(40),
      assert(14, { noError: true }).greaterThan(40),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(14).gt(4),
        !!window.OnesyTest.assert(14).greaterThan(1),

        window.OnesyTest.assert(14, { noError: true }).gt(40),
        window.OnesyTest.assert(14, { noError: true }).greaterThan(40),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

  it('greater than or equal', async () => {
    const values_ = [
      !!assert(14).gte(4),
      !!assert(14).greaterThanEqual(14),

      assert(4, { noError: true }).gte(14),
      assert(4, { noError: true }).greaterThanEqual(14),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert(14).gte(4),
        !!window.OnesyTest.assert(14).greaterThanEqual(14),

        window.OnesyTest.assert(4, { noError: true }).gt(14),
        window.OnesyTest.assert(4, { noError: true }).greaterThan(14),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

  it('include', async () => {
    const values_ = [
      !!assert('aa4').in('4'),
      !!assert('aa14').in('14'),
      !!assert(['a', { a: { a: 4 } }]).include('a'),
      !!assert(['a', { a: { a: 4 } }]).in({ a: { a: 4 } }),
      !!assert(new Map([['a', 4]])).in(4),
      !!assert(new Map([['a', { a: 4 }]])).in({ a: 4 }),
      !!assert(new Set([4])).in(4),
      !!assert(new Set([4, { a: 4 }])).in({ a: 4 }),
      !!assert({ a: { a: 4 }, ab: 4 }).in({ a: { a: 4 } }),
      !!assert({ a: { a: 4 }, ab: 4 }).in({ a: { a: 4 }, ab: 4 }),

      assert('a4', { noError: true }).in(1),
      assert(['a', 4], { noError: true }).include(1),
      assert(new Map([['a', 4]]), { noError: true }).in(1),
      assert(new Set([4]), { noError: true }).in(1),
      assert({ a: { a: 4 }, ab: 4 }, { noError: true }).in(1),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert('aa4').in('4'),
        !!window.OnesyTest.assert('aa14').in('14'),
        !!window.OnesyTest.assert(['a', { a: { a: 4 } }]).include('a'),
        !!window.OnesyTest.assert(['a', { a: { a: 4 } }]).in({ a: { a: 4 } }),
        !!window.OnesyTest.assert(new Map([['a', 4]])).in(4),
        !!window.OnesyTest.assert(new Map([['a', { a: 4 }]])).in({ a: 4 }),
        !!window.OnesyTest.assert(new Set([4])).in(4),
        !!window.OnesyTest.assert(new Set([4, { a: 4 }])).in({ a: 4 }),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).in({ a: { a: 4 } }),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).in({ a: { a: 4 }, ab: 4 }),

        window.OnesyTest.assert('aa4', { noError: true }).in(40),
        window.OnesyTest.assert(['a', 4], { noError: true }).include(1),
        window.OnesyTest.assert(new Map([['a', 4]]), { noError: true }).in(1),
        window.OnesyTest.assert(new Set([4]), { noError: true }).in(1),
        window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }, { noError: true }).in(1),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(10).fill(true),
      ...new Array(5).fill(false),
    ]));
  });

  it('property', async () => {
    const values_ = [
      !!assert({ a: { a: 4 }, ab: 4 }).prop('a.a'),
      !!assert([4, { a: 4 }]).prop('1.a'),
      !!assert([4, { a: 4 }]).prop('1', { a: 4 }),
      !!assert([4, { a: 4 }]).prop('1.a', 4),
      !!assert({ a: { a: 4 }, ab: 4 }).property('a.a', 4),
      !!assert({ a: { a: 4 }, ab: 4 }).prop('a.a', 4),
      !!assert({ a: { a: 4 }, ab: 4 }).prop('toString'),

      assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('a.ab'),
      assert([4, { a: 4 }], { noError: true }).prop('4'),
      assert([4, { a: 4 }], { noError: true }).prop('1.ab'),
      assert([4, { a: 4 }], { noError: true }).prop('1.a', 14),
      assert({ a: { a: 4 }, ab: 4 }, { noError: true }).property('a.a', 14),
      assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('ad'),
      assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('toString1'),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).prop('a.a'),
        !!window.OnesyTest.assert([4, { a: 4 }]).prop('1.a'),
        !!window.OnesyTest.assert([4, { a: 4 }]).prop('1', { a: 4 }),
        !!window.OnesyTest.assert([4, { a: 4 }]).prop('1.a', 4),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).property('a.a', 4),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).prop('a.a', 4),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }).prop('toString'),

        window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('a.ab'),
        window.OnesyTest.assert([4, { a: 4 }], { noError: true }).prop('4'),
        window.OnesyTest.assert([4, { a: 4 }], { noError: true }).prop('1.ab'),
        window.OnesyTest.assert([4, { a: 4 }], { noError: true }).prop('1.a', 14),
        window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }, { noError: true }).property('a.a', 14),
        window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('ad'),
        window.OnesyTest.assert({ a: { a: 4 }, ab: 4 }, { noError: true }).prop('toString1'),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(7).fill(true),
      ...new Array(7).fill(false),
    ]));
  });

  it('properties', async () => {
    const values_ = [
      !!assert({ a: { a: 4 }, ab: 4, ad: 4 }).props({ a: { a: 4 }, ab: 4 }),
      !!assert({ a: { a: 4 }, ab: 4, ad: 4 }).properties({ a: { a: 4 }, ad: 4 }),
      !!assert([14, { a: 4 }, true]).props([14, true]),
      !!assert([14, { a: 4 }, true]).props([14, { a: 4 }]),

      assert({ a: { a: 4 }, ab: 4, ad: 4 }, { noError: true }).props({ a: { a: 4 }, aa: 4 }),
      assert({ a: { a: 4 }, ab: 4, ad: 4 }, { noError: true }).properties({ a: { a: 14 }, ab: 4 }),
      assert([14, { a: 4 }, true], { noError: true }).props([41, true]),
      assert([14, { a: 4 }, true], { noError: true }).props([14, { a: 14 }]),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4, ad: 4 }).props({ a: { a: 4 }, ab: 4 }),
        !!window.OnesyTest.assert({ a: { a: 4 }, ab: 4, ad: 4 }).properties({ a: { a: 4 }, ad: 4 }),
        !!window.OnesyTest.assert([14, { a: 4 }, true]).props([14, true]),
        !!window.OnesyTest.assert([14, { a: 4 }, true]).props([14, { a: 4 }]),

        window.OnesyTest.assert({ a: { a: 4 }, ab: 4, ad: 4 }, { noError: true }).props({ a: { a: 4 }, aa: 4 }),
        window.OnesyTest.assert({ a: { a: 4 }, ab: 4, ad: 4 }, { noError: true }).properties({ a: { a: 14 }, ab: 4 }),
        window.OnesyTest.assert([14, { a: 4 }, true], { noError: true }).props([41, true]),
        window.OnesyTest.assert([14, { a: 4 }, true], { noError: true }).props([14, { a: 14 }]),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(4).fill(true),
      ...new Array(4).fill(false),
    ]));
  });

  it('throw', async () => {
    function a() { throw new Error(); }
    function a1() { }

    const values_ = [
      !!assert(a).th(),
      !!assert(a).throw(String(new Error())),

      assert(a1, { noError: true }).th(),
      assert(a, { noError: true }).th(4),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      function a() { throw new Error(); }
      function a1() { }

      const values_ = [
        !!window.OnesyTest.assert(a).th(),
        !!window.OnesyTest.assert(a).throw(String(new Error())),

        window.OnesyTest.assert(a1, { noError: true }).th(),
        window.OnesyTest.assert(a, { noError: true }).th(4),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

  it('throw async', async () => {
    async function a() {
      await OnesyUtils.wait(140);

      throw new Error();
    }
    async function a1() { }

    const values_ = [
      !!(await assert(a).tha()),
      !!(await assert(a).throwAsync(String(new Error()))),

      await assert(a1, { noError: true }).tha(),
      await assert(a, { noError: true }).tha(4),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      async function a() {
        await window.OnesyUtils.wait(140);

        throw new Error();
      }
      async function a1() { }

      const values_ = [
        !!(await window.OnesyTest.assert(a).tha()),
        !!(await window.OnesyTest.assert(a).throwAsync(String(new Error()))),

        await window.OnesyTest.assert(a1, { noError: true }).tha(),
        await window.OnesyTest.assert(a, { noError: true }).tha(4),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => expect(value).eql([
      ...new Array(2).fill(true),
      ...new Array(2).fill(false),
    ]));
  });

});
