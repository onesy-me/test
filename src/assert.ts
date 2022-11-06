import is, { IOptions as IIsOptions } from '@amaui/utils/is';
import isValid from '@amaui/utils/isValid';
import merge from '@amaui/utils/merge';
import getObjectValue from '@amaui/utils/getObjectValue';
import hasObjectProperty from '@amaui/utils/hasObjectProperty';
import equalDeep from '@amaui/utils/equalDeep';
import isState from '@amaui/utils/isState';
import isEnvironment from '@amaui/utils/isEnvironment';
import isExists from '@amaui/utils/isExists';
import isOS from '@amaui/utils/isOS';
import isBrowser from '@amaui/utils/isBrowser';
import isResponsive from '@amaui/utils/isResponsive';
import { TMethod } from '@amaui/models';
import { AssertError } from '@amaui/errors';

export type TAssertOperator = 'a' | 'valid' | 'empty' | 'equal' | 'equal-deep' | 'include' | 'lt' | 'less-than' | 'lte' | 'less-than-equal' | 'gt' | 'greater-than' | 'gte' | 'greater-than-equal' | 'property' | 'properties' | 'truthy' | 'falsy' | 'true' | 'false' | 'undefined' | 'null' | 'NaN' | 'throw' | 'throw-async' | 'exist';

export interface IAssertOptions extends IIsOptions {
  message: string;

  not: boolean;
  own: boolean;

  any: boolean;
  one: boolean;
  all: boolean;

  noError: boolean;
}

const optionsDefault: IAssertOptions = {} as any;

const aliases = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have', 'with', 'at', 'of', 'same', 'but', 'does', 'still', 'also'];

export type TAliases = 'to' | 'be' | 'been' | 'is' | 'that' | 'which' | 'and' | 'has' | 'have' | 'with' | 'at' | 'of' | 'same' | 'but' | 'does' | 'still' | 'also';

export type TAssertObjectAliases = {
  [p in TAliases]?: IAssertObject;
};

export interface IAssertObject extends TAssertObjectAliases {
  // Modifiers
  own: IAssertObject;
  not: IAssertObject;

  // Filters
  one: IAssertObject;
  any: IAssertObject;
  all: IAssertObject;

  // Props
  true: IAssertObject;
  false: IAssertObject;
  undefined: IAssertObject;
  null: IAssertObject;
  NaN: IAssertObject;

  empty: IAssertObject;

  exist: IAssertObject;
  truthy: IAssertObject;
  falsy: IAssertObject;

  // Methods
  va: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;
  valid: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;

  a: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;
  an: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;

  eq: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  equal: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  equals: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  eql: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  equalDeep: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  equalsDeep: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  lt: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  lessThan: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  lte: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  lessThanEqual: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  gt: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  greaterThan: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  gte: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  greaterThanEqual: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  in: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;
  include: (value: Array<any> | any, options?: IAssertOptions) => IAssertObject;

  prop: (value: string, value1?: any, options?: IAssertOptions) => IAssertObject;
  property: (value: string, value1?: any, options?: IAssertOptions) => IAssertObject;

  props: (properties: Array<Record<string, any>> | Record<string, any>, options?: IAssertOptions) => IAssertObject;
  properties: (properties: Array<Record<string, any>> | Record<string, any>, options?: IAssertOptions) => IAssertObject;

  th: (value?: any, options?: IAssertOptions) => IAssertObject;
  throw: (value?: any, options?: IAssertOptions) => IAssertObject;

  tha: (value?: any, options?: IAssertOptions) => Promise<IAssertObject>;
  throwAsync: (value?: any, options?: IAssertOptions) => Promise<IAssertObject>;
}

function onError(
  expected: any,
  actual: any,
  expression: string,
  operator: TAssertOperator,
  options: IAssertOptions
): Error | boolean {
  if (options.noError) return false;

  const error = new AssertError();

  error.operator = operator;
  error.expression = options?.message || expression;
  error.expected = expected;

  if (['true', 'false', 'undefined', 'null', 'NaN', 'empty', 'exist', 'truthy', 'falsy'].indexOf(operator) === -1) error.actual = actual;

  if (options.not) error.modifier = 'not';
  if (options.own) error.modifier = 'own';

  if (options.one) error.filter = 'one';
  if (options.any) error.filter = 'any';
  if (options.all) error.filter = 'all';

  throw error;
}

export interface IAssertError extends AssertError {
  operator: string;
  expression: string;
  expected: any;
  actual?: any;
  modifier?: 'not' | 'own';
  filter?: 'one' | 'any' | 'all';
}

export type IAssert = {
  (value?: any, options?: IAssertOptions): IAssertObject;

  a?: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;
  an?: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;

  va?: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;
  valid?: (value: Array<string> | string, options?: IAssertOptions) => IAssertObject;
};

function assert(value?: any, options_: IAssertOptions = {} as any): IAssertObject {
  let options = merge(options_, optionsDefault, { copy: true });

  const object: IAssertObject = {} as any;

  // Resolve a value
  const valueResolve = (value_: any): boolean => options.not ? !value_ : !!value_;

  // Aliases
  aliases.forEach(item => Object.defineProperty(object, item, {
    get: function () { return this; }
  }));

  // Not
  Object.defineProperty(object, 'not', {
    get: function () {
      options.not = !options.not;

      return this;
    }
  });

  // Own
  Object.defineProperty(object, 'own', {
    get: function () {
      options.own = true;

      return this;
    }
  });

  // Any
  Object.defineProperty(object, 'any', {
    get: function () {
      options.one = false;
      options.all = false;
      options.any = true;

      return this;
    }
  });

  // One
  Object.defineProperty(object, 'one', {
    get: function () {
      options.all = false;
      options.any = false;
      options.one = true;

      return this;
    }
  });

  // All
  Object.defineProperty(object, 'all', {
    get: function () {
      options.one = false;
      options.any = false;
      options.all = true;

      return this;
    }
  });

  function method_(
    value_: Array<any> | any,
    operator: TAssertOperator,
    expression: string,
    options__: IAssertOptions = {} as any,
    method: TMethod = () => false
  ): any {
    options = merge(options__, options, { copy: true });

    const withoutFilters = [options.one, options.any, options.all].filter(Boolean).length === 0;

    let valueArray: any[] = value_;

    if (
      withoutFilters ||
      !is('array', value_)
    ) valueArray = [value_];

    let response: any = valueArray.filter(item => valueResolve(method(item)));

    if (withoutFilters || options.one) response = !!(response.length === 1);
    else if (options.any) response = !!(response.length >= 1);
    else if (options.all) response = !!(response.length === valueArray.length);

    if (!response) {
      let message = '';

      if (options.not) message += `not `;

      message += expression;

      let prefix = '';

      if (['equal', 'than'].every(item => expression.indexOf(item) === -1)) prefix = ` for`;

      if (options.one) message += `${prefix} one of the values`;
      if (options.any) message += `${prefix} any of the values`;
      if (options.all) message += `${prefix} all of the values`;

      return onError(value, value_, message, operator, options) as any;
    }

    return this;
  }

  // True
  Object.defineProperty(object, 'true', {
    get: function () {
      return method_.bind(this)(
        true, 'true', 'to be true', options, () => value === true
      );
    }
  });

  // False
  Object.defineProperty(object, 'false', {
    get: function () {
      return method_.bind(this)(
        false, 'false', 'to be false', options, () => value === false
      );
    }
  });

  // Undefined
  Object.defineProperty(object, 'undefined', {
    get: function () {
      return method_.bind(this)(
        undefined, 'undefined', 'to be undefined', options, () => value === undefined
      );
    }
  });

  // Null
  Object.defineProperty(object, 'null', {
    get: function () {
      return method_.bind(this)(
        null, 'null', 'to be null', options, () => value === null
      );
    }
  });

  // NaN
  Object.defineProperty(object, 'NaN', {
    get: function () {
      return method_.bind(this)(
        NaN, 'NaN', 'to be NaN', options, () => Number.isNaN(value)
      );
    }
  });

  // Empty
  Object.defineProperty(object, 'empty', {
    get: function () {
      return method_.bind(this)(
        '', 'empty', 'to be empty', options, () => {
          if (is('string', value) || is('array', value)) return !value.length;
          if (is('object', value)) return !Object.keys(value).length;
          if (is('map', value) || is('set', value)) return !value.size;

          return false;
        }
      );
    }
  });

  // Exist
  Object.defineProperty(object, 'exist', {
    get: function () {
      return method_.bind(this)(
        undefined, 'exist', 'to exist', options, () => [undefined, null].indexOf(value) === -1
      );
    }
  });

  // Truthy
  Object.defineProperty(object, 'truthy', {
    get: function () {
      return method_.bind(this)(
        '', 'truthy', 'to be truthy', options, () => !!value
      );
    }
  });

  // Falsy
  Object.defineProperty(object, 'falsy', {
    get: function () {
      return method_.bind(this)(
        '', 'falsy', 'to be falsy', options, () => !value
      );
    }
  });

  // Valid
  object.va = function (value_: Array<string> | string, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'valid', 'to be a valid', options__, (item: any) => isValid(item, value, options__)
    );
  };
  // Aliases
  object.valid = object.va;

  // A, an
  const a = function (method: any = 'a') {
    return function (value_: Array<string> | string, options__: IAssertOptions = {} as any): IAssertObject {
      return method_.bind(this)(
        value_, method, `to be ${method}`, options__, (item: any) => (
          is(item, value, options__) ||
          isState(item) ||
          isEnvironment(item, value) ||
          isExists(item) ||
          isOS(item, value) ||
          isBrowser(item, value) ||
          isResponsive(item, value)
        )
      );
    };
  };
  object.a = a('a');
  // Alias
  object.an = a('an');

  // Equal
  object.eq = function (value_: Array<string> | string, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'equal', 'to equal', options__, (item: any) => item === value
    );
  };
  // Aliases
  object.equal = object.eq;
  object.equals = object.eq;

  // Equal deep
  object.eql = function (value_: Array<string> | string, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'equal-deep', 'to equal deep', options__, (item: any) => equalDeep(value, item)
    );
  };
  // Aliases
  object.equalDeep = object.eql;
  object.equalsDeep = object.eql;

  // Less than
  object.lt = function (value_: Array<any> | any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'less-than', `to be less than`, options__, (item: any) => value < item
    );
  };
  // Alias
  object.lessThan = object.lt;

  // Less than or equal
  object.lte = function (value_: Array<any> | any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'less-than-equal', `to be less than or equal`, options__, (item: any) => value <= item
    );
  };
  // Alias
  object.lessThanEqual = object.lte;

  // Greater than
  object.gt = function (value_: Array<any> | any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'greater-than', `to be greater than`, options__, (item: any) => value > item
    );
  };
  // Alias
  object.greaterThan = object.gt;

  // Greater than equal
  object.gte = function (value_: Array<any> | any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'greater-than-equal', `to be greater than or equal`, options__, (item: any) => value >= item
    );
  };
  // Alias
  object.greaterThanEqual = object.gte;

  // Include
  object.in = function (value_: Array<any> | any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'include', `to include`, options__, (item: any) => {
        if (is('string', value)) return value.indexOf(item) > -1;
        if (is('map', value) || is('set', value)) return Array.from(value.values()).some(item_ => equalDeep(item_, item));
        if (is('array', value)) return value.some(item_ => equalDeep(item_, item));
        if (is('object', value) && is('object', item)) return Object.keys(item).every(itemKey => equalDeep(value[itemKey], item[itemKey]));
      }
    );
  };
  // Alias
  object.include = object.in;

  // Property
  object.prop = function (value_: Array<string> | string, value1: any = undefined, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_,
      'property',
      `to have ${options.own ? 'own' : 'a'} property`,
      options__,
      (item: any) => {
        if (options.own) return hasObjectProperty(value, item);

        const valueValue = getObjectValue(value, item);

        return value1 !== undefined ? equalDeep(valueValue, value1) : valueValue;
      }
    );
  };
  // Aliases
  object.property = object.prop;

  object.props = function (value_: Array<Record<string, any>> | Record<string, any>, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_,
      'properties',
      `to have ${options.own ? 'own' : 'a'} properties`,
      options__,
      (item: any) => {
        if (is('array', value) && is('array', item)) return item.every(item_ => value.some(value__ => equalDeep(value__, item_)));
        if (is('object', value) && is('object', item)) return Object.keys(item).every(itemKey => equalDeep(value[itemKey], item[itemKey]));
      }
    );
  };
  // Aliases
  object.properties = object.props;

  // Throw
  object.th = function (value_?: any, options__: IAssertOptions = {} as any): IAssertObject {
    return method_.bind(this)(
      value_, 'throw', 'to throw', options__, (item: any) => {
        let value__: any;

        try {
          if (is('function', value)) value();
        }
        catch (error) {
          value__ = error;
        }

        return item !== undefined ? String(value__) === String(item) : value__ !== undefined;
      }
    );
  };
  // Aliases
  object.throw = object.th;

  // Throw async
  object.tha = async function (value_: any, options__: IAssertOptions = {} as any): Promise<IAssertObject> {
    options = merge(options__, options, { copy: true });

    const withoutFilters = [options.one, options.any, options.all].filter(Boolean).length === 0;

    let valueArray: any[] = value_;

    if (
      withoutFilters ||
      !is('array', value_)
    ) valueArray = [value_];

    let response: any = [];

    if (!valueArray.length) valueArray.push(undefined);

    for (const item of valueArray) {
      let value__: any;

      try {
        if (is('function', value)) await value();
      }
      catch (error) {
        value__ = error;
      }

      const resolved = item !== undefined ? String(value__) === String(item) : value__ !== undefined;

      if (resolved) response.push(resolved);
    }

    if (withoutFilters || options.one) response = !!(response.length === 1);
    else if (options.any) response = !!(response.length >= 1);
    else if (options.all) response = !!(response.length === valueArray.length);

    if (!response) return onError(value, value_, `${options.not ? 'not ' : ''}to async throw`, 'throw-async', options) as any;

    return this;
  };
  // Aliases
  object.throwAsync = object.tha;

  return object;
}

// Add as well static methods
assert.va = assert().va;
assert.valid = assert().va;

assert.a = assert().a;
assert.an = assert().a;

export default assert as IAssert;
