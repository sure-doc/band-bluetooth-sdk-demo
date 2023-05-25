import { battery_info_t, DeviceLanguageSet_t, device_info_t, time_t } from './types';
/**
 * DeviceTime
 */
export interface DeviceTime {
    /** GTM时间，单位秒 */
    timestamp: number;
    /** 时区，单位分钟 */
    timezone: number;
    /** 时区对应城市，默认发英文，如：beijing、shanghai、hongkong、newyork */
    timezoneCity: string;
    /**
     * 时间显示格式，收到无效值不更新设置
     * 0：无效
     * 1：12小时制
     * 2：24小时制
     */
    timeFormat: number;
    /**
     * 日期显示格式，收到无效值不更新设置
     * 0：无效
     * 1：yyyy-m-d：2020-1-1
     * 2：yyyy/m/d
     * 3：d-m-yyyy
     * 4：d/m/yyyy
     * 5：yyyy年m月d日
     * 6：m-d
     * 7：m/d
     * 8：d-mmm-yyyy：1-Jan-20
     * 9：d-mmm
     */
    dateFormat: number;
}
export declare function parseDeviceTime(deviceTime: DeviceTime): time_t;
export declare function formatDeviceTime(time_t: time_t): DeviceTime;
/**
 * DeviceInfo
 */
export interface DeviceInfo {
    /** 设备类型 */
    deviceType?: number;
    /** 设备硬件版本号 */
    deviceHardVersion: string;
    /** 设备软件版本号 */
    deviceSoftVersion: string;
    /** 设备SN号“LSXXXXXXX” */
    deviceSn: string;
    /** 设备型号 */
    deviceModel?: string;
    /** 设备名称 */
    deviceName: string;
    /** sku */
    sku: string;
}
export declare function formatDeviceInfo(device_info_t: device_info_t): DeviceInfo;
/**
 * BatteryInfo
 */
export interface BatteryInfo {
    /** 电池电量百分比。取值范围[0,100] */
    batteryPercent: number;
}
export declare function formatBatteryInfo(battery_info_t: battery_info_t): BatteryInfo;
export type DeviceLanguageSetting = DeviceLanguageSet_t;
export declare function formatDeviceLanguageSet(DeviceLanguageSet_t: DeviceLanguageSet_t): DeviceLanguageSetting;
export declare function parseDeviceLanguageSetting(deviceLanguageSetting: DeviceLanguageSetting): DeviceLanguageSet_t;
