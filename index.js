module.exports = function expand(obj, options = {}) {
    const { separator = ",", splitValues = false, deleteRawKey = true, trimSpaces = true, tryJoinRepeatedKeys = true } = options;

    Object.keys(obj).forEach((key) => {
        const subkeys = key.split(separator);
        const value = obj[key];

        subkeys.forEach((subkey, index) => {
            const tagetSubkey = trimSpaces ? subkey.trim() : subkey;
            const targetIndex = Math.max(0, Math.min(index, value.length - 1));

            function defaultAction() {
                if (splitValues && Array.isArray(value)) {
                    obj[tagetSubkey] = value[targetIndex];
                } else {
                    obj[tagetSubkey] = value;
                }
            }

            if (tryJoinRepeatedKeys && tagetSubkey in obj) {
                if (Array.isArray(value) && Array.isArray(obj[tagetSubkey])) {
                    obj[tagetSubkey] = [...obj[tagetSubkey], ...value];
                } else if (typeof value === "object" && typeof obj[tagetSubkey] === "object") {
                    obj[tagetSubkey] = { ...obj[tagetSubkey], ...value };
                } else {
                    defaultAction();
                }
            } else {
                defaultAction();
            }
        });

        if (key.indexOf(separator) > -1 && deleteRawKey) {
            delete obj[key];
        }
    });
    return obj;
};
