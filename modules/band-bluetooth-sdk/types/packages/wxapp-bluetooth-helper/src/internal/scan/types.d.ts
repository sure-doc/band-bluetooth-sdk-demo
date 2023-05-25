/// <reference types="miniprogram-api-typings" />
export type FoundDevice = WechatMiniprogram.BlueToothDevice;
export interface ScanDevicesOption {
    /** 搜索指定 设备 id */
    deviceId?: string;
    /** 默认不超时 */
    timeout?: number;
    findOne?: boolean;
    /** 是否允许重复上报同一设备。如果允许重复上报，则 [wx.onBlueToothDeviceFound](#) 方法会多次上报同一设备，但是 RSSI 值会有不同。 */
    allowDuplicatesKey?: boolean;
    /** 调用多次，以最小值为准 */
    interval?: number;
    /** 调用多次，以最高级别为准 */
    powerLevel?: 'low' | 'medium' | 'high';
    /** 要搜索的蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。 */
    services?: string[];
}
export interface ScanDevicesResult {
    device: FoundDevice;
}
export declare namespace ScanDevicesObservable {
    type Option = ScanDevicesOption;
    type Result = ScanDevicesResult;
}
export declare namespace ScanDevices {
    type Result = ScanDevicesResult;
    type Option = ScanDevicesOption & {
        onDeviceFound?: (res: Result) => void;
    };
}
