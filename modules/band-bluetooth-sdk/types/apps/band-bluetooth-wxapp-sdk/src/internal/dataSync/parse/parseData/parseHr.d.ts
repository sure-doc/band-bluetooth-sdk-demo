import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析心率文件 */
export declare function parseHrFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
