# expand-obj

📦 NODE.JS - Create a multi-key object with the same/multiple values by passing just a string or array.

[![npm version](https://badge.fury.io/js/expand-obj.svg)](https://github.com/brunos3d/expand-obj)
[![npm downloads](https://img.shields.io/npm/dm/expand-obj.svg)](https://github.com/brunos3d/expand-obj)
[![Build Status](https://app.travis-ci.com/BrunoS3D/expand-obj.svg?branch=main)](https://github.com/brunos3d/expand-obj)
![Hackage-Deps](https://img.shields.io/hackage-deps/v/expand-obj)
[![Visitors](https://visitor-badge.glitch.me/badge?page_id=BrunoS3D/expand-obj)](https://github.com/brunos3d/expand-obj)

## Installation

```bash
npm install expand-obj --save
```

or

```bash
yarn add expand-obj
```

## Importation

commonjs

```js
const expand = require('expand-obj');
```

or ES6 (export default)

```js
import expand from 'expand-obj';
```

or ES6 (named export)

```js
import { expand } from 'expand-obj';
```

## How to use

Basically you just need to enter an object that contains one or more keys separated by some character or an array as a key.

```js
const expand = require('expand-obj');

const foo = expand({
  ['a, b, c']: 123,
});

console.log(foo); // result: { a: 123, b: 123, c: 123 }
```

With options

```js
const foo = expand(
  {
    ['a, b, c']: [1, 2, 3],
  },
  { splitValues: true }
);

console.log(foo); // result: { a: 1, b: 2, c: 3 }
```

Resolve functions

```js
const foo = await expand({
  ['a, b, c']: async (val: string) => `test=${val}`,
});

console.log(foo); // result: { a: `test=a`, b: `test=b`, c: `test=c` }
```

## React example

```jsx
const expand = require('expand-obj');

const styled = await expand({
    'h1, h2, p, span': { fontSize: '2rem', fontWeight: 'bold' },
    'roundedBorder, cardBorder, buttonBorder': { borderRadius: '7px' },
    'span': { fontStyle: 'italic' },
});

<span style={styled.span}>Font Size 2rem and Italic</span>
<SomeReactComponent style={{...styled.h1, ...styled.roundedBorder}} />
```

## Options

By default these are the configuration options

```js
export type ExpandOptions = {
  separator?: string, // default: ','
  splitValues?: boolean, // default: false
  deleteRawKey?: boolean, // default: true
  trimSpaces?: boolean, // default: true
  tryJoinRepeatedKeys?: boolean, // default: true
  resolveFuncs?: boolean, // default: true
  useSubkeyAsParams?: boolean, // default: true
};
```

## separator (default = ",")

define the subkey separator

```js
const options = {
  separator: '|',
};

const obj = await expand(
  {
    'a, b, c': 123,
  },
  options
);

console.log(obj); // result: { a: 123, b: 123, c: 123 }
```

## splitValues (default = false)

when true, spreads the values if the property value is of type array

```js
const options = {
  splitValues: true,
};

const obj = await expand(
  {
    'a, b, c': 123,
    'h, i, j': [4, 5, 6],
    'x, y, z': [7, 8],
  },
  options
);

console.log(obj); // result: { a: 123, b: 123, c: 123, h: 4, i: 5, j: 6, x: 7, y: 8, z: 8 }
// obs: note that the spread made uses the index of the
// current subkey in the property's key list
// and "z" repeats the last value in the array of values
```

## deleteRawKey (default = true)

when false, prevents the raw key from being removed from object entries

```js
const options = {
  deleteRawKey: false,
};

const obj = await expand(
  {
    'a, b, c': 123,
  },
  options
);

console.log(obj); // result: { 'a, b, c': 123, a: 123, b: 123, c: 123 }
```

## trimSpaces (default = true)

when false, keep leading and trailing spaces

```js
const options = {
  trimSpaces: false,
};

const obj = await expand(
  {
    'a, b, c': 123,
  },
  options
);

console.log(obj); // result: { a: 123, ' b': 123, ' c': 123 }
```

## tryJoinRepeatedKeys (default = true)

when true, if the input object has a key that is equal to a subkey and both values are an array or an object the two values will be merged

```js
const options = {
  tryJoinRepeatedKeys: false,
};

const obj = await expand(
  {
    'a, b, c': 123,
    'foo, bar': [4, 5, 6],
    foo: [789],
  },
  options
);

console.log(obj); // result: { a: 123, b: 123, c: 123, foo: [4, 5, 6, 789], bar: [4, 5, 6] }
```
