import _ from 'lodash';

const plain = (data, parentProperty) => {
  const keys = _.keys(data);
  let str = '';

  keys.forEach((key, index, arrayOfKeys) => {
    const keyWithoutPrefix = key.substring(2);
    let value = _.isString(data[key]) ? `'${data[key]}'` : data[key];
    if (_.isObject(value)) {
      value = '[complex value]';
    }
    const previousKey = index > 0
      ? arrayOfKeys[index - 1]
      : undefined;
    let previousValue = _.isString(data[previousKey]) ? `'${data[previousKey]}'` : data[previousKey];
    if (_.isObject(previousValue)) {
      previousValue = '[complex value]';
    }

    const path = parentProperty === undefined
      ? keyWithoutPrefix
      : `${parentProperty}.${keyWithoutPrefix}`;

    if (key.startsWith('  ') && _.isObject(data[key])) {
      str += `${plain(data[key], path)}`;
    } else if (key.startsWith('- ')) {
      str += `Property '${path}' was removed\n`;
    } else if (key.startsWith('+ ')) {
      if (previousKey !== undefined && keyWithoutPrefix === previousKey.substring(2)) {
        str = str.replace(`Property '${path}' was removed\n`, `Property '${path}' was updated. From ${previousValue} to ${value}\n`);
      } else {
        str += `Property '${path}' was added with value: ${value}\n`;
      }
    }
  });

  return str;
};

export default plain;
