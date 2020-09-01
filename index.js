module.exports = function expand(obj, deleteRawKey = true, separator = ",") {
    Object.keys(obj).forEach((key) => {
        const subkeys = key.split(separator);
        const value = obj[key];

        subkeys.forEach((subkey) => {
            obj[subkey.trim()] = value;
        });

        if (deleteRawKey) {
            delete obj[key];
        }
    });
    return obj;
};
