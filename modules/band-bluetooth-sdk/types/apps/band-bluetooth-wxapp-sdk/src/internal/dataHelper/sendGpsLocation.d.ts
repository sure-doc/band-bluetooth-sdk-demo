import { GpsLocation_t } from './types';
export declare namespace GpsLocation {
    /**
     * 状态
     */
    enum StateCode {
        /** 已关闭 */
        Closed = 0,
        /** 等待等位 */
        Wait = 1,
        /** 信号弱 */
        Weak = 2,
        /** 信号正常 */
        Normal = 3
    }
}
export interface GpsLocation {
    /** 状态吗 */
    stateCode: GpsLocation.StateCode;
    /** 时间戳 秒 */
    timesTamp: number;
    /** 速度，单位：秒/公里 */
    speed: number;
    /** 配速，单位：秒/公里 */
    invertSpeed: number;
    /** 海拔高度，单位：米 */
    altitude: number;
    /** 距离，和上个采样点的间隔距离，单位：米 */
    distance: number;
    /** 经度*100W */
    longitude: number;
    /** 纬度*100W */
    latitude: number;
    /** 精确度 cm */
    precision: number;
}
export declare function parseGpsLocation(gpsLocation: GpsLocation): GpsLocation_t;
