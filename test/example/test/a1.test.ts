/* tslint:disable: no-shadowed-variable */
import { assert } from '../../../src';

group('@onesy/a1', () => {

  to('a1', () => {
    assert('a').eq(4);
  });

});
