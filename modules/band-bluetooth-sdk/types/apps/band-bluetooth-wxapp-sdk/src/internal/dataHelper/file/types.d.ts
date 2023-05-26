/**
 * 文件类型定义
 * ```
 * 1: 日志
 * 2: 表盘
 * 3: 心率
 * 4: 血氧
 * 5: 睡眠
 * 6: 运动报告
 * 7: 日常活动
 * 8: 运动心率
 * 12: 每天活动数据
 * 13: 静息心率
 * ```
 */
export declare enum FileType {
    /** 1: 日志 */
    Log = 1,
    /** 2: 表盘 */
    WatchFace = 2,
    /** 3: 心率 */
    Hr = 3,
    /** 4: 血氧 */
    Spo2 = 4,
    /** 5: 睡眠 */
    Sleep = 5,
    /** 6: 运动报告 */
    SportReport = 6,
    /** 7: 日常活动 */
    DailyActivity = 7,
    /** 8: 运动心率 */
    SportHr = 8,
    /** 12: 每天活动数据 */
    DailyActivitySummary = 12,
    /** 13: 静息心率 */
    RestingHr = 13
}
