import { ObjectTypeConfig } from '@my/byte-type';
export interface FileData0x03 {
    /** 已发送的数据块大小；单位：Byte */
    u32SizeTxedData: number;
    /** 已发送的数据块的Crc32值 */
    u32CrcTxedData: number;
    /**
   1、已发送数据在整个OtaFile的偏移量。应该等同上次Dev上行块数据响应指令中的u32OffsetNextBlock。
   */
    u32OffsetCurrent: number;
}
/** 下发 0x03 命令字段 */
export declare const FileData0x03Type: ObjectTypeConfig;
