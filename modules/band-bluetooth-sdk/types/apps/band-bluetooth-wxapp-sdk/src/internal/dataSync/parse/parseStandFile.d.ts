import { FileData, FileInfo } from '@apps/lifesense-wxapp-sdk';
export declare enum StandFileType {
    /** 心率 */
    HR = "HR",
    /** 睡眠血氧 */
    'SPO2-S' = "SPO2-S",
    /** 点测血氧 */
    'SPO2-P' = "SPO2-P",
    SLEP = "SLEP",
    /** 日常活动详情 */
    ACTI = "ACTI",
    /** 日常活动及状态详情 */
    ACTIS = "ACTIS",
    /** 日常数据汇总 */
    'ACTI-2' = "ACTI-2",
    /** 运动 */
    SPOR = "SPOR",
    /** 运动轨迹 */
    GPSD = "GPSD",
    /** 静息心率 */
    R_HR = "R_HR"
}
/**
 * 标准类型文件解析
 */
export declare function parseStandFile(reportFileData: FileInfo): FileData;
