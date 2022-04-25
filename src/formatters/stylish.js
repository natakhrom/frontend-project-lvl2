import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const stringify = (data, depth = 1) => {
  const indent = spacesCount * depth;
  const currentIndent = replacer.repeat(indent - 2);
  const bracketIndent = replacer.repeat(indent - spacesCount);
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (data, depth = 1) => {
  const indent = spacesCount * depth;
  const currentIndent = replacer.repeat(indent - 2);
  const bracketIndent = replacer.repeat(indent - spacesCount);

  const lines = data.flatMap((node) => {
    const {
      type, name, children, value, newValue,
    } = node;
    switch (type) {
      case 'internal':
        return `${currentIndent}  ${name}: ${stylish(children, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${name}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return [
          `${currentIndent}- ${name}: ${stringify(value, depth + 1)}`,
          `${currentIndent}+ ${name}: ${stringify(newValue, depth + 1)}`,
        ];
      case 'added':
        return `${currentIndent}+ ${name}: ${stringify(value, depth + 1)}`;
      default: return `${currentIndent}- ${name}: ${stringify(value, depth + 1)}`;
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
