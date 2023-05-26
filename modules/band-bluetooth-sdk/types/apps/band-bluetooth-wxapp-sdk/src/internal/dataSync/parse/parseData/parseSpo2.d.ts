import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析血氧文件 */
export declare function parseSpo2File(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
