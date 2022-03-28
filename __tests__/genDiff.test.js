import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
const filepath3 = path.join(__dirname, '..', '__fixtures__', 'file3.json');
const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
const expected2 = `{
  follow: false
  host: hexlet.io
  proxy: 123.234.53.22
  timeout: 50
}`;
const expected3 = `{
+ follow: true
  host: hexlet.io
+ proxy: 123.234.53.22
- timeout: 20
+ timeout: 70
- verbose: true
}`;

test('getDiffFiles', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
  expect(genDiff(filepath1, filepath1)).toEqual(expected2);
  expect(genDiff(filepath2, filepath3)).toEqual(expected3);
});
