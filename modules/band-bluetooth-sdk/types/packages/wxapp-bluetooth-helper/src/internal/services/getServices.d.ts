/// <reference types="miniprogram-api-typings" />
/**
 * 获取蓝牙设备所有服务
 */
export declare function getServicesObservable({ deviceId }: {
    deviceId: string;
}): import("rxjs").Observable<WechatMiniprogram.GetBLEDeviceServicesSuccessCallbackResult>;
