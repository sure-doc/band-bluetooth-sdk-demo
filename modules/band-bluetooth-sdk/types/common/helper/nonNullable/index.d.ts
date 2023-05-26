export declare function nonNullable<T>(v: T): v is T extends null | undefined ? never : T;
export default nonNullable;
