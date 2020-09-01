const testObj = expand(
    {
        [["f", "o", "o"]]: ["bar", {}, []],
        ["c, a,t, s"]: ["are cool", 123, true],
    },
    // splitValues
    true
);

console.log(testObj);
