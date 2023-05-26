import { DeviceStorage } from './deviceStorage';
export declare namespace GetAllDeviceStorage {
    /** 设备信息 */
    type Device = DeviceStorage;
}
/**
 * 获取全部 设备缓存
 *
 */
export declare function getAllDeviceStorage(): DeviceStorage[];
