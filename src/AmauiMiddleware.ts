import { TMethod } from '@amaui/models';

import AmauiGroup from './AmauiGroup';
import { IAmauiResponse } from './AmauiTest';

export interface IAmauiMiddleware {
  name: string;
  method: TMethod;
  parent: AmauiGroup;
  file?: string;

  responses?: Array<IAmauiResponse>;
}

class AmauiMiddleware implements IAmauiMiddleware {
  public parent: AmauiGroup;
  public file?: string;
  public responses: Array<IAmauiResponse> = [];

  constructor(
    public name: string,
    public method: TMethod
  ) { }

}

export default AmauiMiddleware;
