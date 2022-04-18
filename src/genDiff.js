import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';
import formatter from './formatters/index.js';

const tree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  const iter = keys.flatMap((key) => {
    const array = [];
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        array.push({
          name: key,
          type: 'unchanged',
          children: tree(value1, value2),
        });
      } else if (value1 === value2) {
        array.push({
          name: key,
          type: 'unchanged',
          value: value1,
        });
      } else {
        array.push({
          name: key,
          type: 'updated',
          value: value1,
          newValue: value2,
        });
      }
    } else if (_.has(obj1, key)) {
      array.push({
        name: key,
        type: 'deleted',
        value: value1,
      });
    } else {
      array.push({
        name: key,
        type: 'added',
        value: value2,
      });
    }
    return array;
  });
  return iter;
};

function genDiff(filepath1, filepath2, formatName) {
  const object1 = parseFile(path.resolve('__fixtures__', filepath1));
  const object2 = parseFile(path.resolve('__fixtures__', filepath2));

  return formatter(tree(object1, object2), formatName);
}

export default genDiff;
