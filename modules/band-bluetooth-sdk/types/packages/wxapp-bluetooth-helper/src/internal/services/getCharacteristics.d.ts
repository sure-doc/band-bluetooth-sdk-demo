/// <reference types="miniprogram-api-typings" />
/**
 * 获取蓝牙设备某个服务中所有特征值(characteristic)
 */
export declare function getCharacteristicsObservable({ deviceId, serviceId }: {
    deviceId: string;
    serviceId: string;
}): import("rxjs").Observable<WechatMiniprogram.GetBLEDeviceCharacteristicsSuccessCallbackResult>;
