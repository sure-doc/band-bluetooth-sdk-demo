export declare function ab2hexLimit(buffer: ArrayBuffer, limit: number): string;
export declare function ab2hex(buffer?: string | ArrayBuffer, isReversal?: boolean): string;
/**
 * 16进制字符串转ArrayBuffer
 */
export declare function hex2ArrayBuffer(hexStr: string): ArrayBuffer;
/**
 * 16进制字符串转ArrayBuffer
 */
export declare function str2Bytes(str: string): number[] | null;
/**
 * 根据字符串长度，长度不足在字符串前填充0
 */
export declare function formatWithZero(content: string, targetLength: number): string;
/**
 * ArrayBuffer 合并
 */
export declare function appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBufferLike;
/**
 * 合并buffer
 * @param buffers
 * @param size
 * @returns {ArrayBuffer}
 *
 **/
export declare function mergeBuffer(buffers: ArrayBuffer[], size: number): ArrayBuffer;
export declare function fill(id: string): string;
/**
 *
 * @param buffer
 * @returns {number}
 */
export declare function getCRC32ForAlice(buffer: ArrayBuffer): number;
export declare function getCRCResult(str: string): string;
/**
 * 根据Bit位索引，获取该值是否为1
 * 返回 true or false
 */
export declare function getBitValue(data: number, index: number): boolean;
export declare function subUUID(uuid: string): string;
/**
 * ArrayBuffer UTF-8 码字符串
 */
export declare function toUtf8String(uintArray: ArrayBuffer): string;
export declare function toArrayWithSize(buffer: ArrayBuffer, packetlength: number): ArrayBuffer[] | null;
export declare function getCRC32(buffer: number[] | Uint8Array): number;
