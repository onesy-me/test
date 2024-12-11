import { TMethod } from '@onesy/models';

import OnesyGroup from './OnesyGroup';
import { IOnesyResponse } from './OnesyTest';

export interface IOnesyMiddleware {
  name: string;
  method: TMethod;
  parent: OnesyGroup;
  file?: string;

  responses?: Array<IOnesyResponse>;
}

class OnesyMiddleware implements IOnesyMiddleware {
  public parent: OnesyGroup;
  public file?: string;
  public responses: Array<IOnesyResponse> = [];

  constructor(
    public name: string,
    public method: TMethod
  ) { }

}

export default OnesyMiddleware;
