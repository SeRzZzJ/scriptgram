import type { Bot } from './bot';
import { Handler } from './handler';
import type { Session } from './session';

export class Listener<T> {
  private handlersArray: Handler<T>[];
  constructor(public state: string = '') {
    this.handlersArray = [];
  }

  get handlers() {
    return this.handlersArray;
  }

  listen(
    trigger: (update: any) => boolean,
    ...handle_fn: ((
      update: any,
      bot: Bot,
      session: Session<T>
    ) => Promise<boolean | void>)[]
  ) {
    this.handlersArray.push({ trigger, callbackFns: handle_fn });
  }
}
