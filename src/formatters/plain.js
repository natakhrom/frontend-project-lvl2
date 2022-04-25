import _ from 'lodash';

const plain = (data, parentName) => {
  const lines = data
    .flatMap((node) => {
      const {
        name, type, value, newValue, children,
      } = node;

      const fullNameKey = parentName === undefined ? name : `${parentName}.${name}`;
      const formattedValue = _.isString(value) ? `'${value}'` : value;
      const complexValue = _.isObject(formattedValue) ? '[complex value]' : formattedValue;
      const formattedNewValue = _.isString(newValue) ? `'${newValue}'` : newValue;
      const complexNewValue = _.isObject(formattedNewValue) ? '[complex value]' : formattedNewValue;

      switch (type) {
        case 'internal':
          return plain(children, fullNameKey);
        case 'unchanged':
          return '';
        case 'updated':
          return `Property '${fullNameKey}' was updated. From ${complexValue} to ${complexNewValue}`;
        case 'added':
          return `Property '${fullNameKey}' was added with value: ${complexValue}`;
        default: return `Property '${fullNameKey}' was removed`;
      }
    })
    .filter((line) => line.trim());

  return [...lines].join('\n');
};

export default plain;
