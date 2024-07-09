import { describe, it } from 'node:test';
import { Bot, Listener } from '../../../src/new';
import { SessionDataMoc, TOKEN } from '../../env.test';
import { TestLauncher } from './test-launcher';
import assert from 'node:assert/strict';

describe('Test business logic Launcher', async () => {
  const lWithoutState = new Listener<SessionDataMoc>();
  lWithoutState.listen(
    (update: any) => update.message.text === 'testWithoutState',
    async (update, bot, session) => {
      it('Test listener without state', () => {
        assert.equal(update.message.text, 'testWithoutState');
      });
      session.data!.updateId = update.update_id;
      session.data!.text = update.message.text;
      return true;
    },
    async (update, bot, session) => {
      it('Test listener without state', () => {
        assert.equal(session.data!.text, 'testWithoutState');
      });
      session.state = 'testWithState';
    },
    async (update, bot, session) => {
      session.state = '123';
    }
  );
  const lWithState = new Listener<SessionDataMoc>('testWithState');
  lWithState.listen(
    update => update.message.text === 'testWithState',
    async (update, bot, session) => {
      session.data!.updateId = update.update_id;
      it('Test listener with state',() => {
        assert.match(update.message.text, /testWithState/);
        assert.equal(session.state, 'testWithState');
      });
      // return true;
    },
    async (update, bot, session) => {
      // session.state = '';
    }
  );
  const launcher = new TestLauncher(
    new Bot(TOKEN),
    [lWithoutState, lWithState],
    {
      text: '',
      updateId: -1
    }
  );
  await launcher.testLaunchLoopWithUpdates(-1, 100, 10);
});
