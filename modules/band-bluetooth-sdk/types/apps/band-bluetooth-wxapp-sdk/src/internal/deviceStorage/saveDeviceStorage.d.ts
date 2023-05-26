import { Subject } from 'rxjs';
import { DeviceStorage } from './deviceStorage';
export declare namespace SaveDeviceStorage { }
/** 获取 saveDevice Subject */
export declare function getSaveDeviceSubject(): Subject<DeviceStorage>;
/** 初始化 */
export declare function initSaveDeviceStorage(): void;
/**
 * 保存 设备缓存
 *
 * saveDeviceStorage({ deviceId: '', mac: '' })
 */
export declare function saveDeviceStorage(device: DeviceStorage): void;
