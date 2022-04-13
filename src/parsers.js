import path from 'path';
import yaml from 'js-yaml';

const parseFile = (file) => {
  const extension = path.extname(file);
  let parser;

  if (extension === '.yaml' || extension === '.yml') {
    parser = yaml.load;
  } else {
    parser = JSON.parse;
  }

  return parser(file);
};

export default parseFile;
