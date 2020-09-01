module.exports = function expand(obj, deleteRawKey = true, trimSpaces = true, separator = ",") {
    Object.keys(obj).forEach((key) => {
        const subkeys = key.split(separator);
        const value = obj[key];

        subkeys.forEach((subkey) => {
            obj[trimSpaces ? subkey.trim() : subkey] = value;
        });

        if (deleteRawKey) {
            delete obj[key];
        }
    });
    return obj;
};
