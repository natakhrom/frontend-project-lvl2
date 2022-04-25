import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.yml');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file2.yaml');
const filepath4 = getFixturePath('stylishFormat.txt');

const expected1 = readFileSync(getFixturePath('stylishFormat.txt'), 'utf-8');
const expected2 = readFileSync(getFixturePath('plainFormat.txt'), 'utf-8');
const expected3 = readFileSync(getFixturePath('jsonFormat.txt'), 'utf-8');
const expected4 = readFileSync(getFixturePath('plainFormat2.txt'), 'utf-8');

test.each([
  [filepath1, filepath2, 'stylish', expected1],
  [filepath1, filepath2, 'plain', expected2],
  [filepath1, filepath2, 'json', expected3],
  [filepath1, filepath3, 'plain', expected4],
])('get difference %s', (a, b, c, expected) => {
  expect(genDiff(a, b, c)).toBe(expected);
});

test('Expected errors', () => {
  expect(() => {
    genDiff(filepath4, filepath2);
  }).toThrow();
  expect(() => {
    genDiff(filepath1, filepath2, 'unknown');
  }).toThrow();
});
