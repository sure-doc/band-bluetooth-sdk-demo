import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析日常活动文件 */
export declare function parseDailyActivityFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
