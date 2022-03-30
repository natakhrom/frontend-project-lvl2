import path from 'path';
import yaml from 'js-yaml';

const parserFile = (file) => {
  const extension = path.extname(file);
  let parser;

  if (extension === '.yaml' || extension === '.yml') {
    parser = yaml.load;
  } else {
    parser = JSON.parse;
  }

  return parser(file);
};

export default parserFile;
