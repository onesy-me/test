
</br>
</br>

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img src='utils/images/logo.svg' alt='onesy logo' />
  </a>
</p>

<h1 align='center'>onesy Test</h1>

<p align='center'>
  Test suite for front-end and back-end
</p>

<br />

<h3 align='center'>
  <sub>MIT license&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Production ready&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>UMD 32.7kb gzipped&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>100% test cov&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Browser and Nodejs</sub>
</h3>

<p align='center'>
  <sub>Very simple code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Modern code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Junior friendly&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Typescript&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Made with :yellow_heart:</sub>
</p>

<br />

## Getting started

### Add

```sh
yarn add @onesy/test --dev
```

### Use

#### **Nodejs**

You can have onesy-test options either in package.json in 'onesy-test' property or onesy-test.options.js file in root directory, where `onesy-test` command will be made.

In nodejs on onesy-test run errors onesy-test exits the process, so it's all good if the command is flow dependent.

*onesy-test.options.js*

```javascript
  module.exports = {
    imports: [
      'ts-node/register/transpile-only'
    ],
    files: [
      'test/**/*.test.ts'
    ]
  }
```
or

*package.json*

```javascript
  {
    "scripts": {
      test: "onesy-test"
    },
    "onesy-test": {
      imports: [
        'ts-node/register/transpile-only'
      ],
      files: [
        'test/**/*.test.ts'
      ]
    }
  }
```

And with yarn test or npm test command onesy-test will run all the tests based on the onesy-test options

```javascript
yarn test
```

#### **Browser**

Make an OnesyTest instance, which will prepare the environment, write all the tests below it, and run the tests with `onesyTest.run()` method, which on errors throws an error, so if the tests passing is flow dependent, running tests will obviously stop the method having thrown an error on tests not having passed.

```javascript
  import { OnesyTest, assert } from '@onesy/test';
  import { wait } from '@onesy/utils';

  const onesyTest = new OnesyTest();

  to('a', () => {
    assert(4).eq(4);
  });

  group('@onesy/a1', () => {

    pre(async () => {
      await wait(140);

      throw new Error('a');
    });

    to('a2', async () => {
      await wait(140);

      assert(4).eq(4);
    });

    group('@onesy/a3', () => {

      to('a3', async () => {
        assert(function a() { }).eq(undefined);
      });

    });

    to('a4', () => {
      [1, 2, 3, 4].forEach(value => {
        assert(typeof value === 'number').true;

        throw new Error('a');
      });
    });

    group('@onesy/a5', () => {
      let a: any;

      pre(async () => {
        await wait(14);
      });

      preTo(async () => {
        await wait(140);

        a = 4;
      });

      to('a5', (resolve, reject) => {
        const error: any = new Error();

        // Added expected and expression message
        error.name = 'An Error';
        error.expected = 4;
        error.expression = 'to be 🍊';

        reject(error);
      });

    });

    to('a6', async () => {
      await wait(74);

      assert(4).eq(4);
    });

    to('a7', async () => {
      assert(['padding-left', 'padding', 'padding-right']).eql(['padding', 'padding-left', 'padding-right']);
    });

    to('a8', async resolve => {
      await wait(4);

      resolve();

      await wait(140);

      assert(4).eq(4);
    });

    to('a9', async () => {
      await assert(function a() { }).throwAsync(4);
    });

    to('a10', async () => {
      assert({
        "direction": "ltr",
        "preference": {
          "background": {
            "default": "neutral"
          },
          "text": {
            "default": "neutral"
          },
          "visual_contrast": {
            "default": "regular"
          }
        },
        "mode": "regular",
        "palette": {
          "accessibility": "regular",
          "visual_contrast": {
            "low": {
              "opacity": {
                "primary": 0.77,
                "secondary": 0.54,
                "tertiary": 0.27
              }
            }
          }
        }
      }).eql({
        "direction": "ltl",
        "preference": {
          "background": {
            "default": "neutral"
          },
          "text": {
            "default": "neutral"
          },
          "visual_contrast": {
            "default": "regular"
          }
        },
        "mode": "regular",
        "palette": {
          "accessibility": "regular",
          "visual_contrast": {
            "low": {
              "opacity": {
                "primary": 0.77,
                "secondary": 0.54,
                "tertiary": 0.27
              }
            }
          }
        }
      });
    });

    to('a11', async () => {
      const value = [
        'OnesyError',
        'OnesyError',
        'OnesyAwsError',
        'OnesyTestError',
        'OnesyAmqpError',
        'AuthenticationError',
        'AuthorizationError',
        'AssertError',
        'ValidationError',
        'PermissionError',
        'OnesyMongoError',
        'ConnectionError',
        'NotFoundError',
        'DeveloperError',
        'OnesyError',
      ];
      const value1 = [
        'OnesyError',
        'OnesyError',
        'OnesyAwsError',
        'OnesyTestError',
        'OnesyAmqpError',
        'AuthenticationError',
        'AuthorizationError',
        'ValidationError',
        'PermissionError',
        'OnesyMongoError',
        'ConnectionError',
        'NotFoundError',
        'DeveloperError',
        'OnesyError',
      ];

      assert(value).eql(value1);
    });

    to('a12', async () => {
      const value = {
        a: {
          a: {
            a: {
              ab: 4,
            },
          },
          ab: 4,
        },
      };
      const value1 = {
        a: {
          a: {
            b: 4,
            a: {
              ab: 5,
              ac: 4,
            },
          },
        },
        ab: [1, 2, 3, 4],
      };

      assert(value).eql(value1);
    });

    to('a13', async () => {
      assert(4).eq(4);
    });

    post(async () => {
      await wait(40);
    });

  });

  to('a14', async () => {
    assert(timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
  });

  await onesyTest.run();
```

Results logged in nodejs and browser (and with an option for HTML logs)

![OnesyTest results](utils/images/onesy-test-results.jpg)

### Dev

Install

```sh
yarn
```

Test

```sh
yarn test
```

### Prod

Build

```sh
yarn build
```
