import yaml from 'js-yaml';
import { test, expect } from '@jest/globals';
import parserFile from '../src/parsers.js';

const file1 = 'file.yml';
const file2 = 'file.yaml';
const expected1 = yaml.load(file1);
const expected2 = yaml.load(file2);

test('parser', () => {
  expect(parserFile(file1)).toEqual(expected1);
  expect(parserFile(file2)).toEqual(expected2);
});
