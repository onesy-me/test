import { TMethod } from '@onesy/models';

import OnesyGroup from './OnesyGroup';
import { IOnesyResponse } from './OnesyTest';

export interface IOnesyTo {
  name: string;
  method: TMethod;
  parent: OnesyGroup;
  level: number;
  file?: string;
  index: number;
  mainIndex: number;

  response?: IOnesyResponse;
}

class OnesyTo implements IOnesyTo {
  public parent: OnesyGroup;
  public index = 0;
  public mainIndex = 0;
  public level: number;
  public file?: string;
  public response: IOnesyResponse = {};

  constructor(
    public name: string,
    public method: TMethod
  ) { }

}

export default OnesyTo;
