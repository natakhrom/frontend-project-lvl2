import _ from 'lodash';

const stringify = (data, depth = 1) => {
  const indent = '  '.repeat(depth);
  const bracketIndent = '  '.repeat(depth - 1);
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent}  ${key}: ${stringify(value, depth + 2)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (data, depth = 1) => {
  const indent = '  '.repeat(depth);
  const bracketIndent = '  '.repeat(depth - 1);

  const lines = data.flatMap((node) => {
    const {
      type,
      name,
      children,
      value,
      newValue,
    } = node;
    switch (type) {
      case 'unchanged':
        if (children === undefined) {
          return `${indent}  ${name}: ${stringify(value, depth + 2)}`;
        }
        return `${indent}  ${name}: ${stylish(children, depth + 2)}`;
      case 'updated':
        return [
          `${indent}- ${name}: ${stringify(value, depth + 2)}`,
          `${indent}+ ${name}: ${stringify(newValue, depth + 2)}`,
        ];
      case 'added':
        return `${indent}+ ${name}: ${stringify(value, depth + 2)}`;
      default: return `${indent}- ${name}: ${stringify(value, depth + 2)}`;
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
