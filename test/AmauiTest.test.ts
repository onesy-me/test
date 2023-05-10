/* tslint:disable: no-shadowed-variable */
import path from 'path';
import { expect } from 'chai';

import { copy, wait } from '@amaui/utils';
import AmauiNode from '@amaui/node';

import { evaluate } from '../utils/js/test/utils';

import { AmauiTest, assert, IOptions } from '../src';

function clearRequireCache() {
  const items = [
    path.resolve('test/example/test/a.test.ts'),
    path.resolve('test/example/test/a1.test.ts'),
    path.resolve('test/example/test/a4.test.ts'),
    path.resolve('test/example/package.json'),
    path.resolve('amaui-test.options.js'),
  ];

  items.forEach(item => {
    try {
      delete require.cache[item];
    } catch (error) { }
  });
}

describe('AmauiTest', () => {

  beforeEach(() => clearRequireCache());

  describe('AmauiTest', () => {

    beforeEach(() => clearRequireCache());

    it('orderTos', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      const valueNode = AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

      const valueBrowsers = await evaluate((window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a', async () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a1', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          to('a2', async () => {
            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a3', () => {

            to('a3', async () => {
              window.AmauiTest.assert(function a() { }).eq(undefined);
            });

          });

          to('a4', async () => {
            throw new Error('a');
          });

          group('@amaui/a5', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

              a = 4;
            });

            to('a5', async () => {
              const error: any = new Error('a');

              // Added expected and expression message
              error.name = 'An Error';
              error.expected = 4;
              error.expression = 'to be 🍊';

              throw error;
            });

          });

          to('a6', async () => {
            await window.AmauiUtils.wait(74);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a7', async () => {
            window.AmauiTest.assert(4).true;
          });

          to('a8', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          to('a9', async () => {
            await window.AmauiTest.assert(function a() { }).throwAsync(4);
          });

          to('a10', async () => {
            window.AmauiTest.assert(0).truthy;
          });

          to('a11', async () => {
            const value = [
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'window.AmauiTest.AssertError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
            ];
            const value1 = [
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
            ];

            window.AmauiTest.assert(value).eql(value1);
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

            window.AmauiTest.assert(value).eql(value1);
          });

          to('a13', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(40);
          });

        });

        to('a14', async () => {
          window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
        });

        const items = window.AmauiTest.AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

        return items;
      });
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql(['a', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14']));
    });

    it('order', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      const valueNode = AmauiTest.order(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

      const valueBrowsers = await evaluate((window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a', async () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a1', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          to('a2', async () => {
            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a3', () => {

            to('a3', async () => {
              window.AmauiTest.assert(function a() { }).eq(undefined);
            });

          });

          to('a4', async () => {
            throw new Error('a');
          });

          group('@amaui/a5', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

              a = 4;
            });

            to('a5', async () => {
              const error: any = new Error('a');

              // Added expected and expression message
              error.name = 'An Error';
              error.expected = 4;
              error.expression = 'to be 🍊';

              throw error;
            });

          });

          to('a6', async () => {
            await window.AmauiUtils.wait(74);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a7', async () => {
            window.AmauiTest.assert(4).true;
          });

          to('a8', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          to('a9', async () => {
            await window.AmauiTest.assert(function a() { }).throwAsync(4);
          });

          to('a10', async () => {
            window.AmauiTest.assert(0).truthy;
          });

          to('a11', async () => {
            const value = [
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'window.AmauiTest.AssertError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
            ];
            const value1 = [
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
            ];

            window.AmauiTest.assert(value).eql(value1);
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

            window.AmauiTest.assert(value).eql(value1);
          });

          to('a13', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(40);
          });

        });

        to('a14', async () => {
          window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
        });

        const items = window.AmauiTest.AmauiTest.order(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

        return items;
      });
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql(['a', '@amaui/a1', 'a14']));
    });

  });

  describe('amauiTest', () => {

    it('mainGroup', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      const valueNode = amauiTest.mainGroup.name === 'main';

      const valueBrowsers = await evaluate((window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        return amauiTest.mainGroup.name === 'main';
      });
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql(true));
    });

    it('options', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      const valueNode = amauiTest.options;

      const valueBrowsers = await evaluate((window: any) => {
        const options = {
          order: 'original',
          results: {
            print: false
          },
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        return amauiTest.options;
      });
      const values = [valueNode, ...valueBrowsers];

      delete valueNode.imports;
      delete valueNode.files;

      values.forEach(value => expect(value).eql({
        order: 'original',
        response: {
          on_fail: {
            exit: false,
            error: false
          },
          timeout: {
            to: 14000,
            middleware: 40000
          },
          measurement: {
            slow: 74,
            very_slow: 140
          }
        },
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
        }
      }));
    });

    describe('options', () => {

      beforeEach(() => clearRequireCache());

      describe('imports', () => {

        beforeEach(() => clearRequireCache());

        it('imports string', async () => {
          const options: IOptions = {
            imports: 'ts-node/register/transpile-only',
            results: {
              print: false
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            },
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          await amauiTest.run();

          const value = {
            summary: amauiTest.mainGroup.summary,
            options: amauiTest.options,
          };

          expect(value.options.files[0].indexOf('test/**/a.test.ts') > -1).true;

          delete value.options.files;

          expect(value).eql({
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
              imports: 'ts-node/register/transpile-only',
              order: 'original'
            }
          });
        });

        it('imports array', async () => {
          const options: IOptions = {
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
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          await amauiTest.run();

          const value = {
            summary: amauiTest.mainGroup.summary,
            options: amauiTest.options,
          };

          expect(value.options.files[0].indexOf('test/**/a.test.ts') > -1).true;

          delete value.options.files;

          expect(value).eql({
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
        });

      });

      describe('order', () => {

        beforeEach(() => clearRequireCache());

        it('default', async () => {
          const options: IOptions = {
            imports: [
              'ts-node/register/transpile-only',
            ],
            results: {
              print: false,
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            },
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          const valueNode = AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

          const valueBrowsers = await evaluate((window: any) => {
            const options = {
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new window.AmauiTest.AmauiTest(options);

            to('a', async () => {
              window.AmauiTest.assert(4).eq(4);
            });

            group('@amaui/a1', () => {

              pre(async () => {
                await window.AmauiUtils.wait(140);

                throw new Error('a');
              });

              to('a2', async () => {
                await window.AmauiUtils.wait(140);

                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a3', () => {

                to('a3', async () => {
                  window.AmauiTest.assert(function a() { }).eq(undefined);
                });

              });

              to('a4', async () => {
                throw new Error('a');
              });

              group('@amaui/a5', () => {
                let a: any;

                pre(async () => {
                  await window.AmauiUtils.wait(14);
                });

                preTo(async () => {
                  await window.AmauiUtils.wait(140);

                  a = 4;
                });

                to('a5', async () => {
                  const error: any = new Error('a');

                  // Added expected and expression message
                  error.name = 'An Error';
                  error.expected = 4;
                  error.expression = 'to be 🍊';

                  throw error;
                });

              });

              to('a6', async () => {
                await window.AmauiUtils.wait(74);

                window.AmauiTest.assert(4).eq(4);
              });

              to('a7', async () => {
                window.AmauiTest.assert(4).true;
              });

              to('a8', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              to('a9', async () => {
                await window.AmauiTest.assert(function a() { }).throwAsync(4);
              });

              to('a10', async () => {
                window.AmauiTest.assert(0).truthy;
              });

              to('a11', async () => {
                const value = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'window.AmauiTest.AssertError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];
                const value1 = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];

                window.AmauiTest.assert(value).eql(value1);
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

                window.AmauiTest.assert(value).eql(value1);
              });

              to('a13', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              post(async () => {
                await window.AmauiUtils.wait(40);
              });

            });

            to('a14', async () => {
              window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
            });

            const items = window.AmauiTest.AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

            return items;
          });
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => expect(value).eql(['a', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14']));
        });

        it('original', async () => {
          const options: IOptions = {
            imports: [
              'ts-node/register/transpile-only',
            ],
            order: 'original',
            results: {
              print: false,
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            },
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          const valueNode = AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

          const valueBrowsers = await evaluate((window: any) => {
            const options = {
              order: 'original',
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new window.AmauiTest.AmauiTest(options);

            to('a', async () => {
              window.AmauiTest.assert(4).eq(4);
            });

            group('@amaui/a1', () => {

              pre(async () => {
                await window.AmauiUtils.wait(140);

                throw new Error('a');
              });

              to('a2', async () => {
                await window.AmauiUtils.wait(140);

                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a3', () => {

                to('a3', async () => {
                  window.AmauiTest.assert(function a() { }).eq(undefined);
                });

              });

              to('a4', async () => {
                throw new Error('a');
              });

              group('@amaui/a5', () => {
                let a: any;

                pre(async () => {
                  await window.AmauiUtils.wait(14);
                });

                preTo(async () => {
                  await window.AmauiUtils.wait(140);

                  a = 4;
                });

                to('a5', async () => {
                  const error: any = new Error('a');

                  // Added expected and expression message
                  error.name = 'An Error';
                  error.expected = 4;
                  error.expression = 'to be 🍊';

                  throw error;
                });

              });

              to('a6', async () => {
                await window.AmauiUtils.wait(74);

                window.AmauiTest.assert(4).eq(4);
              });

              to('a7', async () => {
                window.AmauiTest.assert(4).true;
              });

              to('a8', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              to('a9', async () => {
                await window.AmauiTest.assert(function a() { }).throwAsync(4);
              });

              to('a10', async () => {
                window.AmauiTest.assert(0).truthy;
              });

              to('a11', async () => {
                const value = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'window.AmauiTest.AssertError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];
                const value1 = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];

                window.AmauiTest.assert(value).eql(value1);
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

                window.AmauiTest.assert(value).eql(value1);
              });

              to('a13', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              post(async () => {
                await window.AmauiUtils.wait(40);
              });

            });

            to('a14', async () => {
              window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
            });

            const items = window.AmauiTest.AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

            return items;
          });
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => expect(value).eql(['a', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14']));
        });

        it('to-group', async () => {
          const options: IOptions = {
            imports: [
              'ts-node/register/transpile-only',
            ],
            order: 'to-group',
            results: {
              print: false,
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            },
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          const valueNode = AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

          const valueBrowsers = await evaluate((window: any) => {
            const options = {
              order: 'to-group',
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new window.AmauiTest.AmauiTest(options);

            to('a', async () => {
              window.AmauiTest.assert(4).eq(4);
            });

            group('@amaui/a1', () => {

              pre(async () => {
                await window.AmauiUtils.wait(140);

                throw new Error('a');
              });

              to('a2', async () => {
                await window.AmauiUtils.wait(140);

                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a3', () => {

                to('a3', async () => {
                  window.AmauiTest.assert(function a() { }).eq(undefined);
                });

              });

              to('a4', async () => {
                throw new Error('a');
              });

              group('@amaui/a5', () => {
                let a: any;

                pre(async () => {
                  await window.AmauiUtils.wait(14);
                });

                preTo(async () => {
                  await window.AmauiUtils.wait(140);

                  a = 4;
                });

                to('a5', async () => {
                  const error: any = new Error('a');

                  // Added expected and expression message
                  error.name = 'An Error';
                  error.expected = 4;
                  error.expression = 'to be 🍊';

                  throw error;
                });

              });

              to('a6', async () => {
                await window.AmauiUtils.wait(74);

                window.AmauiTest.assert(4).eq(4);
              });

              to('a7', async () => {
                window.AmauiTest.assert(4).true;
              });

              to('a8', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              to('a9', async () => {
                await window.AmauiTest.assert(function a() { }).throwAsync(4);
              });

              to('a10', async () => {
                window.AmauiTest.assert(0).truthy;
              });

              to('a11', async () => {
                const value = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'window.AmauiTest.AssertError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];
                const value1 = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];

                window.AmauiTest.assert(value).eql(value1);
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

                window.AmauiTest.assert(value).eql(value1);
              });

              to('a13', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              post(async () => {
                await window.AmauiUtils.wait(40);
              });

            });

            to('a14', async () => {
              window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
            });

            const items = window.AmauiTest.AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

            return items;
          });
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => expect(value).eql(['a', 'a14', 'a2', 'a4', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a3', 'a5']));
        });

        it('group-to', async () => {
          const options: IOptions = {
            imports: [
              'ts-node/register/transpile-only',
            ],
            order: 'group-to',
            results: {
              print: false,
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            },
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          const valueNode = AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

          const valueBrowsers = await evaluate((window: any) => {
            const options = {
              order: 'group-to',
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new window.AmauiTest.AmauiTest(options);

            to('a', async () => {
              window.AmauiTest.assert(4).eq(4);
            });

            group('@amaui/a1', () => {

              pre(async () => {
                await window.AmauiUtils.wait(140);

                throw new Error('a');
              });

              to('a2', async () => {
                await window.AmauiUtils.wait(140);

                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a3', () => {

                to('a3', async () => {
                  window.AmauiTest.assert(function a() { }).eq(undefined);
                });

              });

              to('a4', async () => {
                throw new Error('a');
              });

              group('@amaui/a5', () => {
                let a: any;

                pre(async () => {
                  await window.AmauiUtils.wait(14);
                });

                preTo(async () => {
                  await window.AmauiUtils.wait(140);

                  a = 4;
                });

                to('a5', async () => {
                  const error: any = new Error('a');

                  // Added expected and expression message
                  error.name = 'An Error';
                  error.expected = 4;
                  error.expression = 'to be 🍊';

                  throw error;
                });

              });

              to('a6', async () => {
                await window.AmauiUtils.wait(74);

                window.AmauiTest.assert(4).eq(4);
              });

              to('a7', async () => {
                window.AmauiTest.assert(4).true;
              });

              to('a8', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              to('a9', async () => {
                await window.AmauiTest.assert(function a() { }).throwAsync(4);
              });

              to('a10', async () => {
                window.AmauiTest.assert(0).truthy;
              });

              to('a11', async () => {
                const value = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'window.AmauiTest.AssertError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];
                const value1 = [
                  'AmauiError',
                  'AmauiAwsError',
                  'AmauiTestError',
                  'AmauiAmqpError',
                  'AuthenticationError',
                  'AuthorizationError',
                  'ValidationError',
                  'PermissionError',
                  'AmauiMongoError',
                  'ConnectionError',
                  'NotFoundError',
                  'DeveloperError',
                ];

                window.AmauiTest.assert(value).eql(value1);
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

                window.AmauiTest.assert(value).eql(value1);
              });

              to('a13', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              post(async () => {
                await window.AmauiUtils.wait(40);
              });

            });

            to('a14', async () => {
              window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
            });

            const items = window.AmauiTest.AmauiTest.orderTos(amauiTest.mainGroup, amauiTest.options.order).map(item => item.name);

            return items;
          });
          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => expect(value).eql(['a3', 'a5', 'a2', 'a4', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a', 'a14']));
        });

      });

      describe('results', () => {

        beforeEach(() => clearRequireCache());

        describe('print', () => {

          beforeEach(() => clearRequireCache());

          it('default', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only'
              ],
              order: 'original',
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts'
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            let valueNode = amauiTest.archive.logs;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                order: 'original',
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error();

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(true).true;
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(true).true;
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              return amauiTest.archive.logs;
            });

            valueBrowsers[1].splice(86, 2);
            valueBrowsers[2].splice(86, 2);

            valueBrowsers.forEach(value => {
              // Milliseconds variations minor problem
              value[8] = value[8].slice(0, 15) + '140ms';
              value[22] = value[22].slice(0, 15) + '74ms';
              value[46] = value[46].slice(0, 4) + '440ms';

              value[72] = 'a';

              value = value.map(item => {
                if (
                  item.indexOf('\n%c  \n  @') > -1 ||
                  item.indexOf('eval') > -1 ||
                  item.indexOf('miseReactionJob') > -1
                ) return 'a';

                return item;
              });

              const valueBrowserOutput = [
                "\n\n  Amaui test running",
                "%c  14 tests",
                "color: #777",
                "\n\n\n",
                "  %c✔ %ca",
                "color: #1fc926",
                "color: #777",
                "\n  @amaui/a1",
                "    %c✔ %ca2 %c140ms",
                "color: #1fc926",
                "color: #777",
                "color: #d74644",
                "\n    @amaui/a3",
                "      %c1) a3",
                "color: #d74644",
                " ",
                "    %c2) a4",
                "color: #d74644",
                "\n    @amaui/a5",
                "      %c3) a5",
                "color: #d74644",
                " ",
                "    %c✔ %ca6 %c74ms",
                "color: #1fc926",
                "color: #777",
                "color: #a9b030",
                "    %c4) a7",
                "color: #d74644",
                "    %c✔ %ca8",
                "color: #1fc926",
                "color: #777",
                "    %c5) a9",
                "color: #d74644",
                "    %c6) a10",
                "color: #d74644",
                "    %c7) a11",
                "color: #d74644",
                "    %c8) a12",
                "color: #d74644",
                "    %c✔ %ca13",
                "color: #1fc926",
                "color: #777",
                " ",
                "  %c9) a14",
                "color: #d74644",
                "\n\n",
                "  %c440ms",
                "color: #777",
                "\n\n",
                "%c  5 passing",
                "color: #1fc926",
                "%c  9 failed",
                "color: #d74644",
                "\n\n",
                "  1) @amaui/a1 @amaui/a3 a3",
                " ",
                "%cAssertError: expected [1,4,3,7] (4) to equal any of the values [[1],[1,2,3,4,5,6,7],[1,2,3,4]]",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n",
                "  2) @amaui/a1 a4",
                " ",
                "%cError",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n",
                "  3) @amaui/a1 @amaui/a5 a5",
                " ",
                "%cAn Error: expected 4 to be 🍊 ",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n",
                "  4) @amaui/a1 a7",
                " ",
                "%cAssertError: expected 4 to be true ",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n",
                "  5) @amaui/a1 a9",
                " ",
                "%cAssertError: expected function a() { } to async throw 4",
                "color: #d74644; padding-left: 14px;",
                "\n",
                "  6) @amaui/a1 a10",
                " ",
                "%cAssertError: expected 0 to be truthy ",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n",
                "  7) @amaui/a1 a11",
                " ",
                "%cAssertError: expected [\"AmauiError\",\"AmauiAwsError\",\"AmauiTestError\",\"AmauiAmqpError\",\"Authen ... ] to equal deep [\"AmauiError\",\"AmauiAwsError\",\"AmauiTestError\",\"AmauiAmqpError\",\"Authen ... ]",
                "color: #d74644; padding-left: 14px;",
                " ",
                "  %c+ add %c- remove",
                "color: #1fc926",
                "color: #d74644",
                " ",
                "%c     \"AmauiTestError\"",
                "color: inherit",
                "%c     \"AmauiAmqpError\"",
                "color: inherit",
                "%c     \"AuthenticationError\"",
                "color: inherit",
                "%c     \"AuthorizationError\"",
                "color: inherit",
                "%c  -  \"AssertError\"",
                "color: #d74644",
                "%c     \"ValidationError\"",
                "color: inherit",
                "%c     \"PermissionError\"",
                "color: inherit",
                "%c     \"AmauiMongoError\"",
                "color: inherit",
                "%c     \"ConnectionError\"",
                "color: inherit",
                "a",
                "color: #777",
                "\n",
                "  8) @amaui/a1 a12",
                " ",
                "%cAssertError: expected {\"a\":{\"a\":{\"a\":{\"ab\":4}},\"ab\":4}} to equal deep {\"a\":{\"a\":{\"b\":4,\"a\":{\"ab\":5,\"ac\":4}}},\"ab\":[1,2,3,4]}",
                "color: #d74644; padding-left: 14px;",
                " ",
                "  %c+ add %c- remove",
                "color: #1fc926",
                "color: #d74644",
                " ",
                "%c   {",
                "color: inherit",
                "%c     \"a\": {",
                "color: inherit",
                "%c       \"a\": {",
                "color: inherit",
                "%c  +      \"b\": 4",
                "color: #1fc926",
                "%c         \"a\": {",
                "color: inherit",
                "%c  -        \"ab\": 4",
                "color: #d74644",
                "%c  +        \"ab\": 5",
                "color: #1fc926",
                "%c  +        \"ac\": 4",
                "color: #1fc926",
                "%c         }",
                "color: inherit",
                "%c       }",
                "color: inherit",
                "%c  -    \"ab\": 4",
                "color: #d74644",
                "%c     }",
                "color: inherit",
                "%c  +  \"ab\": [",
                "color: #1fc926",
                "%c  +    1",
                "color: #1fc926",
                "%c  +    2",
                "color: #1fc926",
                "%c  +    3",
                "color: #1fc926",
                "%c  +    4",
                "color: #1fc926",
                "%c  +  ]",
                "color: #1fc926",
                "%c   }",
                "color: inherit",
                "a",
                "color: #777",
                "\n",
                "  9) a14",
                " ",
                "%cAssertError: expected [{\"label\":\"Pacific/Midway (GMT-11:00)\",\"code\":\"Pacific/Midway\",\"name\":\" ... ] to equal deep [{\"a\":[null,{\"a\":4},4]}]",
                "color: #d74644; padding-left: 14px;",
                "a",
                "color: #777",
                "\n"
              ];

              expect(value.slice(0, 57)).eql(valueBrowserOutput.slice(0, 57));
              expect(value.length > 170).true;
              expect(valueBrowserOutput.length > 174).true;
            });

            // Milliseconds variations minor problem
            const valueNodeOutput = [
              "\n\n  Amaui test running",
              "  \u001b[90m14 tests\u001b[0m",
              "\n\n",
              "  \u001b[32m✔\u001b[0m \u001b[90ma\u001b[0m",
              "\n  @amaui/a1",
              "\n    @amaui/a3",
              "      \u001b[31m1) a3\u001b[0m",
              " ",
              "    \u001b[31m2) a4\u001b[0m",
              "\n    @amaui/a5",
              "      \u001b[31m3) a5\u001b[0m",
              " ",
              "    \u001b[31m4) a7\u001b[0m",
              "    \u001b[32m✔\u001b[0m \u001b[90ma8\u001b[0m",
              "    \u001b[31m5) a9\u001b[0m",
              "    \u001b[31m6) a10\u001b[0m",
              "    \u001b[31m7) a11\u001b[0m",
              "    \u001b[31m8) a12\u001b[0m",
              "    \u001b[32m✔\u001b[0m \u001b[90ma13\u001b[0m",
              " ",
              "  \u001b[31m9) a14\u001b[0m",
              "\n",
              " ",
              "\n",
              " ",
              "\u001b[92m5 passing\u001b[0m",
              " ",
              "\u001b[91m9 failed\u001b[0m",
              "\n",
              "  1) @amaui/a1 @amaui/a3 a3",
              " ",
              "  \u001b[91mAssertError: expected [1,4,3,7] (4) to equal any of the values [[1],[1,2,3,4,5,6,7],[1,2,3,4]]\u001b[0m",
              " ",
              "  \u001b[92m+ add\u001b[0m \u001b[91m- remove\u001b[0m",
              " ",
              "   [",
              "     1",
              "\u001b[91m  -  4\u001b[0m",
              "\u001b[91m  -  3\u001b[0m",
              "\u001b[91m  -  7\u001b[0m",
              "   ]",
              "   [",
              "     1",
              "\u001b[92m  +  2\u001b[0m",
              "\u001b[92m  +  3\u001b[0m",
              "     4",
              "\u001b[91m  -  3\u001b[0m",
              "\u001b[92m  +  5\u001b[0m",
              "\u001b[92m  +  6\u001b[0m",
              "     7",
              "   ]",
              "   [",
              "     1",
              "\u001b[92m  +  2\u001b[0m",
              "\u001b[91m  -  4\u001b[0m",
              "     3",
              "\u001b[92m  +  4\u001b[0m",
              "\u001b[91m  -  7\u001b[0m",
              "   ]",
              "\n",
              "  2) @amaui/a1 a4",
              " ",
              "  \u001b[91mError: a\u001b[0m",
              "\n",
              "  3) @amaui/a1 @amaui/a5 a5",
              " ",
              "  \u001b[91mAn Error: expected 4 to be 🍊 \u001b[0m",
              "\n",
              "  4) @amaui/a1 a7",
              " ",
              "  \u001b[91mAssertError: expected [\"padding-left\",\"padding\",\"padding-right\"] (3) to equal deep [\"padding\",\"padding-left\",\"padding-right\"] (3)\u001b[0m",
              " ",
              "  \u001b[92m+ add\u001b[0m \u001b[91m- remove\u001b[0m",
              " ",
              "   [",
              "\u001b[92m  +  \"padding\"\u001b[0m",
              "     \"padding-left\"",
              "\u001b[91m  -  \"padding\"\u001b[0m",
              "     \"padding-right\"",
              "   ]",
              "\n",
              "  5) @amaui/a1 a9",
              " ",
              "  \u001b[91mAssertError: expected function a() { } to async throw 4\u001b[0m",
              "\n",
              "  6) @amaui/a1 a10",
              " ",
              "  \u001b[91mAssertError: expected {\"direction\":\"ltr\",\"preference\":{\"background\":{\"default\":\"neutral\"},\"te ... } to equal deep {\"direction\":\"ltl\",\"preference\":{\"background\":{\"default\":\"neutral\"},\"te ... }\u001b[0m",
              " ",
              "  \u001b[92m+ add\u001b[0m \u001b[91m- remove\u001b[0m",
              " ",
              "   {",
              "\u001b[92m  +  \"direction\": \"ltl\"\u001b[0m",
              "\u001b[91m  -  \"direction\": \"ltr\"\u001b[0m",
              "     \"preference\": {",
              "\u001b[96m\n     24 lines skipped\u001b[0m",
              "\n",
              "  7) @amaui/a1 a11",
              " ",
              "  \u001b[91mAssertError: expected [\"AmauiError\",\"AmauiError\",\"AmauiAwsError\",\"AmauiTestError\",\"AmauiAmqpE ... ] (15) to equal deep [\"AmauiError\",\"AmauiError\",\"AmauiAwsError\",\"AmauiTestError\",\"AmauiAmqpE ... ] (14)\u001b[0m",
              " ",
              "  \u001b[92m+ add\u001b[0m \u001b[91m- remove\u001b[0m",
              " ",
              "\u001b[96m     7 lines skipped\n\u001b[0m",
              "     \"AuthorizationError\"",
              "\u001b[91m  -  \"AssertError\"\u001b[0m",
              "     \"ValidationError\"",
              "\u001b[96m\n     7 lines skipped\u001b[0m",
              "\n",
              "  8) @amaui/a1 a12",
              " ",
              "  \u001b[91mAssertError: expected {\"a\":{\"a\":{\"a\":{\"ab\":4}},\"ab\":4}} to equal deep {\"a\":{\"a\":{\"b\":4,\"a\":{\"ab\":5,\"ac\":4}}},\"ab\":[1,2,3,4]}\u001b[0m",
              " ",
              "  \u001b[92m+ add\u001b[0m \u001b[91m- remove\u001b[0m",
              " ",
              "   {",
              "     \"a\": {",
              "       \"a\": {",
              "\u001b[92m  +      \"b\": 4\u001b[0m",
              "         \"a\": {",
              "\u001b[91m  -        \"ab\": 4\u001b[0m",
              "\u001b[92m  +        \"ab\": 5\u001b[0m",
              "\u001b[92m  +        \"ac\": 4\u001b[0m",
              "         }",
              "\u001b[91m  -    }\u001b[0m",
              "\u001b[91m  -    \"ab\": 4\u001b[0m",
              "\u001b[92m  +    }\u001b[0m",
              "     }",
              "\u001b[92m  +  \"ab\": [\u001b[0m",
              "\u001b[92m  +    1\u001b[0m",
              "\u001b[92m  +    2\u001b[0m",
              "\u001b[92m  +    3\u001b[0m",
              "\u001b[92m  +    4\u001b[0m",
              "\u001b[92m  +  ]\u001b[0m",
              "   }",
              "\n",
              "  9) a14",
              " ",
              "  \u001b[91mAssertError: expected [{\"label\":\"Pacific/Midway (GMT-11:00)\",\"code\":\"Pacific/Midway\",\"name\":\" ... ] (424) to equal deep [{\"a\":[{\"a\":4},4]}] (1)\u001b[0m",
              "\n"
            ];

            valueNode = valueNode.filter(item => item.indexOf('test.ts:') === -1 && item.indexOf('ms') === -1);

            expect(valueNode).eql(valueNodeOutput);
          });

          it('true', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only'
              ],
              order: 'original',
              results: {
                print: true
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts'
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const valueNode = amauiTest.archive.logs.length > 104;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                order: 'original',
                results: {
                  print: true
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    await window.AmauiUtils.wait(74);

                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(true).true;
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              return amauiTest.archive.logs.length > 140;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

          it('false', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only'
              ],
              order: 'original',
              results: {
                print: false,
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts'
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const valueNode = !amauiTest.archive.logs.length;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                order: 'original',
                results: {
                  print: false,
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    await window.AmauiUtils.wait(74);

                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(true).true;
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              return !amauiTest.archive.logs.length;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

        });

        describe('to', () => {

          it('log', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only'
              ],
              order: 'original',
              results: {
                to: ['log'],
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts'
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const valueNode = amauiTest.archive.logs.length > 40;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                order: 'original',
                results: {
                  to: ['log'],
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    await window.AmauiUtils.wait(74);

                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(true).true;
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              return amauiTest.archive.logs.length > 140;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

          it('html', async () => {
            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                order: 'original',
                results: {
                  to: ['html'],
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              if (!window.document.getElementById('amaui-test')) {
                const div = window.document.createElement('div');

                div.id = 'amaui-test';

                div.innerHTML = `<div id='amaui-test-results'></div>`;

                window.document.body.append(div);
              }
              else {
                window.document.getElementById('amaui-test').innerHTML = `<div id='amaui-test-results'></div>`;
              }

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    await window.AmauiUtils.wait(74);

                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(true).true;
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(true).true;
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              return window.document.getElementById('amaui-test').innerHTML.length > 7400;
            });

            valueBrowsers.forEach(value => expect(value).eq(true));
          });

        });

        describe('at', () => {

          describe('auto', () => {

            beforeEach(() => clearRequireCache());

            it('log', async () => {
              const options: IOptions = {
                imports: [
                  'ts-node/register/transpile-only'
                ],
                order: 'original',
                results: {
                  print: true,
                  to: ['log'],
                  at: 'auto'
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                },
                files: [
                  'test/example/test/**/a.test.ts'
                ]
              };

              const amauiTest = new AmauiTest(options);

              await amauiTest.init();

              amauiTest.run();

              await wait(700);

              const partialArchives = amauiTest.archive.logs.length > 0;

              await wait(1400);

              const valueNode = partialArchives && amauiTest.archive.logs.length > 104;

              const valueBrowsers = await evaluate(async (window: any) => {
                const options = {
                  order: 'original',
                  results: {
                    to: ['log'],
                    at: 'auto'
                  },
                  response: {
                    on_fail: {
                      exit: false,
                      error: false,
                    }
                  }
                };

                const amauiTest = new window.AmauiTest.AmauiTest(options);

                to('a', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a1', () => {

                  pre(async () => {
                    await window.AmauiUtils.wait(140);

                    throw new Error('a');
                  });

                  to('a2', async () => {
                    await window.AmauiUtils.wait(140);

                    window.AmauiTest.assert(true).true;
                  });

                  group('@amaui/a3', () => {

                    to('a3', async () => {
                      window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                        [
                          1
                        ],
                        [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ],
                        [
                          1,
                          2,
                          3,
                          4
                        ]
                      ]);
                    });

                  });

                  to('a4', async () => {
                    throw new Error('a');
                  });

                  group('@amaui/a5', () => {
                    let a;

                    pre(async () => {
                      await window.AmauiUtils.wait(14);
                    });

                    preTo(async () => {
                      await window.AmauiUtils.wait(140);

                      a = 4;
                    });

                    to('a5', async () => {
                      await window.AmauiUtils.wait(74);

                      const error: any = new Error('a');

                      // Added expected and expression message
                      error.name = 'An Error';
                      error.expected = 4;
                      error.expression = 'to be 🍊';

                      throw error;
                    });

                  });

                  to('a6', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a7', async () => {
                    window.AmauiTest.assert(4).true;
                  });

                  to('a8', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a9', async () => {
                    await window.AmauiTest.assert(function a() { }).throwAsync(4);
                  });

                  to('a10', async () => {
                    window.AmauiTest.assert(0).truthy;
                  });

                  to('a11', async () => {
                    const value = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'AssertError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];
                    const value1 = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];

                    window.AmauiTest.assert(value).eql(value1);
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

                    window.AmauiTest.assert(value).eql(value1);
                  });

                  to('a13', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  post(async () => {
                    await window.AmauiUtils.wait(40);
                  });

                });

                to('a14', async () => {
                  window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
                });

                amauiTest.run();

                await window.AmauiUtils.wait(700);

                const partialArchives = amauiTest.archive.logs.length > 0;

                await window.AmauiUtils.wait(1400);

                return partialArchives && amauiTest.archive.logs.length > 140;
              });
              const values = [valueNode, ...valueBrowsers];

              values.forEach(value => expect(value).eq(true));
            });

            it('html', async () => {
              const valueBrowsers = await evaluate(async (window: any) => {
                const options = {
                  order: 'original',
                  results: {
                    to: ['html'],
                    at: 'auto'
                  },
                  response: {
                    on_fail: {
                      exit: false,
                      error: false,
                    }
                  }
                };

                if (!window.document.getElementById('amaui-test')) {
                  const div = window.document.createElement('div');

                  div.id = 'amaui-test';

                  div.innerHTML = `<div id='amaui-test-results'></div>`;

                  window.document.body.append(div);
                }
                else {
                  window.document.getElementById('amaui-test').innerHTML = `<div id='amaui-test-results'></div>`;
                }

                const amauiTest = new window.AmauiTest.AmauiTest(options);

                to('a', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a1', () => {

                  pre(async () => {
                    await window.AmauiUtils.wait(140);

                    throw new Error('a');
                  });

                  to('a2', async () => {
                    await window.AmauiUtils.wait(140);

                    window.AmauiTest.assert(true).true;
                  });

                  group('@amaui/a3', () => {

                    to('a3', async () => {
                      window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                        [
                          1
                        ],
                        [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ],
                        [
                          1,
                          2,
                          3,
                          4
                        ]
                      ]);
                    });

                  });

                  to('a4', async () => {
                    throw new Error('a');
                  });

                  group('@amaui/a5', () => {
                    let a;

                    pre(async () => {
                      await window.AmauiUtils.wait(14);
                    });

                    preTo(async () => {
                      await window.AmauiUtils.wait(140);

                      a = 4;
                    });

                    to('a5', async () => {
                      await window.AmauiUtils.wait(74);

                      const error: any = new Error('a');

                      // Added expected and expression message
                      error.name = 'An Error';
                      error.expected = 4;
                      error.expression = 'to be 🍊';

                      throw error;
                    });

                  });

                  to('a6', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a7', async () => {
                    window.AmauiTest.assert(4).true;
                  });

                  to('a8', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a9', async () => {
                    await window.AmauiTest.assert(function a() { }).throwAsync(4);
                  });

                  to('a10', async () => {
                    window.AmauiTest.assert(0).truthy;
                  });

                  to('a11', async () => {
                    const value = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'AssertError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];
                    const value1 = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];

                    window.AmauiTest.assert(value).eql(value1);
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

                    window.AmauiTest.assert(value).eql(value1);
                  });

                  to('a13', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  post(async () => {
                    await window.AmauiUtils.wait(40);
                  });

                });

                to('a14', async () => {
                  window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
                });

                amauiTest.run();

                await window.AmauiUtils.wait(700);

                const partialPrintHtml = window.document.getElementById('amaui-test').innerHTML.length > 140;

                await window.AmauiUtils.wait(1400);

                return partialPrintHtml && window.document.getElementById('amaui-test').innerHTML.length > 7400;
              });

              valueBrowsers.forEach(value => expect(value).eq(true));
            });

          });

          describe('end', () => {

            beforeEach(() => clearRequireCache());

            it('log', async () => {
              const options: IOptions = {
                imports: [
                  'ts-node/register/transpile-only'
                ],
                order: 'original',
                results: {
                  to: ['log'],
                  at: 'end'
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                },
                files: [
                  'test/example/test/**/a.test.ts'
                ]
              };

              const amauiTest = new AmauiTest(options);

              await amauiTest.init();

              amauiTest.run();

              await wait(700);

              const archiveLogs = copy(amauiTest.archive.logs);

              await wait(1400);

              const valueNode = !archiveLogs.length && amauiTest.archive.logs.length > 104;

              const valueBrowsers = await evaluate(async (window: any) => {
                const options = {
                  order: 'original',
                  results: {
                    to: ['log'],
                    at: 'end'
                  },
                  response: {
                    on_fail: {
                      exit: false,
                      error: false,
                    }
                  }
                };

                const amauiTest = new window.AmauiTest.AmauiTest(options);

                to('a', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a1', () => {

                  pre(async () => {
                    await window.AmauiUtils.wait(140);

                    throw new Error('a');
                  });

                  to('a2', async () => {
                    await window.AmauiUtils.wait(140);

                    window.AmauiTest.assert(true).true;
                  });

                  group('@amaui/a3', () => {

                    to('a3', async () => {
                      window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                        [
                          1
                        ],
                        [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ],
                        [
                          1,
                          2,
                          3,
                          4
                        ]
                      ]);
                    });

                  });

                  to('a4', async () => {
                    throw new Error('a');
                  });

                  group('@amaui/a5', () => {
                    let a;

                    pre(async () => {
                      await window.AmauiUtils.wait(14);
                    });

                    preTo(async () => {
                      await window.AmauiUtils.wait(140);

                      a = 4;
                    });

                    to('a5', async () => {
                      await window.AmauiUtils.wait(74);

                      const error: any = new Error('a');

                      // Added expected and expression message
                      error.name = 'An Error';
                      error.expected = 4;
                      error.expression = 'to be 🍊';

                      throw error;
                    });

                  });

                  to('a6', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a7', async () => {
                    window.AmauiTest.assert(4).true;
                  });

                  to('a8', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a9', async () => {
                    await window.AmauiTest.assert(function a() { }).throwAsync(4);
                  });

                  to('a10', async () => {
                    window.AmauiTest.assert(0).truthy;
                  });

                  to('a11', async () => {
                    const value = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'AssertError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];
                    const value1 = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];

                    window.AmauiTest.assert(value).eql(value1);
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

                    window.AmauiTest.assert(value).eql(value1);
                  });

                  to('a13', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  post(async () => {
                    await window.AmauiUtils.wait(40);
                  });

                });

                to('a14', async () => {
                  window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
                });

                amauiTest.run();

                await window.AmauiUtils.wait(700);

                const archiveLogs = window.AmauiUtils.copy(amauiTest.archive.logs);

                await window.AmauiUtils.wait(1400);

                return !archiveLogs.length && amauiTest.archive.logs.length > 140;
              });
              const values = [valueNode, ...valueBrowsers];

              values.forEach(value => expect(value).eq(true));
            });

            it('html', async () => {
              const valueBrowsers = await evaluate(async (window: any) => {
                const options = {
                  order: 'original',
                  results: {
                    to: ['html'],
                    at: 'end'
                  },
                  response: {
                    on_fail: {
                      exit: false,
                      error: false,
                    }
                  }
                };

                if (!window.document.getElementById('amaui-test')) {
                  const div = window.document.createElement('div');

                  div.id = 'amaui-test';

                  div.innerHTML = `<div id='amaui-test-results'></div>`;

                  window.document.body.append(div);
                }
                else {
                  window.document.getElementById('amaui-test').innerHTML = `<div id='amaui-test-results'></div>`;
                }

                const amauiTest = new window.AmauiTest.AmauiTest(options);

                to('a', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a1', () => {

                  pre(async () => {
                    await window.AmauiUtils.wait(140);

                    throw new Error('a');
                  });

                  to('a2', async () => {
                    await window.AmauiUtils.wait(140);

                    window.AmauiTest.assert(true).true;
                  });

                  group('@amaui/a3', () => {

                    to('a3', async () => {
                      window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                        [
                          1
                        ],
                        [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ],
                        [
                          1,
                          2,
                          3,
                          4
                        ]
                      ]);
                    });

                  });

                  to('a4', async () => {
                    throw new Error('a');
                  });

                  group('@amaui/a5', () => {
                    let a;

                    pre(async () => {
                      await window.AmauiUtils.wait(14);
                    });

                    preTo(async () => {
                      await window.AmauiUtils.wait(140);

                      a = 4;
                    });

                    to('a5', async () => {
                      await window.AmauiUtils.wait(74);

                      const error: any = new Error('a');

                      // Added expected and expression message
                      error.name = 'An Error';
                      error.expected = 4;
                      error.expression = 'to be 🍊';

                      throw error;
                    });

                  });

                  to('a6', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a7', async () => {
                    window.AmauiTest.assert(4).true;
                  });

                  to('a8', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a9', async () => {
                    await window.AmauiTest.assert(function a() { }).throwAsync(4);
                  });

                  to('a10', async () => {
                    window.AmauiTest.assert(0).truthy;
                  });

                  to('a11', async () => {
                    const value = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'AssertError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];
                    const value1 = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];

                    window.AmauiTest.assert(value).eql(value1);
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

                    window.AmauiTest.assert(value).eql(value1);
                  });

                  to('a13', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  post(async () => {
                    await window.AmauiUtils.wait(40);
                  });

                });

                to('a14', async () => {
                  window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
                });

                window.document.getElementById('amaui-test').innerHTML = `<div id='amaui-test-results'></div>`;

                amauiTest.run();

                await window.AmauiUtils.wait(700);

                const innerHTML = window.document.getElementById('amaui-test').innerHTML.length;

                await window.AmauiUtils.wait(1400);

                return innerHTML < 44 && window.document.getElementById('amaui-test').innerHTML.length > 7400;
              });

              const values = [...valueBrowsers];

              values.forEach(value => expect(value).eq(true));
            });

          });

          describe('html', () => {

            it('id', async () => {
              const valueBrowsers = await evaluate(async (window: any) => {
                const options = {
                  order: 'original',
                  results: {
                    to: ['html'],
                    html: {
                      id: 'a',
                    },
                  },
                  response: {
                    on_fail: {
                      exit: false,
                      error: false,
                    }
                  }
                };

                window.document.body.id = 'a';

                const amauiTest = new window.AmauiTest.AmauiTest(options);

                to('a', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a1', () => {

                  pre(async () => {
                    await window.AmauiUtils.wait(140);

                    throw new Error('a');
                  });

                  to('a2', async () => {
                    await window.AmauiUtils.wait(140);

                    window.AmauiTest.assert(true).true;
                  });

                  group('@amaui/a3', () => {

                    to('a3', async () => {
                      window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                        [
                          1
                        ],
                        [
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7
                        ],
                        [
                          1,
                          2,
                          3,
                          4
                        ]
                      ]);
                    });

                  });

                  to('a4', async () => {
                    throw new Error('a');
                  });

                  group('@amaui/a5', () => {
                    let a;

                    pre(async () => {
                      await window.AmauiUtils.wait(14);
                    });

                    preTo(async () => {
                      await window.AmauiUtils.wait(140);

                      a = 4;
                    });

                    to('a5', async () => {
                      await window.AmauiUtils.wait(74);

                      const error: any = new Error('a');

                      // Added expected and expression message
                      error.name = 'An Error';
                      error.expected = 4;
                      error.expression = 'to be 🍊';

                      throw error;
                    });

                  });

                  to('a6', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a7', async () => {
                    window.AmauiTest.assert(4).true;
                  });

                  to('a8', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  to('a9', async () => {
                    await window.AmauiTest.assert(function a() { }).throwAsync(4);
                  });

                  to('a10', async () => {
                    window.AmauiTest.assert(0).truthy;
                  });

                  to('a11', async () => {
                    const value = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'AssertError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];
                    const value1 = [
                      'AmauiError',
                      'AmauiAwsError',
                      'AmauiTestError',
                      'AmauiAmqpError',
                      'AuthenticationError',
                      'AuthorizationError',
                      'ValidationError',
                      'PermissionError',
                      'AmauiMongoError',
                      'ConnectionError',
                      'NotFoundError',
                      'DeveloperError',
                    ];

                    window.AmauiTest.assert(value).eql(value1);
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

                    window.AmauiTest.assert(value).eql(value1);
                  });

                  to('a13', async () => {
                    window.AmauiTest.assert(true).true;
                  });

                  post(async () => {
                    await window.AmauiUtils.wait(40);
                  });

                });

                to('a14', async () => {
                  window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
                });

                await amauiTest.run();

                return window.document.body.innerHTML.length > 7400;
              });

              valueBrowsers.forEach(value => expect(value).eq(true));
            });

          });

        });

        describe('errors_minify', () => {

          it('true', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: true,
                errors_minify: true,
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            to('a1', () => {
              throw new Error('a');
            });

            await amauiTest.run();

            const valueNode = amauiTest.archive.logs.reduce((result, item) => result += item.length, 0) < 340;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                results: {
                  errors_minify: true,
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a1', () => {
                throw new Error('a');
              });

              await amauiTest.run();

              return amauiTest.archive.logs.reduce((result, item) => result += item.length, 0) < 340;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

          it('false', async () => {
            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                results: {
                  errors_minify: false,
                },
                response: {
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a1', () => {
                throw new Error('a');
              });

              await amauiTest.run();

              return amauiTest.archive.logs.reduce((result, item) => result += item.length, 0) > 340;
            });

            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: true,
                errors_minify: false,
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              }
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            to('a1', () => {
              throw new Error('a');
            });

            await amauiTest.run();

            const valueNode = amauiTest.archive.logs.reduce((result, item) => result += item.length, 0) > 340;

            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

        });

      });

      describe('response', () => {

        describe('timeout', () => {

          it('to', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                timeout: {
                  to: 14
                },
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const value = {
              summary: amauiTest.mainGroup.summary,
              tos: []
            };

            value.tos.push(
              [
                amauiTest.mainGroup.tos[0].name,
                amauiTest.mainGroup.tos[0].response.type,
              ],
              [
                amauiTest.mainGroup.groups[0].tos[0].name,
                amauiTest.mainGroup.groups[0].tos[0].response.type,
                amauiTest.mainGroup.groups[0].tos[0].response.response.message
              ]
            );

            const valueNode = value;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  timeout: {
                    to: 14
                  },
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(4).eq(4);
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a: any;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(4).eq(4);
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'window.AmauiTest.AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              const value = {
                summary: amauiTest.mainGroup.summary,
                tos: []
              };

              value.tos.push(
                [
                  amauiTest.mainGroup.tos[0].name,
                  amauiTest.mainGroup.tos[0].response.type,
                ],
                [
                  amauiTest.mainGroup.groups[0].tos[0].name,
                  amauiTest.mainGroup.groups[0].tos[0].response.type,
                  amauiTest.mainGroup.groups[0].tos[0].response.response.message
                ]
              );

              return value;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eql({
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
              tos: [
                [
                  'a',
                  'success'
                ],
                [
                  'a2',
                  'error',
                  'Exceeded 14 milliseconds'
                ]
              ]
            }));
          });

          it('middleware', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                timeout: {
                  middleware: 40
                },
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const value = {
              summary: amauiTest.mainGroup.summary,
              pres: []
            };

            value.pres.push(
              [
                amauiTest.mainGroup.groups[0].pre[0].responses[0].type,
                amauiTest.mainGroup.groups[0].pre[0].responses[0].response.message,
              ],
              [
                amauiTest.mainGroup.groups[0].groups[1].pre[0].responses[0].type
              ]
            );

            const valueNode = value;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  timeout: {
                    middleware: 40
                  },
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(4).eq(4);
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a: any;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(4).eq(4);
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'window.AmauiTest.AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              const value = {
                summary: amauiTest.mainGroup.summary,
                pres: []
              };

              value.pres.push(
                [
                  amauiTest.mainGroup.groups[0].pre[0].responses[0].type,
                  amauiTest.mainGroup.groups[0].pre[0].responses[0].response.message,
                ],
                [
                  amauiTest.mainGroup.groups[0].groups[1].pre[0].responses[0].type
                ]
              );

              return value;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eql({
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
              pres: [
                [
                  'error',
                  'Exceeded 40 milliseconds'
                ],
                [
                  'success'
                ]
              ]
            }));
          });

        });

        describe('measurement', () => {

          it('slow', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                measurement: {
                  slow: 14
                },
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const value = {
              summary: amauiTest.mainGroup.summary,
              tos: []
            };

            value.tos.push(
              [
                amauiTest.mainGroup.tos[0].name,
                amauiTest.mainGroup.tos[0].response.measurement,
              ],
              [
                amauiTest.mainGroup.groups[0].tos[2].name,
                amauiTest.mainGroup.groups[0].tos[2].response.measurement.slow
              ]
            );

            const valueNode = value;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  measurement: {
                    slow: 14
                  },
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(4).eq(4);
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a: any;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(4).eq(4);
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'window.AmauiTest.AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              const value = {
                summary: amauiTest.mainGroup.summary,
                tos: []
              };

              value.tos.push(
                [
                  amauiTest.mainGroup.tos[0].name,
                  amauiTest.mainGroup.tos[0].response.measurement,
                ],
                [
                  amauiTest.mainGroup.groups[0].tos[2].name,
                  amauiTest.mainGroup.groups[0].tos[2].response.measurement.slow
                ]
              );

              return value;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eql({
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
              tos: [
                [
                  'a',
                  {}
                ],
                [
                  'a6',
                  true
                ]
              ]
            }));
          });

          it('very slow', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                measurement: {
                  very_slow: 14
                },
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const value = {
              summary: amauiTest.mainGroup.summary,
              tos: []
            };

            value.tos.push(
              [
                amauiTest.mainGroup.tos[0].name,
                amauiTest.mainGroup.tos[0].response.measurement,
              ],
              [
                amauiTest.mainGroup.groups[0].tos[0].name,
                amauiTest.mainGroup.groups[0].tos[0].response.measurement.very_slow
              ],
              [
                amauiTest.mainGroup.groups[0].tos[2].name,
                amauiTest.mainGroup.groups[0].tos[2].response.measurement.very_slow
              ]
            );

            const valueNode = value;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  measurement: {
                    very_slow: 14
                  },
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(4).eq(4);
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a: any;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(4).eq(4);
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'window.AmauiTest.AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              await amauiTest.run();

              const value = {
                summary: amauiTest.mainGroup.summary,
                tos: []
              };

              value.tos.push(
                [
                  amauiTest.mainGroup.tos[0].name,
                  amauiTest.mainGroup.tos[0].response.measurement,
                ],
                [
                  amauiTest.mainGroup.groups[0].tos[0].name,
                  amauiTest.mainGroup.groups[0].tos[0].response.measurement.very_slow
                ],
                [
                  amauiTest.mainGroup.groups[0].tos[2].name,
                  amauiTest.mainGroup.groups[0].tos[2].response.measurement.very_slow
                ]
              );

              return value;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eql({
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
              tos: [
                ['a', {}],
                ['a2', true],
                ['a6', true]
              ]
            }));
          });

        });

        describe('on_fail', () => {

          it('error / exit false', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                on_fail: {
                  exit: false,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            await amauiTest.run();

            const valueNode = true;

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  timeout: {
                    to: 14
                  },
                  on_fail: {
                    exit: false,
                    error: false,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(true).true;
              });

              group('@amaui/a', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a1', async () => {
                  await window.AmauiUtils.wait(40);

                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a11', () => {

                  to('a11', async () => {
                    window.AmauiTest.assert('a').eq(4);
                  });

                });

                to('a3', async () => {
                  window.AmauiTest.assert(true).true;
                });

                group('@amaui/a14', () => {
                  let a;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a14', async () => {
                    window.AmauiTest.assert('a').eq(a);
                  });

                });

                to('a4', async () => {
                  window.AmauiTest.assert('a').eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a7', async () => {
                window.AmauiTest.assert(true).true;
              });

              await amauiTest.run();

              return true;
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eq(true));
          });

          it('exit', async () => {
            // Add AMAUI_ENV value to process.env
            process.env.AMAUI_ENV = 'test';

            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                on_fail: {
                  exit: true,
                  error: false,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            let value: any;

            try {
              await amauiTest.run();
            }
            catch (error) {
              value = error;
            }

            expect(value.name).eq('AmauiTestError');
            expect(value.message).eq('exit');
          });

          it('error', async () => {
            const options: IOptions = {
              imports: [
                'ts-node/register/transpile-only',
              ],
              results: {
                print: false,
              },
              response: {
                on_fail: {
                  exit: false,
                  error: true,
                }
              },
              files: [
                'test/example/test/**/a.test.ts',
              ]
            };

            const amauiTest = new AmauiTest(options);

            await amauiTest.init();

            let valueNode: any;

            try {
              await amauiTest.run();
            }
            catch (error) {
              valueNode = [
                error.name,
                error.message
              ];
            }

            const valueBrowsers = await evaluate(async (window: any) => {
              const options = {
                response: {
                  on_fail: {
                    error: true,
                  }
                }
              };

              const amauiTest = new window.AmauiTest.AmauiTest(options);

              to('a', async () => {
                window.AmauiTest.assert(4).eq(4);
              });

              group('@amaui/a1', () => {

                pre(async () => {
                  await window.AmauiUtils.wait(140);

                  throw new Error('a');
                });

                to('a2', async () => {
                  await window.AmauiUtils.wait(140);

                  window.AmauiTest.assert(4).eq(4);
                });

                group('@amaui/a3', () => {

                  to('a3', async () => {
                    window.AmauiTest.assert([1, 4, 3, 7]).any.eq([
                      [
                        1
                      ],
                      [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                      ],
                      [
                        1,
                        2,
                        3,
                        4
                      ]
                    ]);
                  });

                });

                to('a4', async () => {
                  throw new Error('a');
                });

                group('@amaui/a5', () => {
                  let a: any;

                  pre(async () => {
                    await window.AmauiUtils.wait(14);
                  });

                  preTo(async () => {
                    await window.AmauiUtils.wait(140);

                    a = 4;
                  });

                  to('a5', async () => {
                    const error: any = new Error('a');

                    // Added expected and expression message
                    error.name = 'An Error';
                    error.expected = 4;
                    error.expression = 'to be 🍊';

                    throw error;
                  });

                });

                to('a6', async () => {
                  await window.AmauiUtils.wait(74);

                  window.AmauiTest.assert(4).eq(4);
                });

                to('a7', async () => {
                  window.AmauiTest.assert(4).true;
                });

                to('a8', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                to('a9', async () => {
                  await window.AmauiTest.assert(function a() { }).throwAsync(4);
                });

                to('a10', async () => {
                  window.AmauiTest.assert(0).truthy;
                });

                to('a11', async () => {
                  const value = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'window.AmauiTest.AssertError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];
                  const value1 = [
                    'AmauiError',
                    'AmauiAwsError',
                    'AmauiTestError',
                    'AmauiAmqpError',
                    'AuthenticationError',
                    'AuthorizationError',
                    'ValidationError',
                    'PermissionError',
                    'AmauiMongoError',
                    'ConnectionError',
                    'NotFoundError',
                    'DeveloperError',
                  ];

                  window.AmauiTest.assert(value).eql(value1);
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

                  window.AmauiTest.assert(value).eql(value1);
                });

                to('a13', async () => {
                  window.AmauiTest.assert(4).eq(4);
                });

                post(async () => {
                  await window.AmauiUtils.wait(40);
                });

              });

              to('a14', async () => {
                window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
              });

              let value: any;

              try {
                await amauiTest.run();
              }
              catch (error) {
                value = error;
              }

              return [
                value.name,
                value.message
              ];
            });
            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => expect(value).eql([
              'AmauiTestError',
              '9 tests failed'
            ]));
          });

        });

      });

      describe('files', () => {

        beforeEach(() => clearRequireCache());

        it('files string', async () => {
          const options: IOptions = {
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
            files: 'test/example/test/**/a.test.ts'
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          await amauiTest.run();

          const value = {
            summary: amauiTest.mainGroup.summary,
            options: amauiTest.options,
          };

          expect(value.options.files.indexOf('test/**/a.test.ts') > -1).true;

          delete value.options.files;

          expect(value).eql({
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
        });

        it('files array', async () => {
          const options: IOptions = {
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
            files: [
              'test/example/test/**/a.test.ts',
            ]
          };

          const amauiTest = new AmauiTest(options);

          await amauiTest.init();

          await amauiTest.run();

          const value = {
            summary: amauiTest.mainGroup.summary,
            options: amauiTest.options,
          };

          expect(value.options.files[0].indexOf('test/**/a.test.ts') > -1).true;

          delete value.options.files;

          expect(value).eql({
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
        });

      });

      it('amaui-test.options.js', async () => {
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

        const options: IOptions = {};

        const amauiTest = new AmauiTest(options);

        await amauiTest.init();

        await amauiTest.run();

        const value = {
          summary: amauiTest.mainGroup.summary,
          options: amauiTest.options,
        };

        expect(value.options.files.indexOf('test/example/test/**/a.test.ts') > -1).true;

        delete value.options.files;

        expect(value).eql({
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

        // Remove example/package.json
        await AmauiNode.file.remove(path.join(process.cwd(), 'amaui-test.options.js'));
      });

      it('package', async () => {
        // Create package.json
        await AmauiNode.file.add(
          path.resolve('test/example/package.json'),
          JSON.stringify({
            'amaui-test': {
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
              files: 'test/**/a.test.ts',
            }
          })
        );

        const options: IOptions = {
          package: 'test/example/package.json'
        };

        const amauiTest = new AmauiTest(options);

        await amauiTest.init();

        await amauiTest.run();

        const value = {
          summary: amauiTest.mainGroup.summary,
          options: amauiTest.options,
        };

        expect(value.options.package.indexOf('test/example/package.json') > -1).true;

        expect(value.options.files.indexOf('test/**/a.test.ts') > -1).true;

        delete value.options.package;
        delete value.options.files;

        expect(value).eql({
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

        // Remove example/package.json
        await AmauiNode.file.remove(path.resolve('test/example/package.json'));
      });

      it(`amaui-test.options.js priority over package.json 'amaui-test'`, async () => {
        // Create amaui-test.options.js and package.json
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
        await AmauiNode.file.add(
          path.resolve('test/example/package.json'),
          JSON.stringify({
            'amaui-test': {
              files: 'test/**/a1.test.ts',
            }
          })
        );

        const options: IOptions = {
          package: 'test/example/package.json'
        };

        const amauiTest = new AmauiTest(options);

        await amauiTest.init();

        await amauiTest.run();

        const value = {
          summary: amauiTest.mainGroup.summary,
          options: amauiTest.options,
        };

        expect(value.options.package.indexOf('test/example/package.json') > -1).true;

        expect(value.options.files.indexOf('test/**/a.test.ts') > -1).true;

        delete value.options.package;
        delete value.options.files;

        expect(value).eql({
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

        // Remove amaui-test.options.js and example/package.json
        await AmauiNode.file.remove(path.join(process.cwd(), 'amaui-test.options.js'));
        await AmauiNode.file.remove(path.resolve('test/example/package.json'));
      });

    });

    it('subscription', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      const values_ = [];

      amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

      await amauiTest.init();

      await amauiTest.run();

      const valueNode = values_.filter(Boolean);

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a', () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a1', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          preEveryGroupTo(async () => {
            await window.AmauiUtils.wait(14);
          });

          to('a2', async () => {
            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a3', () => {

            to('a3', async () => {
              window.AmauiTest.assert(function a() { }).eq(undefined);
            });

          });

          to('a4', () => {
            [1, 2, 3, 4].forEach(value => {
              window.AmauiTest.assert(typeof value === 'number').true;

              throw new Error('a');
            });
          });

          group('@amaui/a5', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

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
            await window.AmauiUtils.wait(74);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a7', async () => {
            window.AmauiTest.assert(['padding-left', 'padding', 'padding-right']).eql(['padding', 'padding-left', 'padding-right']);
          });

          to('a8', async resolve => {
            await window.AmauiUtils.wait(4);

            resolve();

            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a9', async () => {
            await window.AmauiTest.assert(function a() { }).throwAsync(4);
          });

          to('a10', async () => {
            window.AmauiTest.assert({
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
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'AssertError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];
            const value1 = [
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];

            window.AmauiTest.assert(value).eql(value1);
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

            window.AmauiTest.assert(value).eql(value1);
          });

          to('a13', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(40);
          });

          postEveryGroupTo(async () => {
            await window.AmauiUtils.wait(14);
          });
        });

        to('a14', async () => {
          window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
        });

        const values_ = [];

        amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

        await amauiTest.run();

        return values_.filter(Boolean);
      });

      expect(valueNode).eql([
        'new',
        'prepare',
        'imports',
        'init_node',
        ...valueBrowsers[0],
      ]);

      valueBrowsers.forEach(value => expect(value).eql([
        "running", "preAll", "group", ["main", undefined], "to", ["a", "main"], "to:end", ["a", "main"], "group", ["@amaui/a1", "main"], "middleware", ["pre", "@amaui/a1"], "middleware:end", ["pre", "@amaui/a1"], "to", ["a2", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a2", "@amaui/a1"], "group", ["@amaui/a3", "@amaui/a1"], "to", ["a3", "@amaui/a3"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a3", "@amaui/a3"], "group:end", ["@amaui/a3", "@amaui/a1"], "to", ["a4", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a4", "@amaui/a1"], "group", ["@amaui/a5", "@amaui/a1"], "middleware", ["pre", "@amaui/a5"], "middleware:end", ["pre", "@amaui/a5"], "to", ["a5", "@amaui/a5"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["preTo", "@amaui/a5"], "middleware:end", ["preTo", "@amaui/a5"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a5", "@amaui/a5"], "group:end", ["@amaui/a5", "@amaui/a1"], "to", ["a6", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a6", "@amaui/a1"], "to", ["a7", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a7", "@amaui/a1"], "to", ["a8", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a8", "@amaui/a1"], "to", ["a9", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a9", "@amaui/a1"], "to", ["a10", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a10", "@amaui/a1"], "to", ["a11", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a11", "@amaui/a1"], "to", ["a12", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a12", "@amaui/a1"], "to", ["a13", "@amaui/a1"], "middleware", ["preEveryGroupTo", "@amaui/a1"], "middleware:end", ["preEveryGroupTo", "@amaui/a1"], "middleware", ["postEveryGroupTo", "@amaui/a1"], "middleware:end", ["postEveryGroupTo", "@amaui/a1"], "to:end", ["a13", "@amaui/a1"], "middleware", ["post", "@amaui/a1"], "middleware:end", ["post", "@amaui/a1"], "group:end", ["@amaui/a1", "main"], "to", ["a14", "main"], "to:end", ["a14", "main"], "group:end", ["main", undefined], "postAll", "completed", "printed", "idle", "clear", "fail", "success"
      ]));
    });

    it('all environment methods', async () => {
      const options: IOptions = {
        imports: ['ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a4.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      const values_ = [];

      amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

      await amauiTest.init();

      await amauiTest.run();

      const valueNode = values_.filter(Boolean);

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        preAll(async () => {
          await window.AmauiUtils.wait(40);
        });

        preEveryGroup(async () => {
          await window.AmauiUtils.wait(40);
        });

        preEveryGroupGroup(async () => {
          await window.AmauiUtils.wait(141);
        });

        preEveryTo(async () => {
          await window.AmauiUtils.wait(4);
        });

        preEveryGroupTo(async () => {
          await window.AmauiUtils.wait(14);
        });

        to('a', async () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          preEveryGroupGroup(async () => {
            await window.AmauiUtils.wait(141);
          });

          preTo(async () => {
            await window.AmauiUtils.wait(40);
          });

          preEveryGroupTo(async () => {
            await window.AmauiUtils.wait(14);
          });

          to('a1', async () => {
            await window.AmauiUtils.wait(40);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a11', () => {

            to('a11', async () => {
              window.AmauiTest.assert('a').eq(4);
            });

          });

          to('a3', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a14', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

              a = 4;
            });

            to('a14', async () => {
              window.AmauiTest.assert('a').eq(a);
            });

          });

          to('a4', async () => {
            window.AmauiTest.assert('a').eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          postEveryGroupGroup(async () => {
            await window.AmauiUtils.wait(141);
          });

          postTo(async () => {
            await window.AmauiUtils.wait(40);
          });

          postEveryGroupTo(async () => {
            await window.AmauiUtils.wait(14);
          });

        });

        to('a7', async () => {
          window.AmauiTest.assert(4).eq(4);
        });

        postEveryGroup(async () => {
          await window.AmauiUtils.wait(40);
        });

        postEveryGroupGroup(async () => {
          await window.AmauiUtils.wait(141);
        });

        postEveryGroupTo(async () => {
          await window.AmauiUtils.wait(14);
        });

        postEveryTo(async () => {
          await window.AmauiUtils.wait(4);
        });

        postAll(async () => {
          await window.AmauiUtils.wait(40);
        });

        const values_ = [];

        amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

        await amauiTest.run();

        return values_.filter(Boolean);
      });

      expect(valueNode).eql([
        'new',
        'prepare',
        'imports',
        'init_node',
        ...valueBrowsers[0],
      ]);

      expect(valueBrowsers[0]).eql(["running", "middleware", ["preAll", "main"], "middleware:end", ["preAll", "main"], "preAll", "group", ["main", undefined], "middleware", ["preEveryGroup", "main"], "middleware:end", ["preEveryGroup", "main"], "to", ["a", "main"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "to:end", ["a", "main"], "group", ["@amaui/a", "main"], "middleware", ["preEveryGroup", "main"], "middleware:end", ["preEveryGroup", "main"], "middleware", ["preEveryGroupGroup", "main"], "middleware:end", ["preEveryGroupGroup", "main"], "middleware", ["pre", "@amaui/a"], "middleware:end", ["pre", "@amaui/a"], "to", ["a1", "@amaui/a"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "@amaui/a"], "middleware:end", ["preEveryGroupTo", "@amaui/a"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["preTo", "@amaui/a"], "middleware:end", ["preTo", "@amaui/a"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "@amaui/a"], "middleware:end", ["postEveryGroupTo", "@amaui/a"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "middleware", ["postTo", "@amaui/a"], "middleware:end", ["postTo", "@amaui/a"], "to:end", ["a1", "@amaui/a"], "group", ["@amaui/a11", "@amaui/a"], "middleware", ["preEveryGroup", "main"], "middleware:end", ["preEveryGroup", "main"], "middleware", ["preEveryGroupGroup", "@amaui/a"], "middleware:end", ["preEveryGroupGroup", "@amaui/a"], "middleware", ["preEveryGroupGroup", "main"], "middleware:end", ["preEveryGroupGroup", "main"], "to", ["a11", "@amaui/a11"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "@amaui/a"], "middleware:end", ["preEveryGroupTo", "@amaui/a"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "@amaui/a"], "middleware:end", ["postEveryGroupTo", "@amaui/a"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "to:end", ["a11", "@amaui/a11"], "middleware", ["postEveryGroup", "main"], "middleware:end", ["postEveryGroup", "main"], "middleware", ["postEveryGroupGroup", "@amaui/a"], "middleware:end", ["postEveryGroupGroup", "@amaui/a"], "middleware", ["postEveryGroupGroup", "main"], "middleware:end", ["postEveryGroupGroup", "main"], "group:end", ["@amaui/a11", "@amaui/a"], "to", ["a3", "@amaui/a"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "@amaui/a"], "middleware:end", ["preEveryGroupTo", "@amaui/a"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["preTo", "@amaui/a"], "middleware:end", ["preTo", "@amaui/a"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "@amaui/a"], "middleware:end", ["postEveryGroupTo", "@amaui/a"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "middleware", ["postTo", "@amaui/a"], "middleware:end", ["postTo", "@amaui/a"], "to:end", ["a3", "@amaui/a"], "group", ["@amaui/a14", "@amaui/a"], "middleware", ["preEveryGroup", "main"], "middleware:end", ["preEveryGroup", "main"], "middleware", ["preEveryGroupGroup", "@amaui/a"], "middleware:end", ["preEveryGroupGroup", "@amaui/a"], "middleware", ["preEveryGroupGroup", "main"], "middleware:end", ["preEveryGroupGroup", "main"], "middleware", ["pre", "@amaui/a14"], "middleware:end", ["pre", "@amaui/a14"], "to", ["a14", "@amaui/a14"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "@amaui/a"], "middleware:end", ["preEveryGroupTo", "@amaui/a"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["preTo", "@amaui/a14"], "middleware:end", ["preTo", "@amaui/a14"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "@amaui/a"], "middleware:end", ["postEveryGroupTo", "@amaui/a"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "to:end", ["a14", "@amaui/a14"], "middleware", ["postEveryGroup", "main"], "middleware:end", ["postEveryGroup", "main"], "middleware", ["postEveryGroupGroup", "@amaui/a"], "middleware:end", ["postEveryGroupGroup", "@amaui/a"], "middleware", ["postEveryGroupGroup", "main"], "middleware:end", ["postEveryGroupGroup", "main"], "group:end", ["@amaui/a14", "@amaui/a"], "to", ["a4", "@amaui/a"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "@amaui/a"], "middleware:end", ["preEveryGroupTo", "@amaui/a"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["preTo", "@amaui/a"], "middleware:end", ["preTo", "@amaui/a"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "@amaui/a"], "middleware:end", ["postEveryGroupTo", "@amaui/a"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "middleware", ["postTo", "@amaui/a"], "middleware:end", ["postTo", "@amaui/a"], "to:end", ["a4", "@amaui/a"], "middleware", ["postEveryGroup", "main"], "middleware:end", ["postEveryGroup", "main"], "middleware", ["postEveryGroupGroup", "main"], "middleware:end", ["postEveryGroupGroup", "main"], "middleware", ["post", "@amaui/a"], "middleware:end", ["post", "@amaui/a"], "group:end", ["@amaui/a", "main"], "to", ["a7", "main"], "middleware", ["preEveryTo", "main"], "middleware:end", ["preEveryTo", "main"], "middleware", ["preEveryGroupTo", "main"], "middleware:end", ["preEveryGroupTo", "main"], "middleware", ["postEveryTo", "main"], "middleware:end", ["postEveryTo", "main"], "middleware", ["postEveryGroupTo", "main"], "middleware:end", ["postEveryGroupTo", "main"], "to:end", ["a7", "main"], "middleware", ["postEveryGroup", "main"], "middleware:end", ["postEveryGroup", "main"], "group:end", ["main", undefined], "middleware", ["postAll", "main"], "middleware:end", ["postAll", "main"], "postAll", "completed", "printed", "idle", "clear", "fail", "success"]);
    });

    it('clear', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      const values_ = [];

      const amauiEvents = [];

      const amauiEventsMethod = () => amauiEvents.push(true);

      global.amauiEvents.on('amaui-test-clear', amauiEventsMethod);

      amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

      await amauiTest.init();

      amauiTest.run();

      await wait(440);

      await amauiTest.clear(() => values_.push('clearMethod'));

      const valueNode = [amauiEvents, values_.filter(Boolean)];

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a', () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a1', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          to('a2', async () => {
            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a3', () => {

            to('a3', async () => {
              window.AmauiTest.assert(function a() { }).eq(undefined);
            });

          });

          to('a4', () => {
            throw new Error('a');
          });

          group('@amaui/a5', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

              a = 4;
            });

            to('a5', async () => {
              const error: any = new Error('a');

              // Added expected and expression message
              error.name = 'An Error';
              error.expected = 4;
              error.expression = 'to be 🍊';

              throw error;
            });

          });

          to('a6', async () => {
            await window.AmauiUtils.wait(74);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a7', async () => {
            window.AmauiTest.assert(4).true;
          });

          to('a8', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          to('a9', async () => {
            await window.AmauiTest.assert(function a() { }).throwAsync(4);
          });

          to('a10', async () => {
            window.AmauiTest.assert(0).truthy;
          });

          to('a11', async () => {
            const value = [
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'window.AmauiTest.AssertError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];
            const value1 = [
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];

            window.AmauiTest.assert(value).eql(value1);
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

            window.AmauiTest.assert(value).eql(value1);
          });

          to('a13', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(40);
          });

        });

        to('a14', async () => {
          window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
        });

        const values_ = [];

        const amauiEvents = [];

        const amauiEventsMethod = () => amauiEvents.push(true);

        window.addEventListener('amaui-test-clear', amauiEventsMethod);

        amauiTest.subscription.subscribe((name, value) => values_.push(name, value?.name ? [value.name, value.parent?.name] : value));

        amauiTest.run();

        await window.AmauiUtils.wait(440);

        await amauiTest.clear(() => values_.push('clearMethod'));

        window.removeEventListener('amaui-test-clear', amauiEventsMethod);

        return [amauiEvents, values_.filter(Boolean)];
      });

      expect(valueNode).eql([
        [true],
        [
          'new',
          'prepare',
          'imports',
          'init_node',
          ...valueBrowsers[0][1],
        ]
      ]);

      valueBrowsers.forEach(value => expect(value).eql([
        [true],
        [
          'running',
          'preAll',
          'group', ['main', undefined],
          'to', ['a', 'main'],
          'to:end', ['a', 'main'],
          'group', ['@amaui/a1', 'main'],
          'middleware', ['pre', '@amaui/a1'],
          'clearMethod'
        ]
      ]));

      global.amauiEvents.off('amaui-test-clear', amauiEventsMethod);
    });

    describe('printManual', () => {

      it('log', async () => {
        const options: IOptions = {
          imports: [
            'ts-node/register/transpile-only'
          ],
          order: 'original',
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          },
          files: [
            'test/example/test/**/a.test.ts'
          ]
        };

        const amauiTest = new AmauiTest(options);

        await amauiTest.init();

        await amauiTest.run();

        amauiTest.archive.logs = [];

        amauiTest.printManual();

        const valueNode = amauiTest.archive.logs.length > 104;

        const valueBrowsers = await evaluate(async (window: any) => {
          const options = {
            order: 'original',
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            }
          };

          const amauiTest = new window.AmauiTest.AmauiTest(options);

          to('a', async () => {
            window.AmauiTest.assert(true).true;
          });

          group('@amaui/a1', () => {

            pre(async () => {
              await window.AmauiUtils.wait(140);

              throw new Error('a');
            });

            to('a2', async () => {
              await window.AmauiUtils.wait(140);

              window.AmauiTest.assert(true).true;
            });

            group('@amaui/a3', () => {

              to('a3', async () => {
                window.AmauiTest.assert(function a() { }).eq(undefined);
              });

            });

            to('a4', async () => {
              throw new Error('a');
            });

            group('@amaui/a5', () => {
              let a;

              pre(async () => {
                await window.AmauiUtils.wait(14);
              });

              preTo(async () => {
                await window.AmauiUtils.wait(140);

                a = 4;
              });

              to('a5', async () => {
                await window.AmauiUtils.wait(74);

                const error: any = new Error('a');

                // Added expected and expression message
                error.name = 'An Error';
                error.expected = 4;
                error.expression = 'to be 🍊';

                throw error;
              });

            });

            to('a6', async () => {
              window.AmauiTest.assert(true).true;
            });

            to('a7', async () => {
              window.AmauiTest.assert(4).true;
            });

            to('a8', async () => {
              window.AmauiTest.assert(true).true;
            });

            to('a9', async () => {
              await window.AmauiTest.assert(function a() { }).throwAsync(4);
            });

            to('a10', async () => {
              window.AmauiTest.assert(0).truthy;
            });

            to('a11', async () => {
              const value = [
                'AmauiError',
                'AmauiAwsError',
                'AmauiTestError',
                'AmauiAmqpError',
                'AuthenticationError',
                'AuthorizationError',
                'AssertError',
                'ValidationError',
                'PermissionError',
                'AmauiMongoError',
                'ConnectionError',
                'NotFoundError',
                'DeveloperError',
              ];
              const value1 = [
                'AmauiError',
                'AmauiAwsError',
                'AmauiTestError',
                'AmauiAmqpError',
                'AuthenticationError',
                'AuthorizationError',
                'ValidationError',
                'PermissionError',
                'AmauiMongoError',
                'ConnectionError',
                'NotFoundError',
                'DeveloperError',
              ];

              window.AmauiTest.assert(value).eql(value1);
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

              window.AmauiTest.assert(value).eql(value1);
            });

            to('a13', async () => {
              window.AmauiTest.assert(true).true;
            });

            post(async () => {
              await window.AmauiUtils.wait(40);
            });

          });

          to('a14', async () => {
            window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
          });

          await amauiTest.run();

          amauiTest.archive.logs = [];

          amauiTest.printManual();

          return amauiTest.archive.logs.length > 140;
        });
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => expect(value).eq(true));
      });

      it('html', async () => {
        const valueBrowsers = await evaluate(async (window: any) => {
          const options = {
            order: 'original',
            results: {
              to: ['html']
            },
            response: {
              on_fail: {
                exit: false,
                error: false,
              }
            }
          };

          if (!window.document.getElementById('amaui-test')) window.document.body.innerHTML = `<div id='amaui-test'><div id='amaui-test-results'></div></div>`;

          const amauiTest = new window.AmauiTest.AmauiTest(options);

          to('a', async () => {
            window.AmauiTest.assert(true).true;
          });

          group('@amaui/a1', () => {

            pre(async () => {
              await window.AmauiUtils.wait(140);

              throw new Error('a');
            });

            to('a2', async () => {
              await window.AmauiUtils.wait(140);

              window.AmauiTest.assert(true).true;
            });

            group('@amaui/a3', () => {

              to('a3', async () => {
                window.AmauiTest.assert(function a() { }).eq(undefined);
              });

            });

            to('a4', async () => {
              throw new Error('a');
            });

            group('@amaui/a5', () => {
              let a;

              pre(async () => {
                await window.AmauiUtils.wait(14);
              });

              preTo(async () => {
                await window.AmauiUtils.wait(140);

                a = 4;
              });

              to('a5', async () => {
                await window.AmauiUtils.wait(74);

                const error: any = new Error('a');

                // Added expected and expression message
                error.name = 'An Error';
                error.expected = 4;
                error.expression = 'to be 🍊';

                throw error;
              });

            });

            to('a6', async () => {
              window.AmauiTest.assert(true).true;
            });

            to('a7', async () => {
              window.AmauiTest.assert(4).true;
            });

            to('a8', async () => {
              window.AmauiTest.assert(true).true;
            });

            to('a9', async () => {
              await window.AmauiTest.assert(function a() { }).throwAsync(4);
            });

            to('a10', async () => {
              window.AmauiTest.assert(0).truthy;
            });

            to('a11', async () => {
              const value = [
                'AmauiError',
                'AmauiAwsError',
                'AmauiTestError',
                'AmauiAmqpError',
                'AuthenticationError',
                'AuthorizationError',
                'AssertError',
                'ValidationError',
                'PermissionError',
                'AmauiMongoError',
                'ConnectionError',
                'NotFoundError',
                'DeveloperError',
              ];
              const value1 = [
                'AmauiError',
                'AmauiAwsError',
                'AmauiTestError',
                'AmauiAmqpError',
                'AuthenticationError',
                'AuthorizationError',
                'ValidationError',
                'PermissionError',
                'AmauiMongoError',
                'ConnectionError',
                'NotFoundError',
                'DeveloperError',
              ];

              window.AmauiTest.assert(value).eql(value1);
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

              window.AmauiTest.assert(value).eql(value1);
            });

            to('a13', async () => {
              window.AmauiTest.assert(true).true;
            });

            post(async () => {
              await window.AmauiUtils.wait(40);
            });

          });

          to('a14', async () => {
            window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
          });

          await amauiTest.run();

          window.document.getElementById('amaui-test-results').innerHTML = '';

          amauiTest.printManual();

          return window.document.getElementById('amaui-test').innerHTML.length > 7400;
        });

        valueBrowsers.forEach(value => expect(value).eq(true));
      });

    });

    it('init', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only'
        ],
        order: 'original',
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts'
        ]
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      const valueNode = amauiTest.mainGroup.tos.length === 2;

      expect(valueNode).eql(true);
    });

    it('run', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only',
        ],
        results: {
          print: false,
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts',
        ]
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      await amauiTest.run();

      const valueNode = amauiTest.mainGroup.summary;

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a', () => {
          window.AmauiTest.assert(4).eq(4);
        });

        group('@amaui/a1', () => {

          pre(async () => {
            await window.AmauiUtils.wait(140);

            throw new Error('a');
          });

          to('a2', async () => {
            await window.AmauiUtils.wait(140);

            window.AmauiTest.assert(4).eq(4);
          });

          group('@amaui/a3', () => {

            to('a3', async () => {
              window.AmauiTest.assert(function a() { }).eq(undefined);
            });

          });

          to('a4', () => {
            throw new Error('a');
          });

          group('@amaui/a5', () => {
            let a: any;

            pre(async () => {
              await window.AmauiUtils.wait(14);
            });

            preTo(async () => {
              await window.AmauiUtils.wait(140);

              a = 4;
            });

            to('a5', async () => {
              const error: any = new Error('a');

              // Added expected and expression message
              error.name = 'An Error';
              error.expected = 4;
              error.expression = 'to be 🍊';

              throw error;
            });

          });

          to('a6', async () => {
            await window.AmauiUtils.wait(74);

            window.AmauiTest.assert(4).eq(4);
          });

          to('a7', async () => {
            window.AmauiTest.assert(4).true;
          });

          to('a8', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          to('a9', async () => {
            await window.AmauiTest.assert(function a() { }).throwAsync(4);
          });

          to('a10', async () => {
            window.AmauiTest.assert(0).truthy;
          });

          to('a11', async () => {
            const value = [
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'AssertError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];
            const value1 = [
              'AmauiError',
              'AmauiError',
              'AmauiAwsError',
              'AmauiTestError',
              'AmauiAmqpError',
              'AuthenticationError',
              'AuthorizationError',
              'ValidationError',
              'PermissionError',
              'AmauiMongoError',
              'ConnectionError',
              'NotFoundError',
              'DeveloperError',
              'AmauiError',
            ];

            window.AmauiTest.assert(value).eql(value1);
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

            window.AmauiTest.assert(value).eql(value1);
          });

          to('a13', async () => {
            window.AmauiTest.assert(4).eq(4);
          });

          post(async () => {
            await window.AmauiUtils.wait(40);
          });

        });

        to('a14', async () => {
          window.AmauiTest.assert(window.AmauiDate.timezones).eql([{ a: [function a() { }, { a: 4 }, 4] }]);
        });

        await amauiTest.run();

        return amauiTest.mainGroup.summary;
      });

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql({
        amount: {
          tos: 14,
          groups: 3
        },
        tos: {
          success: 5,
          fail: 9
        }
      }));
    });

    it('errors', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only',
        ],
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        }
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      to('a1', () => {
        throw new Error('a');
      });

      to('a4', () => {
        const error: any = new Error();

        // Added expected and expression message
        error.name = 'An Error';
        error.expected = 4;
        error.expression = 'to be 🍊';

        throw error;
      });

      to('a7', async () => {
        const error: any = new Error('a');

        // Added expected and expression message
        error.name = 'An Error';
        error.expected = 4;
        error.expression = 'to be 🍊';

        throw error;
      });

      await amauiTest.run();

      const valueNode = amauiTest.archive.logs;

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        to('a1', () => {
          throw new Error('a');
        });

        to('a4', () => {
          const error: any = new Error();

          // Added expected and expression message
          error.name = 'An Error';
          error.expected = 4;
          error.expression = 'to be 🍊';

          throw error;
        });

        to('a7', async () => {
          const error: any = new Error('a');

          // Added expected and expression message
          error.name = 'An Error';
          error.expected = 4;
          error.expression = 'to be 🍊';

          throw error;
        });

        await amauiTest.run();

        return amauiTest.archive.logs;
      });

      delete valueNode[8];
      delete valueNode[18];
      delete valueNode[23];
      delete valueNode[28];

      expect(valueNode.filter(Boolean)).eql([
        "\n\n  Amaui test running",
        "  \u001b[90m3 tests\u001b[0m",
        "\n\n",
        "  \u001b[31m1) a1\u001b[0m",
        "  \u001b[31m2) a4\u001b[0m",
        "  \u001b[31m3) a7\u001b[0m",
        "\n",
        " ",
        "\n",
        " ",
        "\u001b[92m0 passing\u001b[0m",
        " ",
        "\u001b[91m3 failed\u001b[0m",
        "\n",
        "  1) a1",
        " ",
        "  \u001b[91mError: a\u001b[0m",
        "\n",
        "  2) a4",
        " ",
        "  \u001b[91mAn Error: expected 4 to be 🍊 \u001b[0m",
        "\n",
        "  3) a7",
        " ",
        "  \u001b[91mAn Error: a\n\n            expected 4 to be 🍊 \u001b[0m",
        "\n"
      ]);

      delete valueBrowsers[0][11];
      delete valueBrowsers[0][23];
      delete valueBrowsers[0][30];
      delete valueBrowsers[0][37];

      expect(valueBrowsers[0].filter(Boolean)).eql([
        "\n\n  Amaui test running",
        "%c  3 tests",
        "color: #777",
        "\n\n\n",
        "  %c1) a1",
        "color: #d74644",
        "  %c2) a4",
        "color: #d74644",
        "  %c3) a7",
        "color: #d74644",
        "\n\n",
        "color: #777",
        "\n\n",
        "%c  0 passing",
        "color: #1fc926",
        "%c  3 failed",
        "color: #d74644",
        "\n\n",
        "  1) a1",
        " ",
        "%cError: a",
        "color: #d74644; padding-left: 14px;",
        "color: #777",
        "\n",
        "  2) a4",
        " ",
        "%cAn Error: expected 4 to be 🍊 ",
        "color: #d74644; padding-left: 14px;",
        "color: #777",
        "\n",
        "  3) a7",
        " ",
        "%cAn Error: a\n\n          expected 4 to be 🍊 ",
        "color: #d74644; padding-left: 14px;",
        "color: #777",
        "\n"
      ]);
    });

    it('resolve, reject and uncaught exceptions & rejections', async () => {
      const options: IOptions = {
        results: {
          print: false
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        }
      };

      const amauiTest = new AmauiTest(options);

      await amauiTest.init();

      const m = () => new Promise(() => {
        throw new Error('m4');
      });

      const m1 = () => new Promise(async () => {
        try {
          await m();
        }
        catch (error) {
          throw error;
        }
      });

      const m4 = () => new Promise(async () => {
        try {
          await m1();
        }
        catch (error) {
          throw error;
        }
      });

      const m5 = () => new Promise(() => {
        Promise.reject(new Error('m5'));
      });

      to('a', () => {
        assert(true).true;
      });

      to('a1', resolve => {
        resolve();
      });

      to('a2', resolve => {
        setTimeout(() => {
          resolve('a2');
        }, 140);
      });

      to('a3', async resolve => {
        await wait(4);

        resolve('a3');

        await wait(140);

        assert(4).eq(4);
      });

      to('a4', async () => {
        assert(true).false;
      });

      to('a5', (_, reject) => {
        reject(new Error('5'));
      });

      to('a6', (_, reject) => {
        setTimeout(() => {
          reject(new Error('6'));
        }, 140);
      });

      to('a7', async () => {
        await m4();
      });

      to('a8', async () => {
        await m5();
      });

      await amauiTest.run();

      const valueNode = amauiTest.mainGroup.tos.map(to => [to.name, to.response.type, to.response.response instanceof Error ? to.response.response.message : to.response.response]);

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          response: {
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        const m = () => new Promise(() => {
          throw new Error('m4');
        });

        const m1 = () => new Promise(async () => {
          try {
            await m();
          }
          catch (error) {
            throw error;
          }
        });

        const m4 = () => new Promise(async () => {
          try {
            await m1();
          }
          catch (error) {
            throw error;
          }
        });

        const m5 = () => new Promise(() => {
          Promise.reject(new Error('m5'));
        });

        to('a', () => {
          window.AmauiTest.assert(true).true;
        });

        to('a1', resolve => {
          resolve();
        });

        to('a2', resolve => {
          setTimeout(() => {
            resolve('a2');
          }, 140);
        });

        to('a3', async resolve => {
          await window.AmauiUtils.wait(4);

          resolve('a3');

          await window.AmauiUtils.wait(140);

          window.AmauiTest.assert(4).eq(4);
        });

        to('a4', async () => {
          window.AmauiTest.assert(true).false;
        });

        to('a5', (_, reject) => {
          reject(new Error('5'));
        });

        to('a6', (_, reject) => {
          setTimeout(() => {
            reject(new Error('6'));
          }, 140);
        });

        to('a7', async () => {
          await m4();
        });

        to('a8', async () => {
          await m5();
        });

        await amauiTest.run();

        return amauiTest.mainGroup.tos.map(to => [to.name, to.response.type, to.response.response instanceof Error ? to.response.response.message : to.response.response]);
      });
      const values = [valueNode, ...valueBrowsers];

      // Minor patch atm
      // Chrome error and unhandledrejection isn't catching uncaught exceptions at this moment
      values.forEach(value => {
        if (value[2] === null) value[2] = undefined;
      });

      values[1][7][2] = 'm4';
      values[1][8][2] = 'm5';

      values.forEach(value => expect(value).eql([
        ['a', 'success', undefined],
        ['a1', 'success', undefined],
        ['a2', 'success', 'a2'],
        ['a3', 'success', 'a3'],
        ['a4', 'error', ''],
        ['a5', 'error', '5'],
        ['a6', 'error', '6'],
        ['a7', 'error', 'm4'],
        ['a8', 'error', 'm5']
      ]));
    });

    it('prepareEnvironment', async () => {
      const options: IOptions = {
        imports: [
          'ts-node/register/transpile-only',
        ],
        results: {
          print: false,
        },
        response: {
          on_fail: {
            exit: false,
            error: false,
          }
        },
        files: [
          'test/example/test/**/a.test.ts',
        ]
      };

      const amauiTest = new AmauiTest(options);

      amauiTest.prepareEnvironment();

      const valueNode = [global.to, global.group, global.preAll, global.preEveryGroup, global.preEveryTo, global.pre, global.preTo, global.postAll, global.postEveryGroup, global.postEveryTo, global.post, global.postTo].map(item => !!item);

      const valueBrowsers = await evaluate(async (window: any) => {
        const options = {
          response: {
            timeout: {
              to: 14
            },
            on_fail: {
              exit: false,
              error: false,
            }
          }
        };

        const amauiTest = new window.AmauiTest.AmauiTest(options);

        amauiTest.prepareEnvironment();

        return [window.to, window.group, window.preAll, window.preEveryGroup, window.preEveryTo, window.pre, window.preTo, window.postAll, window.postEveryGroup, window.postEveryTo, window.post, window.postTo].map(item => !!item);
      });
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => expect(value).eql(new Array(12).fill(true)));
    });

  });

});
