import _ from 'lodash';

const stringify = (value) => {
  const formattedValue = _.isString(value) ? `'${value}'` : value;
  const complexValue = _.isObject(formattedValue) ? '[complex value]' : formattedValue;

  return complexValue;
};

const plain = (data, parentName) => {
  const lines = data
    .flatMap((node) => {
      const {
        name, type, value,
      } = node;

      const fullNameKey = parentName === undefined ? name : `${parentName}.${name}`;

      switch (type) {
        case 'internal':
          return plain(node.children, fullNameKey);
        case 'unchanged':
          return null;
        case 'updated':
          return `Property '${fullNameKey}' was updated. From ${stringify(value)} to ${stringify(node.updateValue)}`;
        case 'added':
          return `Property '${fullNameKey}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${fullNameKey}' was removed`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    })
    .filter((line) => Boolean(line));

  return [...lines].join('\n');
};

export default plain;
