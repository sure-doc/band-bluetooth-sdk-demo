import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析睡眠文件 */
export declare function parseSleepFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
