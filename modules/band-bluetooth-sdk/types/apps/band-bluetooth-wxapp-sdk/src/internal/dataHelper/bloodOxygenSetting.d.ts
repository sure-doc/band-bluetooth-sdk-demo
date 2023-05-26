import { Spo2Switch_t } from './types';
/**
 * 手环血氧检测类型：
 * 0：睡眠血氧
 * 1：全天血氧
 */
export declare enum BloodOxygenSettingType {
    /** 睡眠血氧 */
    SleepBloodOxygen = 0,
    /** 全天血氧 */
    AllDayBloodOxygen = 1
}
/**
 * 血氧相关配置
 */
export interface BloodOxygenSetting {
    /** 手环血氧检测类型 */
    type: BloodOxygenSettingType;
    /** 手环血氧检测类型开关 */
    switch: boolean;
    /** 手环血氧周期检测间隔（单位s） */
    interval: number;
}
export declare function formatSpo2Switch(Spo2Switch_t: Spo2Switch_t): BloodOxygenSetting;
export declare function parseBloodOxygenSetting(bloodOxygenSetting: BloodOxygenSetting): Spo2Switch_t;
