import _ from 'lodash';

const getIndents = (level) => {
  const replacer = ' ';
  const spacesCount = 4;

  const indent = spacesCount * level;
  const currentIndent = replacer.repeat(indent - 2);
  const bracketIndent = replacer.repeat(indent - spacesCount);

  return { currentIndent, bracketIndent };
};

const stringify = (data, depth = 1) => {
  const { currentIndent, bracketIndent } = getIndents(depth);

  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (data, depth = 1) => {
  const { currentIndent, bracketIndent } = getIndents(depth);

  const lines = data.flatMap((node) => {
    const {
      type, name, value,
    } = node;
    switch (type) {
      case 'internal':
        return `${currentIndent}  ${name}: ${stylish(node.children, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${name}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return [
          `${currentIndent}- ${name}: ${stringify(value, depth + 1)}`,
          `${currentIndent}+ ${name}: ${stringify(node.updateValue, depth + 1)}`,
        ];
      case 'added':
        return `${currentIndent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${name}: ${stringify(value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
