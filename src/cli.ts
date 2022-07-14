#!/usr/bin/env node
import yargs from 'yargs';

import parse from '@amaui/utils/parse';

import AmauiTest, { IOptions } from './amaui-test';

export async function run(argv: any) {
  const { _, imports, order, resultsPrint, resultsTo, resultsAt, responseTimeoutTo, responseTimeoutMiddleware, responseMeasurementSlow, responseMeasurementVeryslow, responseOnfailExit, responseOnfailError, files: files_, package: package_ } = argv;

  const files = files_ || (_.length ? parse(_[0]) : '');

  const options: IOptions = {
    results: {},
    response: {
      timeout: {},
      measurement: {},
      on_fail: {},
    },
  };

  if (files) options.files = files;

  if (imports !== undefined) options.imports = imports;

  if (order !== undefined) options.order = order;

  if (resultsPrint !== undefined) options.results.print = resultsPrint;
  if (resultsTo !== undefined) options.results.to = resultsTo;
  if (resultsAt !== undefined) options.results.at = resultsAt;

  if (responseTimeoutTo !== undefined) options.response.timeout.to = responseTimeoutTo;
  if (responseTimeoutMiddleware !== undefined) options.response.timeout.middleware = responseTimeoutMiddleware;
  if (responseMeasurementSlow !== undefined) options.response.measurement.slow = responseMeasurementSlow;
  if (responseMeasurementVeryslow !== undefined) options.response.measurement.very_slow = responseMeasurementVeryslow;
  if (responseOnfailExit !== undefined) options.response.on_fail.exit = responseOnfailExit;
  if (responseOnfailError !== undefined) options.response.on_fail.error = responseOnfailError;

  if (package_ !== undefined) options.package = package_;

  // Make a new AmauiTest instance
  const amauiTest = new AmauiTest(options);

  // On user cmdline cancel exit the process
  process.on('SIGINT', async () => {
    await amauiTest.clear();

    process.exit(1);
  });

  // Init
  try {
    await amauiTest.init();

    // Run
    await amauiTest.run();
  }
  catch (error) {
    console.error(error);

    process.exit(1);
  }

  // Used for testing only
  const value = {
    summary: amauiTest.mainGroup.summary,
    options: amauiTest.options,
  };

  if (process.send) process.send(value);

  // Exit the process
  process.exit(0);
}

yargs
  .command({
    command: '$0',
    description: 'Amaui group and to tests',
    builder: (command => command
      .options('imports', { type: 'array' })

      .option('order', { type: 'string' })

      .option('results-print', { type: 'boolean' })
      .option('results-to', { type: 'array' })
      .option('results-at', { type: 'string' })

      .option('response-timeout-to', { type: 'number' })
      .option('response-timeout-middleware', { type: 'number' })
      .option('response-measurement-slow', { type: 'number' })
      .option('response-measurement-veryslow', { type: 'number' })
      .option('response-onfail-exit', { type: 'boolean' })
      .option('response-onfail-error', { type: 'boolean' })

      .options('files', { type: 'array' })

      .options('package', { type: 'string' })
    ) as yargs.CommandBuilder,
    handler: run,
  } as any)
  .help()
  .version(false)
  .parse();
