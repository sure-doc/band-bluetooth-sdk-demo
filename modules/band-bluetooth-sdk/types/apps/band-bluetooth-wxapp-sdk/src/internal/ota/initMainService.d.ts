/**
 * 初始化主服务
 *
 * 获取蓝牙设备某个服务中所有特征值(characteristic)
 */
export declare function initMainService({ deviceId }: {
    deviceId: string;
}): import("rxjs").Observable<{
    A701: {
        characteristic: WechatMiniprogram.BLECharacteristic;
        notifyResult: WechatMiniprogram.BluetoothError;
    };
} | {
    A702: {
        characteristic: WechatMiniprogram.BLECharacteristic;
    };
} | {
    A703: {
        characteristic: WechatMiniprogram.BLECharacteristic;
    };
}>;
