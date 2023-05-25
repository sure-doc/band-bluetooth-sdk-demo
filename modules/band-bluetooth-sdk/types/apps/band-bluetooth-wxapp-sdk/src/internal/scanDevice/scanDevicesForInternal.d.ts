import { ScanDevices } from '@my/wxapp-bluetooth-helper';
export declare function scanDevicesForInternal(option: ScanDevices.Option): () => void;
export declare function scanDevicesForInternalObservable(option: ScanDevices.Option): import("rxjs").Observable<import("@my/wxapp-bluetooth-helper/src/internal/scan/types").ScanDevicesResult>;
