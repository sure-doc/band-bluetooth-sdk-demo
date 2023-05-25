import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/** 解析日常活动汇总文件 */
export declare function parseDailyActiveSummaryFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
