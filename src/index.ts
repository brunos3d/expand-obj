export type ExpandOptions = {
  separator?: string; // default: ','
  splitValues?: boolean; // default: false
  deleteRawKey?: boolean; // default: true
  trimSpaces?: boolean; // default: true
  tryJoinRepeatedKeys?: boolean; // default: true
  resolveFuncs?: boolean; // default: true
  useSubkeyAsParams?: boolean; // default: true
};

export async function expand<T>(obj: any, options: ExpandOptions = {}): Promise<T> {
  const {
    separator = ',',
    splitValues = false,
    deleteRawKey = true,
    trimSpaces = true,
    tryJoinRepeatedKeys = true,
    resolveFuncs = true,
    useSubkeyAsParams = true,
  } = options;

  for (const key of Object.keys(obj)) {
    const subkeys = key.split(separator);
    const value = obj[key];

    for (const [index, subkey] of subkeys.entries()) {
      const tagetSubkey = trimSpaces ? subkey.trim() : subkey;
      const targetIndex = Math.max(0, Math.min(index, value.length - 1));

      async function setValue(key: string, value: any): Promise<void> {
        if (resolveFuncs && typeof value === 'function') {
          if (useSubkeyAsParams) {
            obj[key] = await value(tagetSubkey);
          } else {
            obj[key] = await value();
          }
        } else {
          obj[key] = value;
        }
      }

      async function defaultAction(): Promise<void> {
        if (splitValues && Array.isArray(value)) {
          await setValue(tagetSubkey, value[targetIndex] || value[subkeys.length - 1] || value);
        } else {
          await setValue(tagetSubkey, value);
        }
      }

      if (tryJoinRepeatedKeys && tagetSubkey in obj) {
        if (Array.isArray(value) && Array.isArray(obj[tagetSubkey])) {
          obj[tagetSubkey] = [...obj[tagetSubkey], ...value];
        } else if (typeof value === 'object' && typeof obj[tagetSubkey] === 'object') {
          obj[tagetSubkey] = { ...obj[tagetSubkey], ...value };
        } else {
          await defaultAction();
        }
      } else {
        await defaultAction();
      }
    }

    if (key.indexOf(separator) > -1 && deleteRawKey) {
      delete obj[key];
    }
  }

  return obj;
}

export default expand;
