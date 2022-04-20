import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const parseFile = (file) => {
  const extension = path.extname(file);

  switch (extension) {
    case '.yaml': return yaml.load(readFileSync(file, 'utf-8'));
    case '.yml': return yaml.load(readFileSync(file, 'utf-8'));
    case '.json': return JSON.parse(readFileSync(file, 'utf-8'));
    default: throw new Error(`Unknown extension: ${extension}`);
  }
};

export default parseFile;
