/* tslint:disable: no-shadowed-variable */
import path from 'path';
import { fork } from 'child_process';
import { expect } from 'chai';

import AmauiNode from '@amaui/node';

describe('@amaui/test/cli', () => {

  it('cli', done => {
    let response: any;

    const childProcess = fork(
      path.resolve('build/cli.js'),
      [
        path.resolve('test/example/test/**/a.test.ts'),
        `--imports=ts-node/register/transpile-only`,
        '--results-print=false',
        '--response-onfail-exit=false',
        '--response-onfail-error=false',
      ]
    );

    childProcess.on('message', data => {
      response = data;

      expect(response.options.files.indexOf('/amaui/amaui-test/test/example/test/**/a.test.ts') > -1).true;

      delete response.options.files;

      expect(response).eql({
        summary: {
          amount: {
            tos: 14,
            groups: 3
          },
          tos: {
            success: 5,
            fail: 9
          }
        },
        options: {
          results: {
            print: false,
            to: [
              'log'
            ],
            at: 'auto',
            errors_minify: true,
            html: {
              id: 'amaui-test-results'
            }
          },
          response: {
            timeout: {
              to: 14000,
              middleware: 40000
            },
            measurement: {
              slow: 74,
              very_slow: 140
            },
            on_fail: {
              exit: false,
              error: false,
            },
          },
          imports: [
            'ts-node/register/transpile-only'
          ],
          order: 'original'
        }
      });

      done();
    });
  });

  it('all the options ', done => {
    let response: any;

    const childProcess = fork(
      path.resolve('build/cli.js'),
      [
        `--imports=ts-node/register/transpile-only`,

        `--order=to-group`,

        '--results-print=false',
        '--results-to=log',
        '--results-at=end',

        '--response-timeout-to=40',
        '--response-timeout-middleware=40000',
        '--response-measurement-slow=400',
        '--response-measurement-veryslow=4000',
        '--response-onfail-exit=false',
        '--response-onfail-error=false',

        `--files=test/example/test/**/a.test.ts`,

        `--package=a/package.json`
      ]
    );

    childProcess.on('message', data => {
      response = data;

      expect(response).eql({
        summary: {
          amount: {
            tos: 14,
            groups: 3
          },
          tos: {
            success: 3,
            fail: 11
          }
        },
        options: {
          results: {
            print: false,
            to: [
              'log'
            ],
            at: 'end',
            errors_minify: true,
            html: {
              id: 'amaui-test-results'
            }
          },
          files: [
            'test/example/test/**/a.test.ts'
          ],
          response: {
            timeout: {
              to: 40,
              middleware: 40000
            },
            measurement: {
              slow: 400,
              very_slow: 4000
            },
            on_fail: {
              exit: false,
              error: false
            }
          },
          imports: [
            'ts-node/register/transpile-only'
          ],
          package: '/Users/lazareric/amaui/amaui-test/a/package.json',
          order: 'to-group'
        }
      });

      done();
    });
  });

  it('cli with amaui-test.options.js', async () => {
    const method = () => new Promise(async resolve => {
      // Create amaui-test.options.js
      await AmauiNode.file.add(
        path.join(process.cwd(), 'amaui-test.options.js'),
        `
        module.exports = {
          imports: [
            'ts-node/register/transpile-only'
          ],
          results: {
            print: false
          },
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          },
          files: 'test/example/test/**/a.test.ts',
        };
      `
      );

      let response: any;

      const childProcess = fork(
        path.resolve('build/cli.js'),
        [
          `--imports=ts-node/register/transpile-only`,

          `--order=to-group`,

          '--results-print=false',
          '--results-to=log',
          '--results-at=end',

          '--response-timeout-to=40',
          '--response-timeout-middleware=40000',
          '--response-measurement-slow=400',
          '--response-measurement-veryslow=4000',
          '--response-onfail-exit=false',
          '--response-onfail-error=false',

          `--package=a/package.json`
        ]
      );

      childProcess.on('message', async data => {
        response = data;

        expect(response).eql({
          summary: {
            amount: {
              tos: 14,
              groups: 3
            },
            tos: {
              success: 3,
              fail: 11
            }
          },
          options: {
            results: {
              print: false,
              to: [
                'log'
              ],
              at: 'end',
              errors_minify: true,
              html: {
                id: 'amaui-test-results'
              }
            },
            response: {
              timeout: {
                to: 40,
                middleware: 40000
              },
              measurement: {
                slow: 400,
                very_slow: 4000
              },
              on_fail: {
                exit: false,
                error: false
              }
            },
            imports: [
              'ts-node/register/transpile-only'
            ],
            order: 'to-group',
            package: '/Users/lazareric/amaui/amaui-test/a/package.json',
            files: 'test/example/test/**/a.test.ts'
          }
        });

        // Remove example/package.json
        await AmauiNode.file.remove(path.join(process.cwd(), 'amaui-test.options.js'));

        resolve(true);
      });
    });

    await method();
  });

});
