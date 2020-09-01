# expand-obj

📦 NODE.JS - Create a multi-key object with the same/multiple values by passing just a string or array.

## Installation

```bash
npm install expand-obj --save
```

or

```bash
yarn add expand-obj
```

## How to use

Basically you just need to enter an object that contains one or more keys separated by some character or an array as a key.

```js
const expand = require("expand-obj");

const foo = expand({
    [["a", "b", "c"]]: "123",
});

console.log(foo); // result: { a: '123', b: '123', c: '123' }
```

## React example

```jsx
const expand = require("expand-obj");

const styled = expand({
    [["h1", "h2", "p", "span"]]: { fontSize: "2rem", fontWeight: "bold" },
    [["roundedBorder", "cardBorder", "buttonBorder"]]: { borderRadius: "7px" },
    [["span"]]: { fontStyle: "italic" },
});

<span style={styled.span}>Font Size 2rem and Italic<span>
<SomeReactComponent style={{...styled.h1, ...styled.roundedBorder}} />
```

## More examples

By default the keys will be divided by removing spaces that may exist

```js
const foo = expand({
    ["x, y,z"]: "987",
});

console.log(foo); // result: { x: '987', y: '987', z: '987' }
```

But you can prevent this from happening by using the `trimSpaces` option

```js
const options = { trimSpaces: false };

const foo = expand(
    {
        ["  hello world   , one two three,  foo bar  "]: "I think its broken",
    },
    options
);

console.log(foo);

// result: {
//   '  hello world   ': 'I think its broken',
//   ' one two three': 'I think its broken',
//   '  foo bar  ': 'I think its broken'
// }
```

It is also possible to create variables with different values by passing an array as the initial value, for this use the option `splitValues`

```js
const options = {
    splitValues: true,
};

const testObj = expand(
    {
        [["f", "o", "o"]]: ["bar", {}, []],
        ["c, a,t, s"]: ["are cool", 123, true],
    },
    options
);

console.log(testObj);

// result: {
//     f: "bar",
//     o: [],
//     c: "are cool",
//     a: 123,
//     t: true,
//     s: true,
// };
```
