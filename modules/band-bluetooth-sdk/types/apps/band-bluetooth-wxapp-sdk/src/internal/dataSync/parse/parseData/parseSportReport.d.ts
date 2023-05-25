import { FileInfo } from '@apps/lifesense-wxapp-sdk';
/**
 * 解析运动报告文件
 *
 * 共有三种格式：
 * - 运动报告文件格式
 * - 运动详情文件格式（标准文件格式：SPOR）
 * - GPS 轨迹文件格式（标准文件格式：GPSD）
 */
export declare function parseSportReportFile(fileInfo: FileInfo): {
    fileList: any[];
    fileHeader?: undefined;
} | {
    fileList: {
        originData: import("@apps/lifesense-wxapp-sdk").PbPacketType;
        data: any;
    }[];
    fileHeader: import("@apps/lifesense-wxapp-sdk").FileHeader;
};
