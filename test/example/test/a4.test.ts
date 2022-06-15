/* tslint:disable: no-shadowed-variable */
import { wait } from '@amaui/utils';

import { assert } from '../../../src';

preAll(async () => {
  await wait(40);
});

preEveryGroup(async () => {
  await wait(40);
});

preEveryTo(async () => {
  await wait(4);
});

to('a', async () => {
  assert(4).eq(4);
});

group('@amaui/a', () => {

  pre(async () => {
    await wait(140);

    throw new Error('a');
  });

  preTo(async () => {
    await wait(40);
  });

  to('a1', async () => {
    await wait(40);

    assert(4).eq(4);
  });

  group('@amaui/a11', () => {

    to('a11', async () => {
      assert('a').eq(4);
    });

  });

  to('a3', async () => {
    assert(4).eq(4);
  });

  group('@amaui/a14', () => {
    let a: any;

    pre(async () => {
      await wait(14);
    });

    preTo(async () => {
      await wait(140);

      a = 4;
    });

    to('a14', async () => {
      assert('a').eq(a);
    });

  });

  to('a4', async () => {
    assert('a').eq(4);
  });

  post(async () => {
    await wait(140);

    throw new Error('a');
  });

  postTo(async () => {
    await wait(40);
  });

});

to('a7', async () => {
  assert(4).eq(4);
});

postEveryGroup(async () => {
  await wait(40);
});

postEveryTo(async () => {
  await wait(4);
});

postAll(async () => {
  await wait(40);
});
