import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (data, format) => {
  switch (format) {
    case 'plain': return plain(data);
    case 'json': return JSON.stringify(data, null, '  ');
    default: return stylish(data);
  }
};

export default formatter;
