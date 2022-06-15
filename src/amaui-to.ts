import { TMethod } from '@amaui/models';

import AmauiGroup from './amaui-group';
import { IAmauiResponse } from './amaui-test';

export interface IAmauiTo {
  name: string;
  method: TMethod;
  parent: AmauiGroup;
  level: number;
  file?: string;
  index: number;
  mainIndex: number;

  response?: IAmauiResponse;
}

class AmauiTo implements IAmauiTo {
  public parent: AmauiGroup;
  public index = 0;
  public mainIndex = 0;
  public level: number;
  public file?: string;
  public response: IAmauiResponse = {};

  constructor(
    public name: string,
    public method: TMethod
  ) { }

}

export default AmauiTo;
