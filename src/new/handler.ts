import type { Bot } from './bot';
import type { Session } from './session';

export interface Handler<T> {
  // type: string;
  // field: string;
  // trigger: Trigger;
  trigger: (update: any) => boolean;
  // data: string;
  callbackFns: ((
    update: any,
    bot: Bot,
    session: Session<T>,
    isNext?: boolean
  ) => Promise<boolean | void>)[];
}
