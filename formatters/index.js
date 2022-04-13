import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (data, formatName) => {
  let handler;

  if (formatName === 'plain') {
    handler = plain;
  } else {
    handler = stylish;
  }

  return handler(data);
};

export default formatter;
