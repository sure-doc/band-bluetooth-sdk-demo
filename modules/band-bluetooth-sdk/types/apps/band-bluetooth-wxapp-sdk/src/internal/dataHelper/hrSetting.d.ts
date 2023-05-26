import { HrSwitch_t } from './types';
/** 心率开关 */
export declare enum HrSettingSwitch {
    Invalid = 0,
    Closed = 1,
    Opened = 2
}
/**
 * 心率相关设置
 */
export interface HrSetting {
    /** 手环日常心率检测开关 - HrSwitch */
    hrSwitch: HrSettingSwitch;
    /** 手环日常心率周期检测间隔（单位：s） - HrInterval */
    hrInterval: number;
    /** 日常最大心率预警开关 - HrDailyWarnEn */
    hrDailyWarnSwitch: HrSettingSwitch;
    /** 日常最大心率预警值 - HrDailyWarnVal */
    hrDailyWarnValue: number;
    /** 运动最大心率预警开关 - HrSportWarnEn */
    hrSportWarnSwitch: HrSettingSwitch;
    /** 运动最大心率预警值 - HrSportWarnVal */
    hrSportWarnValue: number;
}
export declare function parseHrSwitch(hrSetting: HrSetting): HrSwitch_t;
export declare function formatHrSwitch(HrSwitch_t: HrSwitch_t): HrSetting;
