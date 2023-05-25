import { Data } from '@apps/lifesense-wxapp-sdk';
import { StartDataSync } from '../startDataSync';
/**
 * 解析回调的数据
 */
export declare function parseReportData({ reportData }: {
    reportData: Data;
}): StartDataSync.UploadData | undefined;
