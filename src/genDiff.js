import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

const addPrefixToKey = (data) => {
  if (!_.isObject(data)) {
    return data;
  }

  const entries = Object.entries(data);
  const diffObj = {};

  entries.forEach(([key, value]) => {
    diffObj[`  ${key}`] = addPrefixToKey(value);
  });

  return diffObj;
};

function genDiff(filepath1, filepath2) {
  const obj1 = parser(readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8'));
  const obj2 = parser(readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8'));

  const getDiffObj = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const arrKeys = keys1.concat(keys2).sort();
    const arrKeysUniq = _.sortedUniq(arrKeys);
    const diffObj = {};

    arrKeysUniq.forEach((key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (key in data1 && key in data2) {
        if (_.isObject(value1) && _.isObject(value2)) {
          diffObj[`  ${key}`] = getDiffObj(value1, value2);
        } else if (value1 === value2) {
          diffObj[`  ${key}`] = value1;
        } else {
          diffObj[`- ${key}`] = addPrefixToKey(value1);
          diffObj[`+ ${key}`] = addPrefixToKey(value2);
        }
      } else if (key in data1) {
        diffObj[`- ${key}`] = addPrefixToKey(value1);
      } else {
        diffObj[`+ ${key}`] = addPrefixToKey(value2);
      }
    });

    return diffObj;
  };

  return getDiffObj(obj1, obj2);
}

export default genDiff;
