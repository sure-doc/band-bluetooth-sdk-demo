export declare namespace DeviceMac {
    interface DeviceMacInfo {
        deviceId: string;
        mac: string;
    }
    interface UpdateDeviceMacInfoOptions {
        deviceId: string;
        mac: string;
        /** 是否缓存起来，默认 false */
        saveToStorage?: boolean;
    }
    interface GetDeviceMacInfoOptions {
        deviceId?: string;
        mac?: string;
    }
    type DeviceMacInfoList = DeviceMacInfo[];
}
/** 初始化 */
export declare function initDeviceMacInfo(): void;
/** 更新 设备 mac 信息 */
export declare function updateDeviceMacInfo(options: DeviceMac.UpdateDeviceMacInfoOptions): void;
/** 获取 设备 mac 信息 */
export declare function getDeviceMacInfoList(): DeviceMac.DeviceMacInfoList;
/** 获取 设备 mac 信息 */
export declare function getDeviceMacInfo(options: DeviceMac.GetDeviceMacInfoOptions): DeviceMac.DeviceMacInfo | undefined;
