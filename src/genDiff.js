import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

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

function genDiff(filepath1, filepath2, formatName) {
  const object1 = parser(readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8'));
  const object2 = parser(readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8'));

  const getDiffObj = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortOfKeys = keys.sort();

    const getDiffFiles = sortOfKeys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (key in obj1 && key in obj2) {
        if (_.isObject(value1) && _.isObject(value2)) {
          acc[`  ${key}`] = getDiffObj(value1, value2);
        } else if (value1 === value2) {
          acc[`  ${key}`] = value1;
        } else {
          acc[`- ${key}`] = addPrefixToKey(value1);
          acc[`+ ${key}`] = addPrefixToKey(value2);
        }
      } else if (key in obj1) {
        acc[`- ${key}`] = addPrefixToKey(value1);
      } else {
        acc[`+ ${key}`] = addPrefixToKey(value2);
      }

      return acc;
    }, {});

    return getDiffFiles;
  };

  return formatter(getDiffObj(object1, object2), formatName);
}

export default genDiff;
