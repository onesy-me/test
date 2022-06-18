import path from 'path';
import url from 'url';
import fg from 'fast-glob';
import events from 'events';

import { is, isEnvironment, merge, getEnvironment, arrayMoveItem, Try, stringify, equalDeep, wait } from '@amaui/utils';
import { TMethod } from '@amaui/models';
import { AmauiTestError } from '@amaui/errors';
import { AmauiDate, duration } from '@amaui/date';
import AmauiLog from '@amaui/log';
import AmauiSubscription from '@amaui/subscription';
import AmauiDiff from '@amaui/diff';
import { IDiff } from '@amaui/diff/amaui-diff';

import AmauiGroup from './amaui-group';
import AmauiTo from './amaui-to';
import AmauiMiddleware from './amaui-middleware';
import { IAssertError } from './assert';

if (isEnvironment('nodejs') && !global.amauiEvents) global.amauiEvents = new events.EventEmitter();

let mainAmauiGroup = new AmauiGroup('main');

const groups = [
  mainAmauiGroup,
];

export interface IAmauiResponse {
  for?: AmauiTo | AmauiGroup | AmauiMiddleware;
  start?: number;
  end?: number;
  duration?: number;
  measurement?: {
    slow?: boolean;
    very_slow?: boolean;
  };
  response?: any | Error;
  type?: 'success' | 'error';
  index?: number;
}

export type IAmauiTestStatus = 'IDLE' | 'RUNNING' | 'COMPLETED' | 'CLEAR';

export interface IOptionsResponse {
  timeout?: {
    to?: number;
    middleware?: number;
  };

  measurement?: {
    slow?: number;
    very_slow?: number;
  };

  on_fail?: {
    exit?: boolean,
    error?: boolean,
  };
}

export type TOptionsResultsTo = 'log' | 'html';

export type TResultsHtml = {
  id?: string;
};

export interface IOptionsResults {
  print?: boolean;
  to?: Array<TOptionsResultsTo>;
  at?: 'auto' | 'end';
  errors_minify?: boolean;
  html?: TResultsHtml;
}

export type TOptionsOrder = 'original' | 'to-group' | 'group-to';

export interface IOptions {
  imports?: string | Array<string>;

  order?: TOptionsOrder;

  // Add all tests for result variant values
  results?: IOptionsResults;

  response?: IOptionsResponse;

  files?: string | Array<string>;

  package?: string;
}

export const optionsDefault: IOptions = {
  order: 'original',

  results: {
    print: true,
    to: ['log'],
    at: 'auto',
    errors_minify: true,
    html: {
      id: 'amaui-test-results',
    }
  },

  response: {
    timeout: {
      to: 14000,
      middleware: 40000,
    },

    measurement: {
      slow: 74,
      very_slow: 140,
    },

    on_fail: {
      exit: true,
      error: true,
    },
  },
};

export class AmauiTest {
  public options_: IOptions = {};
  private amauilog: AmauiLog;
  public status: IAmauiTestStatus = 'IDLE';
  private fileSource: string;
  private cleared: boolean;
  public subscription: AmauiSubscription = new AmauiSubscription();
  public previousLog;
  public archive = {
    logs: [],
  };

  public static orderTos(group: AmauiGroup, order_: TOptionsOrder): Array<AmauiTo | AmauiGroup> {
    const all = [];

    const items = AmauiTest.order(group, order_);

    for (const item of items) {
      if (item instanceof AmauiTo) all.push(item);
      else all.push(...AmauiTest.orderTos(item, order_));
    }

    return all;
  }

  public static order(group: AmauiGroup, order_: TOptionsOrder): Array<AmauiTo | AmauiGroup> {
    const all = [];

    if (order_ === 'to-group') all.push(...group.tos, ...group.groups);
    else if (order_ === 'group-to') all.push(...group.groups, ...group.tos);
    else {
      group.tos.forEach(to => all[to.index] = to);
      group.groups.forEach(group_ => all[group_.index] = group_);
    }

    return all;
  }

  public get mainGroup() { return mainAmauiGroup; }

  public get options(): IOptions {
    return this.options_;
  }

  public set options(options: IOptions) {
    const options_ = options || {};

    // Priority: AmauiTest.js and then package.json
    // only if to's a node environment
    if (isEnvironment('nodejs')) {
      const wd = process.cwd();

      if (options_.package && !path.isAbsolute(options_.package)) options_.package = path.resolve(options_.package);

      const packagePath = options_.package || 'package.json';

      const pkg = Try(() => require(path.resolve(wd, packagePath))) || {};
      const amauiTestOptions = Try(() => require(path.resolve(wd, 'amaui-test.options.js'))) || {};

      if (amauiTestOptions?.files?.length) this.fileSource = wd;
      else if (pkg['amaui-test']?.files?.length) this.fileSource = path.resolve(packagePath, '../');
      else this.fileSource = wd;

      // amaui-test.options.js priority over package.json 'amaui-test'
      const fileOptions = merge(amauiTestOptions, pkg['amaui-test'], { merge: { array: true } });

      // amaui options priority over file options values
      this.options_ = merge(options_, fileOptions, { copy: true, merge: { array: true } });
    }

    this.options_ = merge(options_, optionsDefault, { copy: true, merge: { array: true } });

    if (
      !this.options_.response.timeout.to &&
      this.options.response.timeout.to === undefined
    ) this.options_.response.timeout.to = optionsDefault.response.timeout.to;

    if (
      !this.options_.response.timeout.middleware &&
      this.options.response.timeout.middleware === undefined
    ) this.options_.response.timeout.middleware = optionsDefault.response.timeout.middleware;

    if (
      !this.options_.response.measurement.slow &&
      this.options.response.measurement.slow === undefined
    ) this.options_.response.measurement.slow = optionsDefault.response.measurement.slow;

    if (
      !this.options_.response.measurement.very_slow &&
      this.options.response.measurement.very_slow === undefined
    ) this.options_.response.measurement.very_slow = this.options_.response.measurement.slow * 1.4;
  }

  public constructor(
    options?: IOptions
  ) {
    this.amauilog = new AmauiLog({
      arguments: {
        pre: ['AmauiTest'],
      },
    });

    // Update the amaui options
    this.options = options;

    // Add all the methods to the env
    this.prepareEnvironment();
  }

  public async init() {
    // Resets
    this.fileSource = '';
    this.cleared = false;

    // Reset the main group for a new run of tests
    mainAmauiGroup = new AmauiGroup('main');

    // Update all the groups
    groups[0] = mainAmauiGroup;

    this.subscription.emit('new');

    // Add all the methods to the env
    this.prepareEnvironment();

    this.subscription.emit('prepare');

    // Imports
    await this.imports();

    this.subscription.emit('imports');

    // Import all the files to setup the mainAmauiGroup
    await this.initNode();

    this.subscription.emit('init_node');
  }

  // Run all the tests
  public async run() {
    // A fix for user terminated process SIGINT where as an async
    // signal it gets delayed by init method above requiring potentially a lot of test files
    // and without a SIGINT signal in time amaui-test starts printing to the console &
    // after few moments it gets the signal, which triggers the clear method
    // which only then prevents the logging to the logs, with wait, an atm
    // arbitrary number of milliseconds provided to it
    // we provide a moment for SIGINT signal to get to the process
    // so clear method can do it's own job properly
    await wait(400);

    if (!!mainAmauiGroup.summary.amount.tos) {
      if (this.options.results.at === 'auto') this.printTestsHeader();

      this.status = 'RUNNING';

      this.subscription.emit('running');

      // preAll middlewares
      await this.runMiddlewares(mainAmauiGroup.preAll, mainAmauiGroup);

      this.subscription.emit('preAll');

      await this.runGroup(mainAmauiGroup);

      // postAll middlewares
      await this.runMiddlewares(mainAmauiGroup.postAll, mainAmauiGroup);

      this.subscription.emit('postAll');

      if (this.status === 'RUNNING') {
        // Print at the end, if results.at: end
        if (this.options.results.print && this.options.results.at === 'end') this.printManual();

        this.status = 'COMPLETED';

        this.subscription.emit('completed');

        this.printAutoSummary();

        this.subscription.emit('printed');

        this.status = 'IDLE';

        this.subscription.emit('idle');
      }
    }
    else {
      this.amauilog.info(`No amaui to tests found`);

      this.subscription.emit('no_tests');
    }

    if (!this.cleared) {
      await this.clear();

      this.subscription.emit('clear');
    }

    // Exist process or throw an error if 1 or many failed tos
    if (this.mainGroup.summary.tos.fail) {
      this.subscription.emit('fail');

      if (isEnvironment('nodejs') && this.options.response?.on_fail?.exit) {
        if (process.env.AMAUI_ENV === 'test') throw new AmauiTestError('exit');
        else process.exit(1);
      }
      if (this.options.response?.on_fail?.error) throw new AmauiTestError(`${this.mainGroup.summary.tos.fail} tests failed`);
    }

    this.subscription.emit('success');

    return !this.mainGroup.summary.tos.fail;
  }

  public async runGroup(group: AmauiGroup) {
    if (group) {
      this.subscription.emit('group', group);

      // Print group name
      this.printAuto(group);

      // Main group preEveryGroup middlewares
      await this.runMiddlewares(this.mainGroup.preEveryGroup, group);

      // In all parents preEveryGroupGroup middlewares
      let parent = group.parent;

      while (parent) {
        await this.runMiddlewares(parent.preEveryGroupGroup, group);

        parent = parent.parent;
      }

      // pre middlewares
      await this.runMiddlewares(group.pre, group);

      const response: IAmauiResponse = {
        for: group,
        start: AmauiDate.milliseconds,
      };

      const all = AmauiTest.order(group, this.options.order);

      for (const item of all) {
        if (this.status === 'CLEAR') break;

        if (item instanceof AmauiTo) await this.runTo(item);
        else if (item instanceof AmauiGroup) await this.runGroup(item);
      }

      response.end = AmauiDate.milliseconds;
      response.duration = response.end - response.start;

      // Add a response to the AmauiTo instance
      group.response = response;

      // Main group postEveryGroup middlewares
      await this.runMiddlewares(this.mainGroup.postEveryGroup, group);

      // In all parents postEveryGroupGroup middlewares
      parent = group.parent;

      while (parent) {
        await this.runMiddlewares(parent.postEveryGroupGroup, group);

        parent = parent.parent;
      }

      // post middlewares
      await this.runMiddlewares(group.post, group);

      this.subscription.emit('group:end', group);
    }
  }

  public runMethod(method: TMethod, type = 'to') {
    return new Promise(async (resolve, reject) => {
      let timeout: NodeJS.Timeout;

      function onError(error: any) {
        rejectMethod(error.reason || error.error);

        return false;
      }

      const clear = () => {
        // Clear timeout
        clearTimeout(timeout);

        // Remove event listeners
        if (isEnvironment('nodejs')) {
          process.off('uncaughtException', rejectMethod);
          process.off('unhandledRejection', rejectMethod);
        }

        if (isEnvironment('browser')) {
          window.removeEventListener('error', onError);
          window.removeEventListener('unhandledrejection', onError);
        }
      };

      const resolveMethod = (arg: any) => {
        // Clear
        clear();

        return resolve(arg);
      };

      const rejectMethod = (arg: any) => {
        // Clear
        clear();

        return reject(arg);
      };

      // Add global event listeners
      if (isEnvironment('nodejs')) {
        process.on('uncaughtException', rejectMethod);
        process.on('unhandledRejection', rejectMethod);
      }

      if (isEnvironment('browser')) {
        window.addEventListener('error', onError);
        window.addEventListener('unhandledrejection', onError);
      }

      // Timeout
      timeout = setTimeout(() => {
        rejectMethod(new AmauiTestError(`Exceeded ${duration(this.options.response.timeout[type])}`, true, ''));
      }, this.options.response.timeout[type]);

      // Run method
      try {
        const response = method(resolveMethod, rejectMethod);

        if (response && response.then && is('function', response.then)) response.then(resolveMethod, rejectMethod);
        else if (!method.length) return resolveMethod(response);
      }
      catch (error) {
        rejectMethod(error);
      }
    });
  }

  public async runMiddlewares(middlewares: Array<AmauiMiddleware>, for_: AmauiGroup | AmauiTo) {
    if (middlewares) for (const middleware of middlewares) {
      if (this.status === 'CLEAR') break;

      await this.runMiddleware(middleware, for_);
    }
  }

  public async runMiddleware(middleware: AmauiMiddleware, for_: AmauiGroup | AmauiTo) {
    if (middleware) {
      this.subscription.emit('middleware', middleware);

      const response: IAmauiResponse = {
        for: for_,
        start: AmauiDate.milliseconds,
      };

      // Run as a promise
      try {
        response.response = await this.runMethod(middleware.method, 'middleware');

        response.type = 'success';
      }
      catch (error) {
        response.response = error;

        response.type = 'error';
      }

      response.end = AmauiDate.milliseconds;
      response.duration = response.end - response.start;

      // Add a response to the AmauiTo instance
      middleware.responses.push(response);

      this.subscription.emit('middleware:end', middleware);
    }
  }

  public async runTo(to: AmauiTo) {
    if (to) {
      this.subscription.emit('to', to);

      // Main group preEveryTo middlewares
      await this.runMiddlewares(this.mainGroup.preEveryTo, to);

      // In all parents preEveryGroupTo middlewares
      let parent = to.parent;

      while (parent) {
        await this.runMiddlewares(parent.preEveryGroupTo, to);

        parent = parent.parent;
      }

      // Parent group preTo middlewares
      await this.runMiddlewares(to.parent.preTo, to);

      const response: IAmauiResponse = {
        for: to,
        start: AmauiDate.milliseconds,
      };

      // Run as a promise
      try {
        response.response = await this.runMethod(to.method);

        response.type = 'success';

        // Summary for tos results
        to.parent.summary.tos.success++;

        if (mainAmauiGroup !== to.parent) mainAmauiGroup.summary.tos.success++;
      }
      catch (error) {
        response.response = error;

        response.type = 'error';

        // Summary for tos results
        to.parent.summary.tos.fail++;

        if (mainAmauiGroup !== to.parent) mainAmauiGroup.summary.tos.fail++;

        response.index = mainAmauiGroup.summary.tos.fail;
      }

      response.end = AmauiDate.milliseconds;
      response.duration = response.end - response.start;

      response.measurement = {};

      if (response.duration >= this.options.response.measurement.slow && response.duration < this.options.response.measurement.very_slow) response.measurement.slow = true;
      else if (response.duration >= this.options.response.measurement.very_slow) response.measurement.very_slow = true;

      // Add a response to the AmauiTo instance
      to.response = response;

      // Print to
      this.printAuto(response);

      // Main group postEveryTo middlewares
      await this.runMiddlewares(this.mainGroup.postEveryTo, to);

      // In all parents postEveryGroupTo middlewares
      parent = to.parent;

      while (parent) {
        await this.runMiddlewares(parent.postEveryGroupTo, to);

        parent = parent.parent;
      }

      // Parent group postTo middlewares
      await this.runMiddlewares(to.parent.postTo, to);

      this.subscription.emit('to:end', to);
    }
  }

  public async imports() {
    if (isEnvironment('nodejs') && this.options.imports) {
      const values = is('string', this.options.imports) ? [this.options.imports] : this.options.imports;

      for (const value of values) {
        await this.importFile(value as string);
      }
    }
  }

  public async import(files: string[]) {
    if (!!files?.length) {
      const filesPaths = (await fg(files, { onlyFiles: true }))
        .map(filePath => path.resolve(filePath));

      for (const file of filesPaths) {
        // Prepare the environment
        this.prepareEnvironment(file);

        await this.importFile(file);
      }
    }
  }

  private async importFile(file: string) {
    // Import a file or an import error
    try {
      require(file);
    }
    catch (error) {
      try {
        return path.isAbsolute(file) ? await import(url.pathToFileURL(file) as any) : import(file);
      }
      catch (error) {
        throw error;
      }
    }
  }

  public async initNode() {
    // Setup for nodejs mostly by importing all the regexp files from options
    if (isEnvironment('nodejs')) {
      let filePaths = [];

      // Import all test files
      if (is('string', this.options.files)) filePaths.push(this.options.files);
      else if (is('array', this.options.files)) filePaths.push(...this.options.files);

      filePaths = filePaths.filter(Boolean).map(item => path.isAbsolute(item) ? item : path.join(this.fileSource, item));

      await this.import(filePaths);
    }
  }

  public prepareEnvironment(file?: string): void {
    // Window or Node
    const env: any = getEnvironment();

    env.group = async (name: string, method: TMethod): Promise<void> => {
      if (
        is('string', name) &&
        is('function', method)
      ) {
        const group_ = new AmauiGroup(name);

        const latestGroup = groups[0];

        group_.parent = latestGroup;

        if (file) group_.file = file;

        group_.level = groups.length;

        if (group_.level > this.mainGroup.levels) this.mainGroup.levels = group_.level;

        group_.index = latestGroup.latestIndex + 1;

        this.mainGroup.mainIndex += 1;

        group_.mainIndex = this.mainGroup.mainIndex;

        latestGroup.latestIndex++;

        // Summary
        group_.parent.summary.amount.groups++;

        if (mainAmauiGroup !== group_.parent) mainAmauiGroup.summary.amount.groups++;

        // Add group to the parent groups
        latestGroup.groups.push(group_);

        // Add group group to groups
        groups.unshift(group_);

        // Run the group method
        // it has to be a non-async method as in files
        // group methods are made as calls with name and method arguments
        // in order to register themselves to the mainGroup
        // and if immediatelly after a group there's a to method
        // then not awaiting async group method in the file will make a
        // mess in the order of to methods getting registered
        // as then all to methods after will not wait for group to finish
        // and will register as part of a wrong group instead of
        // the group to method is inside
        method();

        // Remove group group from groups
        groups.shift();
      }
    };

    env.to = (name: string, method: TMethod): void => {
      if (
        is('string', name) &&
        is('function', method)
      ) {
        const to_ = new AmauiTo(name, method);

        const latestGroup = groups[0];

        to_.parent = latestGroup;

        if (file) to_.file = file;

        to_.level = groups.length;
        to_.index = latestGroup.latestIndex + 1;

        this.mainGroup.mainIndex += 1;

        to_.mainIndex = this.mainGroup.mainIndex;

        latestGroup.latestIndex++;

        // Summary
        latestGroup.summary.amount.tos++;

        if (mainAmauiGroup !== latestGroup) mainAmauiGroup.summary.amount.tos++;

        latestGroup.tos.push(to_);
      }
    };

    env.preAll = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preAll', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.preAll.push(middleware);
      }
    };

    env.preEveryGroup = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preEveryGroup', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.preEveryGroup.push(middleware);
      }
    };

    env.preEveryTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preEveryTo', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.preEveryTo.push(middleware);
      }
    };

    env.pre = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('pre', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.pre.push(middleware);
      }
    };

    env.preEveryGroupGroup = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preEveryGroupGroup', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.preEveryGroupGroup.push(middleware);
      }
    };

    env.preTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preTo', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.preTo.push(middleware);
      }
    };

    env.preEveryGroupTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('preEveryGroupTo', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.preEveryGroupTo.push(middleware);
      }
    };

    env.postAll = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postAll', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.postAll.push(middleware);
      }
    };

    env.postEveryGroup = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postEveryGroup', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.postEveryGroup.push(middleware);
      }
    };

    env.postEveryTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postEveryTo', method);

        middleware.parent = this.mainGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        this.mainGroup.postEveryTo.push(middleware);
      }
    };

    env.post = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('post', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.post.push(middleware);
      }
    };

    env.postEveryGroupGroup = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postEveryGroupGroup', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.postEveryGroupGroup.push(middleware);
      }
    };

    env.postTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postTo', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.postTo.push(middleware);
      }
    };

    env.postEveryGroupTo = (method: TMethod): void => {
      if (is('function', method)) {
        const middleware = new AmauiMiddleware('postEveryGroupTo', method);

        const latestGroup = groups[0];

        middleware.parent = latestGroup;

        if (file) middleware.file = file;

        // Add method to latest group's tos
        latestGroup.postEveryGroupTo.push(middleware);
      }
    };
  }

  public printTestsHeader(): void {
    if (this.options.results.print) {
      // Log
      if (this.options.results.to.indexOf('log') > -1) {
        let args = [`\n\n  Amaui test running`];

        // Print amaui test header
        this.log(...args);

        // Duration
        args = [];

        if (isEnvironment('browser')) args.push(`%c  ${mainAmauiGroup.summary.amount.tos} tests`, 'color: #777', '\n\n\n');
        else args.push(`  \x1b[90m${mainAmauiGroup.summary.amount.tos} tests\x1b[0m`, '\n\n');

        this.log(...args);
      }

      // HTML
      if (
        isEnvironment('browser') &&
        window.document.getElementById(this.options.results.html.id) &&
        this.options.results.to.indexOf('html') > -1
      ) {
        const root = window.document.getElementById(this.options.results.html.id);

        // Reset
        root.innerHTML = '';

        const style = window.document.createElement('style');

        style.innerHTML = `
          body {
            --palette-success: #00d300;
            --palette-info: #0ebdd4;
            --palette-grey: #777;
            --palette-fail: #e01327;
          }

          #amaui-test-errors > div > * {
            margin: 21px 0;
            font-size: 0.85rem;
            font-weight: 400;
            word-break: break-word;
          }
        `;

        root.appendChild(style);

        // Root basic styles
        root.style.padding = '40px';
        root.style.maxWidth = '1024px';
        root.style.margin = '0 auto';
        root.style.fontFamily = 'sans-serif';

        const header = window.document.createElement('header');

        const title = window.document.createElement('h1');

        title.textContent = 'Amaui test running';

        title.style.color = '#000';
        title.style.margin = '114px 0 14px';

        const subtitle = window.document.createElement('p');

        subtitle.textContent = `${mainAmauiGroup.summary.amount.tos} tests`;

        subtitle.style.color = 'var(--palette-grey)';
        subtitle.style.fontSize = '21px';
        subtitle.style.fontWeight = '300';
        subtitle.style.margin = '0 0 74px';

        header.appendChild(title);
        header.appendChild(subtitle);

        root.appendChild(header);

        // Add all the sections
        // Tos
        const tos = window.document.createElement('section');

        tos.id = 'amaui-test-tos';

        root.append(tos);

        // Summary
        const summary = window.document.createElement('section');

        summary.id = 'amaui-test-summary';

        summary.style.margin = '54px 0';
        summary.style.fontSize = '0.91rem';

        root.append(summary);

        // Errors
        const errors = window.document.createElement('section');

        errors.id = 'amaui-test-errors';

        root.append(errors);
      }
    }
  }

  public printTo(value: IAmauiResponse): void {
    const { name, level, parent, mainIndex, index } = value.for as AmauiTo | AmauiGroup;
    const success = value.type === 'success';

    const order = this.options.order;
    const lastMainIndex = mainIndex === this.mainGroup.mainIndex;
    const lastInGroup = index === (parent.tos.length + parent.groups.length - 1);

    const quick = !(value.measurement.slow || value.measurement.very_slow);
    const slow = value.measurement.slow;

    this.previousLog = '';

    // Log
    if (this.options.results.to.indexOf('log') > -1) {
      const padding = ' '.repeat(level * 2);

      const args = [];

      //  Success
      if (success) {
        if (isEnvironment('browser')) {
          args.push(`${padding}%c✔ %c${name}${!quick ? ` %c${duration(value.duration, true, '')}` : ''}`, 'color: #1fc926', 'color: #777');

          if (!quick) args.push(`color: ${slow ? '#a9b030' : '#d74644'}`);
        }
        else args.push(`${padding}\x1b[32m✔\x1b[0m \x1b[90m${name}\x1b[0m${!quick ? ` \x1b[${slow ? '33' : '31'}m${duration(value.duration, true, '')}\x1b[0m` : ''}`);
      }
      //  Error
      else {
        const errorOrderNumber = value.index;

        if (isEnvironment('browser')) args.push(`${padding}%c${errorOrderNumber}) ${name}`, 'color: #d74644');
        else args.push(`${padding}\x1b[31m${errorOrderNumber}) ${name}\x1b[0m`);
      }

      // Log
      this.log(...args);

      if (
        lastInGroup &&
        !(order === 'original' && lastMainIndex) &&
        (
          level !== 1 &&
          !(order === 'to-group' && level !== this.mainGroup.levels)
        )
      ) {
        this.log(' ');

        this.previousLog = 'to';
      }
    }

    // HTML
    if (
      isEnvironment('browser') &&
      window.document.getElementById(this.options.results.html.id) &&
      this.options.results.to.indexOf('html') > -1
    ) {
      const tos = window.document.getElementById('amaui-test-tos');

      if (tos) {
        const to = window.document.createElement('p');

        to.style.color = '#000';
        to.style.paddingLeft = `${level > 1 ? level * 14 : 0}px`;
        to.style.fontSize = '0.84rem';
        to.style.fontWeight = '300';
        to.style.display = 'flex';
        to.style.alignItems = 'baseline';

        if (
          lastInGroup &&
          (
            level !== 1 &&
            !(order === 'original' && lastMainIndex) &&
            (
              level !== 1 &&
              !(order === 'to-group' && level !== this.mainGroup.levels)
            )
          )
        ) {
          to.style.marginBottom = '24px';

          this.previousLog = 'to';
        }

        //  Success
        if (success) {
          to.innerHTML = `<span style='color: var(--palette-success); font-size: 10px; margin-right: 11px;'>✔</span><span>${name}</span>`;

          if (!quick) to.innerHTML += `<span style='color: ${slow ? 'orange' : 'var(--palette-fail)'}; font-size: 12px; margin-left: 9px;'>${duration(value.duration, true, '')}</span>`;
        }
        //  Error
        else {
          const errorOrderNumber = value.index;

          to.innerHTML = `<span style='color: var(--palette-fail); margin-right: 5px;'>${errorOrderNumber})</span><span style='color: var(--palette-fail)'>${name}</span>`;
        }

        tos.appendChild(to);
      }
    }
  }

  public printManual(): void {
    this.status = 'IDLE';

    this.printTestsHeader();

    this.printGroup(mainAmauiGroup);

    this.printSummary();

    this.printErrors();
  }

  public printGroup(group: AmauiGroup): void {
    const all = AmauiTest.order(group, this.options.order);

    // Print group name with indent
    const { name, level, parent, index } = group;

    const order = this.options.order;

    const first = (
      (index === 0 && order === 'original') ||
      (order === 'group-to' && index === parent?.groups[0].index)
    );

    // Log
    if (this.options.results.to.indexOf('log') > -1) {
      const padding = ' '.repeat(level * 2);

      // Browser and nodejs
      if (level > 0) this.log(`${!((first && level === 1) || this.previousLog === 'to') ? '\n' : ''}${padding}${name}`);
    }

    // HTML
    if (
      isEnvironment('browser') &&
      window.document.getElementById(this.options.results.html.id) &&
      this.options.results.to.indexOf('html') > -1
    ) {
      const tos = window.document.getElementById('amaui-test-tos');

      if (tos) {
        if (level > 0) {
          const title = window.document.createElement('h4');

          title.textContent = name;

          title.style.color = '#333';
          title.style.fontSize = '0.91rem';
          title.style.fontWeight = '400';
          title.style.margin = '24px 0 0px';
          title.style.paddingLeft = `${level > 1 ? level * 14 : 0}px`;

          tos.appendChild(title);
        }
      }
    }

    this.previousLog = 'group';

    for (const item of all) {
      if (item instanceof AmauiTo) this.printTo(item.response);
      else if (item instanceof AmauiGroup) this.printGroup(item);
    }
  }

  public printAuto(value: IAmauiResponse | AmauiGroup): void {
    if (
      this.options.results.print &&
      ['log', 'html'].some((item: TOptionsResultsTo) => this.options.results.to.indexOf(item) > -1) &&
      this.options.results.at === 'auto'
    ) {
      if (value instanceof AmauiGroup) {
        // Print group name with indent
        const { name, level, parent, index } = value;

        const order = this.options.order;

        const first = (
          (index === 0 && order === 'original') ||
          (order === 'group-to' && index === parent?.groups[0].index)
        );

        // Log
        if (this.options.results.to.indexOf('log') > -1) {
          const padding = ' '.repeat(level * 2);

          // Browser and nodejs
          if (level > 0) this.log(`${!((first && level === 1) || this.previousLog === 'to') ? '\n' : ''}${padding}${name}`);
        }

        // HTML
        if (
          isEnvironment('browser') &&
          window.document.getElementById(this.options.results.html.id) &&
          this.options.results.to.indexOf('html') > -1
        ) {
          const tos = window.document.getElementById('amaui-test-tos');

          if (tos) {
            if (level > 0) {
              const title = window.document.createElement('h4');

              title.textContent = name;

              title.style.color = '#333';
              title.style.fontSize = '0.91rem';
              title.style.fontWeight = '400';
              title.style.margin = '24px 0 0px';
              title.style.paddingLeft = `${level > 1 ? level * 14 : 0}px`;

              tos.appendChild(title);
            }
          }
        }

        this.previousLog = 'group';
      }
      else this.printTo(value);
    }
  }

  public printAutoSummary(): void {
    if (
      this.options.results.print &&
      ['log', 'html'].some((item: TOptionsResultsTo) => this.options.results.to.indexOf(item) > -1) &&
      ['auto'].indexOf(this.options.results.at) > -1
    ) {
      // Summary
      this.printSummary();

      // Errors
      this.printErrors();
    }
  }

  // Errors
  public printErrors(): void {
    this.printGroupErrors(mainAmauiGroup);
  }

  public printGroupErrors(group = mainAmauiGroup): void {
    const all = AmauiTest.order(group, this.options.order);

    for (const item of all) {
      if (item instanceof AmauiTo && item.response.type === 'error') this.printError(item);
      else if (item instanceof AmauiGroup) this.printGroupErrors(item);
    }
  }

  public printError(to: AmauiTo): void {
    const { name, parent } = to;
    const { index } = to.response;
    const response: IAssertError = to.response.response;

    const getToName = (values_: string[], parent_: AmauiGroup) => {
      if (parent_ && parent_ !== mainAmauiGroup) values_.unshift(parent_.name);
      if (parent_.parent && parent_.parent !== mainAmauiGroup) getToName(values_, parent_.parent);
    };

    const values = [name];

    getToName(values, parent);

    const stringifyOutput = (value: any) => {
      let result = '';

      if (is('array', value) || is('object', value)) result = stringify(value, 0);
      else result = value?.toString ? value.toString() : String(value);

      result.trim();

      result = result.length > 74 ? `${result.slice(0, 71)} ... ${result.slice(-1)}` : result;

      if (is('array', value)) result = `${result} (${value.length})`;

      return result;
    };

    const arrayOrObject = (is('array', response.expected) && is('array', response.actual)) || (is('object', response.expected) && is('object', response.actual));

    const responses = {
      expected: {
        short: response.hasOwnProperty('expected') && stringifyOutput(response.expected),
        long: arrayOrObject && AmauiDiff.json.diff(response.expected, response.actual),
      },
      actual: {
        short: response.hasOwnProperty('actual') && stringifyOutput(response.actual),
      },
    };

    const expression = response.expression;

    const expected = response.expected !== undefined && response.expression;

    let expressionMessage = '';

    if (expected || response.message) expressionMessage = ': ';

    if (response.message) expressionMessage += response.message;

    if (expected) expressionMessage += `${response.message ? `\n\n${' '.repeat(response.name.length + (isEnvironment('browser') ? 2 : 4))}` : ''}expected ${responses.expected.short}${expression ? ` ${expression} ` : ''}${responses.actual.short || ''}`;

    const printInfoDiff = (arrayOrObject && responses.expected.long.items.length) ? this.printDiff(response.expected, response.actual, responses.expected.long) : [];

    const stack = this.printErrorStackCleanUp(response.stack);

    // Log
    if (this.options.results.to.indexOf('log') > -1) {
      // Name
      this.log(`  ${index}) ${values.join(' ')}`);

      // Assertion error summary
      let args = [];

      if (isEnvironment('browser')) args.push(`%c${response.name}${expressionMessage}`, 'color: #d74644; padding-left: 14px;');
      else args.push(`  \x1b[91m${response.name}${expressionMessage}\x1b[0m`);

      this.log(' ');

      this.log(...args);

      if (arrayOrObject && responses.expected.long.items.length && responses.expected.long.items.length / 2 <= 40) {
        // Symbol legend
        args = [];

        if (isEnvironment('browser')) args.push(`  %c+ add %c- remove`, 'color: #1fc926', 'color: #d74644');
        else args.push(`  \x1b[92m+ add\x1b[0m \x1b[91m- remove\x1b[0m`);

        this.log(' ');

        this.log(...args);

        this.log(' ');

        // Diff info
        // Log all the value array items
        printInfoDiff.forEach(item_ => {
          const item = item_;

          const colors = {
            browser: 'inherit',
            node: ''
          };

          // Log value array item
          const regular = item[2] === ' ';
          const add = item[2] === '+';
          const remove = item[2] === '-';
          const linesSkipped = item.indexOf('lines skipped') > -1;

          if (add) {
            colors['browser'] = '#1fc926';
            colors['node'] = '2';
          }

          if (remove) {
            colors['browser'] = '#d74644';
            colors['node'] = '1';
          }

          if (linesSkipped) {
            colors['browser'] = '#0ebdd4';
            colors['node'] = '6';
          }

          if (isEnvironment('browser')) this.log(`%c${item}`, `color: ${colors['browser']}`);
          else this.log((regular && !linesSkipped) ? item : `\x1b[9${colors['node']}m${item}\x1b[0m`);
        });
      }

      if (stack) {
        if (isEnvironment('browser')) this.log(`\n%c${stack}`, 'color: #777');
        else this.log(`\n\x1b[90m${stack}\x1b[0m`);
      }

      // Bottom padding
      this.log('\n');
    }

    // HTML
    if (
      isEnvironment('browser') &&
      window.document.getElementById(this.options.results.html.id) &&
      this.options.results.to.indexOf('html') > -1
    ) {
      const errors = window.document.getElementById('amaui-test-errors');

      if (errors) {
        const error = window.document.createElement('div');

        error.style.marginBottom = '44px';

        error.innerHTML = `
        <h5
          style='
            color: #333;
          '
        >${index}) ${values.join(' ')}</h5>

        <p style='color: var(--palette-fail)'>${response.name}${expressionMessage}</p>
        `;

        // Diff items
        if (arrayOrObject && responses.expected.long.items.length / 2 <= 40) {
          // Symbol legend
          error.innerHTML += `
            <p>
              <span style='color: var(--palette-success); margin-right: 9px'>+ add</span><span style='color: var(--palette-fail)'>- remove</span>
            </p>
          `;

          // Diff info
          // Log all the value array items
          const printItemsDiff = window.document.createElement('div');

          printItemsDiff.className = 'print-diff';

          const style = window.document.createElement('style');

          style.innerHTML = `
            .print-diff > pre {
              font-size: 13px;
              font-family: monospace;
              line-height: 1;
            }
          `;

          printItemsDiff.appendChild(style);

          printInfoDiff.forEach((item_, index_) => {
            const item = item_.slice(2);

            // Log value array item
            const add = item[0] === '+';
            const remove = item[0] === '-';
            const linesSkipped = item.indexOf('lines skipped') > -1;

            let color = 'inherit';
            let margin = '7px 0';

            if (add) color = 'var(--palette-success)';
            if (linesSkipped) color = 'var(--palette-info)';
            if (remove) color = 'var(--palette-fail)';

            if (linesSkipped) {
              if (!index_) margin = '0 0 21px 0';
              else if (index_ === printInfoDiff.length - 1) margin = '21px 0 0 0';
              else margin = '21px 0';
            }

            printItemsDiff.innerHTML += `<pre style='color: ${color}; margin: ${margin}'>${item}</pre>`;
          });

          error.appendChild(printItemsDiff);
        }

        // Stack
        if (stack) {
          error.innerHTML += `
            <pre style='color: var(--palette-grey)'>${stack.replace('<', '&lt;').replace('>', '&gt;')}</pre>
          `;
        }

        errors.appendChild(error);
      }
    }
  }

  private printErrorStackCleanUp(value: string = ''): string {
    if (!this.options?.results?.errors_minify) return value;

    // Error stack trace
    // Stack trace clean up
    const urlFilterOutStack = [
      'umd/amaui-test',
      'amaui-test.ts',
      'amaui-test.js',
      'assert.ts',
      'assert.js',

      'node_modules',
      '[native code]'
    ];

    let stack: any = value.split('\n');

    // Remove error name
    stack.shift();

    stack = stack.filter(item => !urlFilterOutStack.some(item_ => item.indexOf(item_) > -1));

    // Filter out items without url and with node internal url
    stack = stack.filter(item => (
      item.indexOf('(<anonymous>)') === -1 &&
      item.indexOf('(node:internal') === -1
    ));

    // All items clean up
    let wd = '';

    if (isEnvironment('nodejs')) wd = process.cwd() + '/';

    stack = stack.map(item_ => {
      let item = item_;

      if (wd) item = item.replace(wd, '');

      item = item.replace('at async', 'at');
      item = item.trim();

      return `  ${item}`;
    });

    stack = stack.filter(Boolean);

    if (!!stack.length) {
      // Find from last item, last one that starts same as the last item and use it,
      // and swap first and that item, as that item is usually the main src value of an error
      const itemLast = stack[stack.length - 1];
      const itemLastValue = itemLast?.slice(0, 2);
      const items = stack.filter(item => (
        (item.indexOf(`at ${itemLastValue}`) === 0) ||
        (item.indexOf(`at async ${itemLastValue}`) === 0) ||
        (item.indexOf(itemLastValue) === 0)
      ));

      const itemToSwap = items[0];
      const itemToSwapIndex = stack.findIndex(item => item === itemToSwap);

      arrayMoveItem(stack, itemToSwapIndex, 0);

      // Context to remain in lower part of the stack
      if (stack.length > 1 && stack[0].indexOf('Context.<anonymous>') > -1) arrayMoveItem(stack, stack.length - 1, 0);

      // Make main test file line source more visible
      stack[0] = `  ${stack[0].slice(5)}`;

      if (stack.length > 1) stack[0] = stack[0] + '\n';
    }

    stack = stack.join('\n');

    return stack;
  }

  private printDiff(expected: any, actual: any, diff: IDiff): any[] {
    let value = AmauiDiff.json.options.itemize.method(AmauiDiff.json.options.init.method(actual));
    const valueExpected = AmauiDiff.json.options.itemize.method(AmauiDiff.json.options.init.method(expected));

    const updateGroups = AmauiDiff.updateGroups(diff);

    // Mark all the added lines
    const added = updateGroups.flat().filter(item => item[0][0].indexOf('a') === 0);

    const removed = updateGroups.flat().filter(item => item[0][0].indexOf('r') === 0);

    // Add all the added lines
    added.forEach(item => value[item[1]] = `  +${value[item[1]]}`);

    const updateGroupsAllItems = updateGroups.flat(1).sort((a, b) => a[0] < b[0] ? -1 : 1).sort((a, b) => a[1] - b[1]);

    // Add all the removed lines
    removed.forEach(item => {
      const index = item[1];
      const updateGroupItemIndex = updateGroupsAllItems.findIndex(item_ => equalDeep(item, item_));
      const offset = updateGroupsAllItems.slice(0, updateGroupItemIndex).filter(item_ => item_[0].indexOf('a') > -1).length;

      value.splice(index + offset, 0, `  -${valueExpected[index]}`);
    });

    // Add additional space to untouched value items in the array and clean up
    value = value.map(item_ => {
      let item = item_;

      if (item.slice(-1) === '\n') item = item.slice(0, -1);
      if (item.slice(-1) === ',') item = item.slice(0, -1);

      return ['  +', '  -'].indexOf(item.slice(0, 3)) === -1 ? `   ${item}` : item;
    });

    // Merge at same end up index add / remove value
    value.forEach((item, index) => {
      if (
        (item.indexOf('  +') > -1 && value[index + 1] === `  -${item.slice(3)}`) ||
        (item.indexOf('  -') > -1 && value[index + 1] === `  +${item.slice(3)}`)
      ) {
        value[index] = `   ${item.slice(3)}`;

        value.splice(index + 1, 1);
      }
    });

    // Lines skipped
    for (let i = 0; i < value.length;) {
      let anotherOperator: boolean;
      let range = 1;
      let j = i + 1;

      while (!anotherOperator && j < value.length) {
        if (['+', '-'].indexOf(value[j][2]) > -1) anotherOperator = true;
        else {
          range++;
          j++;
        }
      }

      // Only if range is > than 4 lines skipped
      if (range >= 4 && anotherOperator) {
        if (i === 0) {
          value.splice(0, range - 1, `     ${range - 1} lines skipped\n`);

          i = 2;
        }
        else if (j === value.length - 1) {
          value.splice(i + 1, range - 2, `\n     ${j - i - 2} lines skipped`);

          i = value.length - 1;
        }
        else {
          value.splice(i + 1, range - 2, `\n     ${range - 2} lines skipped\n`);

          i += 2;
        }
      }
      else if (j >= value.length - 1 && j - i - 1 > 4) {
        value.splice(i + 2, range - 1, `\n     ${j - i - 2} lines skipped`);

        i = j + 1;
      }
      else {
        i += range + 1;
      }
    }

    return value;
  }

  // Summary
  public printSummary(): void {
    const { success, fail } = mainAmauiGroup.summary.tos;

    const pre = ` `.repeat(1);
    const offset = `\n`.repeat(isEnvironment('browser') ? 2 : 1);

    const mainGroupDuration = duration(mainAmauiGroup.response.duration, true, '');

    // Log
    if (this.options.results.to.indexOf('log') > -1) {
      let args: any = [];

      this.log(offset);

      // Duration
      if (isEnvironment('browser')) args.push(`${pre + ' '}%c${mainGroupDuration}`, 'color: #777', '\n\n');
      else args.push(`\x1b[90m${mainGroupDuration}\x1b[0m`, '\n');

      // Log
      if (isEnvironment('nodejs')) this.log(pre, ...args);
      else this.log(...args);

      args = [];

      // Success
      if (isEnvironment('browser')) args.push(`%c${pre + ' '}${success} passing`, 'color: #1fc926');
      else args.push(`\x1b[92m${success} passing\x1b[0m`);

      // Log
      if (isEnvironment('nodejs')) this.log(pre, ...args);
      else this.log(...args);

      // Fail
      if (!!fail) {
        args = [];

        if (isEnvironment('browser')) args.push(`%c${pre + ' '}${fail} failed`, 'color: #d74644');
        else args.push(`\x1b[91m${fail} failed\x1b[0m`);

        // Log
        if (isEnvironment('nodejs')) this.log(pre, ...args);
        else this.log(...args);
      }

      // Log bottom offset
      this.log(offset);
    }

    // HTML
    if (
      isEnvironment('browser') &&
      window.document.getElementById(this.options.results.html.id) &&
      this.options.results.to.indexOf('html') > -1
    ) {
      const summary = window.document.getElementById('amaui-test-summary');

      if (summary) {
        summary.innerHTML = `<p style='color: var(--palette-grey); font-weight: 300; margin-bottom: 21px'>${mainGroupDuration
          }</p><p style='color: var(--palette-success); margin-bottom: 0px'>${success} passing</p><p style='color: var(--palette-fail); margin-top: 9px'>${fail} failed</p>`;
      }
    }
  }

  private log(...args: any[]): void {
    if (this.status !== 'CLEAR') {
      this.archive.logs.push(...args);

      console.log(...args);
    }
  }

  public async clear(method?: TMethod) {
    // Stops tests if they are running
    this.status = 'CLEAR';

    this.cleared = true;

    if (method) await method();

    if (isEnvironment('nodejs')) global.amauiEvents.emit('amaui-test-clear');
    if (isEnvironment('browser')) window.dispatchEvent(new Event('amaui-test-clear'));
  }

}

export default AmauiTest;
