import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file2.yaml');

const received1 = genDiff(filepath1, filepath2, 'stylish');
const received2 = genDiff(filepath1, filepath2, 'plain');
const received3 = genDiff(filepath1, filepath2, 'json');
const received4 = genDiff(filepath1, filepath3, 'plain');
const received5 = genDiff(filepath1, filepath2, 'unknown');

const expected1 = readFileSync(getFixturePath('stylishFormat.txt'), 'utf-8');
const expected2 = readFileSync(getFixturePath('plainFormat.txt'), 'utf-8');
const expected3 = readFileSync(getFixturePath('jsonFormat.txt'), 'utf-8');
const expected4 = readFileSync(getFixturePath('plainFormat2.txt'), 'utf-8');

test('get difference', () => {
  expect(received1).toEqual(expected1);
  expect(received2).toEqual(expected2);
  expect(received3).toEqual(expected3);
  expect(received4).toEqual(expected4);
  expect(received5).toEqual(expected1);
});
