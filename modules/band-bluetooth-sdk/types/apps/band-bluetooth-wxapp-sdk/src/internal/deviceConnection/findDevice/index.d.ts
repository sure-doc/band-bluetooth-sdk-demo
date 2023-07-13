export declare function initFindDevice(): void;
export declare function destroyFindDeviceManager(): void;
export declare const findDeviceObservable: ({ mac, timeout }: {
    mac: string;
    timeout?: number | undefined;
}) => import("rxjs").Observable<{
    connected: boolean;
    deviceId: string;
    mac: string;
}>;
export declare const getMobileDeviceMac: () => Promise<{
    mac: string;
}[]>;
