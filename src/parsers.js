import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const parseFile = (filePath) => {
  const extension = path.extname(filePath);
  const content = readFileSync(filePath, 'utf-8');

  switch (extension) {
    case '.yaml': return yaml.load(content);
    case '.yml': return yaml.load(content);
    default: return JSON.parse(content);
  }
};

export default parseFile;
