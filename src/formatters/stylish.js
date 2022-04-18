import _ from 'lodash';

const indent = '  ';

const stringify = (data, depth = 1) => {
  const currentIndent = indent.repeat(depth);
  const bracketIndent = indent.repeat(depth - 1);
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 2)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (data, depth = 1) => {
  const currentIndent = indent.repeat(depth);
  const bracketIndent = indent.repeat(depth - 1);

  const lines = data.flatMap((node) => {
    const {
      type, name, children, value, newValue,
    } = node;
    switch (type) {
      case 'unchanged':
        if (children === undefined) {
          return `${currentIndent}  ${name}: ${stringify(value, depth + 2)}`;
        }
        return `${currentIndent}  ${name}: ${stylish(children, depth + 2)}`;
      case 'updated':
        return [
          `${currentIndent}- ${name}: ${stringify(value, depth + 2)}`,
          `${currentIndent}+ ${name}: ${stringify(newValue, depth + 2)}`,
        ];
      case 'added':
        return `${currentIndent}+ ${name}: ${stringify(value, depth + 2)}`;
      default: return `${currentIndent}- ${name}: ${stringify(value, depth + 2)}`;
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
