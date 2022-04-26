import { test, expect } from '@jest/globals';
import stylish from '../src/formatters/stylish.js';

const node = [{
  name: 'key1',
  value: 'value1',
  type: 'unsupported',
}];

test('Expected error', () => {
  expect(() => stylish(node)).toThrow();
});
