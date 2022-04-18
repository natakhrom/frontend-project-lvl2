import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import parseFile from '../src/parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathFile1 = getFixturePath('file1.yml');
const pathFile2 = getFixturePath('file2.yaml');
const pathFile3 = getFixturePath('file1.json');
const file1 = readFileSync(pathFile1);
const file2 = readFileSync(pathFile2);
const file3 = readFileSync(pathFile3);

const expected1 = yaml.load(file1);
const expected2 = yaml.load(file2);
const expected3 = JSON.parse(file3);

test('parser', () => {
  expect(parseFile(pathFile1)).toEqual(expected1);
  expect(parseFile(pathFile2)).toEqual(expected2);
  expect(parseFile(pathFile3)).toEqual(expected3);
});
