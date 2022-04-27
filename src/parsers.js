import yaml from 'js-yaml';

const parseFile = (format, data) => {
  switch (format) {
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parseFile;
