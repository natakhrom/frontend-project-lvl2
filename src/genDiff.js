import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

function genDiff(filepath1, filepath2) {
  const path1 = path.resolve('__fixtures__', filepath1);
  const path2 = path.resolve('__fixtures__', filepath2);
  const obj1 = JSON.parse(readFileSync(path1, 'utf-8'));
  const obj2 = JSON.parse(readFileSync(path2, 'utf-8'));

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const arrKeys = keys1.concat(keys2);
  const arrSortKeys = _.sortBy(arrKeys);
  const arrSortUnicKeys = _.sortedUniq(arrSortKeys);
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
