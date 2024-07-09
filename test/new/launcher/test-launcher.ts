import { Bot, Launcher, Listener, Session } from '../../../src/new';
import { CHAT_ID, SessionDataMoc } from '../../env.test';

export class TestLauncher extends Launcher<SessionDataMoc> {
  get testSessions() {
    return this.sessions;
  }

  set testSessions(session: Session<SessionDataMoc>[]) {
    this.sessions = session;
  }

  get testAllowedUpdates() {
    return this.allowed_updates;
  }

  set testAllowedUpdates(allowed_updates: string[]) {
    this.allowed_updates = allowed_updates;
  }

  get testBot() {
    return this.bot;
  }

  set testBot(bot: Bot) {
    this.bot = bot;
  }

  get testListeners() {
    return this.listeners;
  }

  set testListeners(listeners: Listener<SessionDataMoc>[]) {
    this.listeners = listeners;
  }

  get testSessionInit() {
    return this.sessionInit;
  }

  set testSessionInit(sessionInit: SessionDataMoc) {
    this.sessionInit = sessionInit;
  }

  testSetSession(updateMoc: any) {
    this.setSession(updateMoc);
  }

  testGetChatId(updateMoc: any) {
    return this.getChatId(updateMoc);
  }

  testAddNewSession(chatIdMoc: number | string) {
    this.addNewSession(Number(chatIdMoc));
  }

  testGetListenersWithState() {
    return this.getListenersWithState();
  }

  testGetListenerWithState(listenersWithState: Listener<SessionDataMoc>[]) {
    return this.getListenerWithState(listenersWithState);
  }

  testGetSessionWithState(listenerWithState: Listener<SessionDataMoc>) {
    return this.getSessionWithState(listenerWithState);
  }

  testGetListenersWithoutState() {
    return this.getListenersWithoutState();
  }

  testGetSessionWithoutState(updateMoc: any) {
    return this.getSessionWithoutState(updateMoc);
  }

  async testLaunchLoopWithUpdates(
    offset: number,
    limit: number,
    timeout: number
  ) {
    await this.launchLoopWithUpdates(offset, limit, timeout);
  }

  protected async getUpdates(
    offset: number,
    limit: number,
    timeout: number
  ): Promise<any> {
    return new Promise(resolve => {
      resolve([
        {
          update_id: 1,
          message: { chat: { id: CHAT_ID }, text: 'testWithoutState' }
        },
        {
          update_id: 2,
          message: { chat: { id: CHAT_ID }, text: 'testWithState' }
        },
        {
          update_id: 3,
          message: { chat: { id: CHAT_ID }, text: 'testWithoutState' }
        },
        {
          update_id: 4,
          message: { chat: { id: CHAT_ID }, text: 'testWithState' }
        }
      ]);
    });
  }
}
