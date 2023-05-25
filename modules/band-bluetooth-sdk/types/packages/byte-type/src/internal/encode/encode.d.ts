import { ObjectTypeConfig } from '../types';
/** 编码 */
export declare function encode<T>({ type, data, reversed, }: {
    type: ObjectTypeConfig;
    data: T;
    reversed?: boolean;
}): ArrayBuffer;
