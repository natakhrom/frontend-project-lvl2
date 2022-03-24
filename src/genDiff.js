import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getDiffObjProperty = (obj1, obj2) => {
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

  return `{\n${str}\n}`;
};

function genDiff(filepath1, filepath2) {
  const data1 = readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
  const data2 = readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const strDiff = getDiffObjProperty(obj1, obj2);
  console.log(strDiff);
}

export default genDiff;
