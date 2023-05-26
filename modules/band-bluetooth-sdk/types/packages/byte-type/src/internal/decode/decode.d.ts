import { ObjectTypeConfig } from '../types';
/** 解析 */
export declare function decode<T>({ type, buffer, reversed, }: {
    type: ObjectTypeConfig;
    buffer: ArrayBuffer;
    reversed?: boolean;
}): T;
