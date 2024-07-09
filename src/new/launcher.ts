import { Bot } from './bot';
import { Listener } from './listener';
import { Session } from './session';
export class Launcher<T> {
  protected sessions: Session<T>[];
  protected allowed_updates: string[];
  constructor(
    protected bot: Bot,
    protected listeners: Listener<T>[],
    protected sessionInit: T
  ) {
    this.sessions = [];
    this.allowed_updates = [
      'message',
      'edited_message',
      'channel_post',
      'edited_channel_post',
      'business_connection',
      'business_message',
      'edited_business_message',
      'deleted_business_messages',
      'message_reaction',
      'message_reaction_count',
      'inline_query',
      'chosen_inline_result',
      'callback_query',
      'shipping_query',
      'pre_checkout_query',
      'poll',
      'poll_answer',
      'my_chat_member',
      'chat_member',
      'chat_join_request',
      'chat_boost',
      'removed_chat_boost'
    ];
  }

  async launchLongPolling(
    limit: number = 100,
    timeout: number = 10,
    allowed_updates?: string[]
  ) {
    if (allowed_updates) this.allowed_updates = allowed_updates;
    let offset = -1;
    while (true) {
      offset = await this.launchLoopWithUpdates(offset, limit, timeout);
    }
  }

  protected async launchLoopWithUpdates(
    offset: number,
    limit: number,
    timeout: number
  ) {
    for (const update of await this.getUpdates(offset, limit, timeout)) {
      this.setSession(update);
      const listenersWithState = this.getListenersWithState();
      const listenerWithState = this.getListenerWithState(listenersWithState);
      if (listenerWithState) {
        const sessionWithState = this.getSessionWithState(listenerWithState);
        if (sessionWithState) {
          await this.runHandlerFn(
            update,
            [listenerWithState],
            sessionWithState
          );
        }
      } else {
        const listenersWithoutState = this.getListenersWithoutState();
        const sessionWithoutState = this.getSessionWithoutState(update);
        if (listenersWithoutState && sessionWithoutState) {
          await this.runHandlerFn(
            update,
            listenersWithoutState,
            sessionWithoutState
          );
        }
      }

      offset = Math.max(offset, update.update_id) + 1;
    }
    return offset;
  }

  protected async getUpdates(offset: number, limit: number, timeout: number) {
    return await this.bot.sendRequestToAPI('getUpdates', {
      params: {
        offset,
        limit,
        timeout,
        allowed_updates: this.allowed_updates
      }
    });
  }

  protected setSession(update: any) {
    if (!this.sessions) this.sessions = [];
    const chat_id = this.getChatId(update);
    let session = this.sessions.filter(ses => ses.chat_id === chat_id)[0];
    if (!session) this.addNewSession(chat_id);
  }

  protected addNewSession(chat_id: number) {
    if (this.sessionInit) {
      this.sessions.push({ chat_id, state: '', data: this.sessionInit });
    } else {
      this.sessions.push({ chat_id, state: '' });
    }
  }

  protected getChatId(update: any) {
    let chat_id: number;
    for (const allowed_update of this.allowed_updates) {
      const res = update[allowed_update]?.chat?.id;
      if (res) chat_id = res;
    }
    if (chat_id!) return chat_id;
    else return 0;
  }

  protected matchListener() {
    let listeners = this.getListenersWithState();
    if (listeners) {
      const listener = this.getListenerWithState(listeners);
      if (listener) return [listener];
    }
    return this.getListenersWithoutState();
  }

  protected async matchSession(update: any) {}

  protected getListenersWithState() {
    return this.listeners.filter(listener => listener.state);
  }

  protected getListenerWithState(listenersWithState: Listener<T>[]) {
    return listenersWithState.find(listener =>
      this.sessions.find(session => session.state === listener.state)
    );
  }

  protected getSessionWithState(listenerWithState: Listener<T>) {
    return this.sessions.find(
      session => session.state === listenerWithState?.state
    );
  }

  protected async runHandlerFn(
    update: any,
    filteredListeners: Listener<T>[],
    filteredSession: Session<T>
  ) {
    for (const filteredListener of filteredListeners) {
      for (const handler of filteredListener.handlers) {
        if (handler.trigger(update)) {
          let isNext = undefined;
          for (const callbackFn of handler.callbackFns) {
            isNext = await callbackFn(
              update,
              this.bot,
              filteredSession,
              isNext
            );
            if (isNext == undefined || isNext == false) break;
          }
          if (isNext == undefined || isNext == false) break;
        }
      }
    }
  }

  protected getListenersWithoutState() {
    return this.listeners.filter(listener => !listener.state);
  }

  protected getSessionWithoutState(update: any) {
    return this.sessions.find(
      session => session.chat_id === this.getChatId(update) && !session.state
    );
  }
}

// protected async matchListener(update: any) {
//   const listenersWithState = this.listeners.filter(
//     listener => listener.state
//   );
//   const listenerWithState = listenersWithState.find(listener =>
//     this.sessions.find(session => session.state === listener.state)
//   );
//   const sessionWithState = this.sessions.find(
//     session => session.state === listenerWithState?.state
//   );
//   if (listenerWithState && sessionWithState) {
//     for (const handler of listenerWithState.handlers) {
//       if (handler.trigger(update)) {
//         let isNext = undefined;
//         for (const callbackFn of handler.callbackFns) {
//           isNext = await callbackFn(
//             update,
//             this.bot,
//             sessionWithState,
//             isNext
//           );
//           if (isNext == undefined || isNext == false) break;
//         }
//         if (isNext == undefined || isNext == false) break;
//       }
//     }
//     return;
//   }
//   const listenersWithoutState = this.listeners.filter(
//     listener => !listener.state
//   );
//   const sessionWithoutState = this.sessions.find(
//     session => session.chat_id === this.getChatId(update) && !session.state
//   );
//   if (listenersWithoutState && sessionWithoutState) {
//     for (const listeners of listenersWithoutState) {
//       for (const handler of listeners.handlers) {
//         if (handler.trigger(update)) {
//           let isNext = undefined;
//           for (const callbackFn of handler.callbackFns) {
//             isNext = await callbackFn(
//               update,
//               this.bot,
//               sessionWithoutState,
//               isNext
//             );
//             if (isNext == undefined || isNext == false) break;
//           }
//           if (isNext == undefined || isNext == false) break;
//         }
//       }
//     }
//   }
// }

// protected async matchListener(update: any) {
//   const listenersWithState = this.listeners.filter(
//     listener => listener.state
//   );
//   const listenerWithState = listenersWithState.find(listener =>
//     this.sessions.find(session => session.state === listener.state)
//   );
//   const sessionWithState = this.sessions.find(
//     session => session.state === listenerWithState?.state
//   );
//   if (listenerWithState && sessionWithState) {
//     for (const handler of listenerWithState.handlers) {
//       if (handler.trigger.triggerFn(update)) {
//         for (const callbackFn of handler.callbackFns) {
//           await callbackFn(update, this.bot, sessionWithState);
//           if (!handler.trigger.isNextHandler) break;
//         }
//         if (!handler.trigger.isNextHandler) break;
//       }
//     }
//     return;
//   }
//   const listenersWithoutState = this.listeners.filter(
//     listener => !listener.state
//   );
//   const sessionWithoutState = this.sessions.find(
//     session => session.chat_id === this.getChatId(update) && !session.state
//   );
//   if (listenersWithoutState && sessionWithoutState) {
//     for (const listeners of listenersWithoutState) {
//       for (const handler of listeners.handlers) {
//         if (handler.trigger.triggerFn(update)) {
//           for (const callbackFn of handler.callbackFns) {
//             await callbackFn(update, this.bot, sessionWithoutState);
//             if (!handler.trigger.isNextHandler) break;
//           }
//           if (!handler.trigger.isNextHandler) break;
//         }
//       }
//     }
//   }
// }
