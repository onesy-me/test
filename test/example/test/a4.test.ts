/* tslint:disable: no-shadowed-variable */
import { wait } from '@onesy/utils';

import { assert } from '../../../src';

preAll(async () => {
  await wait(40);
});

preEveryGroup(async () => {
  await wait(40);
});

preEveryGroupGroup(async () => {
  await wait(141);
});

preEveryTo(async () => {
  await wait(4);
});

preEveryGroupTo(async () => {
  await wait(14);
});

to('a', async () => {
  assert(4).eq(4);
});

group('@onesy/a', () => {

  pre(async () => {
    await wait(140);

    throw new Error('a');
  });

  preEveryGroupGroup(async () => {
    await wait(141);
  });

  preTo(async () => {
    await wait(40);
  });

  preEveryGroupTo(async () => {
    await wait(14);
  });

  to('a1', async () => {
    await wait(40);

    assert(4).eq(4);
  });

  group('@onesy/a11', () => {

    to('a11', async () => {
      assert('a').eq(4);
    });

  });

  to('a3', async () => {
    assert(4).eq(4);
  });

  group('@onesy/a14', () => {
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

  postEveryGroupGroup(async () => {
    await wait(141);
  });

  postTo(async () => {
    await wait(40);
  });

  postEveryGroupTo(async () => {
    await wait(14);
  });

});

to('a7', async () => {
  assert(4).eq(4);
});

postEveryGroup(async () => {
  await wait(40);
});

postEveryGroupGroup(async () => {
  await wait(141);
});

postEveryGroupTo(async () => {
  await wait(14);
});

postEveryTo(async () => {
  await wait(4);
});

postAll(async () => {
  await wait(40);
});
