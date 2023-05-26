/// <reference types="miniprogram-api-typings" />
import { Observable } from 'rxjs';
export declare class FindDeviceByConnectedDevices {
    private findDeviceMacs;
    private readDeviceInfoMap;
    /** 循环获取最新已连接 */
    private connectedDeviceLoop$;
    getDeviceMac({ connectedDevice }: {
        connectedDevice: WechatMiniprogram.BluetoothDeviceInfo;
    }): Observable<{
        deviceId: string;
        mac: string;
    }>;
    findDevice({ mac }: {
        mac: string;
    }): Observable<{
        deviceId: string;
        mac: string;
    }>;
    getMobileDeviceMac(): Promise<{
        mac: string;
    }[]>;
    private connectAndReadDeviceInfoObservable;
}
