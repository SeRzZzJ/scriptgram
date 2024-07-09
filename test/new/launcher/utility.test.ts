import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Bot, Listener } from '../../../src/new';
import { CHAT_ID, SessionDataMoc, TOKEN, UpdateMoc } from '../../env.test';
import { TestLauncher } from './test-launcher';

describe('Test utility methods for Launcher', async () => {
  const testLauncher = new TestLauncher(
    new Bot(TOKEN),
    [
      new Listener<SessionDataMoc>('stateTest'),
      new Listener<SessionDataMoc>('testState'),
      new Listener<SessionDataMoc>(),
      new Listener<SessionDataMoc>()
    ],
    {
      text: '',
      updateId: 0
    }
  );

  it('Test setSession', () => {
    testLauncher.testSetSession(UpdateMoc);
    assert.deepStrictEqual(testLauncher.testSessions[0], {
      chat_id: Number(CHAT_ID),
      state: '',
      data: {
        text: '',
        updateId: 0
      }
    });
  });

  it('Test getChatId', () => {
    assert.ok(testLauncher.testGetChatId(UpdateMoc) === Number(CHAT_ID));
    assert.ok(testLauncher.testGetChatId({}) === 0);
  });

  it('Test addNewSession', () => {
    testLauncher.testAddNewSession(CHAT_ID);
    assert.deepStrictEqual(testLauncher.testSessions[0], {
      chat_id: Number(CHAT_ID),
      state: '',
      data: {
        text: '',
        updateId: 0
      }
    });
  });

  it('Test getListenersWithState', () => {
    const listeners = testLauncher.testGetListenersWithState();
    assert.ok(listeners.length === 2);
    for (const listener of listeners) {
      assert.match(listener.state, /(stateTest|testState)/);
    }
  });

  it('Test getListenerWithState', () => {
    const listeners = testLauncher.testGetListenersWithState();

    testLauncher.testAddNewSession(CHAT_ID);
    testLauncher.testSessions[0].state = 'stateTest';
    const listenerStateTest = testLauncher.testGetListenerWithState(listeners);
    assert.match(listenerStateTest!.state, /stateTest/);
    testLauncher.testSessions.pop();

    testLauncher.testAddNewSession(CHAT_ID);
    testLauncher.testSessions[0].state = 'testState';
    const listenerTestState = testLauncher.testGetListenerWithState(listeners);
    assert.match(listenerTestState!.state, /testState/);
    testLauncher.testSessions.pop();
  });

  it('Test getSessionWithState', () => {
    const listeners = testLauncher.testGetListenersWithState();

    testLauncher.testAddNewSession(CHAT_ID);
    testLauncher.testSessions[0].state = 'stateTest';
    const listenerStateTest = testLauncher.testGetListenerWithState(listeners);
    const sessionWithState = testLauncher.testGetSessionWithState(
      listenerStateTest!
    );
    assert.match(sessionWithState!.state, /stateTest/);
    testLauncher.testSessions.pop();
  });

  it('Test getListenersWithoutState', () => {
    const listeners = testLauncher.testGetListenersWithoutState();
    assert.ok(listeners.length === 2);
    for (const listener of listeners) {
      assert.doesNotMatch(listener.state, /(stateTest|testState)/);
    }
  });

  it('Test getSessionWithoutState', () => {
    testLauncher.testAddNewSession(CHAT_ID);
    const sessionWithoutState =
      testLauncher.testGetSessionWithoutState(UpdateMoc);
    assert.doesNotMatch(sessionWithoutState!.state, /stateTest/);
  });
});
