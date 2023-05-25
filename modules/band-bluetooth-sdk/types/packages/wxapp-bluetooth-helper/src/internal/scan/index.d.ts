export type { ScanDevicesObservable, ScanDevices } from './types';
export declare const scanDevices: (option: import("./types").ScanDevices.Option) => () => void;
export declare const scanDevicesObservable: (option: import("./types").ScanDevicesOption) => import("rxjs").Observable<import("./types").ScanDevicesResult>;
