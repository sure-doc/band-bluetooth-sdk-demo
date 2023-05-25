/** 监听蓝牙设备连接状态变更 */
export declare function onBleConnectionStateChangeObservable({ mac }: {
    mac?: string;
}): import("rxjs").Observable<{
    deviceMacInfo: import("../deviceMac").DeviceMac.DeviceMacInfo | undefined;
    deviceId: string;
    state: import("@my/wxapp-bluetooth-helper").DeviceConnectionState;
    prevState: import("@my/wxapp-bluetooth-helper").DeviceConnectionState;
}>;
