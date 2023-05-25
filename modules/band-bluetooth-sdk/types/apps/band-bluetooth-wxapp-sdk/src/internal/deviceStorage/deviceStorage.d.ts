import { BehaviorSubject } from 'rxjs';
export declare namespace DeviceStorage {
    /** 设备信息 */
}
export interface DeviceStorage {
    deviceId: string;
    mac?: string;
}
export type DeviceStorageMap = Record<string, DeviceStorage>;
export declare function getDeviceStorageMapBehaviorSubject(): BehaviorSubject<DeviceStorageMap>;
export declare function initDeviceStorage(): void;
export declare function clearStorage(): void;
