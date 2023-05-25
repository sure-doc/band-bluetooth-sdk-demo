import { Subject } from 'rxjs';
export declare namespace RemoveDeviceStorage {
    interface Options {
        mac?: string;
        deviceId?: string;
    }
}
/** 获取 removeDevice$ */
export declare function getRemoveDeviceSubject(): Subject<RemoveDeviceStorage.Options>;
/** 初始化 */
export declare function initRemoveDeviceStorage(): void;
/**
 * 保存 设备缓存
 *
 * removeDeviceStorage({ deviceId: '', mac: '' })
 */
export declare function removeDeviceStorage(options: RemoveDeviceStorage.Options): void;
