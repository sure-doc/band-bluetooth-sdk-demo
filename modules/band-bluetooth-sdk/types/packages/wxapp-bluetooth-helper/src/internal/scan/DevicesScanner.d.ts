import { Observable } from 'rxjs';
import { ScanDevicesObservable, ScanDevices } from './types';
/**
 * 扫描设备
 */
export declare class DevicesScanner {
    private onBluetoothDeviceFound$;
    private scanDevices$;
    private stopScanDevices$;
    private onDeviceFound$;
    private scanDevicesDataList$;
    private state;
    constructor();
    scanDevicesObservable(option: ScanDevicesObservable.Option): Observable<import("./types").ScanDevicesResult>;
    /**
     * ```
     * const stopScan = scanDevices({...})
     *
     * stopScan();
     * ```
     */
    scanDevices(option: ScanDevices.Option): () => void;
}
