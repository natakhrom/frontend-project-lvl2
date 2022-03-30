import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

function genDiff(filepath1, filepath2) {
  const obj1 = parser(readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8'));
  const obj2 = parser(readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8'));

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const arrKeys = keys1.concat(keys2);
  const arrSortUnicKeys = _.sortedUniq(_.sortBy(arrKeys));
  let str = '';

  arrSortUnicKeys.forEach((key) => {
    if (key in obj1 && key in obj2) {
      if (obj1[key] === obj2[key]) {
        str += `  ${key}: ${obj1[key]}\n`;
      } else {
        str += `- ${key}: ${obj1[key]}\n`;
        str += `+ ${key}: ${obj2[key]}\n`;
      }
    } else if (key in obj1) {
      str += `- ${key}: ${obj1[key]}\n`;
    } else {
      str += `+ ${key}: ${obj2[key]}\n`;
    }
  });

  console.log(`{\n${str}}`);
  return `{\n${str}}`;
}

export default genDiff;
