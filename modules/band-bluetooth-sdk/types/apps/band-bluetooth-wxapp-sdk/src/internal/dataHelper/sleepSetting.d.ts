import { SleepSwitch_t } from './types';
/**
 * 睡眠设置
 */
export interface SleepSetting {
    /** 睡眠监测开关 */
    sleepSwitch: boolean;
    /** 获取睡眠计划：睡眠计划是否有效 */
    /** 设置睡眠计划: true更新计划, false不更新计划 */
    sleepScheduleEnabled: boolean;
    /** 睡眠计划 */
    sleepSchedule: SleepSchedule;
}
/**
 * 睡眠计划
 */
export interface SleepSchedule {
    /** 目标睡眠时长 */
    sleepDuration: number;
    /** 目标入睡时间, [ 小时, 分钟 ] */
    sleepStartTime?: {
        hour: number;
        minute: number;
    };
    /** 目标起床时间, [ 小时, 分钟 ] */
    sleepEndTime?: {
        hour: number;
        minute: number;
    };
    /** 入睡提醒设置 */
    fallAsleepRemindSetting?: FallAsleepRemindSeting;
    /** 睡眠报告推送开关 */
    sleepReportSwitch: SleepReportSwitch;
}
/**
 * 入睡提醒
 */
export interface FallAsleepRemindSeting {
    /** 唤醒提醒开关 */
    remindSwitch: boolean;
    /** 提醒时间 [ 小时（24小时制））, 分钟 ] */
    remindTime?: {
        hour: number;
        minute: number;
    };
    /** 提醒周期，从周一到周日，所有为false，为只当天有效 */
    remindCycle: RemindCycle;
}
/** 提醒周期，从周一到周日，1,2,3,4,5,6,7 对应周一到周日 */
export type RemindCycle = number[];
/**
 * 睡眠报告推送开关
 * 0：无效值
 * 1：关
 * 2：开
 */
export declare enum SleepReportSwitch {
    Invalid = 0,
    Close = 1,
    Open = 2
}
export declare function formatSleepSwitch(SleepSwitch_t: SleepSwitch_t): SleepSetting;
export declare function parseSleepSwitch(SleepSetting: SleepSetting): SleepSwitch_t;
