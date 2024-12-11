import { TMethod } from '@onesy/models';

import OnesyTo from './OnesyTo';
import OnesyMiddleware from './OnesyMiddleware';
import { IOnesyResponse } from './OnesyTest';

export interface IOnesyGroup {
  name: string;
  method?: TMethod;
  parent: OnesyGroup;
  file?: string;
  level: number;
  levels: number;
  index: number;
  mainIndex: number;
  latestIndex: number;

  groups: Array<OnesyGroup>;
  tos: Array<OnesyTo>;

  preAll: Array<OnesyMiddleware>;
  preEveryGroup: Array<OnesyMiddleware>;
  preEveryTo: Array<OnesyMiddleware>;
  pre: Array<OnesyMiddleware>;
  preEveryGroupGroup: Array<OnesyMiddleware>;
  preTo: Array<OnesyMiddleware>;
  preEveryGroupTo: Array<OnesyMiddleware>;

  postAll: Array<OnesyMiddleware>;
  postEveryGroup: Array<OnesyMiddleware>;
  postEveryTo: Array<OnesyMiddleware>;
  post: Array<OnesyMiddleware>;
  postEveryGroupGroup: Array<OnesyMiddleware>;
  postTo: Array<OnesyMiddleware>;
  postEveryGroupTo: Array<OnesyMiddleware>;

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

  response?: IOnesyResponse;
}

class OnesyGroup implements IOnesyGroup {
  public parent: OnesyGroup;
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
  public response: IOnesyResponse = {};

  public groups: Array<OnesyGroup> = [];
  public tos: Array<OnesyTo> = [];

  public preAll: Array<OnesyMiddleware> = [];
  public preEveryGroup: Array<OnesyMiddleware> = [];
  public preEveryTo: Array<OnesyMiddleware> = [];
  public pre: Array<OnesyMiddleware> = [];
  public preEveryGroupGroup: Array<OnesyMiddleware> = [];
  public preTo: Array<OnesyMiddleware> = [];
  public preEveryGroupTo: Array<OnesyMiddleware> = [];

  public postAll: Array<OnesyMiddleware> = [];
  public postEveryGroup: Array<OnesyMiddleware> = [];
  public postEveryTo: Array<OnesyMiddleware> = [];
  public post: Array<OnesyMiddleware> = [];
  public postEveryGroupGroup: Array<OnesyMiddleware> = [];
  public postTo: Array<OnesyMiddleware> = [];
  public postEveryGroupTo: Array<OnesyMiddleware> = [];

  constructor(
    public name: string,
    public method?: TMethod
  ) { }

}

export default OnesyGroup;
