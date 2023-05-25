export declare function initDeviceConnection(): void;
export * from './types';
export declare const connectDevice: (option: import("./types").ConnectDevice.Option) => Promise<void>;
export declare const connectDeviceObservable: ({ mac, ...rest }: import("./types").ConnectDevice.Option) => import("rxjs").Observable<void>;
export declare const disconnectDevice: ({ mac }: import("./types").DisconnectDevice.Option) => Promise<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
export declare const getConnectionState: ({ mac }: {
    mac: string;
}) => import("./types").ConnectionState;
export declare const onConnectionStateChange: (option: import("./types").OnConnectionStateChange.Option) => () => void;
export declare const onConnectionStateChangeObservable: ({ mac }: Omit<import("./types").OnConnectionStateChange.Option, "onChange">) => import("rxjs").Observable<{
    mac: string;
    state: import("./types").ConnectionState;
    prevState: import("./types").ConnectionState;
}>;
export declare const onConnectionConnectedChange: ({ onChange, ...rest }: import("./types").OnConnectionConnectedChange.Option) => () => void;
export declare const onConnectionConnectedChangeObservalbe: (option: Omit<import("./types").OnConnectionConnectedChange.Option, "onChange">) => import("rxjs").Observable<{
    mac: string;
    connected: boolean;
}>;
export declare const getConnectedDevices: () => string[];
export { getMobileDeviceMac } from './findDevice';
