import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const failpath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const failpath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
const expected = 
`{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('getDiffFiles', () => {
  expect(genDiff(failpath1, failpath2)).toEqual(expected);
});
