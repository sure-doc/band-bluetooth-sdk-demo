import { Observable } from 'rxjs';
export declare class FindDeviceManager {
    private findDeviceByConnectedDevices;
    /** 查找 deviceId */
    findDeviceObservable({ mac, timeout }: {
        mac: string;
        timeout?: number;
    }): Observable<{
        connected: boolean;
        deviceId: string;
        mac: string;
    }>;
    /** 获取当前已连接设备 */
    getMobileDeviceMac(): Promise<{
        mac: string;
    }[]>;
    /**
     * 扫描设备查找
     */
    private findDeviceByScan;
}
