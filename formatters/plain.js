import _ from 'lodash';

const plain = (data, parentName) => {
  const lines = data
    .flatMap((node) => {
      const {
        name,
        type,
        value,
        newValue,
        children,
      } = node;

      const fullNameKey = parentName === undefined ? name : `${parentName}.${name}`;
      const formattedValue1 = _.isString(value) ? `'${value}'` : value;
      const formattedValue2 = _.isObject(formattedValue1) ? '[complex value]' : formattedValue1;
      const formattedNewValue = _.isString(newValue) ? `'${newValue}'` : newValue;

      switch (type) {
        case 'unchanged':
          if (children === undefined) {
            return '';
          }
          return plain(children, fullNameKey);
        case 'updated':
          return `Property '${fullNameKey}' was updated. From ${formattedValue2} to ${formattedNewValue}`;
        case 'added':
          return `Property '${fullNameKey}' was added with value: ${formattedValue2}`;
        default: return `Property '${fullNameKey}' was removed`;
      }
    })
    .filter((line) => line.trim());

  return [...lines].join('\n');
};

export default plain;
