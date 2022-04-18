import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';
import formatter from './formatters/index.js';

const tree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const nodes = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (key in obj1 && key in obj2 && _.isObject(value1) && _.isObject(value2)) {
      return {
        name: key,
        type: 'unchanged',
        children: tree(value1, value2),
      };
    }
    if (key in obj1 && key in obj2 && value1 === value2) {
      return {
        name: key,
        type: 'unchanged',
        value: value1,
      };
    }
    if (key in obj1 && key in obj2 && value1 !== value2) {
      return {
        name: key,
        type: 'updated',
        value: value1,
        newValue: value2,
      };
    }
    if (key in obj1) {
      return {
        name: key,
        type: 'deleted',
        value: value1,
      };
    }
    return {
      name: key,
      type: 'added',
      value: value2,
    };
  });
  return nodes;
};

function genDiff(filepath1, filepath2, formatName) {
  const object1 = parseFile(path.resolve('__fixtures__', filepath1));
  const object2 = parseFile(path.resolve('__fixtures__', filepath2));

  return formatter(tree(object1, object2), formatName);
}
genDiff('file1.json', 'file2.json');
export default genDiff;
