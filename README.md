# expand-key-js

📦 NODE.JS - Create a multi-key object with the same value

## How to use

```js
const expand = require("../index");

const foo = expand({
    [["a", "b", "c"]]: "123",
    ["x, y,z"]: "987",
});

console.log(foo); // result: { a: '123', b: '123', c: '123', x: '987', y: '987', z: '987' }
```
