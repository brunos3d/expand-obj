const expand = require("../index");

const foo = expand({
    [["a", "b", "c"]]: "123",
    ["x, y,z"]: "987",
});

console.log(foo);
