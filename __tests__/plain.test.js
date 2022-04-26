import { test, expect } from '@jest/globals';
import plain from '../src/formatters/plain.js';

const node = [{
  name: 'key1',
  value: 'value1',
  type: 'unsupported',
}];

test('Expected error', () => {
  expect(() => plain(node)).toThrow();
});
