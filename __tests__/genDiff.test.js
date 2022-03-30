import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
const filepath3 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
const filepath4 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');
const filepath5 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
const filepath6 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('getDiffFiles', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
  expect(genDiff(filepath3, filepath4)).toEqual(expected);
  expect(genDiff(filepath1, filepath4)).toEqual(expected);
  expect(genDiff(filepath5, filepath6)).toEqual(expected);
  expect(genDiff(filepath1, filepath6)).toEqual(expected);
});
