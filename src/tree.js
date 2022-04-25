import _ from 'lodash';

const tree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const nodes = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: obj1[key],
      };
    }
    if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
      return {
        name: key,
        type: 'updated',
        value: obj1[key],
        newValue: obj2[key],
      };
    }
    return {
      name: key,
      type: 'internal',
      children: tree(obj1[key], obj2[key]),
    };
  });

  return nodes;
};

export default tree;
