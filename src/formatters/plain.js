import _ from 'lodash';

const plain = (data, parentName) => {
  const lines = data
    .flatMap((node) => {
      const {
        name, type, value, newValue, children,
      } = node;

      const fullNameKey = parentName === undefined ? name : `${parentName}.${name}`;
      const plainValue = _.isString(value) ? `'${value}'` : value;
      const complexValue = _.isObject(plainValue) ? '[complex value]' : plainValue;
      const formattedNewValue = _.isString(newValue) ? `'${newValue}'` : newValue;

      switch (type) {
        case 'unchanged':
          if (children === undefined) {
            return '';
          }
          return plain(children, fullNameKey);
        case 'updated':
          return `Property '${fullNameKey}' was updated. From ${complexValue} to ${formattedNewValue}`;
        case 'added':
          return `Property '${fullNameKey}' was added with value: ${complexValue}`;
        default: return `Property '${fullNameKey}' was removed`;
      }
    })
    .filter((line) => line.trim());

  return [...lines].join('\n');
};

export default plain;
