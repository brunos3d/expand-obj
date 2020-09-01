const expand = require("../index");

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
