
module.exports = {
  require: [
    'ts-node/register/transpile-only'
  ],
  recursive: true,
  exit: true,
  diff: true,
  extension: ['ts'],
  opts: false,
  package: './package.json',
  reporter: 'spec',
  spec: 'test/*.test.ts',
  slow: 400,
  timeout: 40000,
};
