import { SedentaryReminder_t } from './types';
export interface SedentaryReminder {
    /** 久坐提醒开关状态 */
    enable: boolean;
    /** 久坐阈值,在有效时间内，久坐时间超过阀值提醒 */
    thresholdValue: ThresholdValue;
    /**
     * 有效区间
     *
     * 可指定1 ~3个区间
     *
     * 例如从晚上6点到早上8点有效可指定两个区间为18:00~23:59和00:00~08:00
     */
    timeSets: TimeRange[];
}
/**
 * 久坐阈值,在 duration 时间内，步数不超过 step 时进行久坐提醒
 */
export interface ThresholdValue {
    duration: number;
    step: number;
}
export interface TimeRange {
    /** 设置久坐提醒的时间范围: [小时,分钟] */
    startTime: {
        hour: number;
        minute: number;
    };
    /** 设置久坐提醒的时间范围: [小时,分钟] */
    endTime: {
        hour: number;
        minute: number;
    };
}
export declare function parseSedentaryReminder(sedentaryReminder: SedentaryReminder): SedentaryReminder_t;
export declare function formatSedentaryReminder(SedentaryReminder_t: SedentaryReminder_t): SedentaryReminder;
