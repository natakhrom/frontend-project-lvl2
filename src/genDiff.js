import { readFileSync } from 'fs';
// import process from 'process';
import path from 'path';
import _ from 'lodash';

const getDiffObjProperty = (obj1, obj2) => {
	let str = '';
	const arrKeys = [];

	for (const key of Object.keys(obj1)) {
		arrKeys.push(key);
	}

	for (const key of Object.keys(obj2)) {
		arrKeys.push(key);
	}

	const arrSortedKeys = _.sortBy(arrKeys);
	const arrUniqKeys = _.sortedUniq(arrSortedKeys);

	for (const key of arrUniqKeys) {
		if (Object.hasOwn(obj1, key)) {
			if (Object.hasOwn(obj2, key)) {
				if (obj1[key] === obj2[key]) {
					str += `  ${key}: ${obj1[key]}\n`;
				} else {
					str += `- ${key}: ${obj1[key]}\n`;
					str += `+ ${key}: ${obj2[key]}\n`;
				}
			} else {
				str += `- ${key}: ${obj1[key]}\n`;
			}
		} else {
			str += `+ ${key}: ${obj2[key]}\n`;
		}
	}
	
	return `{\n${str}\n}`;
}

const genDiff = (filepath1, filepath2) => {
	//const homeDirectory = process.cwd();
	const data1 = readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
	const data2 = readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');
	const obj1 = JSON.parse(data1);
	const obj2 = JSON.parse(data2);

	const strDiff = getDiffObjProperty(obj1, obj2);
	console.log(strDiff);
};

export default genDiff;
