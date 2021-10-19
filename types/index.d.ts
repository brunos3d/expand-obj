export declare type ExpandOptions = {
    separator?: string;
    splitValues?: boolean;
    deleteRawKey?: boolean;
    trimSpaces?: boolean;
    tryJoinRepeatedKeys?: boolean;
    resolveFuncs?: boolean;
    useSubkeyAsParams?: boolean;
};
export declare function expand<T>(obj: any, options?: ExpandOptions): Promise<T>;
export default expand;
