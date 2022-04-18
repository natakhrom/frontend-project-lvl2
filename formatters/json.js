import _ from 'lodash';

const stringify = (data, depth = 1) => {
  const indent = '  '.repeat(depth);
  const bracketIndent = '  '.repeat(depth - 1);
  if (!_.isObject(data)) {
    return _.isString(data) ? `"${data}"` : `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value], index, arr) => {
      const endOfString = arr.length - 1 === index ? '' : ',';

      return `${indent}  "${key}": ${stringify(value, depth + 2)}${endOfString}`;
    });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const json = (data, depth = 1) => {
  const indent = '  '.repeat(depth);
  const bracketIndent = '  '.repeat(depth - 1);

  const lines = data.flatMap((node, index, arr) => {
    const endOfString = arr.length - 1 === index ? '' : ',';
    const {
      name,
      type,
      value,
      newValue,
      children,
    } = node;

    switch (type) {
      case 'unchanged':
        if (children === undefined) {
          return `${indent}  "${name}": ${stringify(value, depth + 2)}${endOfString}`;
        }
        return `${indent}  "${name}": ${json(children, depth + 2)}${endOfString}`;
      case 'updated':
        return [
          `${indent}"- ${name}": ${stringify(value, depth + 2)},`,
          `${indent}"+ ${name}": ${stringify(newValue, depth + 2)}${endOfString}`,
        ];
      case 'added':
        return `${indent}"+ ${name}": ${stringify(value, depth + 2)}${endOfString}`;
      default: return `${indent}"- ${name}": ${stringify(value, depth + 2)}${endOfString}`;
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default json;
