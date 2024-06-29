import { describe, it } from 'node:test';
import { Bot } from '../../src/new';
import { CHAT_ID, EMPTY_CHAT_ID, FAIL_CHAT_ID, TOKEN } from '../env.test';
import assert from 'node:assert/strict';

describe('Test send different requests', async () => {
  const bot = new Bot(TOKEN);
  it('Test get methods', async () => {
    assert.ok(await bot.sendRequestToAPI('getMe'));
    try {
      await bot.sendRequestToAPI('get');
    } catch (error) {
      assert.throws(() => {
        throw error;
      }, Error);
    }
  });
  it('Test send methods', async () => {
    assert.ok(
      await bot.sendRequestToAPI('sendMessage', {
        params: { chat_id: CHAT_ID, text: 'Test message' }
      })
    );
    try {
      await bot.sendRequestToAPI('sendMessage', {
        params: { chat_id: FAIL_CHAT_ID, text: 'Test message' }
      });
      await bot.sendRequestToAPI('sendMessage', {
        params: { chat_id: EMPTY_CHAT_ID, text: 'Test message' }
      });
      await bot.sendRequestToAPI('sendMessage', {
        params: { chat_id: CHAT_ID }
      });
    } catch (error) {
      assert.throws(() => {
        throw error;
      }, Error);
    }
  });
  it('Test send file/document', async () => {
    assert.ok(
      await bot.sendRequestToAPI('sendDocument', {
        inputFile: {
          path: `${__dirname}//test.json.json`,
          name: 'test.json.json'
        },
        params: { chat_id: CHAT_ID }
      })
    );
		assert.ok(
      await bot.sendRequestToAPI('sendDocument', {
        inputFile: {
          path: `${__dirname}//test.json.json`,
          name: 'test.json'
        },
        params: { chat_id: CHAT_ID }
      })
    );
    try {
      await bot.sendRequestToAPI('sendDocument', {
        inputFile: {
          path: `${__dirname}test.json.json`,
          name: 'test.json.json'
        },
        params: { chat_id: CHAT_ID }
      });
    } catch (error) {
      assert.throws(() => {
        throw error;
      }, Error);
    }
  });
});
