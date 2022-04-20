import path from 'path';

import parseFile from './parsers.js';
import formatter from './formatters/formatter.js';
import tree from './tree.js';

function genDiff(filepath1, filepath2, formatName) {
  const object1 = parseFile(path.resolve(filepath1));
  const object2 = parseFile(path.resolve(filepath2));

  return formatter(tree(object1, object2), formatName);
}

export default genDiff;
