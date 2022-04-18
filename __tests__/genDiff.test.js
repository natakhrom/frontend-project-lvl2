import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.yaml');

const received1 = genDiff(filepath1, filepath2, 'stylish');
const received2 = genDiff(filepath1, filepath2, 'plain');
const received3 = genDiff(filepath1, filepath2, 'json');

const expected1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
const expected2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
const expected3 = `{
    "common": {
      "+ follow": false,
        "setting1": "Value 1",
      "- setting2": 200,
      "- setting3": true,
      "+ setting3": null,
      "+ setting4": "blah blah",
      "+ setting5": {
            "key5": "value5"
        },
        "setting6": {
            "doge": {
              "- wow": "",
              "+ wow": "so much"
            },
            "key": "value",
          "+ ops": "vops"
        }
    },
    "group1": {
      "- baz": "bas",
      "+ baz": "bars",
        "foo": "bar",
      "- nest": {
            "key": "value"
        },
      "+ nest": "str"
    },
  "- group2": {
        "abc": 12345,
        "deep": {
            "id": 45
        }
    },
  "+ group3": {
        "deep": {
            "id": {
                "number": 45
            }
        },
        "fee": 100500
    }
}`;

test('get difference', () => {
  expect(received1).toEqual(expected1);
  expect(received2).toEqual(expected2);
  expect(received3).toEqual(expected3);
  expect(() => {
    genDiff(filepath1, filepath2, ' unknown format');
  }).toThrow();
});
