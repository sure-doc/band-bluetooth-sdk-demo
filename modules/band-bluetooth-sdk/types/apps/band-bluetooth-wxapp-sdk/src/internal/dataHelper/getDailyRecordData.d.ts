import { RecordData_t } from './types';
/**
 * 记录类型
 * ```
 * 0: 近期记录（与上一次上传间隔时间内的记录）
 * 1: 历史记录
 * 2: 点测记录
 * ```
 */
export declare enum RecordType {
    /** 近期记录（与上一次上传间隔时间内的记录） */
    Recent = 0,
    /** 历史记录 */
    History = 1,
    /** 点测记录 */
    SpotTest = 2
}
/**
 * 数据类型
 * ```
 * 0:心率）
 * 1:血氧
 * 2:睡眠
 * 3:日常活动
 * 4:日常活动及状态
 * 5:静息心率(此时RecordType,只能0:近期记录,有效)
 * ```
 */
export declare enum DataType {
    /** 0: 心率 */
    Hr = 0,
    /** 1: 血氧 */
    BloodOxygen = 1,
    /** 2: 睡眠 */
    Sleep = 2,
    /** 3: 日常活动 */
    DailyActivity = 3,
    /** 4: 日常活动及状态 */
    DailyActivityAndStatus = 4,
    /** 5: 静息心率(此时RecordType,只能0:近期记录,有效) */
    RestingHeartRate = 5
}
export interface GetDailyRecordData {
    /**
     * 数据类型
     */
    dataType: DataType;
    /**
     * 记录类型
     */
    recordType: RecordType;
}
export declare function parseGetDailyRecordData({ dataType, recordType }: GetDailyRecordData): RecordData_t;
