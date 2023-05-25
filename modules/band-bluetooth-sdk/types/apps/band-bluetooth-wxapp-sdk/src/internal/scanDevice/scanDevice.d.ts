import { ScanDevice } from './types';
export declare function scanDeviceObservable(option: Omit<ScanDevice.Option, 'onDeviceFound'>): import("rxjs").Observable<ScanDevice.ScanResult>;
export declare function scanDevice(option: ScanDevice.Option): () => void;
export declare function getScanDevices(): ScanDevice.ScanResult[];
