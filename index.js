module.exports = function expand(obj, splitValues = false, separator = ",", deleteRawKey = true, trimSpaces = true) {
    Object.keys(obj).forEach((key) => {
        const subkeys = key.split(separator);
        const value = obj[key];

        subkeys.forEach((subkey, index) => {
            if (Array.isArray(value) && splitValues) {
                obj[trimSpaces ? subkey.trim() : subkey] = value[Math.max(0, Math.min(index, value.length - 1))];
            } else {
                obj[trimSpaces ? subkey.trim() : subkey] = value;
            }
        });

        if (deleteRawKey) {
            delete obj[key];
        }
    });
    return obj;
};
