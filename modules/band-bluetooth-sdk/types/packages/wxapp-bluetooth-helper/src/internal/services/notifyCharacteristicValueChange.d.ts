/// <reference types="miniprogram-api-typings" />
/**
 * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
 */
export declare function notifyCharacteristicValueChangeObservable({ deviceId, serviceId, characteristicId, state, }: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    state: boolean;
}): import("rxjs").Observable<WechatMiniprogram.BluetoothError>;
