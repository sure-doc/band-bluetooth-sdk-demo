import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析静息心率文件 */
export declare function parseRestingHrFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
