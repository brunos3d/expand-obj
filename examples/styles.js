const expand = require("../index");

const styled = expand({
    [["h1", "h2", "p", "span"]]: { fontSize: "2rem", fontWeight: "bold" },
    [["roundedBorder", "cardBorder", "buttonBorder"]]: { borderRadius: "7px" },
    span: { fontStyle: "italic" },
});

// <span style={styled.span}>Font Size 2rem and Italic</span>
// <SomeReactComponent style={{...styled.h1, ...styled.roundedBorder}} />

console.log(styled);
