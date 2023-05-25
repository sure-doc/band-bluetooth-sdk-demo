export interface SizeObjectConfig {
    decode?: number | ((params: {
        data: any;
    }) => number | undefined);
    encode?: number;
}
export type SizeConfig = number | SizeObjectConfig;
/**
 * FieldType
 *
 * 解析数据类型，负责解析 arrayBuffer
 */
export interface FieldType<T> {
    size?: number;
    decode?: FieldDecode<T>;
    encode?: FieldEncode<T>;
}
export interface EncodeFieldType<T> {
    size?: number;
    encode: FieldEncode<T>;
}
export interface DecodeFieldType<T> {
    size?: number;
    decode: FieldDecode<T>;
}
export type FieldDecode<T> = (result: {
    buffer: ArrayBuffer;
}) => T;
export type FieldEncode<T> = (result: {
    data: T;
}) => Uint8Array;
/**
 * ObjectType
 *
 * 对象类型
 */
export interface ObjectType {
    fields: ObjectTypeField[];
    size?: number;
}
/**
 * ObjectTypeField
 *
 * 对象类型的字段
 */
export interface ObjectTypeField {
    /** 字段名 */
    fieldName: string;
    /** 类型 */
    type: Types;
    /** 反转 */
    reversed?: boolean;
    /** byte大小 */
    size?: SizeConfig;
    /** 数组参数 */
    array?: {
        /** 数组包含多少项 */
        arraySize?: SizeConfig;
        /** 数组里每一项的 byte 大小 */
        itemSize: number;
        /** 数组里每一项 是否反转 */
        itemReversed?: boolean;
    };
    /** 是否可选 */
    optional?: boolean;
}
/**
 * 数据类型
 */
export type Types = FieldType<any> | ObjectType;
/**
 * ObjectTypeConfig
 *
 * 对象类型配置
 */
export interface ObjectTypeConfig {
    fields: Record<string, ObjectTypeConfigField>;
}
/**
 * ObjectTypeConfig
 *
 * 对象类型的字段配置
 */
export interface ObjectTypeConfigField {
    /** id，目前仅用于排序 */
    id: number;
    /** 类型 */
    type: string | TypeConfig<any>;
    /**
     * byte 大小
     * array 为 true 时，不需要设置 size; 如需设置 type 的大小，请用 itemSize; 如需设置 数组 size 请用 arraySize；
     **/
    size?: SizeConfig;
    /** 反转 */
    reversed?: boolean;
    /** 该字段为数组 */
    array?: boolean;
    /** 数组包含多少项 */
    arraySize?: SizeConfig;
    /** 数组里每一项的 byte 大小 */
    itemSize?: number;
    /** 数组里每一项 是否反转 */
    itemReversed?: boolean;
    /** 是否可选 */
    optional?: boolean;
}
/**
 * 类型配置
 */
export type TypeConfig<T> = FieldType<T> | ObjectTypeConfig;
