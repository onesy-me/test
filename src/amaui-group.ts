import { TMethod } from '@amaui/models';

import AmauiTo from './amaui-to';
import AmauiMiddleware from './amaui-middleware';
import { IAmauiResponse } from './amaui-test';

export interface IAmauiGroup {
  name: string;
  method?: TMethod;
  parent: AmauiGroup;
  file?: string;
  level: number;
  levels: number;
  index: number;
  mainIndex: number;
  latestIndex: number;

  groups: Array<AmauiGroup>;
  tos: Array<AmauiTo>;

  preAll: Array<AmauiMiddleware>;
  preEveryGroup: Array<AmauiMiddleware>;
  preEveryTo: Array<AmauiMiddleware>;
  pre: Array<AmauiMiddleware>;
  preEveryGroupGroup: Array<AmauiMiddleware>;
  preTo: Array<AmauiMiddleware>;
  preEveryGroupTo: Array<AmauiMiddleware>;

  postAll: Array<AmauiMiddleware>;
  postEveryGroup: Array<AmauiMiddleware>;
  postEveryTo: Array<AmauiMiddleware>;
  post: Array<AmauiMiddleware>;
  postEveryGroupGroup: Array<AmauiMiddleware>;
  postTo: Array<AmauiMiddleware>;
  postEveryGroupTo: Array<AmauiMiddleware>;

  summary: {
    amount: {
      tos: number;
      groups: number;
    };
    tos: {
      success: number;
      fail: number;
    };
  };

  response?: IAmauiResponse;
}

class AmauiGroup implements IAmauiGroup {
  public parent: AmauiGroup;
  public file?: string;
  public level = 0;
  public levels = 0;
  public index = 0;
  public mainIndex = 0;
  public latestIndex = -1;
  public summary = {
    amount: {
      tos: 0,
      groups: 0,
    },
    tos: {
      success: 0,
      fail: 0,
    },
  };
  public response: IAmauiResponse = {};

  public groups: Array<AmauiGroup> = [];
  public tos: Array<AmauiTo> = [];

  public preAll: Array<AmauiMiddleware> = [];
  public preEveryGroup: Array<AmauiMiddleware> = [];
  public preEveryTo: Array<AmauiMiddleware> = [];
  public pre: Array<AmauiMiddleware> = [];
  public preEveryGroupGroup: Array<AmauiMiddleware> = [];
  public preTo: Array<AmauiMiddleware> = [];
  public preEveryGroupTo: Array<AmauiMiddleware> = [];

  public postAll: Array<AmauiMiddleware> = [];
  public postEveryGroup: Array<AmauiMiddleware> = [];
  public postEveryTo: Array<AmauiMiddleware> = [];
  public post: Array<AmauiMiddleware> = [];
  public postEveryGroupGroup: Array<AmauiMiddleware> = [];
  public postTo: Array<AmauiMiddleware> = [];
  public postEveryGroupTo: Array<AmauiMiddleware> = [];

  constructor(
    public name: string,
    public method?: TMethod
  ) { }

}

export default AmauiGroup;
