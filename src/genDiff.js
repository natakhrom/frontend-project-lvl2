import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import formatter from './formatters/formatter.js';
import tree from './tree.js';

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const formatPath1 = path.extname(path1);
  const formatPath2 = path.extname(path2);
  const data1 = readFileSync(path1, 'utf-8');
  const data2 = readFileSync(path2, 'utf-8');

  const object1 = parseFile(formatPath1, data1);
  const object2 = parseFile(formatPath2, data2);

  return formatter(tree(object1, object2), formatName);
}

export default genDiff;
